'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: { label: 'Client Love' },
  de: { label: 'Kundenstimmen' },
}

const testimonials = [
  {
    id: 'ab',
    author: 'A.B., Yoga and Pilates teacher',
    quote: 'Anna\'s support is incredibly valuable. Especially as a solo business owner, being able to hand off tasks I don\'t enjoy and that take a lot of time makes a huge difference. Anna really understands me and works in a structured and efficient way. I can highly recommend her.',
  },
  {
    id: 'sr',
    author: 'S.R., Leadership and Operations',
    quote: 'Anna operates at a level well above a typical VA. She communicates clearly and early when bottlenecks arise, takes ownership of problems, and stays persistent until they\'re resolved. Beyond her reliability and judgment, she\'s genuinely pleasant to work with, which makes a meaningful difference at the leadership level.',
  },
  {
    id: 'be',
    author: 'B.E., Founder, Empowermind Academy',
    quote: 'Anna supported me very competently with my online visibility and client acquisition. She fully took over my LinkedIn presence and built it strategically, resulting in a profile that is clear, professional, and aligned with my positioning. I especially value her structured way of working, her strategic thinking, and her strong intuition for brand, target audience, and communication.',
  },
]

function TestimonialCard({ t, index, inView }: {
  t: typeof testimonials[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="carousel-item flex-shrink-0 flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(230,204,178,0.15)',
        borderRadius: '14px',
        padding: '2.25rem',
        minWidth: '280px',
      }}
    >
      {/* Quote mark */}
      <span className="quote-mark mb-2" aria-hidden="true">&ldquo;</span>

      <blockquote
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--sand)',
          fontSize: '0.9375rem',
          lineHeight: '1.78',
          flex: 1,
          marginBottom: '2rem',
        }}
      >
        {t.quote}
      </blockquote>

      <div>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Tsukimi Rounded', sans-serif",
            fontWeight: 600,
            color: 'rgba(255,248,236,0.6)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          }}
        >
          {t.author}
        </p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="testimonials"
      className="relative z-10 py-24 md:py-32"
      style={{ background: 'var(--deep-brown)' }}
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            color: 'var(--sand)',
            lineHeight: 1,
          }}
        >
          {t.label}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-12 h-px mb-12"
          style={{ background: 'rgba(196,168,130,0.4)' }}
        />

        {/* Desktop: 3-column grid | Mobile: horizontal scroll */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} inView={inView} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden carousel-track pb-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
