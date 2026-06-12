const OPENAI_CONFIG = {
  apiKey: null,
  model_free: 'gpt-4o-mini',
  model_vip: 'gpt-4o',
  maxTokens: 500,
  dailyLimit_free: 5,
  dailyLimit_vip: 999
};

async function initOpenAI() {
  try {
    const response = await fetch('/.env');
    const text = await response.text();
    const match = text.match(/OPENAI_API_KEY=(.+)/);
    if (match) OPENAI_CONFIG.apiKey = match[1].trim();
  } catch(e) {
    console.log('OpenAI config not loaded');
  }
}

async function askOpenAI(userMessage, financialContext) {
  const isVIP = STATE?.user?.isVIP || false;
  const model = isVIP ? OPENAI_CONFIG.model_vip : OPENAI_CONFIG.model_free;

  const systemPrompt = `Eres un asistente financiero personal inteligente llamado FinanceAI.
Contexto del usuario:
- Ingresos del mes: ${financialContext.income}
- Gastos del mes: ${financialContext.expenses}
- Balance disponible: ${financialContext.balance}
- Deuda total: ${financialContext.totalDebt}
- Tarjetas: ${financialContext.cards}
- Suscripciones activas: ${financialContext.subscriptions}

Responde en español, de forma concisa (máximo 3 oraciones), con consejos financieros prácticos y personalizados.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error('OpenAI error: ' + response.status);
  const data = await response.json();
  return data.choices[0].message.content;
}
