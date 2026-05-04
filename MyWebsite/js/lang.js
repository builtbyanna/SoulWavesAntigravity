/* ============================================================
   SOUL WAVES: Language Switcher
   Reads current URL to set active EN/DE state.
   Navigation uses /de/ directory for full German pages.
   ============================================================ */

'use strict';

function initLangSwitcher() {
  const path = window.location.pathname;
  const isDE = path.includes('/de/') || path.endsWith('/de');

  // Set html lang attribute
  document.documentElement.lang = isDE ? 'de' : 'en';

  // Update switcher active state
  document.querySelectorAll('[data-lang]').forEach(el => {
    const lang = el.getAttribute('data-lang');
    el.classList.toggle('active', lang === (isDE ? 'de' : 'en'));
  });

  // Build DE/EN counterpart link for the switcher
  document.querySelectorAll('.sw-nav__lang a, .sw-nav__mobile-lang a').forEach(link => {
    const lang = link.getAttribute('data-lang');
    if (!lang) return;

    if (lang === 'de' && !isDE) {
      // On EN page: link to DE equivalent
      const dePath = '/de' + (path === '/' ? '/index.html' : path);
      link.setAttribute('href', dePath);
    } else if (lang === 'en' && isDE) {
      // On DE page: link to EN equivalent
      const enPath = path.replace('/de/', '/').replace('/de', '/');
      link.setAttribute('href', enPath || '/index.html');
    }
  });
}

document.addEventListener('DOMContentLoaded', initLangSwitcher);
