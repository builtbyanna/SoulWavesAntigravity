(function () {
  if (typeof tsParticles === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  tsParticles.load('hero-particles', {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: {
        value: 18,
        density: { enable: false }
      },
      color: {
        value: ['#FFF8EC', '#FFF8EC', '#C5783C']
      },
      opacity: {
        value: { min: 0.05, max: 0.2 },
        animation: {
          enable: true,
          speed: 0.2,
          minimumValue: 0.03,
          sync: false
        }
      },
      size: {
        value: { min: 0.8, max: 1.8 }
      },
      move: {
        enable: true,
        direction: 'top',
        speed: 0.03,
        straight: false,
        outModes: { default: 'out' },
        random: true,
        drift: 0.05
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.02,
          opacity: 0.5
        }
      },
      links: { enable: false },
      shape: { type: 'circle' }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: { enable: false },
        onClick: { enable: false }
      }
    },
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: { number: { value: 10 } }
        }
      },
      {
        maxWidth: 480,
        options: {
          particles: { number: { value: 6 } }
        }
      }
    ],
    detectRetina: true
  });
})();
