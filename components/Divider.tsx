'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: { line1: 'Your Digital Back-End.', line2: 'Built Properly. Kept Running.' },
  de: { line1: 'Die Technik im Hintergrund.', line2: 'Schön aufgeräumt. Zuverlässig am Laufen.' },
}

export default function Divider() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="divider"
      className="relative z-10 py-20 md:py-28"
      style={{ background: '#44140D' }}
    >
      <div ref={ref} className="max-w-5xl mx-auto px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
            color: '#FFF8EC',
            letterSpacing: '0.02em',
            lineHeight: 1.35,
          }}
        >
          {t.line1}
          <br />
          <span style={{ color: 'var(--sand)' }}>{t.line2}</span>
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-10"
          style={{
            width: '4rem',
            height: '1px',
            background: 'rgba(230,204,178,0.4)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </section>
  )
}
