/* ============================================================
   SOUL WAVES: Main JS
   Scroll animations, parallax, Ken Burns, mobile nav
   ============================================================ */

'use strict';

// ---- Scroll animations via IntersectionObserver ----

function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    // Skip animation setup: show all elements immediately
    document.querySelectorAll('.fade-up, .slide-left, .slide-right').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.fade-up, .slide-left, .slide-right').forEach(el => {
    observer.observe(el);
  });
}

// ---- Hero elements animate in on load ----

function initHeroAnimation() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const headline = document.querySelector('.hero__headline');
  const subline  = document.querySelector('.hero__subline');
  const cta      = document.querySelector('.hero__cta-wrap');
  const photo    = document.querySelector('.hero__photo-wrap');

  if (prefersReduced) {
    [headline, subline, cta, photo].forEach(el => el && el.classList.add('visible'));
    return;
  }

  if (headline) setTimeout(() => headline.classList.add('visible'), 100);
  if (subline)  setTimeout(() => subline.classList.add('visible'),  320);
  if (cta)      setTimeout(() => cta.classList.add('visible'),      520);
  if (photo)    setTimeout(() => photo.classList.add('visible'),    420);
}

// ---- Ken Burns: pause for prefers-reduced-motion ----

function initKenBurns() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bg.style.animationPlayState = 'paused';
  }
}

// ---- Parallax: coconut photo + cinematic bg ----

function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const coconutWrap = document.querySelector('.hero__photo-wrap');
  const cinematicBg = document.querySelector('.cinematic__bg');

  if (!coconutWrap && !cinematicBg) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (coconutWrap) {
          coconutWrap.style.transform = `translateY(${scrollY * 0.10}px)`;
        }

        if (cinematicBg) {
          const section = cinematicBg.closest('.cinematic');
          if (section) {
            const rect = section.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const clamped = Math.max(0, Math.min(1, progress));
            const scale = 1 + clamped * 0.07;
            cinematicBg.style.transform = `scale(${scale})`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- Desaturation-to-color reveal on scroll ----
// Handles both the standalone about.html and the inline about section on index.html

function initDesaturationReveal() {
  const selectors = ['.about-before__photo img', '.about-inline__prisonguard'];
  const photo = selectors.reduce((found, sel) => found || document.querySelector(sel), null);
  if (!photo) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    photo.style.filter = 'grayscale(0%)';
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          photo.style.transition = 'filter 1.2s ease';
          photo.style.filter = 'grayscale(0%)';
          observer.unobserve(photo);
        }
      });
    },
    { threshold: 0.35 }
  );

  photo.style.filter = 'grayscale(70%)';
  observer.observe(photo);
}

// ---- Service accordion toggle ----

function initAccordion() {
  const triggers = document.querySelectorAll('.accord-trigger');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accord-item');
      const isOpen = item.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.accord-item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.accord-trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ---- Active nav link ----

function initActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.sw-nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const isHome = (filename === 'index.html' || filename === '') && href === 'index.html';
    const isMatch = href === filename;

    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });
}

// ---- Mobile nav toggle ----

function initMobileNav() {
  const hamburger  = document.querySelector('.sw-nav__hamburger');
  const mobileMenu = document.querySelector('.sw-nav__mobile-menu');
  const closeBtn   = document.querySelector('.sw-nav__mobile-close');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

// ---- Nav: add scrolled class for visual feedback ----

function initNavScroll() {
  const nav = document.querySelector('.sw-nav');
  if (!nav) return;

  function update() {
    nav.classList.toggle('sw-nav--scrolled', window.scrollY > 24);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ---- About timeline sequential reveal ----

function initTimelineReveal() {
  const beats = document.querySelectorAll('.about-timeline__beat');
  if (!beats.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    beats.forEach(b => b.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -32px 0px' }
  );

  beats.forEach(beat => observer.observe(beat));
}

// ---- Init ----

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHeroAnimation();
  initKenBurns();
  initParallax();
  initDesaturationReveal();
  initActiveNav();
  initMobileNav();
  initNavScroll();
  initTimelineReveal();
  initAccordion();
});
