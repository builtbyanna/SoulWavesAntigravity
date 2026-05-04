import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [focused, setFocused] = useState(null);

  const inputStyle = (name) => ({
    width: '100%',
    background: 'transparent',
    borderBottom: `1px solid ${focused === name ? 'var(--color-gold)' : 'rgba(26,26,26,0.2)'}`,
    padding: '12px 0',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 300,
    fontSize: '1rem',
    color: 'var(--color-charcoal)',
    outline: 'none',
    transition: 'border-color 0.3s',
  });

  return (
    <section id="kontakt" className="py-32" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container mx-auto px-6 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:w-5/12"
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-gold)', fontFamily: 'Inter, sans-serif' }}
            >
              Kontakt
            </p>
            <h2
              className="text-4xl md:text-5xl mb-8 leading-tight"
              style={{ fontFamily: '"Playfair Display", serif', color: 'var(--color-charcoal)' }}
            >
              Lassen Sie uns über Ihre Räume sprechen.
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: 'rgba(26,26,26,0.6)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              Wir kommen zu Ihnen, um Sie und Ihre Räumlichkeiten kennenzulernen. 
              Senden Sie uns Ihre Nachricht – werktags antworten wir garantiert innerhalb von 24 Stunden.
            </p>

            <div className="space-y-5" style={{ color: 'rgba(26,26,26,0.7)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              <div>
                <span className="block text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(26,26,26,0.4)' }}>Adresse</span>
                Alberndorf 28-29, 2054 Österreich
              </div>
              <div>
                <span className="block text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(26,26,26,0.4)' }}>Telefon</span>
                <a href="tel:+43029442338" className="transition-colors hover:opacity-70">+43 (0)2944 2338</a>
              </div>
              <div>
                <span className="block text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(26,26,26,0.4)' }}>E-Mail</span>
                <a href="mailto:zottl@nanet.at" className="transition-colors hover:opacity-70">zottl@nanet.at</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:w-7/12"
          >
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-10">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(26,26,26,0.4)', fontFamily: 'Inter, sans-serif' }} htmlFor="name">Name</label>
                <input
                  id="name" type="text" placeholder="Ihr vollständiger Name"
                  style={inputStyle('name')}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(26,26,26,0.4)', fontFamily: 'Inter, sans-serif' }} htmlFor="email">E-Mail</label>
                <input
                  id="email" type="email" placeholder="ihre.mail@beispiel.at"
                  style={inputStyle('email')}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(26,26,26,0.4)', fontFamily: 'Inter, sans-serif' }} htmlFor="message">Nachricht</label>
                <textarea
                  id="message" rows="5" placeholder="Wie können wir Ihnen helfen?"
                  style={{ ...inputStyle('message'), resize: 'none' }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                />
              </div>
              <button
                type="submit"
                className="text-sm font-medium tracking-widest uppercase py-5 transition-all duration-300"
                style={{ backgroundColor: 'var(--color-charcoal)', color: 'var(--color-cream)', fontFamily: 'Inter, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-charcoal)'}
              >
                Schreiben Sie uns
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
