# FRIEDA LEADS SYSTEM + DASHBOARD — Claude Code Implementation Guide

## WHAT THIS DOCUMENT IS

Copy-paste these instructions into Claude Code when you're ready to build the leads system. Claude Code will need access to your Soul Waves project folder. It should ask you for anything it needs (database credentials, API keys) and guide you through setting them up securely via terminal. **No API keys, passwords, or secrets should ever be hardcoded in code files.**

---

## OVERVIEW

Build a GDPR-compliant leads capture system for the Frieda chatbot on soulwavesva.com. Three parts:

1. **Frieda backend update**: Save lead data (name, email, message, consent timestamp) to the Neon database when a visitor provides their info during a chat
2. **Dashboard at /dashboard**: Magic link auth (email-based login) where Anna can see all leads, chat transcripts, and delete individual leads
3. **GDPR compliance layer**: Consent collection before chat starts, data retention policy, deletion capability, AI disclosure

---

## EXISTING TECH STACK (do not change what's already working)

- **Framework**: Next.js (App Router)
- **Database**: Neon (PostgreSQL), already connected
- **Email**: Resend, already set up
- **AI**: OpenAI API (for Frieda chatbot), already working
- **Hosting**: Vercel
- **Domain**: soulwavesva.com

Before starting, check what already exists:
- Look at the existing `.env.local` for DATABASE_URL, RESEND_API_KEY, OPENAI_API_KEY
- Look at the existing database tables (run `\dt` against Neon to see what's there)
- Look at the existing Frieda chat widget code to understand the current implementation
- Ask Anna if anything is unclear

---

## PART 1: ENVIRONMENT VARIABLES

### Security rules (non-negotiable):

1. **Never hardcode secrets in source code.** All secrets go in `.env.local` (local) and Vercel environment variables (production).
2. **Never commit `.env.local` to git.** Verify it's in `.gitignore`.
3. **Never log or console.log secrets.** Not even during debugging.
4. **Never expose server-side env vars to the client.** Only variables prefixed with `NEXT_PUBLIC_` are visible to the browser. Database URLs, API keys, and auth secrets must NEVER have this prefix.

### New environment variables needed:

Generate secure random values via terminal (Claude Code should run these and show Anna the output):

```bash
# Generate SESSION_SECRET (for signing auth tokens)
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Generate ENCRYPTION_KEY (for encrypting sensitive lead data at rest)
node -e "console.log('ENCRYPTION_KEY=' + require('crypto').randomBytes(32).toString('hex'))"
```

Then guide Anna to add them:

```bash
# Claude Code: tell Anna to open .env.local and add these lines
# with the generated values (DO NOT paste the actual values in chat)

# SESSION_SECRET=<the generated value>
# ENCRYPTION_KEY=<the generated value>
# ADMIN_EMAIL=anna@soulwavesva.com
```

The following should already exist in `.env.local`. If not, ask Anna:
- `DATABASE_URL` (Neon connection string)
- `RESEND_API_KEY` (for sending emails)
- `OPENAI_API_KEY` (for Frieda)

For Vercel production deployment:
```bash
# Run from project root. Vercel prompts for values securely.
vercel env add SESSION_SECRET production
vercel env add ENCRYPTION_KEY production
vercel env add ADMIN_EMAIL production
# DATABASE_URL, RESEND_API_KEY, OPENAI_API_KEY should already be set in Vercel
```

---

## PART 2: DATABASE SCHEMA

Create a migration file or run this SQL against the existing Neon database. Check what tables already exist first and don't overwrite anything.

```sql
-- ============================================
-- LEADS TABLE
-- Stores every lead captured by Frieda
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,                          -- summary of what they asked about
  source VARCHAR(50) DEFAULT 'frieda',   -- where the lead came from
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  gdpr_notice_version VARCHAR(20) DEFAULT '1.0',
  status VARCHAR(20) DEFAULT 'new',      -- new, contacted, converted, archived
  notes TEXT,                            -- Anna's internal notes on the lead
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CHAT TRANSCRIPTS
-- Stores full conversations for context
-- Linked to leads (if identified) or standalone (anonymous)
-- ============================================
CREATE TABLE IF NOT EXISTS chat_transcripts (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  session_id VARCHAR(255) NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]',  -- array of {role, content, timestamp}
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONSENT LOG
-- Immutable audit trail. NEVER delete these records.
-- Required for GDPR accountability.
-- ============================================
CREATE TABLE IF NOT EXISTS consent_log (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  consent_type VARCHAR(50) NOT NULL,     -- 'chat_start', 'lead_capture', 'withdrawal'
  consent_text TEXT NOT NULL,            -- exact text the user saw when consenting
  ip_hash VARCHAR(64),                  -- SHA-256 hash of IP, NOT raw IP
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MAGIC LINK TOKENS
-- For dashboard authentication
-- ============================================
CREATE TABLE IF NOT EXISTS auth_tokens (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_chat_transcripts_lead_id ON chat_transcripts(lead_id);
CREATE INDEX IF NOT EXISTS idx_chat_transcripts_session_id ON chat_transcripts(session_id);
CREATE INDEX IF NOT EXISTS idx_consent_log_session_id ON consent_log(session_id);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_token ON auth_tokens(token);
```

---

## PART 3: MAGIC LINK AUTHENTICATION (for /dashboard)

### How it works:

1. Anna goes to `/dashboard`
2. She sees a simple email input: "Enter your email to log in"
3. She types `anna@soulwavesva.com` and clicks "Send login link"
4. Backend checks: is this email === ADMIN_EMAIL env var? If not, show generic "If this email is registered, you'll receive a link" (don't reveal whether the email is valid)
5. If email matches, generate a secure token (64 random bytes, hex encoded), store in `auth_tokens` table with 15-minute expiry
6. Send magic link via Resend to anna@soulwavesva.com: `https://soulwavesva.com/dashboard/verify?token=<token>`
7. When Anna clicks the link, backend validates: token exists, not expired, not already used. Mark as used.
8. Set a secure HTTP-only cookie (signed with SESSION_SECRET) that lasts 7 days
9. Redirect to `/dashboard`
10. All /dashboard pages check for valid session cookie. No cookie or expired = redirect to login.

### Security requirements:

- Tokens expire after 15 minutes
- Tokens are single-use (mark as `used=true` after successful verification)
- Session cookies: `httpOnly: true`, `secure: true`, `sameSite: 'lax'`, `path: '/dashboard'`
- Sign session cookies with SESSION_SECRET using HMAC-SHA256
- Rate limit the login endpoint: max 5 requests per email per hour
- Clean up expired tokens periodically (can be done on each login attempt)
- The login page should NOT reveal whether an email is registered

### API routes needed:

```
POST /api/auth/login        — receives email, sends magic link
GET  /api/auth/verify       — receives token from URL, sets session cookie
POST /api/auth/logout       — clears session cookie
GET  /api/auth/check        — checks if current session is valid (for client-side)
```

---

## PART 4: FRIEDA CHATBOT UPDATES

### 4a. GDPR Consent Before Chat

Update the Frieda chat widget. Before the first message can be sent, show a consent notice. The user must actively click to agree.

**English version:**
```
Hi! I'm Frieda, an AI assistant for Soul Waves.

Before we chat: I collect information you share (like your name or email)
to answer your questions and follow up if you'd like. Your data is stored
securely and you can request deletion anytime at anna@soulwavesva.com.

Data is retained for up to 6 months and then automatically deleted.

By clicking "Start Chat", you agree to this.

[Start Chat]  [Privacy Policy ↗]
```

**German version:**
```
Hi! Ich bin Frieda, die KI-Assistentin von Soul Waves.

Bevor wir loslegen: Informationen, die du teilst (z.B. Name oder E-Mail),
speichere ich, um deine Fragen zu beantworten und mich bei Interesse
bei dir zu melden. Deine Daten werden sicher gespeichert und du kannst
jederzeit die Löschung per E-Mail an anna@soulwavesva.com anfordern.

Daten werden maximal 6 Monate gespeichert und danach automatisch gelöscht.

Mit "Chat starten" stimmst du zu.

[Chat starten]  [Datenschutz ↗]
```

**Implementation requirements:**
- Consent notice appears BEFORE any messages can be sent
- "Start Chat" / "Chat starten" must be an active click (not pre-accepted)
- Link to /datenschutz or /privacy-policy page
- On consent click: log to `consent_log` table with session_id, consent_type='chat_start', the exact consent text shown, SHA-256 hashed IP, user_agent, timestamp
- Store consent version as '1.0'. When the consent text changes in the future, increment this.
- Detect language from `localStorage.getItem('sw_lang')` (already on the site). Default to English.
- Save consent state in sessionStorage so it persists during page navigation but resets on new visit

### 4b. AI Disclosure (EU AI Act, mandatory from August 2026)

Frieda's first message after consent must clearly state she is AI:

**English:** "Hey! I'm Frieda, Soul Waves' AI assistant. I'm not a human, but I know a lot about what Anna builds and how she can help. What can I do for you?"

**German:** "Hey! Ich bin Frieda, die KI-Assistentin von Soul Waves. Ich bin kein Mensch, aber ich weiß eine Menge über das, was Anna macht. Wie kann ich dir helfen?"

### 4c. Lead Capture During Chat

When Frieda detects that a visitor has shared their name and/or email during conversation:

1. **Extract lead info** from messages:
   - Email: regex match for email addresses in visitor messages
   - Name: detect patterns like "I'm [name]", "My name is [name]", "Ich bin [name]", "Ich heiße [name]"
   - Message/topic: summarize what they asked about (use the first few messages as context)

2. **Save to database:**
   - Insert into `leads` table: name, email, message summary, consent_given=true, consent_timestamp (from the chat_start consent), gdpr_notice_version
   - Insert full conversation into `chat_transcripts`: session_id, messages as JSONB array, language
   - Insert into `consent_log`: session_id, consent_type='lead_capture', consent text="User voluntarily provided contact information during chat"

3. **Notify Anna via Resend:**
   - To: anna@soulwavesva.com
   - Subject: "New lead from Frieda: [name or 'Anonymous']"
   - Body: name, email, what they asked about, timestamp, link to /dashboard
   - Do NOT send any email to the lead. Anna follows up manually.

4. **If visitor doesn't share contact info:**
   - Still save the chat transcript to `chat_transcripts` with session_id (no lead_id)
   - These are anonymous conversations, useful for understanding what visitors ask about

### 4d. Chat Session Limits

- Max 10 messages per session (keep existing limit)
- After limit: "I can only handle 10 messages per chat session. Want to continue the conversation with Anna directly? Book a free call: [calendar link] or email anna@soulwavesva.com ✨"
- Save full transcript before showing this message

---

## PART 5: DASHBOARD (/dashboard)

### Pages:

**`/dashboard`** (main page, requires auth)
- Summary stats at the top: total leads, new leads this week, total conversations
- Leads table: name, email, message summary, status, date. Sorted newest first.
- Each row clickable to expand/view full chat transcript
- Status dropdown per lead: new, contacted, converted, archived
- Notes field per lead (editable, auto-saves)
- Delete button per lead (with confirmation: "Delete this lead and all associated data? This cannot be undone.")
- Search/filter: by status, by date range, by keyword

**`/dashboard/login`** (public)
- Email input + "Send login link" button
- Success message: "If this email is registered, you'll receive a login link shortly. Check your inbox."

**`/dashboard/verify`** (public, handles magic link callback)
- Validates token from URL query parameter
- Sets session cookie
- Redirects to /dashboard

### API routes for dashboard:

```
GET    /api/leads              — list all leads (paginated, filterable)
GET    /api/leads/[id]         — get single lead with chat transcript
PATCH  /api/leads/[id]         — update status or notes
DELETE /api/leads/[id]         — delete lead + transcript + consent log entries for that lead
GET    /api/leads/stats        — summary stats
GET    /api/transcripts        — list anonymous transcripts (no lead attached)
```

All /api/leads/* and /api/transcripts routes require valid session cookie. Return 401 if not authenticated.

### Dashboard design:

- Clean, minimal, functional. No need for a design system.
- Mobile-responsive (Anna might check leads from her phone)
- Use the Soul Waves brand colors if easy (Clay #A26737, Warm-White #F9F2ED) but functionality over aesthetics here

---

## PART 6: GDPR COMPLIANCE FEATURES

### 6a. Data Retention & Auto-Delete

Build a scheduled job or a cleanup function that runs on each dashboard login:

- Delete leads older than 6 months where status is NOT 'converted'
- Delete anonymous chat transcripts older than 3 months
- Delete expired auth_tokens older than 24 hours
- NEVER delete consent_log entries (these are your legal audit trail)

Log deletions: "Auto-deleted X leads and Y transcripts older than retention period on [date]"

### 6b. Manual Deletion (Right to Erasure)

When Anna deletes a lead from the dashboard:
- Delete the lead record from `leads`
- Delete associated `chat_transcripts` (CASCADE handles this)
- Add entry to `consent_log`: consent_type='data_deletion', text="Lead data deleted at admin request"
- NEVER delete the consent_log entries for that session (audit trail must persist)

### 6c. Data Subject Access Request

If someone emails anna@soulwavesva.com asking "what data do you have on me?":
- Anna searches by email in the dashboard
- Exports/copies the lead record and chat transcript
- Sends it to the requester
- (No need to automate this at Anna's scale. Manual is fine.)

### 6d. Privacy Policy Page

Create a `/datenschutz` page (or update existing) that includes:

- Who collects data: Soul Waves Solutions LLC, anna@soulwavesva.com
- What Frieda collects: name (if shared), email (if shared), chat messages, hashed IP address, browser info
- Why: to answer questions and follow up on service inquiries
- Legal basis: consent (GDPR Art. 6(1)(a)), given before chat starts
- AI disclosure: Frieda is an AI chatbot powered by OpenAI. Chat messages are sent to OpenAI's API for processing. OpenAI's data processing terms apply.
- Data retention: lead data stored for max 6 months, then auto-deleted. Consent records kept indefinitely for legal compliance.
- Your rights: access, correction, deletion, withdrawal of consent. Contact anna@soulwavesva.com.
- Data processor: OpenAI (API), Neon (database hosting), Vercel (website hosting), Resend (email)
- International transfers: Data may be processed in the US (OpenAI, Vercel, Neon). Transfers are covered by Standard Contractual Clauses where applicable.
- No data is sold or shared with third parties for marketing.
- No automated decisions are made based on chat data.

This page should exist in both German and English. Use the site's existing language detection.

---

## PART 7: SECURITY CHECKLIST

Before deploying, verify:

- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in source code (grep for API keys, passwords, connection strings)
- [ ] All API routes under /api/leads/* check for valid session cookie
- [ ] Magic link tokens are single-use and expire after 15 minutes
- [ ] Session cookies are httpOnly, secure, sameSite
- [ ] Rate limiting on /api/auth/login (max 5 per email per hour)
- [ ] IP addresses are hashed (SHA-256) before storage, never stored raw
- [ ] OpenAI API key is only used server-side, never exposed to client
- [ ] Database queries use parameterized queries (no string concatenation for SQL)
- [ ] CORS headers are restrictive (only soulwavesva.com)
- [ ] Error messages don't leak internal details (no stack traces in production)
- [ ] The login page doesn't reveal whether an email is registered
- [ ] Auto-deletion of old data is working
- [ ] Consent log entries are never deleted
- [ ] Production environment variables are set in Vercel (not just local)

---

## PART 8: DEPLOYMENT

1. Test locally first (`npm run dev`, test all flows)
2. Test the magic link flow: does the email arrive? Does the token work? Does the session persist?
3. Test Frieda: does consent show? Does lead capture work? Does the notification email send?
4. Test the dashboard: can you see leads? Update status? Delete? Does auto-cleanup work?
5. Deploy to Vercel: `vercel --prod` or push to the production branch
6. Verify all env variables are set in Vercel
7. Test the live site end-to-end

---

## WHAT CLAUDE CODE SHOULD ASK ANNA FOR

When building this, Claude Code will need to know:

1. **Check existing .env.local**: "Can you confirm you have DATABASE_URL, RESEND_API_KEY, and OPENAI_API_KEY in your .env.local? I need to know what's already there before adding new variables."

2. **Existing database tables**: "I'm going to check your Neon database for existing tables. Can you confirm your DATABASE_URL is correct?"

3. **Existing Frieda implementation**: "Show me the current Frieda chat widget code so I know what to modify. Where is it in the project? (e.g., components/Frieda.tsx or similar)"

4. **Existing page structure**: "What pages already exist? Is there already a /datenschutz or /privacy page?"

5. **Generate and set secrets**: "I'm generating secure keys for you. I'll show you the values once. Add them to .env.local immediately, then we'll set them in Vercel."

6. **Resend sender email**: "What email address does Resend send from? (e.g., noreply@soulwavesva.com or anna@soulwavesva.com)"

7. **Calendar link for CTAs**: "What's your Google Calendar booking link? I need it for the chat limit message."

The calendar link is: calendar.app.google/WKhMs5XL1DeaccdK6
The admin email is: anna@soulwavesva.com

---

## SUMMARY OF WHAT GETS BUILT

| Component | What | Route |
|-----------|------|-------|
| Consent widget | GDPR notice before Frieda chat starts | (chat widget overlay) |
| Lead capture | Saves name/email/transcript to Neon | /api/chat (existing, updated) |
| Lead notification | Emails Anna when new lead comes in | (server-side, via Resend) |
| Dashboard login | Magic link auth via email | /dashboard/login |
| Dashboard main | Leads table, stats, search, notes | /dashboard |
| Lead management | View, update status, add notes, delete | /dashboard + /api/leads/* |
| Privacy policy | GDPR-compliant data disclosure page | /datenschutz |
| Auto-cleanup | Delete old leads and transcripts | (runs on dashboard load) |
| Consent audit log | Immutable record of all consent events | consent_log table |

---

*This document is the complete specification. Claude Code should be able to build everything from this. If anything is ambiguous, ask Anna, don't guess.*
