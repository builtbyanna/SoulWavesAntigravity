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
        value: 38,
        density: { enable: false }
      },
      color: {
        value: ['#C5783C', '#C5783C', '#C5783C', '#FFF8EC']
      },
      opacity: {
        value: { min: 0.15, max: 0.45 },
        animation: {
          enable: true,
          speed: 0.6,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: { min: 1.5, max: 3.5 }
      },
      move: {
        enable: true,
        direction: 'top',
        speed: { min: 0.3, max: 0.9 },
        straight: false,
        outModes: { default: 'out' },
        random: true,
        drift: 0.3
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.04,
          opacity: 0.8
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
          particles: { number: { value: 18 } }
        }
      },
      {
        maxWidth: 480,
        options: {
          particles: { number: { value: 10 } }
        }
      }
    ],
    detectRetina: true
  });
})();
