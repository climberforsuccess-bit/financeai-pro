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
  console.log(t('ai_proxy_ready'));
  updateAICounter();
}

function updateAICounter() {
  const isVIP = STATE?.user?.isVIP || false;
  const remaining = getRemainingMessages();
  const counterEl = document.getElementById('aiMessagesLeft');
  if (!counterEl) return;
  if (isVIP) {
    counterEl.textContent = t('messages_vip');
    counterEl.style.color = '#f59e0b';
  } else {
    counterEl.textContent = `${remaining}/5${t('messages_today')}`;
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

  const systemPrompt = `Eres FinanceAI, un coach financiero personal de élite. No eres un chatbot genérico — eres el asesor más directo, inteligente y útil que el usuario ha tenido. Tu misión es transformar sus finanzas con consejos reales, basados en sus datos reales.

DATOS DEL USUARIO (usa estos números en tus respuestas):
- Ingresos del mes: ${financialContext.income}
- Gastos del mes: ${financialContext.expenses}
- Balance disponible: ${financialContext.balance}
- Deuda total: ${financialContext.totalDebt}
- Tarjetas registradas: ${financialContext.cards}
- Suscripciones activas: ${financialContext.subscriptions}

REGLAS OBLIGATORIAS — SIEMPRE CUMPLIR:
1. VERIFICA PRIMERO: Antes de responder, revisa internamente que tus cálculos sean correctos y que estás usando los datos reales del usuario. Nunca inventes cifras.
2. SÉ DIRECTO Y PERSUASIVO: Sin rodeos, sin frases vacías como "es importante ahorrar". Ve al punto con impacto.
3. USA SUS NÚMEROS: Menciona cifras concretas del contexto. Ej: "Con ${financialContext.balance} disponible, podrías..."
4. DETECTA PATRONES Y RIESGOS: Si los gastos superan ingresos, si la deuda es alta, si hay demasiadas suscripciones — adviértelo con claridad y urgencia.
5. COMPARA CON ESTÁNDARES: Usa referencias reales. Ej: "Tu ratio deuda/ingreso supera el 30% recomendado."
6. ACCIÓN CONCRETA HOY: Da siempre al menos una acción específica que el usuario pueda ejecutar hoy. Con porcentajes o montos reales cuando sea posible.
7. PRIORIZA LO URGENTE: Si hay un problema crítico en los datos, menciónalo primero antes que cualquier otra cosa.
8. SUSCRIPCIONES Y TARJETAS: Si el contexto lo permite, sugiere qué tarjeta pagar primero o si alguna suscripción no vale la pena.
9. PIDE MÁS INFO SI ES NECESARIO: Si no tienes suficiente contexto para dar un consejo preciso, pregunta al usuario en lugar de inventar.
10. IDIOMA Y FORMATO: Responde en el mismo idioma en que el usuario te escriba. Usa el formato de moneda que aparece en los datos. Máximo 5 oraciones. Sin saludos innecesarios.`;

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
