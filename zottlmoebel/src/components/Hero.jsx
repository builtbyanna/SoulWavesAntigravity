import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Right-side image panel */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          alt="Maßgeschneiderte Holzwerkstatt"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--color-cream) 0%, transparent 30%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-16 relative z-10 grid md:grid-cols-2 gap-12 items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="py-32 md:py-0"
        >
          <p
            className="font-semibold tracking-widest uppercase text-sm mb-5"
            style={{ color: 'var(--color-gold)', fontFamily: 'Inter, sans-serif' }}
          >
            Möbel Zottl GesmbH
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.05]"
            style={{ fontFamily: '"Playfair Display", serif', color: 'var(--color-charcoal)' }}
          >
            Räume, die zu Ihnen passen.
          </h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: 'rgba(26,26,26,0.65)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Einfühlsam und ganz persönlich begleiten wir Sie von der ersten Idee bis zur fertigen Raumgestaltung – maßgeschneidert, bis ins kleinste Detail.
          </p>
          <a
            href="#kontakt"
            className="inline-block px-10 py-4 font-medium tracking-wide text-sm transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-charcoal)',
              color: 'var(--color-cream)',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-charcoal)'}
          >
            Schreiben Sie uns
          </a>
        </motion.div>
      </div>

      {/* Mobile image */}
      <div className="absolute inset-0 -z-10 md:hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          alt="Luxury interior"
          className="w-full h-full object-cover opacity-15"
        />
      </div>
    </section>
  );
};

export default Hero;
