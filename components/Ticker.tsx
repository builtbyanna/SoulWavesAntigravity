'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: 'WEBSITE BUILDS · AI CHATBOTS · COURSE PLATFORMS · VIDEO EDITING · VISUAL ASSETS · DIGITAL OPERATIONS · ',
  de: 'WEBSEITEN · KI-CHATBOTS · KURSPLATTFORMEN · VIDEOBEARBEITUNG · VISUELLE ASSETS · DIGITALE PROZESSE · ',
}

export default function Ticker() {
  const { lang } = useLanguage()
  const text = copy[lang].repeat(4)

  return (
    <section
      className="relative z-10 overflow-hidden py-3"
      style={{ background: '#E6CCB2' }}
    >
      <div
        className="animate-marquee whitespace-nowrap will-change-transform"
        style={{ display: 'inline-block' }}
      >
        <span
          style={{
            fontFamily: "'Tsukimi Rounded', sans-serif",
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            color: 'var(--deep-brown)',
          }}
        >
          {text}
        </span>
        {/* Duplicate for seamless loop */}
        <span
          style={{
            fontFamily: "'Tsukimi Rounded', sans-serif",
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            color: 'var(--deep-brown)',
          }}
        >
          {text}
        </span>
      </div>
    </section>
  )
}
