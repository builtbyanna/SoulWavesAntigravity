'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: {
    company: 'Soul Waves Solutions LLC',
    email: 'anna@soulwaves.com',
    links: ['Instagram', 'LinkedIn', 'Privacy Policy', 'Legal Notice'],
    linkHrefs: ['https://instagram.com/anna', 'https://linkedin.com/in/anna', '#privacy', '#legal'],
    legal: '© 2025 Soul Waves Solutions LLC. All rights reserved.',
  },
  de: {
    company: 'Soul Waves Solutions LLC',
    email: 'anna@soulwaves.com',
    links: ['Instagram', 'LinkedIn', 'Datenschutz', 'Impressum'],
    linkHrefs: ['https://instagram.com/anna', 'https://linkedin.com/in/anna', '#privacy', '#legal'],
    legal: '© 2025 Soul Waves Solutions LLC. Alle Rechte vorbehalten.',
  },
}

export default function Footer() {
  const { lang, setLang } = useLanguage()
  const t = copy[lang]

  return (
    <footer
      className="relative z-10"
      style={{ background: '#44140D' }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

          {/* Brand & Email */}
          <div>
            <img
              src="/assets/NewLogoTransparent.png"
              alt="Soul Waves"
              className="h-10 w-auto object-contain mb-5"
              style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(0.3) brightness(0.9)' }}
            />
            <p
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 400,
                color: 'rgba(255,248,236,0.7)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
              }}
            >
              {t.company}
              <br />
              {t.email}
            </p>
          </div>

          {/* Links */}
          <div className="flex md:justify-end items-center">
            <ul className="flex flex-wrap gap-4 md:gap-6">
              {t.links.map((label, i) => (
                <li key={label} className="flex items-center">
                  <a
                    href={t.linkHrefs[i]}
                    style={{
                      fontFamily: "'Tsukimi Rounded', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(255,248,236,0.65)',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#E6CCB2')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,248,236,0.65)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,248,236,0.1)' }}
        >
          <p
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 400,
              color: 'rgba(255,248,236,0.35)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
            }}
          >
            {t.legal}
          </p>
          {/* Language Toggle in Footer */}
          <div
            className="flex items-center gap-1"
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 600,
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
            }}
          >
            <button
              onClick={() => setLang('en')}
              style={{ color: lang === 'en' ? 'var(--cream)' : 'rgba(255,248,236,0.5)' }}
            >
              EN
            </button>
            <span style={{ color: 'rgba(255,248,236,0.3)' }}>/</span>
            <button
              onClick={() => setLang('de')}
              style={{ color: lang === 'de' ? 'var(--cream)' : 'rgba(255,248,236,0.5)' }}
            >
              DE
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
