/* ============================================================
   SOUL WAVES: Frieda Chatbot Widget
   OpenAI-powered, bilingual EN/DE, GDPR-compliant, lead capture.
   ============================================================ */

'use strict';

(function () {

  const BOOKING = 'https://calendar.app.google/WKhMs5XL1DeaccdK6';
  const MAX_TURNS = 10;

  // ---- State -----------------------------------------------------------

  let conversationHistory = [];
  let sessionId = '';
  let hasConsented = false;
  let turnCount = 0;
  let leadCaptured = false;
  let isOpen = false;
  let isSending = false;

  // ---- Language detection (per message) --------------------------------

  function detectMsgLang(msg) {
    if (/[äöüßÄÖÜ]/.test(msg)) return 'de';
    const m = msg.toLowerCase();
    const deWords = ['ich', 'du', 'ist', 'war', 'mit', 'auf', 'das', 'die', 'der', 'und', 'für',
      'nicht', 'wie', 'was', 'wer', 'bitte', 'danke', 'hallo', 'ja', 'nein', 'machen', 'haben',
      'kannst', 'machst', 'bietet', 'kostet', 'gibt', 'welche', 'kann', 'bin', 'mir', 'mich'];
    const hits = deWords.filter(w => new RegExp(`\\b${w}\\b`).test(m)).length;
    return hits >= 2 ? 'de' : 'en';
  }

  // Site language (for hardcoded UI strings)
  const siteLang = document.documentElement.lang.startsWith('de') ? 'de' : 'en';

  // ---- UUID generator --------------------------------------------------

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // ---- Session init ----------------------------------------------------

  function initSession() {
    sessionId = sessionStorage.getItem('sw_session') || generateUUID();
    sessionStorage.setItem('sw_session', sessionId);

    hasConsented = !!sessionStorage.getItem('sw_consent');

    const savedHistory = sessionStorage.getItem('sw_history');
    if (savedHistory) {
      try {
        conversationHistory = JSON.parse(savedHistory);
        turnCount = conversationHistory.filter(m => m.role === 'user').length;
      } catch (_) {
        conversationHistory = [];
      }
    }
  }

  function saveHistory() {
    try {
      sessionStorage.setItem('sw_history', JSON.stringify(conversationHistory.slice(-20)));
    } catch (_) {}
  }

  // ---- GDPR consent text -----------------------------------------------

  const CONSENT = {
    en: {
      title: "Hey, I'm Frieda. ✨",
      body: `I'm an AI. Anything personal you share (like your email) gets stored safely.`,
      start: "Got it, let's chat",
      privacy: 'Privacy Policy',
      privacyHref: '/privacy-policy.html',
    },
    de: {
      title: "Hey, ich bin Frieda. ✨",
      body: `Ich bin eine KI. Persönliche Infos, die du teilst (z. B. deine E-Mail), werden sicher gespeichert.`,
      start: "Alles klar, los geht's",
      privacy: 'Datenschutz',
      privacyHref: '/datenschutz.html',
    },
  };

  const GREETINGS = {
    en: "Hey! ✨ I'm Frieda, Soul Waves' AI assistant — not a human, but I know everything about what Anna builds. What can I help you with?",
    de: "Hey! ✨ Ich bin Frieda, die KI-Assistentin von Soul Waves — kein Mensch, aber ich kenn' Annas Arbeit in- und auswendig. Wie kann ich dir helfen?",
  };

  const QUICK_REPLIES = {
    en: ['What do you build?', 'How much does it cost?', 'See your work', "I'm not sure yet"],
    de: ['Was baust du?', 'Was kostet das?', 'Zeig mir dein Portfolio', 'Ich bin mir unsicher'],
  };

  const TURN_LIMIT_MSG = {
    en: `That's my 10-message limit for one session — but this conversation clearly wants to keep going. [Book a free call with Anna](${BOOKING}) or email her at anna@soulwavesva.com. She'll take it from here. ✨`,
    de: `Das ist mein 10-Nachrichten-Limit für eine Session — aber das Gespräch will offensichtlich weitergehen. [Buch direkt einen kostenlosen Termin mit Anna](${BOOKING}) oder schreib an anna@soulwavesva.com. Sie übernimmt. ✨`,
  };

  const UI = {
    en: {
      chatLabel: 'Chat with Frieda',
      statusLine: 'Soul Waves AI Assistant',
      closeLabel: 'Close chat',
      placeholder: 'Ask me anything...',
      inputLabel: 'Message to Frieda',
      sendLabel: 'Send',
      triggerText: 'Summon Frieda ✨',
    },
    de: {
      chatLabel: 'Chat mit Frieda',
      statusLine: 'Soul Waves KI-Assistentin',
      closeLabel: 'Chat schließen',
      placeholder: 'Frag mich alles...',
      inputLabel: 'Nachricht an Frieda',
      sendLabel: 'Senden',
      triggerText: 'Frag Frieda ✨',
    },
  };

  // ---- Markdown renderer -----------------------------------------------

  function renderText(raw) {
    return raw
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<span class="frieda-hl">$1</span>')
      .replace(/\n/g, '<br>');
  }

  // ---- DOM helpers -----------------------------------------------------

  function addMessage(text, sender) {
    const list = document.getElementById('frieda-messages');
    const row = document.createElement('div');
    row.className = `frieda-msg frieda-msg--${sender}`;
    const bubble = document.createElement('span');
    bubble.className = 'frieda-msg__bubble';
    bubble.innerHTML = renderText(text);
    row.appendChild(bubble);
    list.appendChild(row);
    list.scrollTop = list.scrollHeight;
  }

  function showTyping() {
    const list = document.getElementById('frieda-messages');
    const row = document.createElement('div');
    row.className = 'frieda-msg frieda-msg--frieda frieda-msg--typing';
    row.id = 'frieda-typing';
    row.innerHTML = '<span class="frieda-msg__bubble"><span class="frieda-dots"><span></span><span></span><span></span></span></span>';
    list.appendChild(row);
    list.scrollTop = list.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('frieda-typing');
    if (t) t.remove();
  }

  function showQuickReplies(lang) {
    const existing = document.getElementById('frieda-quick-replies');
    if (existing) existing.remove();

    const wrap = document.createElement('div');
    wrap.className = 'frieda-quick-replies';
    wrap.id = 'frieda-quick-replies';

    QUICK_REPLIES[lang].forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'frieda-quick-reply';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        wrap.remove();
        handleSend(label);
      });
      wrap.appendChild(btn);
    });

    const list = document.getElementById('frieda-messages');
    list.appendChild(wrap);
    list.scrollTop = list.scrollHeight;
  }

  // ---- Lead detection --------------------------------------------------

  function checkForLeadInfo(userMsg) {
    if (leadCaptured) return;
    const emailMatch = userMsg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (!emailMatch) return;

    const nameMatch = userMsg.match(
      /(?:I'?m|my name is|ich bin|ich hei[sß]e)\s+([A-Za-zÄÖÜäöüß]+)/i
    );
    const name = nameMatch ? nameMatch[1] : null;
    const email = emailMatch[0];

    const messageSummary = conversationHistory
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .slice(0, 3)
      .join(' | ');

    leadCaptured = true;

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        messageSummary,
        sessionId,
        lang: detectMsgLang(userMsg),
        consentTimestamp: sessionStorage.getItem('sw_consent_ts'),
        transcript: conversationHistory,
      }),
    }).catch(() => {});
  }

  // ---- API call --------------------------------------------------------

  async function callChat(userMsg) {
    const detectedLang = detectMsgLang(userMsg);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: conversationHistory,
        sessionId,
        lang: detectedLang,
      }),
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return data.reply || '';
  }

  // ---- Send logic ------------------------------------------------------

  async function handleSend(text) {
    if (!text || !text.trim() || isSending) return;

    const input = document.getElementById('frieda-input');
    text = text.trim();
    if (input) input.value = '';

    // Remove quick replies on first real message
    const qr = document.getElementById('frieda-quick-replies');
    if (qr) qr.remove();

    if (turnCount >= MAX_TURNS) {
      const lang = detectMsgLang(text);
      addMessage(TURN_LIMIT_MSG[lang] || TURN_LIMIT_MSG.en, 'frieda');
      return;
    }

    addMessage(text, 'user');
    conversationHistory.push({ role: 'user', content: text });
    saveHistory();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) showTyping();
    isSending = true;

    try {
      const reply = await callChat(text);
      hideTyping();
      conversationHistory.push({ role: 'assistant', content: reply });
      saveHistory();
      addMessage(reply, 'frieda');
      turnCount++;

      checkForLeadInfo(text);
    } catch (_) {
      hideTyping();
      const fallback = siteLang === 'de'
        ? 'Hm, da ist etwas schiefgelaufen. ✨ Schreib Anna direkt: anna@soulwavesva.com'
        : 'Oops, something broke on my end. ✨ Email Anna directly: anna@soulwavesva.com';
      addMessage(fallback, 'frieda');
    } finally {
      isSending = false;
    }
  }

  // ---- GDPR consent flow -----------------------------------------------

  function logConsent(consentText) {
    const ts = new Date().toISOString();
    sessionStorage.setItem('sw_consent', '1');
    sessionStorage.setItem('sw_consent_ts', ts);

    fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        consentType: 'chat_start',
        consentText,
        lang: siteLang,
      }),
    }).catch(() => {});
  }

  function showConsentOverlay() {
    const c = CONSENT[siteLang];
    const overlay = document.getElementById('frieda-consent');
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="frieda-consent__box">
        <p class="frieda-consent__title">${c.title}</p>
        <p class="frieda-consent__body">${c.body.replace(/\n/g, '<br>')}</p>
        <div class="frieda-consent__actions">
          <button class="frieda-consent__start" id="frieda-consent-start">${c.start}</button>
          <a class="frieda-consent__privacy" href="${c.privacyHref}" target="_blank" rel="noopener">${c.privacy} ↗</a>
        </div>
      </div>`;

    overlay.style.display = 'flex';

    document.getElementById('frieda-consent-start').addEventListener('click', () => {
      logConsent(c.body);
      hasConsented = true;
      overlay.style.display = 'none';
      showGreeting();
    });
  }

  function showGreeting() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => {
      addMessage(GREETINGS[siteLang], 'frieda');
      conversationHistory.push({ role: 'assistant', content: GREETINGS[siteLang] });
      saveHistory();
      setTimeout(() => showQuickReplies(siteLang), reduced ? 0 : 300);
    }, reduced ? 0 : 350);
  }

  // ---- Widget open / close --------------------------------------------

  function openWidget() {
    const panel = document.getElementById('frieda-panel');
    const trigger = document.getElementById('frieda-trigger');
    isOpen = true;

    panel.classList.add('open');
    panel.removeAttribute('aria-hidden');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.classList.add('active');

    const list = document.getElementById('frieda-messages');

    if (!hasConsented) {
      showConsentOverlay();
    } else if (!list.children.length) {
      showGreeting();
    }

    setTimeout(() => {
      const inp = document.getElementById('frieda-input');
      if (inp && hasConsented) inp.focus();
    }, 420);
  }

  function closeWidget() {
    const panel = document.getElementById('frieda-panel');
    const trigger = document.getElementById('frieda-trigger');
    isOpen = false;

    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.classList.remove('active');
  }

  // ---- Build DOM -------------------------------------------------------

  function buildWidget() {
    const ui = UI[siteLang];

    const widget = document.createElement('div');
    widget.className = 'frieda-widget';
    widget.setAttribute('aria-label', ui.chatLabel);

    widget.innerHTML = `
<div
  class="frieda-panel"
  id="frieda-panel"
  role="dialog"
  aria-modal="false"
  aria-label="${ui.chatLabel}"
  aria-hidden="true"
>
  <div class="frieda-panel__header">
    <div class="frieda-panel__identity">
      <span class="frieda-panel__name">Frieda ✨</span>
      <span class="frieda-panel__status">${ui.statusLine}</span>
    </div>
    <button class="frieda-panel__close" id="frieda-close" aria-label="${ui.closeLabel}">&times;</button>
  </div>
  <div id="frieda-consent" class="frieda-consent" style="display:none;"></div>
  <div
    class="frieda-panel__messages"
    id="frieda-messages"
    role="log"
    aria-live="polite"
    aria-relevant="additions text"
    aria-label="${siteLang === 'de' ? 'Chatverlauf' : 'Chat history'}"
  ></div>
  <div class="frieda-panel__input-wrap">
    <input
      type="text"
      class="frieda-panel__input"
      id="frieda-input"
      placeholder="${ui.placeholder}"
      autocomplete="off"
      aria-label="${ui.inputLabel}"
      maxlength="400"
    >
    <button class="frieda-panel__send" id="frieda-send" aria-label="${ui.sendLabel}">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    </button>
  </div>
</div>
<button
  class="frieda-trigger"
  id="frieda-trigger"
  aria-expanded="false"
  aria-controls="frieda-panel"
  aria-label="${ui.chatLabel}"
  translate="no"
>
  <span class="frieda-trigger__sparkle" aria-hidden="true">✨</span>
  <span class="frieda-trigger__text">${ui.triggerText}</span>
</button>`;

    document.body.appendChild(widget);
  }

  // ---- Events ----------------------------------------------------------

  function bindEvents() {
    document.getElementById('frieda-trigger').addEventListener('click', () => {
      isOpen ? closeWidget() : openWidget();
    });

    document.getElementById('frieda-close').addEventListener('click', () => {
      closeWidget();
      document.getElementById('frieda-trigger').focus();
    });

    document.getElementById('frieda-send').addEventListener('click', () => {
      const input = document.getElementById('frieda-input');
      handleSend(input.value);
    });

    document.getElementById('frieda-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const input = document.getElementById('frieda-input');
        handleSend(input.value);
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) {
        closeWidget();
        document.getElementById('frieda-trigger').focus();
      }
    });
  }

  // ---- Init ------------------------------------------------------------

  function init() {
    initSession();
    buildWidget();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.openFrieda = function () {
    if (document.getElementById('frieda-panel')) openWidget();
  };

})();
