/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-brown': '#36110D',
        'accent-brown': '#8B1C13',
        'cream': '#FFF8EC',
        'sand': '#E3C4A5',
        'warm-text': '#543224',
      },
      fontFamily: {
        heading: ["'Tsukimi Rounded'", 'system-ui', 'sans-serif'],
        body: ["'Tsukimi Rounded'", 'system-ui', 'sans-serif'],
        'great-vibes': ["'Great Vibes'", 'cursive'],
        courier: ["'Courier Prime'", 'Courier', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
