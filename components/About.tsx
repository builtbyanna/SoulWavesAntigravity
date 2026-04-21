'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: {
    label: 'About',
    h2: "I didn’t take the conventional path. Turns out, that was the whole point.",
    p1: "Hi I'm Anna. Austrian, traveling around the globe, building the digital back-end of small expert businesses.",
    p2: "Before this I worked in a kindergarten, a bakery, a horror escape theatre, and spent five years as a prison guard. None of those are on a typical freelancer's CV. But they gave me things that actually matter in this work: staying calm when things break, reading a situation fast, building structure where there isn't any, and seeing the human behind the process.",
    p3: "I bring all of that to the technical layer of your business. Websites, course platforms, AI tools, video editing, visual assets. Built properly, kept running, fixed when it breaks.",
    detail: "Ocean person. Bookworm. Walked the Camino Frances.",
  },
  de: {
    label: 'Über mich',
    accentWord: 'Anna',
    h2: 'Mein Weg war nicht ganz geradlinig. Und das ist auch gut so.',
    p1: 'Hi, ich bin Anna. Ich bin gebürtige Österreicherin, reise gerne um die Welt und kümmere mich um das System-Setup von kleinen Unternehmen.',
    p2: 'Davor habe ich im Kindergarten, in einer Bäckerei und in einem Horror-Escape-Theater gearbeitet – und war fünf Jahre Justizwachebeamtin. Vielleicht nicht der typische Lebenslauf in dieser Branche. Aber genau diese Erfahrungen haben mich Dinge gelehrt, die jetzt richtig wichtig sind: einen kühlen Kopf bewahren, wenn die Technik mal streikt, mich schnell in neue Situationen reindenken, Ordnung ins Chaos bringen – und immer den Menschen hinter den Prozessen sehen.',
    p3: 'Und genau das bringe ich jetzt in die Technik deines Business mit ein. Ob Webseiten, Kursplattformen, Video-Schnitt oder neue Prozesse. Ich richte es so ein, dass es verlässlich funktioniert – und repariere es, wenn mal was hakt.',
    p4: 'Bei mir hast du immer genau eine Ansprechpartnerin. Wir besprechen den Rahmen vorab, und falls ich mal etwas nicht perfekt kann, sage ich dir das auch ganz ehrlich.',
    detail: 'Meereskind. Lese-Fan. Den Camino Frances gepilgert.',
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const textShadow = '0 1px 4px rgba(255,248,236,0.9), 0 0 12px rgba(255,248,236,0.6)'

export default function About() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative z-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[460px_1fr] gap-10 xl:gap-16 items-stretch"
        >
          {/* ── Text (encapsulated in glass panel) ──────────── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="order-2 lg:order-2 p-8 md:p-12 rounded-2xl backdrop-blur-md shadow-lg"
            style={{ background: 'rgba(255,248,236,0.4)', border: '1px solid rgba(255,255,255,0.4)' }}
          >
            {/* Great Vibes section label */}
            <h2 className="section-label mb-8">
              {t.label}
            </h2>

            {/* Headline */}
            <h3
              className="leading-[1.2] mb-8"
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                color: 'var(--deep-brown)',
              }}
            >
              {t.h2}
            </h3>

            <div
              className="space-y-5 leading-[1.78] mb-8"
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 400,
                color: 'var(--deep-brown)',
                fontSize: '0.9875rem',
              }}
            >
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </div>

            {/* Detail line */}
            <p
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--warm-text)',
                fontSize: '0.875rem',
              }}
            >
              ◦ {t.detail}
            </p>
          </motion.div>

          {/* ── Single photo ─────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="order-1 lg:order-1 relative min-h-[400px] lg:h-full lg:min-h-0"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg h-full lg:absolute lg:inset-0">
              <img
                src="/assets/me_prisonguard.jpeg"
                alt="Anna Schuster"
                className="w-full h-full object-cover object-[center_30%]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
