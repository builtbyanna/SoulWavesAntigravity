import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, Clock, Globe, Phone, Star } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle2 size={22} />,
    title: "Handwerkliche Qualität",
    desc: "Hochwertige Grundmaterialien und sachgemäße Verarbeitung — perfekt bis ins kleinste Detail, das auch einer genauen Betrachtung standhält."
  },
  {
    icon: <Wrench size={22} />,
    title: "Technisches Know-How",
    desc: "Das Zottl-Team ist stets auf dem neuesten Stand und realisiert Ihre Wohnträume mit modernsten Technologien im Möbelbau."
  },
  {
    icon: <Clock size={22} />,
    title: "Fixtermingarantie",
    desc: "Ein garantierter Fertigstellungstermin bedeutet bei uns: Er wird eingehalten. Keine Überraschungen, keine Verzögerungen."
  },
  {
    icon: <Phone size={22} />,
    title: "Beratungshotline",
    desc: "Rufen Sie an oder schreiben Sie uns. Werktags garantiert eine Antwort innerhalb von 24 Stunden."
  },
  {
    icon: <Globe size={22} />,
    title: "Internationale Erfahrung",
    desc: "Von Amsterdam bis Wladiwostok – über 6 Länder auf 3 Kontinenten. Anspruchsvolle internationale Projekte sind unsere Spezialität."
  },
  {
    icon: <Star size={22} />,
    title: "Rundum aus einer Hand",
    desc: "Von der innenarchitektonischen Beratung über die detaillierte Planung bis zur funktionssicheren Montage – alles aus einer Hand."
  }
];

const Features = () => {
  return (
    <section className="py-32" style={{ backgroundColor: 'var(--color-charcoal)' }}>
      <div className="container mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center mb-24"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-5"
            style={{ color: 'var(--color-gold)', fontFamily: 'Inter, sans-serif' }}
          >
            Was uns auszeichnet
          </p>
          <h2
            className="text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: '"Playfair Display", serif', color: 'white' }}
          >
            Für uns sprechen Qualität, Tradition und absolute Verlässlichkeit.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col"
            >
              <div
                className="mb-6 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(197,160,89,0.1)',
                  color: 'var(--color-gold)'
                }}
              >
                {feature.icon}
              </div>
              <h4
                className="text-xl mb-3"
                style={{ fontFamily: '"Playfair Display", serif', color: 'white' }}
              >
                {feature.title}
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', fontWeight: 300, lineHeight: 1.7 }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
