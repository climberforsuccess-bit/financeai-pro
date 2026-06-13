const OPENAI_CONFIG = {
  model_free: 'gpt-4o-mini',
  model_vip: 'gpt-4o',
  maxTokens: 500,
  dailyLimit_free: 5,
  dailyLimit_vip: 999
};

const SUPABASE_FUNCTION_URL = 'https://rqrpazkkwoixtpiqtdfu.supabase.co/functions/v1/openai-proxy';

async function initOpenAI() {
  console.log('OpenAI proxy ready via Supabase Edge Function');
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

  const response = await fetch(SUPABASE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29peHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MDE3NzUsImV4cCI6MjA1OTM3Nzc3NX0.Qm-cOPMUosx1QxwTEd_3FKsEMEJBWAHejj7XQBC0xNQ'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    })
  });

  if (!response.ok) throw new Error('OpenAI proxy error: ' + response.status);
  const data = await response.json();
  return data.choices[0].message.content;
}
