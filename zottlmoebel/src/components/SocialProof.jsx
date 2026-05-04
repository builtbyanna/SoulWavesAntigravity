import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Holzwerkstatt', style: { fontFamily: '"Playfair Display", serif', fontSize: '1.4rem' } },
  { name: 'LUMINA', style: { fontFamily: 'Inter, sans-serif', fontWeight: 200, letterSpacing: '0.25em', fontSize: '1rem' } },
  { name: 'Atelier H.', style: { fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '1.4rem' } },
  { name: 'WOHNIDEEN', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.85rem' } },
  { name: 'MAISON', style: { fontFamily: '"Playfair Display", serif', fontSize: '1.4rem' } },
];

const SocialProof = () => {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--color-cream)', borderTop: '1px solid rgba(26,26,26,0.07)' }}>
      <div className="container mx-auto px-6 md:px-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.25em] uppercase mb-14 font-medium"
          style={{ color: 'rgba(26,26,26,0.4)', fontFamily: 'Inter, sans-serif' }}
        >
          Vertraut von namhaften Partnern und Kunden
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {brands.map((brand, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="transition-all duration-300 cursor-default"
              style={{ color: 'rgba(26,26,26,0.35)', ...brand.style }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,26,0.35)'}
            >
              {brand.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
