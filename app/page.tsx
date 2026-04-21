'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Ticker from '@/components/Ticker'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Divider from '@/components/Divider'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

// Canvas uses browser-only APIs — disable SSR
const WaveSequenceScene = dynamic(
  () => import('@/components/WaveSequenceScene'),
  { ssr: false }
)

export default function Page() {
  return (
    <>
      {/*
        WaveSequenceScene renders:
          1. A <canvas> fixed at z-index 0 that draws wave frames
          2. A loading overlay at z-index 200 that fades out when preload completes
        All page content sits at z-index 10+, floating over the canvas.
      */}
      <WaveSequenceScene />

      {/* Page content — relative, z-index 10 */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* 1. Sticky nav */}
        <Navbar />

        {/* 2. Ticker — immediately below nav, dark band */}
        <div className="pt-16">
          <Ticker />
        </div>

        {/* 3. Hero — transparent, dark glass panel */}
        <Hero />

        {/* 4. About — transparent, cream panel */}
        <About />

        {/* 5. Divider — solid dark */}
        <Divider />

        {/* 6. Services — transparent, cream cards */}
        <Services />

        {/* 7. How It Works — transparent, cream panel */}
        <Process />

        {/* 8. Testimonials — solid dark */}
        <Testimonials />

        {/* 10. Contact — photo bg with overlay */}
        <ContactSection />

        {/* 11. Footer — solid dark */}
        <Footer />
      </div>
    </>
  )
}
