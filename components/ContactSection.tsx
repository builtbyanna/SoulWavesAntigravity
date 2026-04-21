'use client'

import { useRef, useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: {
    label: 'Work Together',
    h2: "If this sounds like what you need, let's get on a call.",
    body: 'Send a message or ramble into a voice note on WhatsApp.',
    fields: {
      name: 'Name',
      email: 'Email',
      project: 'What are you working on?',
      referral: 'How did you find me?',
      submit: 'Send message',
    },
    placeholders: {
      name: 'Your name',
      email: 'your@email.com',
      project: 'Tell me what you need help with...',
    },
    or: 'Or reach out directly:',
    whatsapp: 'WhatsApp',
    bookCall: 'Book a call',
    sending: 'Sending…',
    sent: "Message sent! I'll be in touch within 24 hours.",
  },
  de: {
    label: 'Zusammenarbeiten',
    h2: 'Wenn sich das gut anhört – lass uns einfach telefonieren.',
    body: 'Schick mir gerne eine kurze Nachricht oder WhatsApp. Oder nutze das Formular unten, und ich melde mich wirklich zeitnah bei dir.',
    fields: {
      name: 'Name',
      email: 'E-Mail',
      project: 'Worum geht es?',
      referral: 'Wie hast du mich gefunden?',
      submit: 'Nachricht senden',
    },
    placeholders: {
      name: 'Dein Name',
      email: 'deine@email.com',
      project: 'Wobei kann ich dir helfen?',
    },
    or: 'Oder direkt melden:',
    whatsapp: 'WhatsApp',
    bookCall: 'Call buchen',
    sending: 'Wird gesendet…',
    sent: 'Nachricht gesendet! Ich melde mich in Kürze.',
  },
}

export default function ContactSection() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,248,236,0.85)',
    border: '1px solid rgba(230,204,178,0.6)',
    borderRadius: '6px',
    color: 'var(--deep-brown)',
    padding: '0.875rem 1rem',
    fontSize: '0.9rem',
    fontFamily: "'Tsukimi Rounded', sans-serif",
    fontWeight: 400,
    transition: 'border-color 0.2s',
    width: '100%',
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    // Placeholder — wire to Formspree / Netlify forms / etc.
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section
      id="contact"
      className="relative z-10 py-24 md:py-32"
    >
      <div 
        ref={ref}
        className="max-w-3xl mx-auto px-6 sm:px-12 py-12 sm:py-16 rounded-2xl backdrop-blur-md shadow-lg"
        style={{ background: 'rgba(255,248,236,0.4)', border: '1px solid rgba(255,255,255,0.4)' }}
      >

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-12 text-center"
        >
          <h2 className="section-label mb-6">
            {t.label}
          </h2>
          <p
            className="leading-[1.15] mb-6"
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              color: 'var(--deep-brown)',
            }}
          >
            {t.h2}
          </p>
          <p
            className="leading-relaxed max-w-xl mx-auto"
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 400,
              color: 'var(--deep-brown)',
              fontSize: '0.9875rem',
            }}
          >
            {t.body}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <div className="flex flex-col gap-1">
            <label
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 600,
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'var(--warm-text)',
              }}
            >
              {t.fields.name}
            </label>
            <input
              type="text"
              name="name"
              placeholder={t.placeholders.name}
              required
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 600,
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'var(--warm-text)',
              }}
            >
              {t.fields.email}
            </label>
            <input
              type="email"
              name="email"
              placeholder={t.placeholders.email}
              required
              style={inputStyle}
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1">
            <label
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 600,
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'var(--warm-text)',
              }}
            >
              {t.fields.project}
            </label>
            <textarea
              name="project"
              placeholder={t.placeholders.project}
              rows={4}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1">
            <label
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: 600,
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'var(--warm-text)',
              }}
            >
              {t.fields.referral}
            </label>
            <input
              type="text"
              name="referral"
              placeholder=""
              style={inputStyle}
            />
          </div>

          <div className="sm:col-span-2 flex justify-center mt-2">
            {status === 'sent' ? (
              <p
                style={{
                  fontFamily: "'Tsukimi Rounded', sans-serif",
                  fontWeight: 400,
                  color: 'var(--accent-brown)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                }}
              >
                ✓ {t.sent}
              </p>
            ) : (
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{ minWidth: '180px' }}
              >
                {status === 'sending' ? t.sending : t.fields.submit}
              </button>
            )}
          </div>
        </motion.form>

        {/* Direct contact links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              fontWeight: 600,
              color: 'var(--accent-brown)',
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              marginBottom: '1.25rem',
            }}
          >
            {t.or}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/436603019415"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
              style={{ fontSize: '0.7rem', fontWeight: 400 }}
            >
              {t.whatsapp}
            </a>
            <a
              href="mailto:anna@soulwaves.com"
              className="btn-outline-dark"
              style={{ fontSize: '0.7rem', fontWeight: 400 }}
            >
              anna@soulwaves.com
            </a>
            <a
              href="https://calendar.app.google/WKhMs5XL1DeaccdK6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
              style={{ fontSize: '0.7rem', fontWeight: 400 }}
            >
              {t.bookCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
