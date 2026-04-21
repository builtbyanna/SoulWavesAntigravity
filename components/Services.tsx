'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

// ── TYPE ─────────────────────────────────────────────────────────
interface ServiceCard {
  id: string
  tag: string
  headline: string
  body: React.ReactNode
  price: string
  cta: string
  ctaHref: string
}

// ── ENGLISH CARDS ────────────────────────────────────────────────
const cardsEn: ServiceCard[] = [
  {
    id: 'retainer',
    tag: 'Monthly, minimum 2 months',
    headline: 'Digital Operations Retainer',
    body: (
      <>
        The ongoing technical layer of your business. Website maintenance and updates, platform
        management, automations, AI chatbot upkeep, video editing, visual assets, small tech
        fixes. Fixed scope, fixed monthly fee. You focus on your clients.
      </>
    ),
    price: 'From €100/month, scoped to what you actually need.',
    cta: "Let\u2019s figure out your scope",
    ctaHref: '#contact',
  },
  {
    id: 'course',
    tag: 'One-time build or ongoing retainer',
    headline: 'Course Platform Setup',
    body: (
      <>
        You have the knowledge. Getting it structured, hosted, and ready to sell is where most
        people stall. I handle the technical side: course structure, membership area, landing page,
        payment integration, automations, and video editing for your content.
        <br /><br />
        Available as a one-time build or an ongoing retainer where I upload new videos, keep the
        platform running, and make updates as your content grows.
        <br /><br />
        Early Kajabi projects, taking now: from €1,500.
        Full platform builds on Kajabi or WordPress: priced on request after a scoping conversation.
        Ongoing platform retainer: from €100/month.
      </>
    ),
    price: 'Early Kajabi projects, taking now: from €1,500.',
    cta: 'Tell me about your course',
    ctaHref: '#contact',
  },
  {
    id: 'video',
    tag: 'Standalone or part of a retainer',
    headline: 'Video Editing',
    body: (
      <>
        Course videos, social clips, basic content repurposing. Edited in DaVinci Resolve.
        Functional, clear, no unnecessary effects. Available as a one-off project or as part of an
        ongoing retainer if you&apos;re releasing content regularly.
      </>
    ),
    price: 'Per video or monthly, on request.',
    cta: 'Send me your footage',
    ctaHref: '#contact',
  },
  {
    id: 'website',
    tag: 'One-time project',
    headline: 'Website Build',
    body: (
      <>
        Clean, fast, professional. Built for trades businesses, coaches, consultants, and online
        businesses who need a proper web presence. You provide the information, I handle design,
        AI-assisted copy, SEO basics, and mobile optimization. AI chatbot available as an add-on.
      </>
    ),
    price: 'From €900, depending on scope and complexity.',
    cta: 'Tell me about your business',
    ctaHref: '#contact',
  },
  {
    id: 'chatbot',
    tag: 'Add-on or standalone',
    headline: 'AI Chatbot',
    body: (
      <>
        An FAQ and lead capture bot built into your website. Handles common questions, qualifies
        leads, captures contact details without you needing to be online. Can be added to a new
        website build or an existing site.
      </>
    ),
    price: 'On request.',
    cta: 'Learn more',
    ctaHref: '#contact',
  },
  {
    id: 'visuals',
    tag: 'Canva and Lightroom',
    headline: 'Visual Assets',
    body: (
      <>
        Workbooks, slide decks, social media templates, product visuals, moodboards. Canva for
        design, Lightroom for photo editing. Available standalone or as part of a larger project
        or retainer.
        <br /><br />
        Social media template set (10 posts, branded): from €150.
        Workbook or PDF guide (up to 20 pages): from €200.
        Slide deck (up to 15 slides): from €180.
        Larger or ongoing requests: on request.
      </>
    ),
    price: 'Social media templates from €150, workbooks from €200, slide decks from €180.',
    cta: 'Show me what you need',
    ctaHref: '#contact',
  },
]

// ── GERMAN CARDS ─────────────────────────────────────────────────
const cardsDe: ServiceCard[] = [
  {
    id: 'retainer',
    tag: 'Monatlich, ab 2 Monaten',
    headline: 'Dein Tech-Support, verlässlich Monat für Monat.',
    body: (
      <>
        Ich kümmere mich laufend um die Technik deines Business. Website-Updates, Tool-Management,
        Automatisierungen, Videobearbeitung oder kleine Tech-Probleme. Fester Rahmen, fester
        Preis – und du hast den Kopf frei für deine Kunden.
      </>
    ),
    price: 'Ab €100/Monat, genau auf dich zugeschnitten.',
    cta: 'Lass uns deinen Bedarf besprechen',
    ctaHref: '#contact',
  },
  {
    id: 'course',
    tag: 'Einmalig oder als Begleitung',
    headline: 'Dein Kurs – raus aus dem Kopf, rauf auf die Plattform.',
    body: (
      <>
        Du hast das Wissen, aber die Technik bremst dich aus? Ich übernehme den Aufbau:
        Kursstruktur, Mitgliederbereich, Landingpage und Zahlungsanbindung. Und wenn du magst,
        schneide ich auch direkt deine Videos.
        <br /><br />
        Frühe Kajabi-Projekte: ab €1.500.
        Vollständiger Experten-Plattform-Bau: auf Anfrage.
        Plattform-Betreuung (Uploads & Support): ab €100/Monat.
      </>
    ),
    price: 'Kajabi-Setup ab €1.500. Betreuung ab €100/Monat.',
    cta: 'Erzähl mir von deinem Kurs',
    ctaHref: '#contact',
  },
  {
    id: 'video',
    tag: 'Einzeln oder im Paket',
    headline: 'Klarer Videoschnitt ohne überzogenen Agentur-Look.',
    body: (
      <>
        Egal ob für deinen Kurs oder Social Media: Ich schneide deine Videos so, dass sie
        natürlich, professionell und klar wirken. Ohne unnötige Effekte (in DaVinci Resolve).
      </>
    ),
    price: 'Pro Video oder monatlich, ganz wie es passt.',
    cta: 'Schick mir dein Material',
    ctaHref: '#contact',
  },
  {
    id: 'website',
    tag: 'Einmaliges Projekt',
    headline: 'Eine Webseite, die zu dir passt (und funktioniert).',
    body: (
      <>
        Sauber, schnell, professionell. Du gibst mir deinen Input, ich kümmere mich um
        Design, Text-Politur, SEO-Basics und dafür, dass alles am Handy gut aussieht.
        Als Extra gibt's auch clevere KI-Chatbots.
      </>
    ),
    price: 'Ab €900, je nach Umfang.',
    cta: 'Lass uns über deine Website sprechen',
    ctaHref: '#contact',
  },
  {
    id: 'chatbot',
    tag: 'Add-on oder einzeln',
    headline: 'Ein smarter Helfer für regelmäßige Fragen.',
    body: (
      <>
        Ein KI-Chatbot für deine Website, der häufige Fragen beantwortet und Anfragen
        hinter den Kulissen sortiert – auch wenn du gerade offline bist.
      </>
    ),
    price: 'Auf Anfrage.',
    cta: 'Wie funktioniert das?',
    ctaHref: '#contact',
  },
  {
    id: 'visuals',
    tag: 'Canva & Lightroom',
    headline: 'Design, das richtig professionell aussieht.',
    body: (
      <>
        Workbooks, Präsentationen oder Social-Media-Vorlagen. Klar und einheitlich gestaltet,
        damit sich dein Auftritt wirklich rund anfühlt.
        <br /><br />
        Social-Media-Pakete (z.B. 10 Posts): ab €150.
        Workbooks (bis 20 Seiten): ab €200.
        Präsentationen (bis 15 Slides): ab €180.
      </>
    ),
    price: 'Ab €150, je nach Projekt.',
    cta: 'Zeig mir, was du brauchst',
    ctaHref: '#contact',
  },
]

// ── COPY ─────────────────────────────────────────────────────────
const headingCopy = {
  en: {
    label: 'Services',
    headline: 'Everything your business needs to work properly online.',
    intro: 'Every project starts with a clearly defined scope. You know exactly what you\u2019re getting, what it costs, and when it\u2019s done.',
  },
  de: {
    label: 'Leistungen',
    headline: 'Alles, was dein Business braucht, um online reibungslos zu laufen.',
    intro: 'Wir klären vorher genau ab, was du brauchst. So weißt du immer, was du bekommst, wie viel es kostet und wann wir fertig sind.',
  },
}

// ── CARD COMPONENT ───────────────────────────────────────────────
function Card({ card, index }: { card: ServiceCard; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col rounded-xl p-8 cursor-pointer"
      style={{
        background: 'var(--panel-cream)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        minHeight: '260px',
      }}
      onClick={() => setOpen((v) => !v)}
    >
      {/* Toggle indicator */}
      <div className="flex items-start justify-between mb-4">
        <span className="card-tag">{card.tag}</span>
        <span
          style={{
            fontFamily: "'Tsukimi Rounded', sans-serif",
            fontWeight: 400,
            fontSize: '1.25rem',
            color: 'var(--accent-brown)',
            lineHeight: 1,
            flexShrink: 0,
            marginLeft: '0.5rem',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </div>

      {/* Headline */}
      <h3
        className="mb-4 leading-[1.25]"
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          fontWeight: 400,
          fontSize: '1.15rem',
          color: 'var(--deep-brown)',
        }}
      >
        {card.headline}
      </h3>

      {/* Body — only shown when open */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="leading-[1.78] mb-5"
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 400,
                color: 'var(--deep-brown)',
                fontSize: '0.9rem',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {card.body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer pushes price + CTA to bottom */}
      <div style={{ flex: 1 }} />

      {/* Price */}
      <p
        className="mb-5"
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--accent-brown)',
          fontSize: '0.875rem',
        }}
      >
        {card.price}
      </p>

      {/* CTA */}
      <a
        href={card.ctaHref}
        className="btn-outline-dark"
        style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {card.cta} →
      </a>
    </motion.div>
  )
}

// ── SERVICES SECTION ─────────────────────────────────────────────
export default function Services() {
  const { lang } = useLanguage()
  const t = headingCopy[lang]
  const cards = lang === 'en' ? cardsEn : cardsDe

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="services" className="relative z-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header pill ──────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="inline-block rounded-2xl mb-10 px-8 py-8 backdrop-blur-md shadow-lg"
          style={{ background: 'var(--panel-cream)', border: '1px solid rgba(255,255,255,0.4)' }}
        >
          <h2 className="section-label mb-4">
            {t.label}
          </h2>
          <h3
            className="leading-[1.2] mb-4"
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: 'var(--deep-brown)',
            }}
          >
            {t.headline}
          </h3>
          <p
            className="leading-relaxed max-w-2xl"
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 400,
              color: 'var(--deep-brown)',
              fontSize: '0.9875rem',
            }}
          >
            {t.intro}
          </p>
        </motion.div>

        {/* ── Cards Grid — 3 columns ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {cards.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
