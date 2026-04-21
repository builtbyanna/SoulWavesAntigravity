import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Soul Waves — Digital Back-End for Small Expert Businesses',
  description:
    'Websites. Course platforms. Video editing. Visual assets. AI chatbots. One person. Fixed scope. Done properly. Based in Bali, working everywhere.',
  keywords: 'website build, course platform, AI chatbot, video editing, visual assets, digital operations, Bali, freelancer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Tsukimi+Rounded:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
