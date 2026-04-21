'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: { about: 'About', services: 'Services', contact: 'Contact' },
  de: { about: 'Über mich', services: 'Leistungen', contact: 'Kontakt' },
}

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const t = copy[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: t.about, href: '#about' },
    { label: t.services, href: '#services' },
    { label: t.contact, href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 248, 236, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid rgba(230,204,178,0.5)' : '1px solid rgba(230,204,178,0.2)',
        transition: 'border-color 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center flex-shrink-0">
          <img
            src="/assets/NewLogoTransparent.png"
            alt="Soul Waves"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: 'var(--deep-brown)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent-brown)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--deep-brown)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language toggle + mobile menu icon */}
        <div className="flex items-center gap-4">
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
              style={{
                padding: '0.25rem 0.5rem',
                color: lang === 'en' ? 'var(--deep-brown)' : 'rgba(230,204,178,0.7)',
                transition: 'color 0.2s',
              }}
            >
              EN
            </button>
            <span style={{ color: 'var(--sand)', pointerEvents: 'none' }}>|</span>
            <button
              onClick={() => setLang('de')}
              style={{
                padding: '0.25rem 0.5rem',
                color: lang === 'de' ? 'var(--deep-brown)' : 'rgba(230,204,178,0.7)',
                transition: 'color 0.2s',
              }}
            >
              DE
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="md:hidden flex flex-col gap-1.5 p-1"
          >
            <span
              className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--deep-brown)' }}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'var(--deep-brown)' }}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--deep-brown)' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-[#E6CCB2]/30"
            style={{ background: 'rgba(255,248,236,0.96)', backdropFilter: 'blur(8px)' }}
          >
            <nav className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 border-b border-[#E6CCB2]/40"
                  style={{
                    fontFamily: "'Tsukimi Rounded', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--deep-brown)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
