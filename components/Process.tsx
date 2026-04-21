'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  en: {
    label: 'The Process',
    steps: [
      {
        num: '1',
        title: 'Reach out your way',
        body: "Fill in the form below, send a voice note on WhatsApp, or chat with Frieda. Whatever's easiest. Tell me what you're building and what's not working.",
        actions: [
          { label: 'Fill in the form', href: '#contact' },
          { label: 'WhatsApp voice note', href: 'https://wa.me/436603019415' },
          { label: 'Chat with Frieda', href: '#contact' },
        ],
      },
      {
        num: '2',
        title: 'You get an honest take',
        body: "I'll come back with a clear view on whether I can help and what it would look like. If the scope makes sense, I'll put together a short proposal.",
        actions: [],
      },
      {
        num: '3',
        title: 'We get on a call and lock the details',
        body: 'A short call to confirm scope, timeline, and deliverables. For straightforward builds like maintenance retainers, we can often skip straight from proposal to start.',
        actions: [
          { label: 'Book a call directly', href: 'https://calendar.app.google/WKhMs5XL1DeaccdK6' },
        ],
      },
    ],
  },
  de: {
    label: 'Der Ablauf',
    steps: [
      {
        num: '1',
        title: 'Meld dich auf deine Art',
        body: 'Füll das Formular aus, schick mir eine kurze WhatsApp-Sprachnachricht oder chatte mit Frieda. Ganz wie du magst. Sag mir einfach kurz, was du planst und wo du gerade festhängst.',
        actions: [
          { label: 'Formular ausfüllen', href: '#contact' },
          { label: 'WhatsApp-Sprachnachricht', href: 'https://wa.me/436603019415' },
          { label: 'Mit Frieda chatten', href: '#contact' },
        ],
      },
      {
        num: '2',
        title: 'Du bekommst ehrliches Feedback',
        body: 'Ich melde mich und sage dir, ob und wie ich dir am besten helfen kann. Wenn es passt, schicke ich dir direkt ein kurzes Angebot rüber.',
        actions: [],
      },
      {
        num: '3',
        title: 'Wir telefonieren und klären die Details',
        body: 'Ein kurzes Kennenlernen, um den Rahmen abzustecken. Bei einfachen Projekten können wir nach unserem Erstgespräch oft sofort loslegen.',
        actions: [
          { label: 'Direkt einen Call buchen', href: 'https://calendar.app.google/WKhMs5XL1DeaccdK6' },
        ],
      },
    ],
  },
}

export default function Process() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="relative z-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--panel-cream)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]">

            {/* ── Steps (left column) ───────────────────────── */}
            <div className="p-9 md:p-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="mb-12"
              >
                <h2 className="section-label mb-4">
                  {t.label}
                </h2>
              </motion.div>

              {/* Steps */}
              <div className="space-y-10">
                {t.steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.12 }}
                    className="flex gap-6"
                  >
                    {/* Step number */}
                    <div className="flex-shrink-0">
                      <p className="step-number">{step.num}</p>
                    </div>

                    <div className="flex flex-col">
                      <h3
                        className="mb-3 leading-[1.25]"
                        style={{
                          fontFamily: "'Tsukimi Rounded', sans-serif",
                          fontWeight: 400,
                          fontSize: '1.1rem',
                          color: 'var(--deep-brown)',
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="leading-[1.78] mb-4"
                        style={{
                          fontFamily: "'Tsukimi Rounded', sans-serif",
                          fontWeight: 400,
                          color: 'var(--deep-brown)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {step.body}
                      </p>

                      {/* Action buttons */}
                      {step.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {step.actions.map((action) => (
                            <a
                              key={action.label}
                              href={action.href}
                              target={action.href.startsWith('http') ? '_blank' : undefined}
                              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="btn-outline-dark"
                            >
                              {action.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Photo (right column) ──────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:block"
              style={{ minHeight: '500px' }}
            >
              <img
                src="/assets/me_coconut.JPG"
                alt="Anna Schuster"
                className="w-full h-full object-cover object-center"
                style={{ borderRadius: '0 1rem 1rem 0' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
