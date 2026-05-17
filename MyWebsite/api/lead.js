const { neon } = require('@neondatabase/serverless');
const { Resend } = require('resend');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  const { name, email, messageSummary, sessionId, lang, consentTimestamp, transcript } = req.body || {};

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Insert lead
    const leadResult = await sql`
      INSERT INTO leads (name, email, message, source, consent_given, consent_timestamp, gdpr_notice_version, status)
      VALUES (
        ${name || null},
        ${email},
        ${messageSummary || null},
        'frieda',
        true,
        ${consentTimestamp || new Date().toISOString()},
        '1.0',
        'new'
      )
      RETURNING id
    `;

    const leadId = leadResult[0]?.id;

    // Save transcript
    if (Array.isArray(transcript) && transcript.length > 0) {
      await sql`
        INSERT INTO chat_transcripts (lead_id, session_id, messages, language)
        VALUES (${leadId}, ${sessionId}, ${JSON.stringify(transcript)}, ${lang || 'en'})
      `;
    }

    // Log consent for lead capture
    await sql`
      INSERT INTO consent_log (session_id, consent_type, consent_text)
      VALUES (
        ${sessionId},
        'lead_capture',
        'User voluntarily provided contact information during chat'
      )
    `;

    // Email Anna
    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.ADMIN_EMAIL || 'anna@soulwavesva.com';

    await resend.emails.send({
      from: `Frieda <frieda@soulwavesva.com>`,
      to: adminEmail,
      subject: `New lead from Frieda: ${name || email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #44140D;">
          <h2 style="color: #8C1C13;">New lead from Frieda ✨</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${name || '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Language</td><td>${lang || 'en'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Asked about</td><td>${messageSummary || '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Time</td><td>${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })} (Vienna)</td></tr>
          </table>
          <p style="margin-top: 24px; color: #666;">
            Reply to them at <a href="mailto:${email}">${email}</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Lead capture error:', err.message);
    return res.status(500).json({ success: false });
  }
};
