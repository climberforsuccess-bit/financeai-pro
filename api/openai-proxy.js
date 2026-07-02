// ── OpenAI Proxy para Vercel ──────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, plan } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Modelo según plan — gpt-4o-mini para Pro/Business, gpt-3.5-turbo para el resto
  const allowedGpt4Plans = ['pro', 'business'];
  const model = allowedGpt4Plans.includes(plan) ? 'gpt-4o-mini' : 'gpt-3.5-turbo';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    // Devolvemos también el modelo usado (útil para debug)
    return res.status(200).json({ ...data, _model: model });

  } catch (error) {
    console.error('OpenAI proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
