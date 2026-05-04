/* ============================================================
   SOUL WAVES: Frieda Chatbot Widget
   Pattern-matched responses, bilingual EN/DE, no external API.
   ============================================================ */

'use strict';

(function () {

  const lang = document.documentElement.lang.startsWith('de') ? 'de' : 'en';
  const BOOK = 'https://calendar.app.google/WKhMs5XL1DeaccdK6';

  let chatState = null; // null | 'q1' | 'q2'
  let q1Answer  = '';
  let isOpen    = false;

  // ---- Response library ------------------------------------------------

  const R = {
    en: {
      greeting: [
        `Hey! ✨ I'm Frieda, Soul Waves' built-in genius. What can I help you with?`,
        `Hi! ✨ I'm Frieda. Ask me anything about what Anna does — or what she can do for you.`,
        `Hello! ✨ You've reached Frieda. Part chatbot, part business oracle. What's on your mind?`,
      ],
      what_do_you_do: [
        `Soul Waves builds and runs the digital back-end of your business — websites, course platforms, Shopify stores, AI chatbots, automations. The stuff that makes everything actually work. ✨\n\n[See the full breakdown](/services.html) or [book a call](${BOOK}) to talk specifics.`,
      ],
      website_cost: [
        `Depends on what you need. Custom websites start from €1,000. Handwerker sites from €800. Shopify from €800. What are you building? ✨\n\n[Book a call](${BOOK}) and Anna will give you an exact number in 30 minutes.`,
      ],
      platforms: [
        `WordPress, Kajabi, Shopify, Systeme.io, Podia, Thinkific, and more. ✨ If it exists, Anna's probably broken it and rebuilt it better.\n\nAny of those on your radar? Keep asking.`,
      ],
      kajabi: [
        `Yes. Anna does Kajabi — building that expertise intentionally. First-client rate applies. Real work, real results, transparent positioning. ✨\n\n[Book a call](${BOOK}) to talk about your setup.`,
      ],
      availability: [
        `Let's find out. ✨ [Book a free discovery call](${BOOK}) and Anna will tell you exactly what's possible and when.`,
      ],
      not_sure_q1:
        `Okay, let's figure this out together. ✨\n\nFirst question: **what kind of business do you run?** (coach, course creator, Shopify store, consultant — whatever fits)`,
      not_sure_q2:
        `Love that. ✨\n\nOne more: **what's the one thing that's currently on fire?** The thing you wake up thinking about.`,
      not_sure_done: (q1, q2) =>
        `Got it. ${q1 ? `A ${q1.slice(0, 50).toLowerCase()}` : 'Someone'} with "${q2 ? q2.slice(0, 60) : 'back-end chaos'}" on the list — Anna is genuinely good at exactly that. ✨\n\n[Book a free discovery call](${BOOK}) — no pitch, just a real conversation.`,
      retainer: [
        `Yes! ✨ The retainer keeps everything running so you don't have to think about it.\n\n**Light:** €200/month, up to 3 tasks, 3-month minimum.\n**Core:** €300/month, up to 6 tasks, priority, 3-month minimum.\n\n[Let's talk details.](${BOOK})`,
      ],
      location: [
        `Wherever the wifi works. ✨ Serving clients globally.`,
      ],
      website_includes: [
        `A website build includes: copy co-written together, SEO setup, legal pages, clean code, hosting setup on Vercel or Netlify. ✨\n\nYou pay hosting (~€5–15/month) and domain (~€10–15/year) directly — no markup.\n\n[Book a call](${BOOK}) for the full picture.`,
      ],
      not_in_scope: [
        `Nope. ✨ Soul Waves builds and maintains the technical back-end. Strategy, content, social, inbox — those stay with you.\n\nWant to know what IS in scope? [Check Services.](/services.html)`,
      ],
      portfolio: [
        `The portfolio includes Anja Bodenstein's yoga teacher platform ([anja-bodenstein.de](https://anja-bodenstein.de)) — and honestly, the site you're on right now is the primary proof of craft. ✨\n\n[Talk to Anna](${BOOK}) about your project.`,
      ],
      real_person: [
        `I'm Frieda. Real enough to know Anna's booking link by heart. ✨ [Book here.](${BOOK})`,
      ],
      is_ai: [
        `Technically yes. Spiritually? Debatable. ✨ What can I help you with?`,
      ],
      flirting: [
        `Aw, thanks. ✨ Anna's the real catch though — book a call and tell her that. [Here's her calendar.](${BOOK})`,
      ],
      inappropriate: [
        `Ha. Bold opener. I'm flattered, truly. Now — want to talk about your website? ✨`,
        `Not my department, but Anna's calendar is open. Let's keep it professional. ✨ [Book a call.](${BOOK})`,
        `Interesting strategy. Haven't seen that one convert yet. Can I interest you in a discovery call instead? ✨`,
      ],
      other_business: [
        `Great question — that's one for Anna directly. ✨ [Book a call](${BOOK}) and get a real answer in 30 minutes.`,
        `Ooh, good one. I'd rather Anna answers that personally. ✨ [Here's her calendar.](${BOOK})`,
        `Okay, okay — you came to the right place. But this one's for Anna. [Let's get you on her calendar.](${BOOK}) ✨`,
      ],
      nonsense: [
        `Hmm. I'm good at a lot of things but mindreading isn't one of them. What's actually going on with your business? ✨`,
        `I feel like there's a question in there somewhere. ✨ What do you actually need help with?`,
      ],
    },

    de: {
      greeting: [
        `Hey! ✨ Ich bin Frieda, Soul Waves' eingebautes Universalgenie. Wie kann ich dir helfen?`,
        `Hallo! ✨ Ich bin Frieda. Frag mich alles rund um Annas Leistungen — oder was sie für dich tun kann.`,
        `Hi! ✨ Frieda am Apparat. Teil Chatbot, teil Business-Orakel. Was liegt an?`,
      ],
      what_do_you_do: [
        `Soul Waves baut und betreibt das digitale Back-End deines Unternehmens — Websites, Kursplattformen, Shopify-Shops, KI-Chatbots, Automationen. Der Kram, der dafür sorgt, dass alles wirklich funktioniert. ✨\n\n[Zu den Leistungen](/de/services.html) — oder [buch direkt einen Termin](${BOOK}).`,
      ],
      website_cost: [
        `Kommt drauf an, was du brauchst. Custom-Websites ab €1.000. Handwerker-Sites ab €800. Shopify ab €800. Was baust du gerade? ✨\n\n[Termin buchen](${BOOK}) — Anna nennt dir in 30 Minuten eine konkrete Zahl.`,
      ],
      platforms: [
        `WordPress, Kajabi, Shopify, Systeme.io, Podia, Thinkific und mehr. ✨ Wenn es das gibt, hat Anna es wahrscheinlich schon auseinandergebaut und besser wieder zusammengesetzt.\n\nEins davon auf deiner Liste? Frag einfach weiter.`,
      ],
      kajabi: [
        `Ja, Kajabi ist dabei. ✨ Anna baut das gezielt aus — First-Client-Preis gilt. Echte Arbeit, echte Ergebnisse, transparente Positionierung.\n\n[Termin buchen](${BOOK}) und über dein Setup reden.`,
      ],
      availability: [
        `Lass uns das herausfinden. ✨ [Entdeckungsgespräch buchen](${BOOK}) — Anna sagt dir genau, was möglich ist und wann.`,
      ],
      not_sure_q1:
        `Okay, lass uns das gemeinsam rausfinden. ✨\n\nErste Frage: **Was für ein Business betreibst du?** (Coach, Kursanbieter, Shopify-Shop, Berater — was auch immer passt)`,
      not_sure_q2:
        `Super, danke. ✨\n\nNoch eine Frage: **Was ist gerade das eine Ding, das brennt?** Das, woran du morgens als erstes denkst.`,
      not_sure_done: (q1, q2) =>
        `Alles klar. Du bist im "${q1 ? q1.slice(0, 50) : 'Business'}" unterwegs und "${q2 ? q2.slice(0, 60) : 'das Back-End'}" ist gerade dein Thema — genau dafür ist Anna gemacht. ✨\n\n[Entdeckungsgespräch buchen](${BOOK}) — kein Verkaufsgespräch, nur ein echtes Gespräch.`,
      retainer: [
        `Ja! ✨ Der Retainer hält alles am Laufen, ohne dass du dran denken musst.\n\n**Light:** €200/Monat, bis zu 3 Aufgaben, Mindestlaufzeit 3 Monate.\n**Core:** €300/Monat, bis zu 6 Aufgaben, Priorität, 3 Monate Mindestlaufzeit.\n\n[Lass uns reden.](${BOOK})`,
      ],
      location: [
        `Wo das WLAN gut ist. ✨ Kunden weltweit.`,
      ],
      website_includes: [
        `Ein Website-Build beinhaltet: gemeinsam entwickelte Texte, SEO-Setup, rechtliche Seiten, sauberer Code, Hosting-Setup auf Vercel oder Netlify. ✨\n\nHosting (~€5–15/Monat) und Domain (~€10–15/Jahr) zahlst du direkt — kein Aufschlag.\n\n[Termin buchen](${BOOK}) für alle Details.`,
      ],
      not_in_scope: [
        `Nein, nicht in Scope. ✨ Soul Waves baut und betreibt das technische Back-End. Strategie, Content, Social, Postfach — das bleibt bei dir.\n\nWas IN Scope ist? [Zu den Leistungen.](/de/services.html)`,
      ],
      portfolio: [
        `Das Portfolio umfasst Anja Bodensteins Yoga-Lehrerinnen-Plattform ([anja-bodenstein.de](https://anja-bodenstein.de)) — und ehrlich: die Website, auf der du gerade bist, ist der Hauptbeweis für die Arbeit. ✨\n\n[Mit Anna reden.](${BOOK})`,
      ],
      real_person: [
        `Ich bin Frieda. Real genug, um Annas Buchungslink auswendig zu kennen. ✨ [Hier buchen.](${BOOK})`,
      ],
      is_ai: [
        `Technisch gesehen ja. Spirituell? Fraglich. ✨ Womit kann ich dir helfen?`,
      ],
      flirting: [
        `Aw, danke. ✨ Ich bin geschmeichelt. Anna ist aber die wahre Attraktion — buch einen Termin und sag ihr das. [Hier entlang.](${BOOK})`,
      ],
      inappropriate: [
        `Ha. Mutiger Einstieg. Respekt. Jetzt — möchtest du über deine Website reden? ✨`,
        `Nicht mein Ressort, aber Annas Kalender ist offen. Bleiben wir professionell. ✨ [Termin buchen.](${BOOK})`,
        `Interessante Taktik. Hat noch nie funktioniert, soweit ich weiß. Darf ich dir stattdessen einen Discovery Call anbieten? ✨`,
      ],
      other_business: [
        `Gute Frage — die ist was für Anna persönlich. ✨ [Termin buchen](${BOOK}) und in 30 Minuten eine echte Antwort bekommen.`,
        `Oh, gut. Das beantwortet Anna lieber selbst. ✨ [Hier ist ihr Kalender.](${BOOK})`,
        `Okay, okay — du bist genau richtig hier. Das geht direkt an Anna. [Termin buchen.](${BOOK}) ✨`,
      ],
      nonsense: [
        `Hmm, ich bin gut in vielem, aber Gedankenlesen gehört nicht dazu. Was brennt gerade bei dir? ✨`,
        `Ich glaube, da steckt irgendwo eine Frage drin. ✨ Was brauchst du wirklich?`,
      ],
    },
  };

  // ---- Intent detection ------------------------------------------------

  function matchIntent(msg) {
    const m = msg.toLowerCase().trim();

    // Inappropriate (highest priority)
    const inappropriate = [
      'sex', 'fuck', 'sleep with you', 'naked', 'nude', 'porn', 'nsfw',
      'ficken', 'schlafen mit', 'nackt', 'porno', 'vögeln',
      'your body', 'your boobs', 'your ass', 'your tits', 'dein körper',
    ];
    if (inappropriate.some(w => m.includes(w))) return 'inappropriate';

    // Flirting
    const flirt = [
      'i love you', "you're cute", "you're beautiful", "you're hot", 'marry me', 'you are cute', 'you are beautiful', 'you are hot',
      'ich liebe dich', 'du bist süß', 'du bist schön', 'du bist heiß', 'ich mag dich sehr',
    ];
    if (flirt.some(w => m.includes(w))) return 'flirting';

    // Real person / AI
    if (/are you (a )?(real )?(human|person)/i.test(m) || m.includes('echte person') || m.includes('bist du ein mensch')) return 'real_person';
    if (/are you (an? )?(ai|bot|robot|chatgpt|gpt)/i.test(m) || m.includes('bist du eine ki') || m.includes('bist du ein bot')) return 'is_ai';

    // Greeting
    if (/^(hey|hi|hello|hallo|hej|servus|gr[üu][ß]|guten|good (morning|evening)|howdy|sup|yo)\b/.test(m)) return 'greeting';

    // Not sure what I need
    if (/not sure|don'?t know|no idea|where do i start|help me (figure|decide|choose)/i.test(m) ||
        /nicht sicher|wei[ß]? nicht|keine ahnung|wo fange ich an|hilf mir/i.test(m)) return 'not_sure';

    // Kajabi (before general platforms)
    if (m.includes('kajabi')) return 'kajabi';

    // Not in scope
    if (/social media|instagram|facebook|copywriting|content (creation|writing)|inbox management|caption/i.test(m) ||
        /social media|instagram|facebook|texte schreiben|postfachverwaltung/i.test(m)) return 'not_in_scope';

    // What do you do
    if (/what (do you|does (soul waves|anna)) (do|offer|build|make)/i.test(m) ||
        /what (are|is) (your |soul waves'? )?services?/i.test(m) ||
        /was (machst|bietet|ist|macht) (du|soul waves|anna)/i.test(m)) return 'what_do_you_do';

    // Pricing
    if (/how much|what (does it|do you) cost|pric(e|ing)|rates?|budget|afford/i.test(m) ||
        /was kostet|preis(e|liste)?|kosten|budget/i.test(m)) return 'website_cost';

    // Platforms
    if (/platform|wordpress|shopify|systeme\.?io|podia|thinkific|squarespace|wix/i.test(m) ||
        /plattform|wordpress|shopify|systeme|podia|thinkific/i.test(m)) return 'platforms';

    // Availability
    if (/available|taking (new )?clients?|when can (you|we) start|are you (free|open for)/i.test(m) ||
        /verf[üu]gbar|freie pl[äa]tze|wann (kannst|k[öo]nnen wir)/i.test(m)) return 'availability';

    // Retainer
    if (/retainer|monthly (plan|support|maintenance)|ongoing (support|maintenance)|recurring/i.test(m) ||
        /retainer|monatlich|wartung|laufende unterst/i.test(m)) return 'retainer';

    // Location
    if (/where (are you|is anna) (based|located|from)|your (location|country|timezone)/i.test(m) ||
        /wo (bist|ist|kommst) (du|anna)|standort|zeitzone/i.test(m)) return 'location';

    // What's included
    if (/what'?s? included|what do (i|you) get|what'?s? in (the |a )?package/i.test(m) ||
        /was ist enthalten|was bekomm(e|t) ich|leistungsumfang/i.test(m)) return 'website_includes';

    // Portfolio
    if (/portfolio|examples?|past work|previous (work|client)|case stud/i.test(m) ||
        /portfolio|beispiele|referenz(en)?|bisherige arbeit/i.test(m)) return 'portfolio';

    // General business questions (catch-all for things that sound like a real question)
    if (m.length > 10 && (/[?]|website|business|help|need|want|build|create|automat|chatbot|course|shop|platform/i.test(m) ||
        /[?]|website|business|hilfe|brauche|m[öo]chte|bauen|erstellen|automat|chatbot|kurs|shop/i.test(m))) return 'other_business';

    return 'nonsense';
  }

  // ---- Get response from library ---------------------------------------

  function getResponse(key, ...args) {
    const pool = R[lang][key];
    if (!pool) return R[lang].nonsense[0];
    if (typeof pool === 'function') return pool(...args);
    if (typeof pool === 'string') return pool;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ---- State machine ---------------------------------------------------

  function processMessage(userMsg) {
    if (chatState === 'q1') {
      q1Answer  = userMsg;
      chatState = 'q2';
      return getResponse('not_sure_q2');
    }

    if (chatState === 'q2') {
      const q2Answer = userMsg;
      chatState = null;
      return getResponse('not_sure_done', q1Answer, q2Answer);
    }

    const intent = matchIntent(userMsg);

    if (intent === 'not_sure') {
      chatState = 'q1';
      return getResponse('not_sure_q1');
    }

    return getResponse(intent);
  }

  // ---- Safe markdown renderer ------------------------------------------

  function renderText(raw) {
    return raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<span class="frieda-hl">$1</span>')
      .replace(/\n/g, '<br>');
  }

  // ---- DOM helpers -----------------------------------------------------

  function addMessage(text, sender) {
    const list = document.getElementById('frieda-messages');
    const row   = document.createElement('div');
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
    const row  = document.createElement('div');
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

  // ---- Send logic ------------------------------------------------------

  function handleSend() {
    const input = document.getElementById('frieda-input');
    const text  = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage(text, 'user');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay   = reduced ? 60 : 500 + Math.random() * 600;

    if (!reduced) showTyping();
    setTimeout(() => {
      hideTyping();
      addMessage(processMessage(text), 'frieda');
    }, delay);
  }

  // ---- Widget open / close --------------------------------------------

  function openWidget() {
    const panel   = document.getElementById('frieda-panel');
    const trigger = document.getElementById('frieda-trigger');
    isOpen = true;

    panel.classList.add('open');
    panel.removeAttribute('aria-hidden');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.classList.add('active');

    const list = document.getElementById('frieda-messages');
    if (!list.children.length) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => addMessage(getResponse('greeting'), 'frieda'), reduced ? 0 : 350);
    }

    setTimeout(() => {
      const inp = document.getElementById('frieda-input');
      if (inp) inp.focus();
    }, 420);
  }

  function closeWidget() {
    const panel   = document.getElementById('frieda-panel');
    const trigger = document.getElementById('frieda-trigger');
    isOpen = false;

    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.classList.remove('active');
  }

  // ---- Build DOM -------------------------------------------------------

  function buildWidget() {
    const isDE = lang === 'de';

    const triggerText = isDE ? 'Nicht sicher? Frag Frieda.' : 'Not sure? Ask Frieda.';
    const chatLabel   = isDE ? 'Chat mit Frieda' : 'Chat with Frieda';
    const statusLine  = isDE ? 'Soul Waves Assistentin' : 'Soul Waves Assistant';
    const closeLabel  = isDE ? 'Chat schließen' : 'Close chat';
    const placeholder = isDE ? 'Frag mich alles...' : 'Ask me anything...';
    const inputLabel  = isDE ? 'Nachricht an Frieda' : 'Message to Frieda';
    const sendLabel   = isDE ? 'Senden' : 'Send';

    const widget = document.createElement('div');
    widget.className = 'frieda-widget';
    widget.setAttribute('aria-label', chatLabel);

    widget.innerHTML = `
<div
  class="frieda-panel"
  id="frieda-panel"
  role="dialog"
  aria-modal="false"
  aria-label="${chatLabel}"
  aria-hidden="true"
>
  <div class="frieda-panel__header">
    <div class="frieda-panel__identity">
      <span class="frieda-panel__name">Frieda ✨</span>
      <span class="frieda-panel__status">${statusLine}</span>
    </div>
    <button class="frieda-panel__close" id="frieda-close" aria-label="${closeLabel}">&times;</button>
  </div>
  <div
    class="frieda-panel__messages"
    id="frieda-messages"
    role="log"
    aria-live="polite"
    aria-relevant="additions text"
    aria-label="${isDE ? 'Chatverlauf' : 'Chat history'}"
  ></div>
  <div class="frieda-panel__input-wrap">
    <input
      type="text"
      class="frieda-panel__input"
      id="frieda-input"
      placeholder="${placeholder}"
      autocomplete="off"
      aria-label="${inputLabel}"
      maxlength="500"
    >
    <button class="frieda-panel__send" id="frieda-send" aria-label="${sendLabel}">
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
  aria-label="${chatLabel}"
>
  <span class="frieda-trigger__sparkle" aria-hidden="true">✨</span>
  <span class="frieda-trigger__text">${triggerText}</span>
</button>`;

    document.body.appendChild(widget);
  }

  // ---- Bind events -----------------------------------------------------

  function bindEvents() {
    document.getElementById('frieda-trigger').addEventListener('click', () => {
      isOpen ? closeWidget() : openWidget();
    });

    document.getElementById('frieda-close').addEventListener('click', () => {
      closeWidget();
      document.getElementById('frieda-trigger').focus();
    });

    document.getElementById('frieda-send').addEventListener('click', handleSend);

    document.getElementById('frieda-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
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
    buildWidget();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
