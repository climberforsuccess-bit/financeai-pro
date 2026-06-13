const OPENAI_CONFIG = {
  model_free: 'gpt-4o-mini',
  model_vip: 'gpt-4o',
  maxTokens: 500,
  dailyLimit_free: 5,
  dailyLimit_vip: 999
};

const SUPABASE_FUNCTION_URL = 'https://rqrpazkkwolxtpiqtdfu.supabase.co/functions/v1/openai-proxy';

// ── Límite diario ──────────────────────────────────────────
function getTodayKey() {
  const d = new Date();
  return `fai_ai_count_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

function getAIUsageToday() {
  return parseInt(localStorage.getItem(getTodayKey()) || '0');
}

function incrementAIUsage() {
  const key = getTodayKey();
  const current = getAIUsageToday();
  localStorage.setItem(key, current + 1);
}

function getRemainingMessages() {
  const isVIP = STATE?.user?.isVIP || false;
  if (isVIP) return 999;
  const limit = OPENAI_CONFIG.dailyLimit_free;
  const used = getAIUsageToday();
  return Math.max(0, limit - used);
}

function hasAIMessagesLeft() {
  return getRemainingMessages() > 0;
}

// ── Init ───────────────────────────────────────────────────
async function initOpenAI() {
  console.log('OpenAI proxy ready via Supabase Edge Function');
  updateAICounter();
}

function updateAICounter() {
  const isVIP = STATE?.user?.isVIP || false;
  const remaining = getRemainingMessages();
  const counterEl = document.getElementById('aiMessagesLeft');
  if (!counterEl) return;
  if (isVIP) {
    counterEl.textContent = '∞ mensajes (VIP)';
    counterEl.style.color = '#f59e0b';
  } else {
    counterEl.textContent = `${remaining}/5 mensajes hoy`;
    counterEl.style.color = remaining <= 1 ? '#ef4444' : '#94a3b8';
  }
}

// ── Ask OpenAI ─────────────────────────────────────────────
async function askOpenAI(userMessage, financialContext) {
  // Verificar límite
  if (!hasAIMessagesLeft()) {
    const isVIP = STATE?.user?.isVIP || false;
    if (!isVIP) {
      throw new Error('LIMIT_REACHED');
    }
  }

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
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY
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

  // Incrementar contador después de respuesta exitosa
  incrementAIUsage();
  updateAICounter();

  return data.choices[0].message.content;
}
