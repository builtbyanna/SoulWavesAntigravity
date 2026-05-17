module.exports = async function handler(req, res) {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return res.status(200).json({ status: 'NO KEY', message: 'OPENAI_API_KEY is not set at all.' });
  }

  if (key === 'PASTE_YOUR_KEY_HERE' || key === 'your_openai_api_key_here') {
    return res.status(200).json({ status: 'PLACEHOLDER', message: 'Key is still the placeholder — not replaced with real key.' });
  }

  // Try a real call
  try {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: key });
    const result = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say "OK" and nothing else.' }],
      max_tokens: 5,
    });
    return res.status(200).json({
      status: 'WORKS',
      keyPrefix: key.slice(0, 8) + '...',
      reply: result.choices[0]?.message?.content,
    });
  } catch (err) {
    return res.status(200).json({
      status: 'ERROR',
      keyPrefix: key.slice(0, 8) + '...',
      error: err.message,
    });
  }
};
