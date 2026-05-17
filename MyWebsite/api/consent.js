const { neon } = require('@neondatabase/serverless');
const crypto = require('crypto');

function corsHeaders(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://soulwavesva.com', 'http://localhost:3000', 'http://127.0.0.1:5500'];
  if (allowed.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  corsHeaders(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { sessionId, consentType, consentText, lang } = req.body || {};

  if (!sessionId || !consentType || !consentText) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const rawIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || '';
  const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex');
  const userAgent = (req.headers['user-agent'] || '').slice(0, 500);

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO consent_log (session_id, consent_type, consent_text, ip_hash, user_agent)
      VALUES (${sessionId}, ${consentType}, ${consentText}, ${ipHash}, ${userAgent})
    `;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Consent log error:', err.message);
    return res.status(500).json({ success: false });
  }
};
