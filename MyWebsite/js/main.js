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

  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          dividerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.section-divider').forEach(el => {
    dividerObserver.observe(el);
  });
}

// ---- Hero elements animate in on load ----

function initHeroAnimation() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const eyebrow  = document.querySelector('.hero__eyebrow');
  const headline = document.querySelector('.hero__headline');
  const subline  = document.querySelector('.hero__subline');
  const cta      = document.querySelector('.hero__cta-wrap');
  const photo    = document.querySelector('.hero__photo-wrap');

  if (prefersReduced) {
    [eyebrow, headline, subline, cta, photo].forEach(el => el && el.classList.add('visible'));
    return;
  }

  if (eyebrow)  setTimeout(() => eyebrow.classList.add('visible'),   50);
  if (headline) setTimeout(() => headline.classList.add('visible'),  200);
  if (subline)  setTimeout(() => subline.classList.add('visible'),   380);
  if (cta)      setTimeout(() => cta.classList.add('visible'),       560);
  if (photo)    setTimeout(() => photo.classList.add('visible'),     300);
}

// ---- Ken Burns: pause for prefers-reduced-motion ----

function initKenBurns() {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bg.style.animationPlayState = 'paused';
  }
}

// ---- Parallax: cinematic bg ----

function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cinematicBg = document.querySelector('.cinematic__bg');

  if (!cinematicBg) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

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

// ---- Scroll Progress Bar ----

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(100, pct) + '%';
  }, { passive: true });
}

// ---- Desaturation-to-color reveal on scroll ----
// Handles both the standalone about.html and the inline about section on index.html

function initDesaturationReveal() {
  const selectors = ['.about-before__photo img', '.about-inline__prisonguard', '.about-section__prisonguard'];
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
    nav.classList.toggle('sw-nav--scrolled', window.scrollY > 80);
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

// ---- Button ripple effect ----

function initRipple() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

// ---- Card 3D tilt ----

function initCardTilt() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  document.querySelectorAll('.service-visual-card, .portfolio-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tiltX = -(dy * 2.5);
      const tiltY = dx * 2.5;
      this.style.setProperty('--tilt-x', `${tiltX}deg`);
      this.style.setProperty('--tilt-y', `${tiltY}deg`);
      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      this.style.boxShadow = `${-dx * 8}px ${-dy * 8}px 40px rgba(68,20,13,0.15), 0 0 0 1px rgba(197,120,60,0.2)`;
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
      this.style.setProperty('--tilt-x', '0deg');
      this.style.setProperty('--tilt-y', '0deg');
    });
  });
}

// ---- Pull-quote carousel (auto-play + prev/next arrows) ----

function initPullQuoteCarousel() {
  const track = document.querySelector('.testimonial-carousel__track');
  if (!track) return;
  const quotes = track.querySelectorAll('.pull-quote--inline');
  if (quotes.length < 2) return;

  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  let current = 0;
  let timer;

  function showQuote(index) {
    quotes.forEach((q, i) => {
      q.style.opacity = i === index ? '1' : '0';
      q.style.pointerEvents = i === index ? '' : 'none';
    });
  }

  function go(dir) {
    current = (current + dir + quotes.length) % quotes.length;
    showQuote(current);
    clearInterval(timer);
    timer = setInterval(() => go(1), 6000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => go(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(1));

  showQuote(0);
  timer = setInterval(() => go(1), 6000);
}

// ---- Dark sections: scroll-reactive diagonal shimmer parallax ----

function initAboutShimmer() {
  const sections = ['about', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function updateSection(section) {
    const rect = section.getBoundingClientRect();
    const total = window.innerHeight + section.offsetHeight;
    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));
    const offset = -(progress * 80);
    section.style.setProperty('--spotlight-offset', `${offset.toFixed(1)}px`);
  }

  function update() {
    sections.forEach(updateSection);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ---- Copy to clipboard ----

function showCopyToast(anchorEl) {
  const existing = document.querySelector('.copy-toast');
  if (existing) existing.remove();

  const toast = document.createElement('span');
  toast.className = 'copy-toast';
  toast.textContent = 'Kopiert!';
  document.body.appendChild(toast);

  const rect = anchorEl.getBoundingClientRect();
  const tw = toast.offsetWidth;
  let left = rect.right + 8;
  if (left + tw > window.innerWidth - 8) left = rect.left - tw - 8;
  toast.style.top = (rect.top + (rect.height - toast.offsetHeight) / 2) + 'px';
  toast.style.left = left + 'px';

  requestAnimationFrame(() => toast.classList.add('copy-toast--show'));

  setTimeout(() => {
    toast.classList.remove('copy-toast--show');
    setTimeout(() => toast.remove(), 200);
  }, 1500);
}

function initCopyToClipboard() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const text = this.dataset.copy;
      const anchor = this;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => showCopyToast(anchor));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopyToast(anchor);
      }
    });
  });
}

// ---- Init ----

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
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
  initRipple();
  initCardTilt();
  initPullQuoteCarousel();
  initAboutShimmer();
  initCopyToClipboard();
});
