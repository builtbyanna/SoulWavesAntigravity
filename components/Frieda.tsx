'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: {
    label: 'Meet Frieda',
    h2: 'This is what a working AI chatbot looks like.',
    p1: "Frieda is the Soul Waves AI assistant. She knows the services, the pricing, and the right questions to ask if you're working out whether Soul Waves is a good fit for what you need.",
    p2: "She's built with the same tools I use for client websites. So if you've been wondering what an AI chatbot actually does for a small business, here's a live example.",
    p3: "If you'd like to move forward, she'll ask for your name and contact details and pass everything on to me directly.",
    cta: 'Chat with Frieda',
  },
  de: {
    label: 'Lern Frieda kennen',
    h2: 'So sieht ein funktionierender KI-Chatbot aus.',
    p1: 'Frieda ist die Soul Waves KI-Assistentin. Sie kennt die Leistungen, die Preise und die richtigen Fragen, wenn du herausfindest, ob Soul Waves das Richtige für dich ist.',
    p2: 'Sie wurde mit denselben Tools gebaut, die ich für Kunden-Websites verwende. Wenn du also wissen wolltest, was ein KI-Chatbot für ein kleines Business tatsächlich macht – hier ist ein Live-Beispiel.',
    p3: 'Wenn du weitermachen möchtest, fragt sie nach deinem Namen und deinen Kontaktdaten und gibt alles direkt an mich weiter.',
    cta: 'Mit Frieda chatten',
  },
}

export default function Frieda() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="frieda" className="relative z-10 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{
            /* Glassmorphism — waves read through clearly */
            background: 'rgba(255, 248, 236, 0.52)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 248, 236, 0.55)',
            boxShadow: '0 8px 40px rgba(68, 20, 13, 0.10)',
          }}
        >
          {/* ── Single card: photo + text side by side ─────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0">

            {/* Photo — contained inside the card */}
            <div className="p-7 pb-0 lg:pb-7 lg:pr-0">
              <div
                className="rounded-xl overflow-hidden w-full"
                style={{ height: 'clamp(260px, 42vh, 460px)' }}
              >
                <img
                  src="/assets/bali_flatlay.JPG"
                  alt="Workspace flatlay"
                  className="w-full h-full object-cover object-center"
                  style={{ display: 'block' }}
                />
              </div>
            </div>

            {/* Text — right side of the card */}
            <div className="flex flex-col justify-center p-8 md:p-10 lg:pl-10">

              <p
                className="section-label mb-5"
                style={{ color: '#6B3A26' }}
              >
                {t.label}
              </p>

              <h2
                className="font-heading leading-[1.15] mb-5"
                style={{
                  fontSize: 'clamp(1.45rem, 2.8vw, 2.25rem)',
                  color: '#2C0E08',
                  fontWeight: 400,
                }}
              >
                {t.h2}
              </h2>

              <span
                style={{
                  display: 'block',
                  width: '3rem',
                  height: '1px',
                  background: 'rgba(68,20,13,0.25)',
                  margin: '0 0 1.5rem',
                }}
              />

              <div
                className="font-body space-y-4 leading-[1.8] mb-8"
                style={{ color: '#3A1E12', fontSize: '0.9375rem' }}
              >
                <p>{t.p1}</p>
                <p>{t.p2}</p>
                <p>{t.p3}</p>
              </div>

              <a
                href="#contact"
                className="self-start font-body font-medium text-xs tracking-widest uppercase transition-all duration-250"
                style={{
                  display: 'inline-block',
                  padding: '0.875rem 2rem',
                  background: '#44140D',
                  color: '#FFF8EC',
                  border: '1px solid transparent',
                  letterSpacing: '0.18em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#5C1E14'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#44140D'
                }}
              >
                {t.cta}
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
