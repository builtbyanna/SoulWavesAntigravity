import React from 'react';
import { Globe, Link, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10" style={{ backgroundColor: 'var(--color-charcoal)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          <div className="md:col-span-5">
            <h5
              className="text-2xl mb-5"
              style={{ fontFamily: '"Playfair Display", serif', color: 'var(--color-gold)' }}
            >
              Zottl Möbel
            </h5>
            <p
              className="max-w-sm mb-8 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Wir gestalten Innenräume aus einer handwerklichen Tradition, die für Qualität, Verlässlichkeit und Schönheit steht. Hochwertige Einrichtungen, die ein Leben lang halten.
            </p>
            <p
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}
            >
              — Manfred Koran, Geschäftsführer
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h6 className="text-xs uppercase tracking-widest mb-7" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif' }}>Navigation</h6>
            <ul className="space-y-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {['Über uns', 'Qualität', 'Referenzen', 'Leistungen', 'Kontakt'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h6 className="text-xs uppercase tracking-widest mb-7" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif' }}>Zentrale</h6>
            <address className="not-italic space-y-2 mb-8" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}>
              <p>Alberndorf 28-29</p>
              <p>2054 Österreich</p>
              <p className="mt-4">
                <a href="tel:+43029442338" style={{ color: 'rgba(255,255,255,0.5)' }}>+43 (0)2944 2338</a>
              </p>
            </address>
            <div className="flex gap-5">
              {[Globe, Link, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          <p>&copy; {new Date().getFullYear()} Zottl Möbel GesmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            {['Impressum', 'Datenschutz'].map(item => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
