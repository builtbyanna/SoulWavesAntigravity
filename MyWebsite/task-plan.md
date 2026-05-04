# Soul Waves Website — Task Plan
_Last updated: 2026-05-02_

---

## Phase 0: Project Setup
**Goal:** File structure, fonts, assets, global CSS tokens in place before a single line of UI is written.

- [ ] Create folder structure: `/fonts/`, `/assets/midjourney/`, `/assets/photos/`, `/css/`, `/js/`, `/de/`
- [ ] Download and self-host all 3 fonts (Great Vibes 400, Tsukimi Rounded 400/500, Courier Prime 400)
- [ ] Write global CSS with all 5 brand color variables and @font-face declarations
- [ ] Confirm all photos present: me_coconut.JPG, me_beach.JPG, me_prisonguard.jpeg, me_lighthouse.jpeg
- [ ] Confirm Midjourney assets present in /assets/midjourney/
- [ ] Set up base HTML shell with hreflang tags, meta, charset, viewport

---

## Phase 1: Homepage
**Goal:** All 8 sections complete, EN version, animations wired.

- [ ] Nav: logo left, links center, EN|DE switcher + "Book a call" button right
- [ ] Hero: headline + subheadline + CTA + me_coconut.JPG + Spline 3D background
- [ ] "What I Build": 4 service category cards with Midjourney visuals
- [ ] "Who I Help": Coaches, course creators, Shopify — pain points framing
- [ ] Cinematic break: me_beach.JPG full-width, 20% copper overlay, powerful line
- [ ] Testimonials: 3 cards, staggered layout, real names/roles
- [ ] CTA section: one headline, one button
- [ ] Footer: logo, links, social, Impressum/Datenschutz, copyright

**Animations checklist:**
- [ ] Hero headline fade-up 0.6s on load
- [ ] Hero CTA fade-in 0.3s after headline
- [ ] me_coconut.JPG parallax downward on scroll
- [ ] "What I Build" cards stagger fade-up (0.1s between each)
- [ ] me_beach.JPG parallax zoom-out on scroll
- [ ] Testimonials slide in from sides
- [ ] All CTAs: scale 1.02 + copper glow on hover

---

## Phase 2: Services Page
**Goal:** Clear, honest service presentation with Frieda CTA wired.

- [ ] Page header: "What I Build" in Great Vibes, short intro
- [ ] 4 service cards: websites, platforms, Shopify, chatbots+automations
  - Each: visual, title, 3-bullet what's included, price range, CTA
- [ ] Retainer section: Tech VA retainer, distinct visual treatment
- [ ] Pricing note: honest line about third-party costs
- [ ] CTA: "Not sure what you need? Ask Frieda." + book a call secondary

---

## Phase 3: About Page
**Goal:** Anna's story told with honesty and contrast — the contrast IS the brand.

- [ ] Opening hook: "I used to work in a prison."
- [ ] Before section: timeline + me_prisonguard.jpeg desaturated, caption "Before all of this."
- [ ] The pivot: HTML/CSS clicked six months before leaving
- [ ] Now section: Lombok, café mornings + me_lighthouse.jpeg warm/golden
- [ ] What this means for you: skills connect to work
- [ ] Testimonials: S.R. quote here (strongest for positioning)
- [ ] CTA: "If this sounds like what you need, let's talk." + book a call

**Animations checklist:**
- [ ] About timeline: each beat fades in sequentially on scroll
- [ ] me_prisonguard.jpeg: desaturation-to-color reveal on scroll
- [ ] me_lighthouse.jpeg: warm copper overlay 12%

---

## Phase 4: Contact Page
**Goal:** Booking is one click away. No friction.

- [ ] Simple header
- [ ] Primary: Book a discovery call (copper button, calendar link)
- [ ] Simple form: name, email, business type, how they found you
- [ ] Tertiary: email + WhatsApp + social links
- [ ] Note: "By booking, you agree to Google Calendar's privacy policy."

---

## Phase 5: Frieda Chatbot
**Goal:** Floating widget, always visible, responds in visitor language.

- [ ] Floating bottom-right widget, expands on click
- [ ] Courier Prime font (widget only)
- [ ] Colors: --sw-cream bg, --sw-sand border, --sw-brown text
- [ ] Trigger text: "Not sure what you need? Ask Frieda. ✨"
- [ ] OpenAI integration wired
- [ ] EN + DE language detection and response
- [ ] German: formal "Sie", warm, lightly playful

---

## Phase 6: German (DE) Translation
**Goal:** Full site bilingual. /de/ routes or JS toggle.

- [ ] All pages translated (no literal idiom translation)
- [ ] German: formal "Sie" tone throughout
- [ ] hreflang tags verified on every page
- [ ] EN|DE switcher functional in nav
- [ ] Frieda responds in German when visitor is in DE mode

---

## Phase 7: QA and Polish
**Goal:** Nothing ships that breaks the constitution.

- [ ] Font weight audit: no Tsukimi 600+ anywhere
- [ ] Em dash audit: zero em dashes in any language
- [ ] Forbidden words audit: game-changing, unlock, next level, level up, limited spots, journey, empower
- [ ] Color audit: no pure black (#000000), no dark mode, no grey backgrounds
- [ ] Booking link audit: max 1 click from any CTA
- [ ] DSGVO: all fonts self-hosted, Google Fonts CDN never called
- [ ] Mobile responsive test on all pages
- [ ] Cross-browser test (Chrome, Safari, Firefox)
- [ ] Performance: images optimized, lazy loading wired
- [ ] hreflang tags present on every page
- [ ] ✨ emoji present in both languages, never removed
