const OpenAI = require('openai');
const { SYSTEM_PROMPT } = require('./system-prompt');

// Simple in-memory rate limiter — resets on cold start, sufficient for basic abuse prevention
const rateLimitMap = new Map();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, windowStart: now };

  if (now - record.windowStart > RATE_WINDOW_MS) {
    record.count = 1;
    record.windowStart = now;
  } else {
    record.count++;
  }

  rateLimitMap.set(ip, record);
  return record.count <= RATE_LIMIT;
}

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /forget\s+(everything|all|what|your)/i,
  /you\s+are\s+now\s+(a|an|the)/i,
  /act\s+as\s+(a|an|the|if)/i,
  /pretend\s+(you|to\s+be)/i,
  /new\s+persona/i,
  /disregard\s+(all|your|the|previous)/i,
  /override\s+(your\s+)?(instructions|prompt|rules)/i,
];

function hasInjection(messages) {
  return messages.some(
    m => m.role === 'user' && INJECTION_PATTERNS.some(p => p.test(m.content))
  );
}

function corsHeaders(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://soulwavesva.com', 'http://localhost:3000', 'http://127.0.0.1:5500'];
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  corsHeaders(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      reply: "Wow, you're keen. ✨ Give it a minute and try again — or just email Anna directly at anna@soulwavesva.com.",
    });
  }

  let { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Sanitize
  messages = messages
    .slice(-20)
    .filter(m => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 400).replace(/<[^>]*>/g, '') }));

  if (hasInjection(messages)) {
    return res.status(200).json({
      reply: "Nice try. ✨ I'm Frieda and I'm staying exactly where I am. Anything I can actually help you with?",
    });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return res.status(200).json({
        reply: "Frieda's brain isn't plugged in yet — the API key isn't configured. Email Anna at anna@soulwavesva.com. ✨",
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
      temperature: 0.75,
    });

    const reply = completion.choices[0]?.message?.content || '';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err.message);
    return res.status(200).json({
      reply: "Something went sideways on my end. ✨ Try again, or email Anna directly at anna@soulwavesva.com.",
    });
  }
};
