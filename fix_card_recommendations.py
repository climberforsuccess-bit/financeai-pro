#!/usr/bin/env python3
"""
fix_card_recommendations.py
Hace 3 cosas:
1. Reemplaza las rec-cards hardcodeadas en index.html por un contenedor dinámico
2. Agrega la función loadCardRecommendations() en app.js con prompt mejorado
3. Agrega loadCardRecommendations() en showSection() de app.js
"""

import re

# ══════════════════════════════════════════════
# PASO 1: Modificar index.html
# ══════════════════════════════════════════════
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Bloque hardcodeado a reemplazar (desde primer rec-card hasta cierre de Nu Card)
old_html_block = re.search(
    r'(<div class="rec-card">.*?</div>\s*){4}',
    html,
    re.DOTALL
)

NEW_HTML_BLOCK = '''
      <!-- Dynamic recommendations container -->
      <div id="rec-cards-container">
        <div style="text-align:center;padding:40px;color:var(--gray);">
          <div style="font-size:32px;margin-bottom:12px;">⏳</div>
          <div data-i18n="rec_loading">Cargando recomendaciones personalizadas...</div>
        </div>
      </div>
'''

# Reemplazar el bloque del AI summary también para hacerlo dinámico
OLD_SUMMARY = '''      <div class="card" style="margin-bottom:24px;background:rgba(0,238,255,0.05);">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">🤖</span>
          <div>
            <div style="font-weight:700;font-size:15px;" data-i18n="rec_ai_analysis">Análisis IA de tus gastos</div>
            <div style="color:var(--gray);font-size:13px;margin-top:4px;">
              <span id="rec-based-on" data-i18n="rec_based_on">Basado en tus transacciones: gastas más en </span>
              <strong style="color:var(--accent);">supermercado</strong>, 
              <strong style="color:var(--accent);">restaurantes</strong> y 
              <strong style="color:var(--accent);">gasolina</strong>. 
              Estas tarjetas maximizan tus beneficios.
            </div>
          </div>
        </div>
      </div>'''

NEW_SUMMARY = '''      <div class="card" style="margin-bottom:24px;background:rgba(0,238,255,0.05);">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">🤖</span>
          <div>
            <div style="font-weight:700;font-size:15px;" data-i18n="rec_ai_analysis">Análisis IA de tus gastos</div>
            <div id="rec-ai-summary" style="color:var(--gray);font-size:13px;margin-top:4px;">
              <span data-i18n="rec_loading">Analizando tus transacciones...</span>
            </div>
          </div>
        </div>
      </div>'''

if OLD_SUMMARY in html:
    html = html.replace(OLD_SUMMARY, NEW_SUMMARY)
    print("✅ PASO 1a: AI summary actualizado en index.html")
else:
    print("⚠️  PASO 1a: No se encontró el summary exacto - revisa manualmente")

# Reemplazar las 4 rec-cards hardcodeadas
OLD_CARDS_BLOCK = '''      <div class="rec-card">
        <div class="rec-card-header">
          <div>
            <div style="font-size:11px;color:var(--gray);letter-spacing:1px;margin-bottom:4px;" data-i18n="rec_best_general">USA — MEJOR OPCIÓN GENERAL</div>
            <div class="rec-title">💳 Chase Freedom Flex</div>
          </div>
          <div class="rec-score">98% match</div>
        </div>
        <div class="rec-desc">Perfecta para tus hábitos. Ofrece 5% cashback en categorías rotativas que incluyen supermercados y gasolina.</div>
        <div class="rec-benefits">
          <span class="rec-benefit">5% Supermercados</span>
          <span class="rec-benefit">3% Restaurantes</span>
          <span class="rec-benefit">Sin cuota anual</span>
          <span class="rec-benefit">$200 bono bienvenida</span>
        </div>
      </div>

      <div class="rec-card">
        <div class="rec-card-header">
          <div>
            <div style="font-size:11px;color:var(--gray);letter-spacing:1px;margin-bottom:4px;" data-i18n="rec_best_travel">USA — MEJOR PARA VIAJES</div>
            <div class="rec-title">💳 Amex Gold Card</div>
          </div>
          <div class="rec-score">91% match</div>
        </div>
        <div class="rec-desc">Ideal si viajas frecuentemente. 4x puntos en restaurantes y supermercados en USA.</div>
        <div class="rec-benefits">
          <span class="rec-benefit">4x Restaurantes</span>
          <span class="rec-benefit">4x Supermercados</span>
          <span class="rec-benefit">$120 crédito comidas</span>
          <span class="rec-benefit">Puntos transferibles</span>
        </div>
      </div>

      <div class="rec-card">
        <div class="rec-card-header">
          <div>
            <div style="font-size:11px;color:var(--gray);letter-spacing:1px;margin-bottom:4px;" data-i18n="rec_best_no_fee">USA — MEJOR SIN CUOTA</div>
            <div class="rec-title">💳 Citi Double Cash</div>
          </div>
          <div class="rec-score">87% match</div>
        </div>
        <div class="rec-desc">2% cashback en todo sin límites ni categorías. Simple y efectiva para todo tipo de gastos.</div>
        <div class="rec-benefits">
          <span class="rec-benefit">2% en todo</span>
          <span class="rec-benefit">Sin cuota anual</span>
          <span class="rec-benefit">Sin límite cashback</span>
          <span class="rec-benefit">Fácil de aprobar</span>
        </div>
      </div>

      <div class="rec-card">
        <div class="rec-card-header">
          <div>
            <div style="font-size:11px;color:var(--gray);letter-spacing:1px;margin-bottom:4px;" data-i18n="rec_latam">LATINOAMÉRICA</div>
            <div class="rec-title">💳 Nu Card (Nubank)</div>
          </div>
          <div class="rec-score">85% match</div>
        </div>
        <div class="rec-desc" id="rec-desc-default" data-i18n="rec_desc_default">Disponible en México, Colombia y Brasil. Sin cuotas ocultas, control total desde el app.</div>
        <div class="rec-benefits">
          <span class="rec-benefit">Sin cuota anual</span>
          <span class="rec-benefit">Sin comisiones</span>
          <span class="rec-benefit">App excelente</span>
          <span class="rec-benefit">Fácil de aprobar</span>
        </div>
      </div>'''

if OLD_CARDS_BLOCK in html:
    html = html.replace(OLD_CARDS_BLOCK, NEW_HTML_BLOCK)
    print("✅ PASO 1b: 4 rec-cards hardcodeadas reemplazadas en index.html")
else:
    print("⚠️  PASO 1b: No se encontró el bloque exacto - revisa manualmente")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ PASO 1: index.html guardado\n")

# ══════════════════════════════════════════════
# PASO 2: Agregar función en app.js
# ══════════════════════════════════════════════
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

NEW_FUNCTION = '''
// ══════════════════════════════════════════════════════════════
// CARD RECOMMENDATIONS — Dynamic & AI-powered
// ══════════════════════════════════════════════════════════════
async function loadCardRecommendations() {
  const container = document.getElementById('rec-cards-container');
  const summary   = document.getElementById('rec-ai-summary');
  if (!container) return;

  // ── 1. Obtener gastos del usuario ──
  const expenses = (STATE.transactions || []).filter(tx => tx.type === 'expense');

  if (expenses.length === 0) {
    if (summary) summary.innerHTML = 'Agrega transacciones para recibir recomendaciones personalizadas.';
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--gray);">
        <div style="font-size:40px;margin-bottom:12px;">💳</div>
        <div style="font-size:15px;margin-bottom:8px;">No hay transacciones aún</div>
        <div style="font-size:13px;">Agrega tus gastos para recibir recomendaciones personalizadas basadas en tus hábitos reales.</div>
      </div>`;
    return;
  }

  // ── 2. Calcular categorías y métricas reales ──
  const categoryTotals = {};
  expenses.forEach(tx => {
    const cat = (tx.category || tx.expenseType || 'otros').toLowerCase().trim();
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (parseFloat(tx.amount) || 0);
  });

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  const topCategories = sortedCategories.slice(0, 3)
    .map(([cat, amount]) => ({ cat, amount: Math.round(amount) }));

  const topCatNames  = topCategories.map(c => c.cat).join(', ');
  const totalSpend   = expenses.reduce((s, tx) => s + (parseFloat(tx.amount) || 0), 0);
  const avgMonthly   = Math.round(totalSpend / Math.max(1, Math.ceil(expenses.length / 30)));
  const country      = STATE.settings?.country || 'USA';
  const currency     = STATE.settings?.currency || 'USD';
  const lang         = localStorage.getItem('financeai_lang') || 'en';

  // ── 3. Actualizar summary dinámico ──
  if (summary) {
    summary.innerHTML = `Basado en tus transacciones: gastas más en 
      ${topCategories.map(c =>
        `<strong style="color:var(--accent);">${c.cat}</strong>`
      ).join(', ')}. 
      Gasto mensual promedio: <strong style="color:var(--accent);">${currency} ${avgMonthly}</strong>. 
      Estas tarjetas maximizan tus beneficios.`;
  }

  // ── 4. Loading state ──
  container.innerHTML = `
    <div style="text-align:center;padding:40px;color:var(--gray);">
      <div style="font-size:40px;margin-bottom:12px;">🤖</div>
      <div style="font-size:15px;margin-bottom:8px;">Analizando tus hábitos de gasto...</div>
      <div style="font-size:13px;">Buscando las mejores tarjetas para ti</div>
    </div>`;

  // ── 5. Prompt optimizado para máxima precisión ──
  const categoryBreakdown = sortedCategories
    .slice(0, 5)
    .map(([cat, amt]) => `  - ${cat}: ${currency} ${Math.round(amt)}`)
    .join('\\n');

  const prompt = `You are a senior credit card expert with deep knowledge of the current credit card market in ${country} and Latin America.

USER FINANCIAL PROFILE:
- Country/Region: ${country}
- Primary spending categories:
${categoryBreakdown}
- Total spend analyzed: ${currency} ${Math.round(totalSpend)}
- Estimated monthly spend: ${currency} ${avgMonthly}
- Response language: ${lang === 'es' ? 'Spanish' : 'English'}

YOUR TASK:
Recommend exactly 4 REAL credit cards that currently exist and are available in the market TODAY (${new Date().getFullYear()}).

SCORING CRITERIA (calculate honestly):
- How well the card's rewards match the user's top spending categories (0-40 points)
- Value of rewards vs annual fee based on user's actual spend (0-25 points)
- Approval likelihood for average consumer (0-15 points)
- Additional benefits relevance (0-20 points)

REQUIREMENTS:
1. Cards MUST be real and currently available
2. At least 1 card for the user's region (${country})
3. Include mix: best overall, best for top category, best no annual fee, best premium
4. Score must reflect ACTUAL match to this specific user's spending
5. Description must explain WHY this card is good for THIS user's specific categories
6. Benefits must be ACCURATE and current (correct cashback %, correct annual fees)
7. Do NOT recommend cards that have been discontinued

Respond ONLY with a valid JSON array. No explanation, no markdown, just the JSON:

[
  {
    "name": "Exact card name as marketed",
    "issuer": "Bank name",
    "region": "e.g. USA — BEST OVERALL",
    "score": 94,
    "description": "Specific explanation mentioning user's actual spending categories and estimated monthly savings",
    "benefits": ["Accurate benefit 1", "Accurate benefit 2", "Accurate benefit 3", "Accurate benefit 4"],
    "annualFee": "$0 or exact amount",
    "bestFor": "primary spending category this excels at"
  }
]`;

  // ── 6. Llamar a OpenAI ──
  try {
    const response = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a credit card expert. Always respond with valid JSON only. Never include markdown, code blocks, or explanations outside the JSON array.'
          },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) throw new Error('API error ' + response.status);

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim() || '';

    // ── 7. Parsear respuesta ──
    const jsonMatch = text.match(/\\[[\\s\\S]*\\]/);
    if (!jsonMatch) throw new Error('No JSON array found in response');

    const cards = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(cards) || cards.length === 0) throw new Error('Empty cards array');

    // ── 8. Renderizar tarjetas dinámicas ──
    container.innerHTML = cards.map(card => `
      <div class="rec-card">
        <div class="rec-card-header">
          <div>
            <div style="font-size:11px;color:var(--gray);letter-spacing:1px;margin-bottom:4px;">
              ${card.region || card.issuer || 'RECOMENDADA'}
            </div>
            <div class="rec-title">💳 ${card.name}</div>
          </div>
          <div class="rec-score">${card.score}% match</div>
        </div>
        <div class="rec-desc">${card.description}</div>
        <div class="rec-benefits">
          ${(card.benefits || []).map(b => `<span class="rec-benefit">${b}</span>`).join('')}
        </div>
        ${card.annualFee ? `
        <div style="margin-top:12px;font-size:12px;color:var(--gray);">
          💰 Cuota anual: <strong style="color:var(--accent);">${card.annualFee}</strong>
          ${card.bestFor ? ` · 🏆 Mejor para: <strong>${card.bestFor}</strong>` : ''}
        </div>` : ''}
      </div>
    `).join('');

    console.log('✅ Card recommendations loaded dynamically for user');

  } catch (err) {
    console.error('Card recommendations error:', err);
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--gray);">
        <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
        <div style="font-size:15px;margin-bottom:8px;">Error al cargar recomendaciones</div>
        <div style="font-size:13px;margin-bottom:16px;">${err.message}</div>
        <button class="btn btn-outline" onclick="loadCardRecommendations()">
          🔄 Reintentar
        </button>
      </div>`;
  }
}
'''

# Insertar antes de showSection
ANCHOR = 'function showSection(sectionId) {'

if ANCHOR in js:
    js = js.replace(ANCHOR, NEW_FUNCTION + '\n' + ANCHOR)
    print("✅ PASO 2: loadCardRecommendations() agregado en app.js")
else:
    print("⚠️  PASO 2: No se encontró showSection - función agregada al final")
    js += NEW_FUNCTION

# ══════════════════════════════════════════════
# PASO 3: Agregar llamada en showSection
# ══════════════════════════════════════════════
OLD_SHOW_SECTION_LINE = "  if (sectionId === 'reports')       renderReports();"
NEW_SHOW_SECTION_LINE = """  if (sectionId === 'reports')       renderReports();
  if (sectionId === 'recommendations') loadCardRecommendations();"""

if OLD_SHOW_SECTION_LINE in js:
    js = js.replace(OLD_SHOW_SECTION_LINE, NEW_SHOW_SECTION_LINE)
    print("✅ PASO 3: loadCardRecommendations() llamado en showSection()")
else:
    print("⚠️  PASO 3: No se encontró la línea de reports en showSection")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("\n✅ PASO 2+3: app.js guardado")
print("\n🎉 Todo listo. Recarga la app y ve a Recommendations para probar.")
print("💡 Las recomendaciones ahora son 100% dinámicas basadas en los gastos reales del usuario.")
