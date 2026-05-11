# Soul Waves Website — Project Constitution

## Identity
This is the official website for Soul Waves, Anna Schuster's digital product building business.
Anna is Austrian, currently based in Senggigi, Lombok, Indonesia. Former prison guard (5 years),
escape room manager, bakery worker, pedagogy student. Now builds websites, Shopify stores,
course platforms, AI chatbots, and automations for coaches, consultants, and course creators.
The contrast between the background and the current work IS the brand.

## Business
- One-liner: "I build and run the digital back-end of your business."
- Business entity: Soul Waves Solutions LLC (Wyoming, USA)
- Email: anna@soulwavesva.com
- Booking link: calendar.app.google/WKhMs5XL1DeaccdK6
- Domain: soulwavesva.com
- Chatbot name: Frieda (OpenAI, built into this site)
- WhatsApp: +436603019415

## Brand Colors (use ONLY these)
- --sw-brown: #44140D (body text, nav, footer, headings — never pure black)
- --sw-cream: #FFF8EC (ALL backgrounds — NEVER dark mode)
- --sw-red: #8C1C13 (links, decorative lines, logo accent, hover deepening)
- --sw-copper: #C5783C (CTAs, hovers, pricing, key accents — THE golden element, use prominently)
- --sw-sand: #E6CCB2 (borders, dividers, subtle backgrounds, section alternation)

## Brand Fonts (use ONLY these — self-hosted via @font-face, NOT Google CDN)
- Great Vibes 400: decorative section headings and "Soul Waves" brand name only. Max 3 words per use.
- Zodiak (variable, 300–700): hero h1 and large display headings only. Download from fontshare.com, self-host in /fonts/. CSS variable: --font-display.
- Tsukimi Rounded 400/500: ALL body text and regular subheadings. NEVER bold. NEVER weight 600+. Hard rule.
- Courier Prime 400: Frieda chatbot widget ONLY. Never anywhere else.

## Global Rules — NEVER break these
- Background is ALWAYS --sw-cream or white. Never dark mode. Never grey.
- Tsukimi Rounded max weight is 500. Nothing on the site should feel heavy or shouty.
- NEVER use em dashes (—) anywhere. Use commas, colons, periods, or restructure the sentence.
- CTA buttons: --sw-copper background, --sw-cream text, border-radius 6-8px.
- Hover: darken --sw-copper slightly or shift toward --sw-red.
- Body text: --sw-brown (#44140D). Never #000000.
- Forbidden words: game-changing, unlock, next level, level up, limited spots, journey, empower, humbled, excited to announce, passionate (as marketing), innovative, synergy.
- No fake urgency. No countdown timers. No "only 3 spots left."
- No emojis in page copy or nav. The Frieda chatbot trigger keeps the ✨. No other emoji anywhere on the website.
- Google Fonts must be self-hosted. Download all fonts, place in /fonts/, use @font-face. No CDN calls ever.

## Language
This site is bilingual: English (primary) and German (secondary).
URL structure: English at /, German at /de/ (or JS toggle).
Language switcher: top-right of nav, EN | DE. Manual choice, no auto-detect.
German uses informal "du" tone — warm, direct, like talking to a smart friend. Never stiff or corporate.
Never translate idioms literally — adapt them.
hreflang tags required on every page.
Em dashes banned in both languages.

## Site Structure — One-Pager

The site is a single scrollable index.html with anchor sections. No multi-page routing for the main site. German /de/ version mirrors the same one-pager structure.

Nav: [Logo — links to #hero]  |  What I Build  |  Process  |  About  |  Contact  |  EN|DE  |  [Book a call]

### Sections (in order, all on index.html):
1. #hero — headline (Zodiak display), subline, primary CTA, me_coconut.JPG right side, Ken Burns background
2. #what-i-build — 4 service cards (glass style), pain-point framing, Midjourney visuals, price range, CTA per card
3. #process — 3 steps: "Reach out / We talk / You get your back-end handled." Shimmer vertical connectors between steps.
4. #about — "I used to work in a prison." Opening. Prison/pivot story as proof of why you'd trust her, not biography. me_prisonguard.jpeg (full, desaturated). me_lighthouse2.jpeg (warm). Testimonial pull-quote.
5. #work — Portfolio strip: 3 project cards (glass style), client type, tools, one outcome line
6. #contact — Form (Name, Email, "What are you working on?", "How did you find me?") + booking CTA + anna@soulwavesva.com + WhatsApp
Footer — Logo, anchor nav, social icons, legal links (Impressum / Datenschutz), copyright

### Copy direction
- Client pain first in every section — open with the reader's experience, not Anna's offer
- About section answers "why trust her?" not "isn't Anna interesting?"
- Services = what the client gets, not what Anna does
- No "I'm so excited to..." anywhere
- "Built Properly. Kept Running." — use as tagline or closing line

## Photos — Exact Placement and Treatment
- me_coconut.JPG: Hero section, right side. Full image, no clip-path distortion. Clean rounded container (border-radius: 16px). Copper overlay 8%. Parallax on scroll.
- me_prisonguard.jpeg: About section, "Before" part. Full image, no clip-path. CSS filter: grayscale(70%). Caption: "Before all of this." Reveals to color on scroll.
- me_lighthouse2.jpeg: About section, "Now" part. Full warmth, --sw-copper overlay 12%. Beside copy or offset layout.
- me_beach.JPG: Currently shows mostly sky. Use object-position: center 75% to show her lower in the frame, OR replace with a "feet on beach" photo if Anna provides one.
All photos: full images, no warping, no odd shapes. Clean containers. Editorial quality. No stock-photo grid.

## Midjourney Assets (in /assets/midjourney/)
Use as backgrounds, section accents, service card visuals, decorative overlays.
Never as primary content or replacing real Anna photos.
Always warm tones consistent with --sw-cream / --sw-copper palette.
Use behind text with appropriate opacity overlays for readability.

## Scroll Animations — These Specific Moments
- Hero headline: fade up on load, 0.6s ease
- Hero CTA button: fade in 0.3s after headline
- me_coconut.JPG: subtle parallax downward on scroll
- "What I Build" cards: stagger fade-up as they enter viewport (0.1s delay between each)
- me_beach.JPG section: parallax zoom-out as user scrolls past
- About timeline: each beat fades in sequentially as user scrolls
- me_prisonguard.jpeg: fade in with slight desaturation-to-color reveal on scroll (before → after)
- Testimonials: slide in from sides as they enter viewport
- All CTAs: subtle scale 1.02 on hover with copper glow (box-shadow: 0 0 20px rgba(197,120,60,0.4))

## CTA Hierarchy
1. Primary: Book a free discovery call → calendar.app.google/WKhMs5XL1DeaccdK6
2. Secondary: Talk to Frieda (floating chatbot, bottom-right, always visible)
3. Tertiary: Email anna@soulwavesva.com

## Frieda Chatbot Specs
- Model: OpenAI
- Font: Courier Prime (widget only)
- Position: floating bottom-right, always visible, expands on click
- Widget colors: --sw-cream background, --sw-sand border, --sw-brown text
- Trigger text: "Not sure what you need? Ask Frieda. ✨"
- Personality: warm, helpful, lightly playful, not pushy
- Purpose: answer FAQs, qualify leads, route to booking
- Responds in the visitor's language (EN or DE)
- German tone: informal "du", warm, lightly playful

## Services & Pricing Reference (for copy accuracy)

### What Anna builds
- **Websites**: Vibe-coded (React/HTML on Vercel, faster + cleaner) OR WordPress + Elementor Pro (if client needs to self-edit). From €800.
- **Booking systems**: Momoyoga for yoga/fitness classes (recurring memberships need Plus plan, €59-79/mo). Cal.com for individual appointment booking (free or €12/mo).
- **Course/membership platforms**: SureCart + SureMembers on WordPress for full control. elopage/ablefy for DACH market. Kajabi for all-in-one (from €143/mo, needs Digistore24 for DACH). From €500 (small) to €4,500 (full site + platform).
- **Shopify stores**: Standard theme setup from €800. Premium high-conversion (custom Liquid, AI quizzes, upsell flows) from €3,000, by inquiry.
- **AI chatbot + automations**: Standalone from €500. Built on OpenAI API.
- **Video editing**: DaVinci Resolve, €35/hr.

### Retainers
- Light: €200/mo, up to 3 back-end tasks, 3-month minimum
- Core: €300/mo, up to 6 tasks, priority, 3-month minimum
- Never includes: inbox, calendar, community management, content creation, strategy

### Third-party costs (client pays directly — mention honestly)
- Kajabi: from €143/mo
- Shopify: from €29/mo
- Momoyoga Plus: €59-79/mo
- Bunny.net (video hosting): ~€9/mo
- Domain: ~€12/yr
- Hosting (WP): €5-15/mo

### Build tool (internal, not for client copy)
Claude Code via VS Code, sometimes Kiro for spec/planning.

## What This Site Must NOT Do
- Show old package names: Namaste, Glow, Elevate — never
- Use "Soul Waves VA" — it's "Soul Waves" or "Soul Waves Solutions"
- Lead with spiritual language before establishing what the business does
- Hide the booking link behind more than one click
- Look like a template any VA could have
- Use bold Tsukimi Rounded anywhere
- Load Google Fonts from CDN (must be self-hosted for DSGVO)
