import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="mx-auto w-full selection:bg-gold/30 selection:text-charcoal cursor-default overflow-x-hidden">
      <Hero />
      <SocialProof />
      <Features />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
