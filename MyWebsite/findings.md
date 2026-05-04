# Soul Waves Website — Findings & Research Notes
_Last updated: 2026-05-02_

---

## Project Identity
- Client: Anna Schuster
- Business: Soul Waves Solutions LLC (Wyoming, USA)
- Anna is Austrian, currently traveling (no fixed location — never location-specific)
- Background: trained kindergarten teacher (vocational school + internships, never practiced), bakery worker, improv actor (escape room, small role), prison guard (5 years), now digital builder
- Unconventional path is interesting context, but focus is what she builds NOW — not where she came from.

---

## OVERRIDES FROM ANNA (2026-05-02)
These corrections supersede CLAUDE.md where they conflict:
1. NOT location-based. She is traveling. Never mention Lombok, Indonesia, or any specific location.
2. Escape room: small improv acting role, NOT a manager. Mention lightly if at all.
3. Prison work: part of the story, but NOT the dominant positioning hook. Proportionate, not leading.
4. COLOR SYSTEM IS NOT LOCKED. Open to full redesign based on competitive research.
5. FONTS ARE NOT LOCKED. Open to change based on competitive research.
6. ALL design and copy decisions should be informed by the competitor analysis (in progress with another agent).
7. Wait for competitor analysis report before finalizing any design direction.

---

## Brand Constraints (Starting Point — Subject to Revision After Competitor Research)

### Colors (exact hex values — no substitutes)
| Token | Hex | Use |
|---|---|---|
| --sw-brown | #44140D | Body text, nav, footer, headings. Never #000000 |
| --sw-cream | #FFF8EC | ALL backgrounds. Never dark. Never grey |
| --sw-red | #8C1C13 | Links, decorative lines, logo accent, hover shift |
| --sw-copper | #C5783C | CTAs, hovers, pricing, key accents. The golden element |
| --sw-sand | #E6CCB2 | Borders, dividers, subtle bg, section alternation |

### Fonts (self-hosted — DSGVO requirement)
| Font | Weight | Use |
|---|---|---|
| Great Vibes | 400 | Decorative headings + "Soul Waves" name only. Max 3 words |
| Tsukimi Rounded | 400, 500 | ALL body text and subheadings. HARD CAP: weight 500. Never bold |
| Courier Prime | 400 | Frieda chatbot widget ONLY. Never elsewhere |

### Absolute Prohibitions
- No dark mode, no grey backgrounds, no #000000
- No em dashes anywhere (EN or DE)
- Tsukimi Rounded never bold, never weight 600+
- Never "Soul Waves VA" (it's "Soul Waves" or "Soul Waves Solutions")
- Forbidden words: game-changing, unlock, next level, level up, limited spots, journey, empower
- No fake urgency, no countdown timers, no "only 3 spots left"
- No old package names: Namaste, Glow, Elevate
- No Google Fonts CDN (DSGVO: must be self-hosted)
- Site must never look like a generic VA template

---

## Technical Architecture Decisions

### Language Strategy
- English at / (primary)
- German at /de/ (secondary) or JS toggle
- EN|DE switcher: top-right nav, manual only, no auto-detect
- hreflang tags required on every page
- German: formal "Sie" tone, warm, never stiff

### Animations
All wired with IntersectionObserver + CSS transitions (no heavy libraries required unless specified):
- Hero headline: fade-up on load, 0.6s ease
- Hero CTA: fade-in 0.3s after headline
- me_coconut.JPG: parallax downward on scroll
- Service cards: stagger fade-up, 0.1s delay between each
- me_beach.JPG: parallax zoom-out on scroll
- About timeline: sequential fade-in on scroll
- me_prisonguard.jpeg: desaturation-to-color reveal on scroll
- Testimonials: slide in from sides on scroll
- All CTAs: scale(1.02) + box-shadow: 0 0 20px rgba(197,120,60,0.4) on hover

### Spline 3D
- Used in Hero section as depth background
- Must not obstruct headline or CTA
- Loaded async, never blocking

---

## Photo Assets
| File | Page | Treatment |
|---|---|---|
| me_coconut.JPG | Homepage hero, right side | --sw-copper 8% overlay, clip-path/rounded container, parallax on scroll |
| me_beach.JPG | Homepage cinematic break | Full-width, --sw-copper 20% overlay, Tsukimi 500 text over it |
| me_prisonguard.jpeg | About "Before" section | Desaturated/cool tone, caption: "Before all of this." |
| me_lighthouse.jpeg | About "Now" section | Full warmth, --sw-copper 12% overlay, golden hour |

All photos: editorial quality. CSS clip-path / vignette / box-shadow. Magazine spread feel. Never stock-photo grid.

---

## Frieda Chatbot
- Model: OpenAI
- Font: Courier Prime (widget only)
- Widget colors: --sw-cream bg, --sw-sand border, --sw-brown text
- Position: floating bottom-right, always visible, expands on click
- Trigger text: "Not sure what you need? Ask Frieda. ✨"
- Purpose: FAQ, lead qualification, route to booking
- Responds in visitor's language (EN or DE)
- German: formal "Sie", warm, lightly playful

---

## CTA Hierarchy
1. Primary: Book a free discovery call — calendar.app.google/WKhMs5XL1DeaccdK6
2. Secondary: Talk to Frieda (always visible floating widget)
3. Tertiary: anna@soulwavesva.com

Booking must never be more than 1 click away from any CTA on the site.

---

## Assets to Confirm Exist Before Building
- [ ] /assets/photos/me_coconut.JPG
- [ ] /assets/photos/me_beach.JPG
- [ ] /assets/photos/me_prisonguard.jpeg
- [ ] /assets/photos/me_lighthouse.jpeg
- [ ] /assets/midjourney/ (Midjourney assets for service cards and accents)
- [ ] /fonts/GreatVibes-Regular.ttf (or .woff2)
- [ ] /fonts/TsukimiRounded-Regular.ttf
- [ ] /fonts/TsukimiRounded-Medium.ttf
- [ ] /fonts/CourierPrime-Regular.ttf

---

## Competitor Research Conclusions (2026-05-02)

### What the research validates (keep from CLAUDE.md)
- Color system (copper/cream/brown) is already MORE sophisticated than every competitor in the set. Do not change it.
- Font pairing (Great Vibes + Tsukimi Rounded) is already differentiating. Keep it.
- No fake urgency, no dark patterns — this is rare and noted as an advantage.
- Bilingual EN/DE is a genuine blue-ocean: zero competitors serve the DACH market.
- Frieda chatbot: no competitor has anything like it. Real differentiator.

### What must change vs. CLAUDE.md
1. Hero must lead with the story hook, not services. Suggested: "I used to work in a prison. Now I build the digital back-end of your business."
2. "What I Build" section needs real portfolio screenshots, not icons + descriptions.
3. Offer architecture: retainer as primary offer (Charlotte Goss model, elevated by broader Anna scope).
4. Testimonials must include outcome specifics ("built X in Y days", "launched converting at Z%"). Generic praise is not enough.
5. CTA voice needs to sound like Anna, not like a corporate booking system.
6. Studio framing: lean into "Soul Waves" as a brand/studio, not just Anna the freelancer.

### Build priority order (from research)
1. Hero: story hook leads
2. Portfolio: 3-5 real examples with screenshots
3. Primary offer: retainer-first framing, with confidence
4. DE version: DACH market targeting
5. Testimonials: outcome-specific quotes
6. Every interaction as craft signal — the site IS the portfolio

---

## Services and Pricing

### Retainer (Primary Recurring Offer)
| Tier | Price | Scope | Min |
|---|---|---|---|
| Light | €200/month | Up to 3 back-end tasks/month | 3 months |
| Core | €300/month | Up to 6 tasks/month, priority | 3 months |

NEVER includes: inbox, calendar, admin, community management, strategy, content creation, new features (those are project work).
Video editing / Canva assets available as monthly add-on, price by arrangement.

### Websites
| Type | Price | Notes |
|---|---|---|
| Handwerker (DACH trades) | €800-1,000 | Fixed scope, co-written copy, SEO, legal pages. Separate from main Soul Waves site. |
| Custom website (coaches/consultants) | from €1,000 | Claude Code built, Vercel/Netlify. Scope locked before build. |

Client pays directly: hosting (~€5-15/month), domain (~€10-15/year), IT-Recht Kanzlei (from €5.90/month).

### Course and Membership Platforms
| Type | Price |
|---|---|
| WordPress: course/membership added to existing site | €1,500-2,500 |
| WordPress: full site + course/membership from scratch | €3,000-4,500 |
| No-code platform setup (Systeme.io, Podia, Thinkific) | €500-800 |
| Kajabi setup (test client rate, honest positioning) | €800-1,200 |

WordPress includes: SureCart + SureMembers, course/video library, checkout, login, automatic emails, client docs.
Optional client-paid: Amelia Pro ~€99/year, Bunny.net ~€9/month, Elementor Pro ~€59/year.
Kajabi client pays: from €143/month (annual) to €499/month (Pro).

### Shopify
| Type | Price |
|---|---|
| Standard setup (theme + products + checkout + 3 apps) | €800-1,500 |
| High-conversion (custom Liquid, AI quizzes, upsells) | €3,000-18,000 (in development) |

Client pays: Shopify from €29/month.
German Digitalförderung: up to €10,000 subsidy for AI/digital projects. €15,000 build = ~€5,000 for client.
High-conversion tier is in development through coaching program. Offer once confident. Position honestly.

### Add-ons and Standalone
| Service | Price |
|---|---|
| AI chatbot (standalone integration) | €500-800 |
| AI chatbot (add-on to new build) | within project scope |
| Hosting/maintenance (post-build, not retainer) | €50-100/month |
| Video editing | €35/hour, estimate given before each job |
| Canva visuals | by scope, on request |

### NOT Currently Offering
Standalone funnel builds, WordPress LMS (paid), standalone complex automations, social media management, community management, copywriting, inbox/calendar/admin.

### Pricing Philosophy
Scope locked before build starts. No open-ended retainers, no "can you just also." The Anja project (50+ hours delivered for €60) proved undefined scope destroys the business. Clean deliverable list every time.

---

## Portfolio Reality (2026-05-02)

### What exists
- **Anja Bodenstein (real, linkable):** WordPress yoga site. Built: membership page, online yoga page, packages page, login, dashboard, video pages. URLs: anja-bodenstein.de/mitgliedschaft/, anja-bodenstein.de/online-yoga/, anja-bodenstein.de/pakete/
- **Elektrofuzzy (practice project):** https://elektrofuzzy.vercel.app/ — no branding, no domain, honest practice project. Can show with context.
- **Soul Waves own site:** This IS the primary portfolio piece. Must be the best thing Anna has built.
- **New client website:** coming in ~3 months. Add when done.
- **Tour guide website (Lombok):** Anna will build it after her own site. Add to portfolio later. No placeholder needed.

### Strategy for competing with a thin portfolio
1. The Soul Waves site itself is the proof of craft. Make it exceptional.
2. Show the Anja Bodenstein pages as real, linked portfolio work with honest framing.
3. Be transparent about Kajabi being a first-client offer — Charlotte Goss model: "carefully built result, I get the experience."
4. Process screenshots / build-in-public LinkedIn content substitutes for finished pieces.
5. Testimonials carry more weight when portfolio is thin — use S.R. prominently.
6. Add tour guide site to portfolio once built, no rush.

---

## Testimonials (Confirmed)

**A.B., Yoga and Pilates teacher** — Best for homepage or services page
"Anna's support as a virtual assistant is incredibly valuable. Especially as a solo business owner, being able to hand off tasks I don't enjoy and that take a lot of time makes a huge difference. Anna really understands me and works in a structured and efficient way. I can highly recommend her."

**S.R., Leadership / Operations** — Strongest. Best for About page or retainer section.
"Anna operates at a level well above a typical VA. She communicates clearly and early when bottlenecks arise, takes ownership of problems, and stays persistent until they're resolved. Beyond her reliability and judgment, she's genuinely pleasant to work with, which makes a meaningful difference at the leadership level. She's a true asset to any organization."

**B.E., Founder of Empowermind Academy** — Best for website builds section.
"Anna supported me very competently with my online visibility and client acquisition. She fully took over my LinkedIn presence and built it strategically, resulting in a profile that is clear, professional, and aligned with my positioning. I especially value her structured way of working, her strategic thinking, and her strong intuition for brand, target audience, and communication. Working with Anna is reliable, pleasant, and very collaborative. She brings in her own ideas, works solution-oriented, and quickly understands what truly matters."

Note: No outcome metrics (numbers, timelines, conversion rates) available. Lean on specificity of the quote language instead.
Eileen testimonial: still outstanding.

---

## Story / About Page Direction (confirmed by Anna)
- Prison guard mention: included, but NOT the dominant hook. Keep proportionate.
- Comfort level with prison line as hero: "not too much." Do not open the homepage with it.
- Story is context, not the headline. The work is the headline.

---

## Open Questions
- What Spline scene URL or embed code to use for hero background?
- Are all Midjourney service card visuals ready? Which file maps to which service?
- What 3 testimonials are approved for homepage? Real names/roles/quotes needed.
- S.R. testimonial for About page: full quote needed.
- OpenAI API key and Frieda system prompt needed for chatbot integration.
- Social media handles/URLs for footer icons?
- What services are live vs. coming soon? Price ranges confirmed?
