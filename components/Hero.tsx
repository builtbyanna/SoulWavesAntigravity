'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Digital back-end for small expert businesses',
    h1a: 'I build the systems your business runs on.',
    h1b1: 'So you can focus on ',
    h1b2: 'your genius.',
    sub1: 'Websites. Course platforms. Video editing. Visual assets. AI chatbots.',
    sub2: 'One person. Fixed scope. Done properly.',
    cta: 'See what I do',
    ctaSecondary: 'Or ask Frieda, my AI assistant',
    location: 'Working digitally across the globe.',
    scroll: 'Scroll to explore',
  },
  de: {
    eyebrow: 'Dein technisches Back-End für Experten-Business',
    h1a: 'Ich baue die Technik hinter deinem Business.',
    h1b1: 'So bleibt dein Fokus beim ',
    h1b2: 'Wesentlichen.',
    sub1: 'Webseiten. Kursplattformen. Videoschnitt. KI-Chatbots.',
    sub2: 'Eine Ansprechpartnerin. Klarer Rahmen. Einfach gut umgesetzt.',
    cta: 'Was ich anbiete',
    ctaSecondary: 'Oder frag Frieda, meine KI',
    location: 'Digital und weltweit für dich da.',
    scroll: 'Mehr erfahren',
  },
}

const panel = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const photo = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Hero() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 w-full flex flex-col gap-8 md:gap-16">
        
        {/* Brand Header */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="w-full flex items-center justify-center pt-8 md:pt-4"
        >
           <h1 
             className="opacity-90 drop-shadow-sm text-center"
             style={{ 
               fontFamily: "'Great Vibes', cursive", 
               fontWeight: 400,
               fontSize: 'clamp(4.5rem, 12vw, 8rem)', 
               color: 'var(--accent-brown)',
               lineHeight: 1,
               paddingLeft: '1rem',
               paddingRight: '1rem'
             }}
           >
             Soul Waves
           </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 xl:gap-16 items-stretch">

          {/* ── Text (encapsulated in glass panel) ──────────── */}
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            className="p-8 md:p-12 rounded-2xl backdrop-blur-md shadow-lg flex flex-col justify-center"
            style={{ background: 'rgba(255,248,236,0.4)', border: '1px solid rgba(255,255,255,0.4)' }}
          >
            {/* Eyebrow */}
            <p
              className="mb-6"
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8C1C13',
              }}
            >
              {t.eyebrow}
            </p>

            {/* Headline */}
            <h1
              className="leading-[1.15] mb-5"
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                color: 'var(--deep-brown)',
              }}
            >
              {t.h1a}
              <br />
              <span style={{ color: 'var(--warm-text)' }}>
                {t.h1b1}
              </span>
              <span style={{
                fontFamily: "'Great Vibes', cursive",
                fontWeight: 400,
                fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                color: 'var(--accent-brown)',
                letterSpacing: '0.01em',
              }}>
                {t.h1b2}
              </span>
            </h1>

            <span className="hr-dark" style={{ margin: '1.5rem 0' }} />

            {/* Subline */}
            <p
              className="leading-relaxed mb-8"
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 400,
                color: 'var(--deep-brown)',
                fontSize: '1.0625rem',
              }}
            >
              {t.sub1}
              <br />
              <span style={{ color: 'var(--warm-text)' }}>
                {t.sub2}
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
              <a href="#services" className="btn-primary">
                {t.cta}
              </a>
              <button
                style={{
                  fontFamily: "'Tsukimi Rounded', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--deep-brown)',
                  background: 'transparent',
                  border: '1px solid rgba(54,17,13,0.3)',
                  padding: '0.875rem 2rem',
                  transition: 'border-color 0.2s, background 0.2s',
                  cursor: 'pointer',
                  borderRadius: '999px',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(54,17,13,0.05)'
                  ;(e.target as HTMLElement).style.borderColor = 'rgba(54,17,13,0.6)'
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = 'transparent'
                  ;(e.target as HTMLElement).style.borderColor = 'rgba(54,17,13,0.3)'
                }}
              >
                {t.ctaSecondary}
              </button>
            </div>
          </motion.div>

          {/* ── Photo (desktop only, mirrored) ───────────────── */}
          <motion.div
            variants={photo}
            initial="hidden"
            animate="visible"
            className="hidden lg:block lg:h-full relative"
            style={{ minHeight: 'clamp(480px, 72vh, 680px)' }}
          >
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl lg:absolute lg:inset-0">
              <img
                src="/assets/me_lighthouse.jpeg"
                alt="Anna Schuster"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ transform: 'scaleX(-1)' }}
              />
              {/* Vignette bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(44,20,13,0.4) 0%, transparent 50%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 600,
              color: 'rgba(255,248,236,0.6)',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
            }}
          >
            {t.scroll}
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '2rem',
              background: 'linear-gradient(to bottom, rgba(255,248,236,0.6), transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
