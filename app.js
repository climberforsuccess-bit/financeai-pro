// FINANCEAI PRO — app.js v3.1 LIMPIO
// Climberforsuccess LLC
// ============================================

'use strict'

// FOUNDER PRICING - Updated automatically
const FOUNDER_PRICES = {
  personal: {
    monthly: 7.99,
    monthly_original: 9.99,
    annual: 5.99,
    annual_original: 7.99
  },
  pro: {
    monthly: 15.99,
    monthly_original: 19.99,
    annual: 11.99,
    annual_original: 15.99
  },
  business: {
    monthly: 39.99,
    monthly_original: 49.99,
    annual: 29.99,
    annual_original: 39.99
  }
};
const FOUNDER_DEADLINE = "September 30, 2026";
const FOUNDER_DEADLINE_ISO = "2026-09-30T23:59:59";
;

// ============================================================
// PLAN LIMITS — restricciones por plan
// ============================================================
const PLAN_LIMITS = {
  free:     { transactions: 30,  cards: 1,  cardsPersonal: 1,  cardsBusiness: 0,  aiMessages: 5,   reports: false, scanner: false, gpt4: false, export: false, multiUser: false, api: false },
  personal: { transactions: -1,  cards: 4,  cardsPersonal: 3,  cardsBusiness: 1,  aiMessages: 50,  reports: false, scanner: true,  gpt4: false, export: false, multiUser: false, api: false },
  pro:      { transactions: -1,  cards: 15, cardsPersonal: 10, cardsBusiness: 5,  aiMessages: 200, reports: true,  scanner: true,  gpt4: true,  export: true,  multiUser: false, api: false },
  business: { transactions: -1,  cards: -1, cardsPersonal: -1, cardsBusiness: -1, aiMessages: -1,  reports: true,  scanner: true,  gpt4: true,  export: true,  multiUser: true,  api: true  }
};

// -1 = ilimitado
function getPlanLimits() {
  const plan = STATE.settings.plan || localStorage.getItem('fai_plan') || 'free';
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
}


function updateAiMessagesLeft() {
  const el = document.getElementById("aiMessagesLeft");
  if (!el) return;
  const limits = getPlanLimits();
  if (limits.aiMessages === -1) {
    el.textContent = t("ai_messages_left").replace("{n}", "∞").replace("/" + limits.aiMessages, "");
    return;
  }
  const todayKey = "fai_ai_messages_today";
  const dateKey  = "fai_ai_messages_date";
  const today    = new Date().toDateString();
  if (localStorage.getItem(dateKey) !== today) {
    localStorage.setItem(dateKey, today);
    localStorage.setItem(todayKey, "0");
  }
  const used = parseInt(localStorage.getItem(todayKey) || "0");
  const remaining = limits.aiMessages - used;
  el.textContent = t("ai_messages_left").replace("{n}", used).replace("{total}", limits.aiMessages);
}
function canUseFeature(feature) {
  const limits = getPlanLimits();
  return limits[feature] === true || limits[feature] === -1 || (typeof limits[feature] === 'number' && limits[feature] > 0);
}

function showUpgradeModal(feature) {
  const featureMessages = {
    scanner:      { title: t('up_scanner_title'),      desc: t('up_scanner_desc'),      minPlan: 'Personal' },
    reports:      { title: t('up_reports_title'),      desc: t('up_reports_desc'),      minPlan: 'Pro' },
    gpt4:         { title: t('up_gpt4_title'),         desc: t('up_gpt4_desc'),         minPlan: 'Pro' },
    export:       { title: t('up_export_title'),       desc: t('up_export_desc'),       minPlan: 'Pro' },
    cards:        { title: t('up_cards_title'),        desc: t('up_cards_desc'),        minPlan: 'Personal' },
    multiUser:    { title: t('up_multiuser_title'),    desc: t('up_multiuser_desc'),    minPlan: 'Business' },
    api:          { title: t('up_api_title'),          desc: t('up_api_desc'),          minPlan: 'Business' },
    transactions: { title: t('up_transactions_title'), desc: t('up_transactions_desc'), minPlan: 'Personal' }
  };

  const info = featureMessages[feature] || { title: t('upgrade_title'), desc: t('upgrade_cancel'), minPlan: 'Personal' };

  // Crear modal (siempre recrear para respetar idioma actual)
  let modal = document.getElementById('upgrade-modal');
  if (modal) modal.remove();
  modal = document.createElement('div');
  modal.id = 'upgrade-modal';
  modal.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:9999; align-items:center; justify-content:center;';
  modal.innerHTML = `
      <div style="background:#1e293b; border:1px solid #334155; border-radius:20px; padding:40px; max-width:420px; width:90%; text-align:center; position:relative;">
        <button onclick="document.getElementById('upgrade-modal').style.display='none'" 
          style="position:absolute; top:16px; right:16px; background:none; border:none; color:#64748b; font-size:20px; cursor:pointer;">✕</button>
        <div id="upgrade-modal-icon" style="font-size:48px; margin-bottom:16px;"></div>
        <div style="background:linear-gradient(135deg,#f59e0b22,#ef444422); border:1px solid #f59e0b44; border-radius:10px; padding:8px 14px; display:inline-block; margin-bottom:14px;">
          <span style="color:#f59e0b; font-size:12px; font-weight:700;">${t('upgrade_social_proof')}</span>
        </div>
        <h2 id="upgrade-modal-title" style="color:#fff; font-size:22px; margin-bottom:12px;"></h2>
        <p id="upgrade-modal-desc" style="color:#94a3b8; font-size:15px; margin-bottom:8px;"></p>
        <p id="upgrade-modal-plan" style="color:#f59e0b; font-size:13px; font-weight:600; margin-bottom:16px;"></p>
        <p style="color:#64748b; font-size:12px; margin-bottom:20px;">${t('upgrade_one_step')}</p>
        <button onclick="document.getElementById('upgrade-modal').style.display='none'; scrollToSection('pricing-section')"
          style="width:100%; padding:16px; background:linear-gradient(135deg,#f59e0b,#ef4444); border:none; border-radius:12px; color:#fff; font-size:16px; font-weight:700; cursor:pointer; box-shadow:0 4px 20px rgba(245,158,11,0.4);">
          ${t('upgrade_unlock_btn')}
        </button>
        <button onclick="document.getElementById('upgrade-modal').style.display='none'"
          style="width:100%; padding:12px; background:none; border:none; color:#475569; font-size:13px; cursor:pointer; margin-top:10px;">
          ${t('upgrade_dismiss')}
        </button>
      </div>`;
  document.body.appendChild(modal);

  // Llenar datos
  const icons = { scanner:'📸', reports:'📊', gpt4:'🤖', export:'📤', cards:'💳', multiUser:'👥', api:'🔌', transactions:'📝' };
  document.getElementById('upgrade-modal-icon').textContent = icons[feature] || '⭐';
  document.getElementById('upgrade-modal-title').textContent = info.title;
  document.getElementById('upgrade-modal-desc').textContent  = info.desc;
  document.getElementById('upgrade-modal-plan').textContent  = '✨ ' + t('upgrade_available') + ' ' + info.minPlan;
  modal.style.display = 'flex';
}

function checkTransactionLimit() {
  const limits = getPlanLimits();
  if (limits.transactions === -1) return true; // ilimitado
  const count = STATE.transactions ? STATE.transactions.length : 0;
  if (count >= limits.transactions) {
    showUpgradeModal('transactions');
    return false;
  }
  // Advertencia al 80%
  if (count >= limits.transactions * 0.8) {
    const remaining = limits.transactions - count;
    showToast(t('upgrade_warning').replace('{n}', remaining), 'warning');
  }
  return true;
}

function checkCardLimit(ownerType) {
  const limits = getPlanLimits();
  const type = ownerType || 'personal';
  const limitKey = type === 'business' ? 'cardsBusiness' : 'cardsPersonal';
  const limitVal = limits[limitKey];
  if (limitVal === -1) return true;
  if (limitVal === 0) {
    showUpgradeModal('cards');
    return false;
  }
  const count = (STATE.cards || []).filter(c => (c.ownerType || 'personal') === type).length;
  if (count >= limitVal) {
    showUpgradeModal('cards');
    return false;
  }
  return true;
}


// billing handled in payment.js


// ── LANDING BILLING TOGGLE ──────────────────────────────────────────
var currentLandingBilling = 'annual';
var landingPrices = {
  monthly: { personal: '$5.99',  pro: '$11.99', business: '$29.99' },
  annual:  { personal: '$5.99',  pro: '$11.99', business: '$29.99' }
};

function setLandingBilling(type) {
  currentLandingBilling = type;
  var p = landingPrices[type];

  var lp   = document.getElementById('landing-price-personal');
  var lpr  = document.getElementById('landing-price-pro');
  var lpb  = document.getElementById('landing-price-business');
  var op   = document.getElementById('landing-original-personal');
  var opr  = document.getElementById('landing-original-pro');
  var opb  = document.getElementById('landing-original-business');
  var banner = document.getElementById('landing-savings-banner');
  var btnM = document.getElementById('landing-btn-monthly');
  var btnA = document.getElementById('landing-btn-annual');

  if (lp)  lp.textContent  = p.personal;
  if (lpr) lpr.textContent = p.pro;
  if (lpb) lpb.textContent = p.business;

  if (type === 'annual') {
    if (op)     op.style.display  = 'block';
    if (opr)    opr.style.display = 'block';
    if (opb)    opb.style.display = 'block';
    var bp  = document.getElementById('landing-billed-personal');
    var bpr = document.getElementById('landing-billed-pro');
    var bpb = document.getElementById('landing-billed-business');
    if (bp)  bp.style.display  = 'block';
    if (bpr) bpr.style.display = 'block';
    if (bpb) bpb.style.display = 'block';
    if (banner) banner.style.display = 'block';
    if (btnA) { btnA.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; btnA.style.color = '#000'; }
    if (btnM) { btnM.style.background = '#334155'; btnM.style.color = '#94a3b8'; }
  } else {
    if (op)     op.style.display  = 'none';
    if (opr)    opr.style.display = 'none';
    if (opb)    opb.style.display = 'none';
    var bp  = document.getElementById('landing-billed-personal');
    var bpr = document.getElementById('landing-billed-pro');
    var bpb = document.getElementById('landing-billed-business');
    if (bp)  bp.style.display  = 'none';
    if (bpr) bpr.style.display = 'none';
    if (bpb) bpb.style.display = 'none';
    if (banner) banner.style.display = 'none';
    if (btnM) { btnM.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; btnM.style.color = '#000'; }
    if (btnA) { btnA.style.background = '#334155'; btnA.style.color = '#94a3b8'; }
  }
}
// ────────────────────────────────────────────────────────────────────


// ============================================
// SECCIÓN 1: STATE
// ============================================
const STATE = {
  user: null,
  currentSection: 'dashboard',
  currentPage: 'landing',
  transactions: [],
  cards: [],
  debts: [],
  subscriptions: [],
  currentDebtMethod: 'avalanche',
  settings: { currency: 'USD', lang: 'es', plan: 'free' },
  currentProfile: null,
  profiles: []
};

function loadState() {
  try {
    STATE.transactions  = JSON.parse(localStorage.getItem('fai_transactions')  || '[]');
    STATE.cards         = JSON.parse(localStorage.getItem('fai_cards')         || '[]');
    STATE.debts         = JSON.parse(localStorage.getItem('fai_debts')         || '[]');
    STATE.subscriptions = JSON.parse(localStorage.getItem('fai_subscriptions') || '[]');
    STATE.currentDebtMethod = localStorage.getItem('fai_debt_method') || 'avalanche';
    const s = localStorage.getItem('fai_settings');
    if (s) STATE.settings = { ...STATE.settings, ...JSON.parse(s) };
  } catch(e) { console.warn('loadState error:', e); }
}

function saveState() {
  try {
    localStorage.setItem('fai_transactions',  JSON.stringify(STATE.transactions));
    localStorage.setItem('fai_cards',         JSON.stringify(STATE.cards));
    localStorage.setItem('fai_debts',         JSON.stringify(STATE.debts));
    localStorage.setItem('fai_subscriptions', JSON.stringify(STATE.subscriptions));
    localStorage.setItem('fai_debt_method',   STATE.currentDebtMethod || 'avalanche');
    localStorage.setItem('fai_settings',      JSON.stringify(STATE.settings));
  } catch(e) { console.warn('saveState error:', e); }
}

// ============================================
// SECCIÓN 2: HELPERS
// ============================================
function gel(id) { return document.getElementById(id); }

function setTxt(id, text) {
  const e = gel(id);
  if (e) e.textContent = text;
}

function getVal(id) {
  const e = gel(id);
  return e ? e.value : '';
}

function showToast(msg, type = 'success') {
  const old = document.querySelector('.fai-toast');
  if (old) old.remove();
  const colors = {
    success: { bg: '#00EEFF', color: '#050D1A' },
    error:   { bg: '#FF4757', color: '#fff' },
    info:    { bg: '#FF6B35', color: '#fff' }
  };
  const c = colors[type] || colors.success;
  const t = document.createElement('div');
  t.className = 'fai-toast';
  t.style.cssText = `
    position:fixed;bottom:24px;left:50%;
    transform:translateX(-50%);
    background:${c.bg};color:${c.color};
    padding:12px 28px;border-radius:12px;
    font-weight:700;font-size:0.95rem;
    z-index:99999;box-shadow:0 4px 24px rgba(0,0,0,0.4);
    font-family:'Segoe UI',Arial,sans-serif;
    white-space:nowrap;pointer-events:none;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { if (t.parentNode) t.remove(); }, 3500);
}

function showNotif(msg) { showToast(msg); }

function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: STATE.settings.currency || 'USD'
    }).format(amount || 0);
  } catch(e) { return '$' + (amount || 0).toFixed(2); }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  } catch(e) { return dateStr; }
}

function getCatIcon(cat) {
  const icons = {
    food:'🍔', dining:'🍽️', transport:'🚗', gas:'⛽',
    shopping:'🛍️', entertainment:'🎬', health:'💊',
    utilities:'💡', rent:'🏠', travel:'✈️',
    education:'📚', salary:'💵', freelance:'💼',
    income:'💰', subscriptions:'🔄', groceries:'🛒',
    technology:'💻', other:'📌'
  };
  return icons[cat] || '📌';
}

// ============================================
// SECCIÓN 3: NAVEGACIÓN
// ============================================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  const page = gel(pageId);
  if (page) {
    page.classList.add('active');
    page.style.display = 'block';
  }
  STATE.currentPage = pageId;
  window.scrollTo(0, 0);
}


async function loadCardRecommendations() {
  const container = document.getElementById('rec-cards-container');
  const summary   = document.getElementById('rec-ai-summary');
  if (!container) return;

  const expenses = (STATE.transactions || []).filter(tx => tx.type === 'expense');

  if (expenses.length === 0) {
    if (summary) summary.innerHTML = 'Add transactions to get personalized recommendations.';
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--gray);">
      <div style="font-size:40px;margin-bottom:12px;">💳</div>
      <div style="font-size:15px;">No transactions yet</div>
      <div style="font-size:13px;margin-top:8px;">Add your expenses to get personalized card recommendations.</div>
    </div>`;
    return;
  }

  const categoryTotals = {};
  expenses.forEach(tx => {
    const cat = (tx.category || tx.expenseType || 'otros').toLowerCase().trim();
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (parseFloat(tx.amount) || 0);
  });

  const sorted      = Object.entries(categoryTotals).sort((a,b) => b[1]-a[1]);
  const top3        = sorted.slice(0,3).map(([cat,amt]) => ({cat, amount: Math.round(amt)}));
  const totalSpend  = expenses.reduce((s,tx) => s+(parseFloat(tx.amount)||0), 0);
  const avgMonthly  = Math.round(totalSpend / Math.max(1, Math.ceil(expenses.length/30)));
  const country     = STATE.settings?.country || 'USA';
  const currency    = STATE.settings?.currency || 'USD';
  const lang        = localStorage.getItem('financeai_lang') || 'en';

  if (summary) {
    summary.innerHTML = `Based on your transactions: you spend most on
      ${top3.map(c=>`<strong style="color:var(--accent);">${c.cat}</strong>`).join(', ')}.
      Monthly average: <strong style="color:var(--accent);">${currency} ${avgMonthly}</strong>.
      These cards maximize your rewards.`;
  }

  container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--gray);">
    <div style="font-size:40px;margin-bottom:12px;">🤖</div>
    <div style="font-size:15px;margin-bottom:8px;">Analyzing your spending habits...</div>
    <div style="font-size:13px;">Finding the best cards for you</div>
  </div>`;

  const breakdown = sorted.slice(0,5).map(([cat,amt]) => `  - ${cat}: ${currency} ${Math.round(amt)}`).join('\n');

  const prompt = `You are a senior credit card expert with deep knowledge of the global credit card market.

USER PROFILE:
- Country/Region: ${country}
- Language: ${lang === 'es' ? 'Spanish' : 'English'}
- Spending breakdown:\n${breakdown}
- Monthly average: ${currency} ${avgMonthly}
- Total analyzed: ${currency} ${Math.round(totalSpend)}

TASK: Recommend exactly 4 REAL credit cards available in ${new Date().getFullYear()}.

SCORING (be honest and precise):
- Rewards alignment with top spending categories: 0-40pts
- Net value after annual fee based on actual spend: 0-25pts  
- Ease of approval for average consumer: 0-15pts
- Relevant perks and benefits: 0-20pts

STRICT RULES:
- Cards must be REAL and currently available
- At least 1 card must be relevant to ${country}
- Include: 1 best overall, 1 best for top category, 1 no annual fee, 1 premium
- Scores must honestly reflect fit for THIS user's specific spending
- Benefits must be 100% accurate (correct cashback %, correct annual fees, correct sign-up bonuses)
- Descriptions must mention the user's actual spending categories
- NO discontinued cards, NO invented cards

Respond ONLY with a JSON array. Zero explanation. Zero markdown:
[{"name":"exact card name","issuer":"bank","region":"e.g. USA — BEST OVERALL","score":94,"description":"personalized explanation mentioning their actual categories and estimated monthly savings","benefits":["accurate benefit 1","accurate benefit 2","accurate benefit 3","accurate benefit 4"],"annualFee":"$0 or exact fee","bestFor":"main category"}]`;

  try {
    const res  = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        messages:[
          {role:'system', content:'You are a credit card expert. Respond ONLY with a valid JSON array. No markdown, no code blocks, no apostrophes in text, no special characters. Use only plain ASCII text in all string values. No explanations outside JSON.'},
          {role:'user', content: prompt}
        ],
        plan: STATE.settings.plan || localStorage.getItem('fai_plan') || 'free'
      })
    });
    if (!res.ok) throw new Error('API ' + res.status);
    const data  = await res.json();
    const text  = data.choices?.[0]?.message?.content?.trim() || '';
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON found');
    // Robust JSON cleanup
    let jsonStr = match[0]
      .replace(/[\u2018\u2019\u2032\u2019]/g, "'")
      .replace(/[\u201C\u201D\u201E]/g, '"')
      .replace(/\r?\n/g, ' ')
      .replace(/,\s*]/g, ']')
      .replace(/,\s*}/g, '}')
      .replace(/[\x00-\x1F\x7F]/g, ' ');

    // Fix unescaped apostrophes inside string values
    jsonStr = jsonStr.replace(/"((?:[^"\\]|\\.)*)"/g, (m, inner) => {
      return '"' + inner.replace(/(?<!\\)'/g, '\u2019') + '"';
    });

    let cards;
    try {
      cards = JSON.parse(jsonStr);
    } catch(parseErr) {
      // Last resort: strip all non-ASCII and retry
      const ascii = jsonStr.replace(/[^\x20-\x7E,\[\]{}":]/g, '');
      cards = JSON.parse(ascii);
    }
    if (!Array.isArray(cards) || !cards.length) throw new Error('Empty');

    container.innerHTML = cards.map(card => `
      <div class="rec-card">
        <div class="rec-card-header">
          <div>
            <div style="font-size:11px;color:var(--gray);letter-spacing:1px;margin-bottom:4px;">${card.region || card.issuer || 'RECOMMENDED'}</div>
            <div class="rec-title">💳 ${card.name}</div>
          </div>
          <div class="rec-score">${card.score}% match</div>
        </div>
        <div class="rec-desc">${card.description}</div>
        <div class="rec-benefits">
          ${(card.benefits||[]).map(b=>`<span class="rec-benefit">${b}</span>`).join('')}
        </div>
        <div style="margin-top:12px;font-size:12px;color:var(--gray);">
          💰 Annual fee: <strong style="color:var(--accent);">${card.annualFee || 'N/A'}</strong>
          ${card.bestFor ? ` &nbsp;·&nbsp; 🏆 Best for: <strong>${card.bestFor}</strong>` : ''}
        </div>
      </div>`).join('');

  } catch(err) {
    console.error('Rec error:', err);
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--gray);">
      <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
      <div style="font-size:15px;margin-bottom:8px;">Could not load recommendations</div>
      <div style="font-size:13px;margin-bottom:16px;">${err.message}</div>
      <button class="btn btn-outline" onclick="loadCardRecommendations()">🔄 Retry</button>
    </div>`;
  }
}

function showSection(sectionId) {
  showPage('app');
  document.querySelectorAll('[id^="section-"]').forEach(s => {
    s.style.display = 'none';
  });
  const section = gel('section-' + sectionId);
  if (section) section.style.display = 'block';

  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
  });
  const navItem = document.querySelector(
    `.nav-item[onclick*="'${sectionId}'"]`
  );
  if (navItem) navItem.classList.add('active');

  STATE.currentSection = sectionId;

  // Block premium sections for free users
  if (!checkProAccess(sectionId)) return;

  if (sectionId === 'dashboard')     Promise.all([loadCards(), loadDebts()]).then(() => renderDashboard());
  if (sectionId === 'transactions')  Promise.all([loadTransactions(), loadCards()]).then(() => renderTransactions());

  if (sectionId === 'cards')         renderCards();
  if (sectionId === 'debts')         Promise.all([loadCards(), loadDebts()]).then(() => renderDebts());
  if (sectionId === 'subscriptions') renderSubscriptions();
  if (sectionId === 'reports')       loadTransactions().then(() => renderReports());
  if (sectionId === 'recommendations') loadTransactions().then(() => loadCardRecommendations());
  if (sectionId === 'settings')      renderSettings();
  if (sectionId === 'ai-assistant')   updateAiMessagesLeft();
  
  if (sectionId === 'admin')         adminLoadStats();

  // Re-apply translations after section renders
  if (typeof applyLanguage === 'function') {
    const lang = localStorage.getItem('financeai_lang') || 'en';
    applyLanguage(lang);
  }
}

function scrollToSection(sectionId) {
  showPage('landing');
  setTimeout(() => {
    const el = gel(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// ============================================
// SECCIÓN 4: AUTH
// ============================================
async function loadTransactions() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', session.user.id)
    .order('date', { ascending: false });

  if (STATE.currentProfile) query = query.eq('profile_id', STATE.currentProfile);

  const { data, error } = await query;

  if (error) { console.error('Error cargando transacciones:', error); return; }

  STATE.transactions = data.map(tx => ({
    id: tx.id,
    description: tx.description,
    amount: tx.amount,
    type: tx.type,
    category: tx.category,
    expenseType: tx.expense_type,
    date: tx.date,
   createdAt: tx.created_at,
    cardId: tx.card_id,
    merchant: tx.merchant
  }));
}

async function loadCards() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  let queryCards = supabase
    .from('cards')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (STATE.currentProfile) queryCards = queryCards.eq('profile_id', STATE.currentProfile);

  const { data, error } = await queryCards;

  if (error) { console.error('Error cargando tarjetas:', error); return; }

  STATE.cards = data.map(c => ({
    id: c.id,
    name: c.name,
    bank: c.bank || '',
    type: c.card_type,
    limit: c.limit_amount,
    balance: c.balance,
    lastFour: c.last_four,
    dueDate: c.due_date,
    color: c.color,
    apr: c.apr || 0,
    ownerType: c.owner_type || 'personal',
    createdAt: c.created_at
  }));
}

async function loadDebts() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  let queryDebts = supabase
    .from('debts')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (STATE.currentProfile) queryDebts = queryDebts.eq('profile_id', STATE.currentProfile);

  const { data, error } = await queryDebts;

  if (error) { console.error('Error cargando deudas:', error); return; }

  STATE.debts = (data || []).map(d => ({
    id: d.id,
    name: d.name,
    balance: d.current_balance,
    originalBalance: d.total_amount,
    apr: d.interest_rate,
    minPayment: d.minimum_payment,
    dueDate: d.due_date,
    debtType: d.debt_type,
    createdAt: d.created_at
  }));
  const cardDebt = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance) || 0), 0);
  STATE.totalDebtCache = cardDebt + manualDebt;
}

async function loadSubscriptions() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  let querySubs = supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (STATE.currentProfile) querySubs = querySubs.eq('profile_id', STATE.currentProfile);

  const { data, error } = await querySubs;

  if (error) { console.error('Error cargando suscripciones:', error); return; }

  STATE.subscriptions = data.map(s => ({
    id: s.id,
    name: s.name,
    amount: s.amount,
    category: s.category,
    billingCycle: s.billing_cycle,
    nextBillingDate: s.next_billing_date,
    billingDay: s.next_billing_date ? new Date(s.next_billing_date).getDate() : null,
    status: s.status,
    createdAt: s.created_at
  }));
  if (typeof renderSubscriptions === 'function') renderSubscriptions();
}

async function initApp() {
  // Ocultar todas las páginas primero
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  loadState();
  localStorage.removeItem('fai_just_logged_in');

  try {
    if (typeof supabase !== 'undefined') {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        STATE.user = session.user;

        // Cargar perfil desde Supabase (plan real)
        await loadUserProfile();

        // Si viene de Stripe con ?success=true forzar recarga
        if (window.location.search.includes('success=true')) {
          await loadUserProfile();
          window.history.replaceState({}, '', '/');
        }

        // Cargar perfil guardado
        const savedProfile = localStorage.getItem('fai_current_profile');
        if (savedProfile) STATE.currentProfile = savedProfile;

        await loadUserProfiles();
        await loadTransactions();
        await loadCards();
        await loadDebts();
        await loadSubscriptions();
        showPage('app');
        showSection('dashboard');
        if (typeof applyLanguage === 'function') {
          const lang = localStorage.getItem('financeai_lang') || 'en';
          applyLanguage(lang);
        }
        updateUserDisplay();
        updateCurrentPlanBadge();
        checkAdminAccess();
        return;
      }
    }
  } catch(e) {
    console.warn('Session error:', e);
  }

  showPage('landing');
}

async function loadUserProfile() {
  if (!STATE.user) return;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('plan, subscription_status, billing_period, trial_ends_at, subscription_ends_at, created_at, ai_usage_count, country, currency, display_name')
      .eq('id', STATE.user.id)
      .single();

    if (data && !error) {
      STATE.settings.plan           = data.plan || 'free';
      STATE.settings.subscriptionStatus = data.subscription_status || 'inactive';
      STATE.settings.billingPeriod  = data.billing_period || 'monthly';
      STATE.settings.trialEndsAt    = data.trial_ends_at || null;
      STATE.settings.subscriptionEnd = data.subscription_ends_at || null;

      // vipPlan for retention flow
      STATE.vipPlan = data.billing_period || 'monthly';

      // days active since account creation
      if (data.created_at) {
        const msPerDay = 1000 * 60 * 60 * 24;
        STATE.daysActive = Math.floor((Date.now() - new Date(data.created_at)) / msPerDay);
      }

      // ai usage count
      STATE.aiUsageCount = data.ai_usage_count || 0;

      // country, currency, display_name
      STATE.settings.country = data.country || 'us';
      STATE.settings.currency = data.currency || 'USD';
      STATE.settings.displayName = data.display_name || '';
      localStorage.setItem('fai_country', STATE.settings.country);
      localStorage.setItem('fai_currency', STATE.settings.currency);

      checkTrialStatus();
      localStorage.setItem('fai_plan', STATE.settings.plan);
      localStorage.setItem('fai_billing', STATE.settings.billingPeriod);
    }
  } catch(e) {
    console.warn('loadUserProfile error:', e);
  }
}

async function saveProfileSettings() {
  if (!STATE.user) { showToast("Debes iniciar sesión", "error"); return; }
  const name    = document.getElementById("set-name")?.value?.trim();
  const country = document.getElementById("set-country")?.value;
  const currency = document.getElementById("set-currency")?.value;

  if (!name) { showToast("El nombre no puede estar vacío", "warning"); return; }

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: name, country, currency })
    .eq("id", STATE.user.id);

  if (error) { showToast("Error al guardar perfil", "error"); console.error(error); return; }

  STATE.settings.displayName = name;
  STATE.settings.country = country;
  STATE.settings.currency = currency;
  localStorage.setItem("fai_country", country);
  localStorage.setItem("fai_currency", currency);

  showToast("✅ Perfil actualizado", "success");
}


function checkTrialStatus() {
  const plan = STATE.settings.plan || 'free';
  const trialEndsAt = STATE.settings.trialEndsAt;
  const subscriptionEnd = STATE.settings.subscriptionEnd;
  const now = new Date();

  if (plan === 'pro' || plan === 'personal' || plan === 'business') {
    const subEnd = subscriptionEnd ? new Date(subscriptionEnd) : null;
    if (!subEnd || subEnd > now) return;
  }

  if (trialEndsAt) {
    const trialEnd = new Date(trialEndsAt);
    if (trialEnd < now) {
      showTrialExpiredModal();
    } else {
      const daysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
      showTrialBanner(daysLeft);
    }
  }
}

function showTrialBanner(daysLeft) {
  const existing = document.getElementById('trial-banner');
  if (existing) return;
  const banner = document.createElement('div');
  banner.id = 'trial-banner';
  banner.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; z-index: 9998;
    background: linear-gradient(90deg, #f59e0b, #ef4444);
    color: white; text-align: center; padding: 10px 16px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.3px;
  `;
  banner.innerHTML = daysLeft <= 1
    ? `⚡ Tu prueba gratuita termina HOY — <a href="#" onclick="showTrialExpiredModal()" style="color:white;text-decoration:underline;">Activa tu plan ahora</a>`
    : `🎯 Te quedan <strong>${daysLeft} días</strong> de prueba gratuita — <a href="#" onclick="showTrialExpiredModal()" style="color:white;text-decoration:underline;">Ver planes</a>`;
  document.body.prepend(banner);
}

function showTrialExpiredModal() {
  const existing = document.getElementById('trial-expired-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'trial-expired-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  `;
  modal.innerHTML = `
    <div style="
      background: #0f172a; border-radius: 24px; padding: 40px 32px;
      max-width: 420px; width: 100%; text-align: center;
      border: 1px solid rgba(245,158,11,0.3);
      box-shadow: 0 0 60px rgba(245,158,11,0.15);
    ">
      <div style="font-size: 48px; margin-bottom: 12px;">🔒</div>
      <h2 style="color: #f59e0b; font-size: 22px; font-weight: 800; margin-bottom: 8px;">
        Tu prueba gratuita ha terminado
      </h2>
      <p style="color: #94a3b8; font-size: 14px; margin-bottom: 8px;">
        Has experimentado el poder de <strong style="color:white;">FinanceAI Pro</strong>.
      </p>
      <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 24px; line-height: 1.6;">
        Miles de personas ya controlan sus finanzas, eliminan deudas más rápido
        y toman mejores decisiones con FinanceAI. <strong style="color:#f59e0b;">No pierdas tu progreso.</strong>
      </p>
      <div style="
        background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2);
        border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: left;
      ">
        <div style="color: #f59e0b; font-weight: 700; margin-bottom: 10px; font-size: 13px;">✨ Lo que obtienes con Pro:</div>
        <div style="color: #e2e8f0; font-size: 13px; line-height: 1.8;">
          ✅ Transacciones ilimitadas<br>
          ✅ Recomendaciones AI personalizadas<br>
          ✅ Reportes financieros mensuales<br>
          ✅ Hasta 15 tarjetas de crédito<br>
          ✅ Soporte prioritario
        </div>
      </div>
      <button onclick="if(document.querySelector('.modal-overlay')){document.querySelector('.modal-overlay').style.display='none';} showSection('settings'); setTimeout(()=>{const el=document.getElementById('pricing');if(el)el.scrollIntoView({behavior:'smooth'});},300);" style="

        width: 100%; padding: 16px; border-radius: 12px; border: none;
        background: linear-gradient(135deg, #f59e0b, #ef4444);
        color: white; font-size: 16px; font-weight: 800; cursor: pointer;
        margin-bottom: 12px; letter-spacing: 0.5px;
      ">
        🚀 Activar FinanceAI Pro — desde $7.99/mes
      </button>
      <p style="color: #64748b; font-size: 11px;">
        💳 Cancela cuando quieras · Sin compromisos · 100% seguro
      </p>
    </div>
  `;
  document.body.appendChild(modal);
}

function updateUserDisplay() {
  if (!STATE.user) return;
  const name = STATE.user.user_metadata?.full_name
    || STATE.user.user_metadata?.name
    || STATE.user.email?.split('@')[0]
    || 'Usuario';
  const plan    = STATE.settings.plan || 'free';
  const billing = STATE.settings.billingPeriod || 'monthly';
  const billingLabel = billing === 'annual' ? t('billing_annual') : t('billing_monthly');

  const planNames = {
    free:     'Free',
    personal: '⭐ Personal',
    pro:      '🚀 Pro',
    business: '💼 Business'
  };

  const planName  = planNames[plan] || 'Free';
  const planLabel = plan === 'free'
    ? t('plan_free_label')
    : `${planName} · ${billingLabel}`;

  setTxt('user-display-name', name);
  setTxt('user-display-plan', planLabel);
  setTxt('user-avatar', name.charAt(0).toUpperCase());
}

function switchAuthTab(tab) {
  const loginForm    = gel('login-form');
  const registerForm = gel('register-form');
  const tabLogin     = gel('tab-login');
  const tabRegister  = gel('tab-register');
  if (!loginForm || !registerForm) return;
  if (tab === 'login') {
    loginForm.style.display    = 'block';
    registerForm.style.display = 'none';
    if (tabLogin)    tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
  } else {
    loginForm.style.display    = 'none';
    registerForm.style.display = 'block';
    if (tabLogin)    tabLogin.classList.remove('active');
    if (tabRegister) tabRegister.classList.add('active');
  }
}

// ============================================
// SECCIÓN 5: DASHBOARD
// ============================================

function selectCardColor(el) {
  el.closest('#nc-colors').querySelectorAll('div').forEach(d => d.style.outline = 'none');
  el.style.outline = '2px solid #fff';
}


function selectEditCardColor(el) {
  el.closest("#ec-colors").querySelectorAll("div").forEach(d => {
    d.style.outline = "none";
    d.style.border = "none";
  });
  el.style.outline = "2px solid #fff";
  window._selectedEditCardColor = el.dataset.gradient;
}
function renderTransactions(filter = 'all') {
  const allTxs = STATE.transactions || [];
  const container = document.getElementById('transactions-list');
  if (!container) return;

  // Aplicar filtro
  const txs = allTxs.filter(tx => {
    if (filter === 'all')      return true;
    if (filter === 'income')   return tx.type === 'income';
    if (filter === 'expense')  return tx.type === 'expense';
    if (filter === 'personal') return (tx.expenseType || '').toLowerCase() === 'personal';
    if (filter === 'business') return (tx.expenseType || '').toLowerCase() === 'business';
    return true;
  });

  if (txs.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px;color:#8892A4;">
        <div style="font-size:3rem;margin-bottom:12px;opacity:0.4;">💸</div>
        <div>${t('no_transactions')}</div>
      </div>`;
    return;
  }

  const categoryIcons = {
    supermercado: '🛒', restaurante: '🍕', transporte: '🚗', gasolina: '⛽',
    entretenimiento: '🎬', salud: '💊', educacion: '📚', ropa: '👕',
    tecnologia: '💻', freelance: '💼', salario: '💵', ingreso: '💵',
    otros: '📦', other: '📦',
salary: '💵', income: '💵', freelance: '💼',
food: '🍕', 'food & dining': '🍕', dining: '🍕', restaurant: '🍕',
transport: '🚗', transportation: '🚗', 'gas station': '⛽', gas: '⛽',
entertainment: '🎬', shopping: '🛁', clothing: '👕',
health: '💊', education: '📚', technology: '💻',
groceries: '🛒', supermarket: '🛒',
housing: '🏠', rent: '🏠', utilities: '💡',
subscriptions: '📱', insurance: '🛡️'

  };

  container.innerHTML = `
    <table class="table" style="width:100%;">
      <thead>
        <tr>
          <th data-i18n="th_desc">${t('th_desc')}</th>
          <th data-i18n="th_cat">${t('th_cat')}</th>
          <th data-i18n="th_type">${t('th_type')}</th>
          <th data-i18n="th_date">${t('th_date')}</th>
          <th data-i18n="th_amount">${t('th_amount')}</th>
          <th data-i18n="th_actions">${t('th_actions')}</th>
        </tr>
      </thead>
      <tbody>
        ${txs.map(tx => {
          const isIncome = tx.type === 'income';
          const sign     = isIncome ? '+' : '';
          const color    = isIncome ? '#22c55e' : '#ef4444';
          const catKey   = (tx.category || '').toLowerCase();
          const icon     = categoryIcons[catKey] || (isIncome ? '💵' : '📦');
          const typeLabel = isIncome ? t('tab_income') : t('tab_expense');
          const typeBadge = isIncome ? 'badge-success' : 'badge-danger';
          const expType  = tx.expenseType || '';
          const expBadge = expType.toLowerCase() === 'business' ? 'badge-warning' : 'badge-cyan';
          const dateStr  = tx.date ? new Date(tx.date).toLocaleDateString() : '';
          const card = (STATE.cards || []).find(c => c.id === tx.cardId);
const cardBadge = card ? `<span class="badge badge-outline" style="font-size:11px;">💳 ····${card.lastFour || ''}</span>` : '';

          return `
            <tr>
              <td style="color:#fff;font-weight:500;">${tx.description || t('no_description')} ${cardBadge}</td>

              <td>${icon} ${tx.category || (isIncome ? 'Income' : 'Other')}</td>

              <td><span class="badge ${typeBadge}">${typeLabel}</span></td>
              <td style="color:#8892A4;">${dateStr}</td>
              <td style="color:${color};font-weight:700;">${sign}${formatCurrency(Math.abs(parseFloat(tx.amount) || 0))}</td>
              <td>
                <button class="btn btn-outline btn-sm" onclick="openEditTransaction('${tx.id}')" style="margin-right:4px;">✏️</button>
                <button class="btn btn-outline btn-sm" onclick="deleteTransaction('${tx.id}')">🗑️</button>
              </td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}
let _rdTimer = null;
function renderDashboard() {
  clearTimeout(_rdTimer);
  _rdTimer = setTimeout(async () => {
    await _renderDashboardCore();
  }, 0);
}
async function _renderDashboardCore() {
  updateAiMessagesLeft();
  // Banner de límite de transacciones
  const limits = getPlanLimits();
  if (limits.transactions !== -1) {
    const count = STATE.transactions ? STATE.transactions.length : 0;
    const pct   = count / limits.transactions;
    let banner  = document.getElementById('transaction-limit-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'transaction-limit-banner';
      banner.style.cssText = 'display:none; margin:0 0 16px 0; padding:12px 16px; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer;';
      banner.onclick = () => showSection('subscriptions');
      const dashContent = document.querySelector('#page-dashboard .dashboard-content') || document.getElementById('page-dashboard');
      if (dashContent) dashContent.prepend(banner);
    }
    if (pct >= 1) {
      banner.style.display = 'block';
      banner.style.background = 'linear-gradient(135deg,#ef444433,#ef444411)';
      banner.style.border = '1px solid #ef4444';
      banner.style.color = '#ef4444';
      banner.innerHTML = `🚫 ${t("dash_limit_reached")} ${count}/${limits.transactions} ${t("dash_txs_used")} — <u>${t("dash_upgrade")}</u>`;
    } else if (pct >= 0.8) {
      banner.style.display = 'block';
      banner.style.background = 'linear-gradient(135deg,#f59e0b33,#f59e0b11)';
      banner.style.border = '1px solid #f59e0b';
      banner.style.color = '#f59e0b';
      banner.innerHTML = `⚠️ ${count}/${limits.transactions} ${t("dash_txs_used")} — <u>${t("dash_consider_upgrade")}</u>`;
    } else {
      banner.style.display = "none";
    }
  }

  // --- Calcular estadísticas del mes actual ---
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear  = now.getFullYear();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastYear  = thisMonth === 0 ? thisYear - 1 : thisYear;

  const txs = STATE.transactions || [];

  const thisMonthTxs = txs.filter(tx => {
    const d = new Date(tx.date || tx.created_at);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const lastMonthTxs = txs.filter(tx => {
    const d = new Date(tx.date || tx.created_at);
    return d.getMonth() === lastMonth && d.getFullYear() === lastYear;
  });

  const income  = thisMonthTxs.filter(tx => tx.type === 'income').reduce((s, tx) => s + Math.abs(parseFloat(tx.amount) || 0), 0);
  const expense = thisMonthTxs.filter(tx => tx.type === 'expense').reduce((s, tx) => s + Math.abs(parseFloat(tx.amount) || 0), 0);
  const balance = income - expense;
  const savings = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  const lastIncome  = lastMonthTxs.filter(tx => tx.type === 'income').reduce((s, tx) => s + Math.abs(parseFloat(tx.amount) || 0), 0);
  const lastExpense = lastMonthTxs.filter(tx => tx.type === 'expense').reduce((s, tx) => s + Math.abs(parseFloat(tx.amount) || 0), 0);

  const incomePct  = lastIncome  > 0 ? (((income  - lastIncome)  / lastIncome)  * 100).toFixed(1) : 0;
  const expensePct = lastExpense > 0 ? (((expense - lastExpense) / lastExpense) * 100).toFixed(1) : 0;

  const fmt = v => '$' + parseFloat(v).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

  // --- Llenar stat cards ---
  const el = id => document.getElementById(id);
  if (el('val-income'))  el('val-income').textContent  = fmt(income);
  if (el('val-expense'))el('val-expense').textContent = fmt(expense);
  if (el('val-balance')) el('val-balance').textContent = fmt(balance);

  // Asegurar datos frescos de cards y debts
  if (!STATE.cards || STATE.cards.length === 0) await loadCards();
  if (!STATE.debts || STATE.debts.length === 0) await loadDebts();
  const totalDebt = STATE.totalDebtCache || 0;
  // Calcular cambio real: totalDebt vs snapshot del mes anterior guardado
  const prevTotalDebt = parseFloat(localStorage.getItem('fai_prev_month_debt') || '0');
  if (prevTotalDebt === 0 && totalDebt > 0) {
    localStorage.setItem('fai_prev_month_debt', totalDebt.toString());
  }
  STATE.debtChangeThisMonth = prevTotalDebt > 0 ? (totalDebt - prevTotalDebt) : 0;
  const netWorth = balance - totalDebt;
  if (el('val-balance-status')) {
    if (netWorth >= 0) {
      el('val-balance-status').textContent = t('dash_healthy');
      el('val-balance-status').style.color = '#00C851';
    } else if (netWorth > -5000) {
      el('val-balance-status').textContent = t('dash_watch');
      el('val-balance-status').style.color = '#f59e0b';
    } else {
      el('val-balance-status').textContent = t('dash_critical');
      el('val-balance-status').style.color = '#FF4757';
    }
  }

  // --- Cambios vs mes anterior ---
  const changeIncome  = el('val-income')  && el('val-income').closest('.stat-card')  && el('val-income').closest('.stat-card').querySelector('.stat-card-change');
  const changeExpense = el('val-expense')&& el('val-expense').closest('.stat-card')&& el('val-expense').closest('.stat-card').querySelector('.stat-card-change');

  if (changeIncome) {
    const up = parseFloat(incomePct) >= 0;
    changeIncome.className = 'stat-card-change ' + (up ? 'up' : 'down');
    changeIncome.textContent = (up ? '▲ +' : '▼ ') + incomePct + '% ' + t('dash_vs_last');
  }
  if (changeExpense) {
    const up = parseFloat(expensePct) >= 0;
    changeExpense.className = 'stat-card-change ' + (up ? 'down' : 'up');
    changeExpense.textContent = (up ? '▲ +' : '▼ ') + expensePct + '% ' + t('dash_vs_last');
  }

  // --- Deuda total (tarjetas) ---
  if (el('val-debt')) el('val-debt').textContent = fmt(totalDebt);

  // Debt change vs last month (basado en STATE.debts reales)
  const debtChangeEl = el('val-debt-change');
  if (debtChangeEl) {
    if (totalDebt === 0) {
      debtChangeEl.textContent = '-';
      debtChangeEl.style.color = 'var(--text-muted)';
    } else {
      // Usar el cambio real de deuda si existe en STATE
      const debtChange = STATE.debtChangeThisMonth || 0;
      if (debtChange === 0) {
        debtChangeEl.textContent = '-';
        debtChangeEl.style.color = 'var(--text-muted)';
      } else if (debtChange < 0) {
        debtChangeEl.textContent = '↓ ' + fmt(Math.abs(debtChange)) + ' this month';
        debtChangeEl.style.color = 'var(--success)';
      } else {
        debtChangeEl.textContent = '↑ ' + fmt(debtChange) + ' this month';
        debtChangeEl.style.color = '#ef4444';
      }
    }
  }

  // --- Actualizar mensaje AI Assistant con datos reales ---
  const chatIntroEl = document.querySelector('[data-i18n="dash_chat_intro"]');
  if (chatIntroEl) {
    const balancePositive = balance >= 0;
    const balanceMsg = balancePositive ? t('dash_balance_positive') : t('dash_balance_negative');
    chatIntroEl.innerHTML = '👋 ' + t('dash_chat_greeting') + ' <strong>' + fmt(expense) + '</strong> ' + t('dash_chat_spent') + ' ' + balanceMsg + ' ' + t('dash_chat_help');
  }

  // --- Debt Plan widget (datos reales) ---
  const debtListEl = el('dashboard-debt-list');
  if (debtListEl) {
    const allCardDebts2 = (STATE.cards || [])
      .filter(c => (c.type === 'Crédito' || c.type === 'credit') && parseFloat(c.balance) > 0)
      .map(c => ({ balance: parseFloat(c.balance) || 0, minPayment: Math.max(25, c.balance * 0.02) }));
    const allDebts = [...(STATE.debts || []), ...allCardDebts2];
    const allCards = STATE.cards || [];

    // Combinar deudas y tarjetas con balance
    const items = [
      ...allDebts.map(d => ({
        name: d.name,
        balance: parseFloat(d.balance) || 0,
        limit: parseFloat(d.originalBalance) || 0,
        type: 'debt'
      })),
      ...allCards.filter(c => (parseFloat(c.balance) || 0) > 0).map(c => ({
        name: c.name || c.bank || 'Card',
        balance: parseFloat(c.balance) || 0,
        limit: parseFloat(c.limit) || 0,
        type: 'card'
      }))
    ].sort((a, b) => b.balance - a.balance).slice(0, 4);

    if (items.length === 0) {
      debtListEl.innerHTML = '<p style="color:#8892A4;text-align:center;padding:20px;">' + t('debts_empty') + '</p>';
    } else {
      debtListEl.innerHTML = items.map(item => {
        const pct = item.limit > 0 ? Math.round((item.balance / item.limit) * 100) : 0;
        const fillClass = pct >= 50 ? 'danger' : pct >= 30 ? 'warning' : 'success';
        const limitHtml = item.limit > 0
          ? '<div class="progress-bar"><div class="progress-fill ' + fillClass + '" style="width:' + Math.min(pct,100) + '%"></div></div><div class="debt-meta"><span>' + t('lbl_limit') + ': ' + fmt(item.limit) + '</span><span>' + pct + '% ' + t('lbl_used') + '</span></div>'
          : '<div class="debt-meta"><span style="color:#8892A4;">' + t('debts_no_limit') + '</span></div>';
        return '<div class="debt-item"><div class="debt-header"><span class="debt-name">' + item.name + '</span><span class="debt-amount">' + fmt(item.balance) + '</span></div>' + limitHtml + '</div>';
      }).join('');
    }
  }

  // --- Transacciones recientes (últimas 5) ---
  const recentContainer = el('recentTransactions') || el('recent-transactions');
  if (recentContainer) {
    const recent = [...txs].sort((a,b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at)).slice(0, 5);
    if (recent.length === 0) {
      recentContainer.innerHTML = '<p style="color:#8892A4;text-align:center;padding:20px;">' + t('trans_empty') + '</p>';
    } else {
      recentContainer.innerHTML = recent.map(tx => {
        const isIncome = tx.type === 'income';
        const d = new Date(tx.date || tx.created_at);
        const dateStr = d.toLocaleDateString();
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #ffffff11;">
          <div>
            <div style="font-weight:600;color:#E8EBF0;">${tx.description || tx.category || '—'} ${(() => { const card = (STATE.cards || []).find(c => c.id === tx.cardId); return card ? `<span style="font-size:11px;background:#ffffff15;padding:2px 6px;border-radius:4px;color:#8892A4;">💳 ····${card.lastFour || ''}</span>` : ''; })()}</div>
            <div style="font-size:12px;color:#8892A4;">${dateStr}</div>
          </div>
          <div style="font-weight:700;color:${isIncome ? '#00C851' : '#FF4757'};">${isIncome ? '+' : '-'}${fmt(tx.amount)}</div>
        </div>`;
      }).join('');
    }
  }

  // --- Suscripciones widget dashboard ---
  renderSubscriptions();
}


function renderCards() {
  const cards = STATE.cards || [];
  const container = document.getElementById('cards-list');
  if (!container) return;

  if (cards.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px;color:#8892A4;grid-column:1/-1;">
        <div style="font-size:3rem;margin-bottom:12px;opacity:0.4;">💳</div>
        ${t('cards_empty')}<br>
        <button onclick="openAddCard()" style="
          margin-top:12px;background:none;border:none;
          color:#00EEFF;cursor:pointer;
          text-decoration:underline;font-size:inherit;">
          ${t('cards_add')}
        </button>
      </div>`;
    return;
  }

  const defaultGradients = [
    'linear-gradient(135deg,#1a1a3e,#00EEFF22)',
    'linear-gradient(135deg,#1a1a3e,#0d0d2b)',
    'linear-gradient(135deg,#0d1b2a,#1b4332)',
    'linear-gradient(135deg,#2d1b69,#11998e)',
    'linear-gradient(135deg,#1a1a2e,#e94560)'
  ];

  const colorMap = {
    '#ffffff': 'linear-gradient(135deg,#ffffff,#e2e8f0)',
    '#000000': 'linear-gradient(135deg,#111,#333)',
    '#FF4757': 'linear-gradient(135deg,#FF4757,#c0392b)',
    '#00EEFF': 'linear-gradient(135deg,#00EEFF,#0066FF)',
    '#FFD700': 'linear-gradient(135deg,#FFD700,#f39c12)',
    '#00C851': 'linear-gradient(135deg,#00C851,#007E33)',
    '#7B68EE': 'linear-gradient(135deg,#7B68EE,#4a3ab5)',
    '#FF6B35': 'linear-gradient(135deg,#FF6B35,#c0392b)'
  };

  function getCardBg(color, index) {
    if (!color) return defaultGradients[index % defaultGradients.length];
    if (color.startsWith('linear-gradient')) return color;
    return colorMap[color] || `linear-gradient(135deg,${color},${color}cc)`;
  }

  function getTextColor(color) {
    if (!color) return '#fff';
    const light = ['#ffffff', '#FFD700', '#00EEFF'];
    return light.includes(color) ? '#0d0d1a' : '#fff';
  }

  const personalCards = cards.filter(c => (c.ownerType || 'personal') === 'personal');
  const businessCards = cards.filter(c => c.ownerType === 'business');

  function cardHTML(c, i) {
    const used = c.balance || 0;
    const limit = c.limit || 1;
    const pct = Math.min(Math.round((used / limit) * 100), 100);
    // Colores barra: <30 verde, 30-60 amarillo, >60 rojo
    const barColor = pct < 30 ? '#00C851' : pct < 60 ? '#f59e0b' : '#FF4757';
    const usageClass = pct >= 60 ? 'danger' : pct >= 30 ? 'warning' : 'success';
    // Badge de estado
    const badge = pct < 30
      ? { icon: '🟢', label: t('card_healthy'),  bg: 'rgba(0,200,81,0.2)',   color: '#00C851' }
      : pct < 60
      ? { icon: '🟡', label: t('card_warning'), bg: 'rgba(245,158,11,0.2)', color: '#f59e0b' }
      : { icon: '🔴', label: t('card_danger'),   bg: 'rgba(255,71,87,0.2)',  color: '#FF4757' };
    const bg = getCardBg(c.color, i);
    const txtColor = getTextColor(c.color);
    const lastFour = c.lastFour ? `•••• •••• •••• ${c.lastFour}` : '•••• •••• •••• ••••';
    return `
      <div class="credit-card-visual" style="background:${bg};position:relative;">
        <div style="position:absolute;top:12px;left:12px;">
          <span style="
            background:${badge.bg};
            color:${badge.color};
            font-size:10px;font-weight:700;
            padding:3px 8px;border-radius:20px;
            border:1px solid ${badge.color}44;
            letter-spacing:0.5px;">
            ${badge.icon} ${badge.label}
          </span>
        </div>
        <div style="position:absolute;top:12px;right:12px;display:flex;gap:8px;">
          <button onclick="editCard('${c.id}')" style="
            background:rgba(255,255,255,0.15);border:none;border-radius:8px;
            padding:4px 10px;color:${txtColor};cursor:pointer;font-size:12px;">
            ✏️ ${t('btn_edit')}
          </button>
          <button onclick="deleteCard('${c.id}')" style="
            background:rgba(255,71,87,0.3);border:none;border-radius:8px;
            padding:4px 10px;color:#FF4757;cursor:pointer;font-size:12px;">
            🗑️
          </button>
        </div>
        <div class="card-chip" style="margin-top:28px;">💳</div>
        ${c.bank ? `<div style="font-size:11px;color:${txtColor};opacity:0.8;margin-bottom:4px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">${c.bank}</div>` : ''}
        <div class="card-number" style="color:${txtColor};">${lastFour}</div>
        <div class="card-meta">
          <div>
            <div style="font-size:11px;color:${txtColor};opacity:0.7;">${t('card_holder')}</div>
            <div class="card-holder" style="color:${txtColor};">${c.name || t('card_no_name')}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;color:${txtColor};opacity:0.7;">${t('card_limit_label')}</div>
            <div class="card-limit" style="color:${txtColor};">${formatCurrency(limit)}</div>
          </div>
        </div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
            <span style="color:${txtColor};opacity:0.7;">${c.type || t('card_type_credit')}</span>
            <span style="color:${barColor};">${formatCurrency(used)} ${t('card_used')} (${pct}%)</span>
          </div>
          <div class="progress-bar">
            <div style="height:100%;width:${pct}%;background:${barColor};border-radius:4px;transition:width 0.3s ease;"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:${txtColor};opacity:0.7;margin-top:4px;">
            <span>APR: ${c.apr || 0}%</span>
            <span>${t('card_due')} ${c.dueDate || '—'}</span>
          </div>
        </div>
      </div>`;
  }

  let html = '';

  if (personalCards.length > 0) {
    html += `<div style="grid-column:1/-1;margin-bottom:8px;margin-top:4px;">
      <h3 style="color:#94a3b8;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
        ${t('cards_personal')}
      </h3>
    </div>`;
    html += personalCards.map((c, i) => cardHTML(c, i)).join('');
  }

  if (businessCards.length > 0) {
    html += `<div style="grid-column:1/-1;margin-bottom:8px;margin-top:20px;">
      <h3 style="color:#94a3b8;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
        ${t('cards_business')}
      </h3>
    </div>`;
    html += businessCards.map((c, i) => cardHTML(c, i)).join('');
  }

  container.innerHTML = html;
}

function editCard(id) {
  const card = (STATE.cards || []).find(c => c.id === id);
  if (!card) return;

  const modal = document.createElement('div');
  modal.id = 'edit-card-modal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.7);
    display:flex;align-items:flex-start;justify-content:center;
    z-index:9999;padding:20px;overflow-y:auto;`;

  modal.innerHTML = `
    <div style="background:#1A2035;border-radius:20px;padding:32px;
      width:100%;max-width:460px;border:1px solid rgba(255,255,255,0.08);overflow-y:auto;max-height:90vh;">
      <h3 style="margin:0 0 24px;color:#fff;font-size:1.2rem;">${t('card_edit_title')}</h3>

      <div style="display:grid;gap:16px;">
        <div>
          <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_name_bank')}</label>
          <input id="ec-name" value="${card.name || ''}" style="
            width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
            border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_bank_label')}</label>
          <input id="ec-bank" value="${card.bank || ''}" placeholder="${t('card_bank_placeholder')}" style="
            width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
            border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_type_label')}</label>
          <select id="ec-type" style="
            width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
            border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
            <option value="Crédito" data-i18n-val="Crédito" ${card.type==='Crédito'?'selected':''}>${t('card_type_credit')}</option>
            <option value="Débito" ${card.type==='Débito'?'selected':''}>${t('card_type_debit')}</option>
            <option value="Prepago" ${card.type==='Prepago'?'selected':''}>${t('card_type_prepaid')}</option>
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_limit_lbl')}</label>
            <input id="ec-limit" type="number" value="${card.limit || 0}" style="
              width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
              border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_balance_lbl')}</label>
            <input id="ec-balance" type="number" value="${card.balance || 0}" style="
              width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
              border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_last4')}</label>
            <input id="ec-last4" type="number" maxlength="4" value="${card.lastFour || ''}" style="
              width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
              border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_apr')}</label>
            <input id="ec-apr" type="number" step="0.01" value="${card.apr || 0}" style="
              width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
              border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
          </div>
        </div>
        <div>
          <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_color')}</label>
          <div id="ec-colors" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;">
            ${[
              'linear-gradient(135deg,#1a1a3e,#00EEFF44)',
              'linear-gradient(135deg,#2d1b69,#11998e)',
              'linear-gradient(135deg,#1a1a2e,#e94560)',
              'linear-gradient(135deg,#0d1b2a,#1b4332)',
              'linear-gradient(135deg,#1a1a3e,#f59e0b44)',
              'linear-gradient(135deg,#1a1a3e,#a855f744)',
              'linear-gradient(135deg,#1a1a1a,#2d2d2d)',
              'linear-gradient(135deg,#e8e8e8,#ffffff)'
            ].map(g => `<div onclick="selectEditCardColor(this)" data-gradient="${g}" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:${g};${(card.color||'linear-gradient(135deg,#1a1a3e,#00EEFF44)')===g?'outline:2px solid #fff;':''}"></div>`).join('')}
          </div>
        </div>
        <div>
          <label style="font-size:12px;color:#8892A4;display:block;margin-bottom:6px;">${t('card_due_day')}</label>
          <input id="ec-due" type="number" min="1" max="31" value="${card.dueDate || ''}" style="
            width:100%;padding:10px 14px;background:#0D1421;border:1px solid rgba(255,255,255,0.1);
            border-radius:10px;color:#fff;font-size:14px;box-sizing:border-box;">
        </div>

      </div>

      <div style="display:flex;gap:12px;margin-top:24px;">
        <button onclick="document.getElementById('edit-card-modal').remove()" style="
          flex:1;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
          border-radius:12px;color:#8892A4;cursor:pointer;font-size:14px;">
          ${t('btn_cancel')}
        </button>
        <button onclick="saveEditCard('${id}')" style="
          flex:2;padding:12px;background:linear-gradient(135deg,#00EEFF,#0066FF);
          border:none;border-radius:12px;color:#000;cursor:pointer;
          font-size:14px;font-weight:700;">
          ${t('btn_save')}
        </button>
      </div>
    </div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
}

async function recalcCardBalance(cardId) {
  if (!cardId) return;
  const txs = (STATE.transactions || []).filter(t => t.cardId === cardId);
  const spent = txs
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(parseFloat(t.amount) || 0), 0);
  const income = txs
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + Math.abs(parseFloat(t.amount) || 0), 0);
  const newBalance = Math.max(0, spent - income);

  // Actualizar en Supabase
  const { error } = await supabase
    .from('cards')
    .update({ balance: newBalance })
    .eq('id', cardId);

  if (error) { console.error('recalcCardBalance error:', error); return; }

  // Actualizar STATE
  const idx = STATE.cards.findIndex(c => c.id === cardId);
  if (idx !== -1) STATE.cards[idx].balance = newBalance;

  renderCards();
}

async function saveEditCard(id) {
  const name     = document.getElementById('ec-name')?.value?.trim();
  const type     = document.getElementById('ec-type')?.value;
  const limit    = parseFloat(document.getElementById('ec-limit')?.value) || 0;
  const balance  = parseFloat(document.getElementById('ec-balance')?.value) || 0;
  const lastFour = document.getElementById('ec-last4')?.value?.slice(-4);
  const apr      = parseFloat(document.getElementById('ec-apr')?.value) || 0;
  const dueDate  = parseInt(document.getElementById('ec-due')?.value) || null;
  const bank     = document.getElementById('ec-bank')?.value?.trim() || '';
  const color = window._selectedEditCardColor || 
    (document.querySelector("#ec-colors div[style*='outline']")?.dataset?.gradient) || null;

  if (!name) { showToast(t('card_name_required'), 'error'); return; }

  try {
    const { error } = await supabase
      .from('cards')
      .update({
        name,
        card_type:    type,
        limit_amount: limit,
        balance,
        last_four:    lastFour,
        apr,
        due_date:     dueDate,
        bank,
        ...(color && { color })
      })
      .eq('id', id);

    if (error) throw error;

    const idx = STATE.cards.findIndex(c => c.id === id);
    if (idx !== -1) {
      const existingColor = STATE.cards[idx].color;
      STATE.cards[idx] = { ...STATE.cards[idx], name, bank, type, limit, balance, lastFour, apr, dueDate, color: color || existingColor };
    }

    document.getElementById('edit-card-modal')?.remove();
    renderCards();
    showToast(t('card_updated'));
  } catch(e) {
    console.error('Error actualizando tarjeta:', e);
    showToast(t('card_save_error'), 'error');
  }
}

async function deleteCard(id) {
  try {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id);

    if (error) throw error;

    STATE.cards = STATE.cards.filter(c => c.id !== id);
    renderCards();
    showToast(t('card_deleted'));
  } catch(e) {
    console.error('Error eliminando tarjeta:', e);
    showToast(t('card_delete_error'), 'error');
  }
}

// ============================================
// SECCIÓN 9: DEBTS
// ============================================
function renderDebts() {
  // Restore active button and description based on current method
  const methodBtns = document.querySelectorAll('#section-debts .section-tab');
  methodBtns.forEach(b => {
    const isAvalanche = b.getAttribute('onclick')?.includes('avalanche');
    const isSnowball  = b.getAttribute('onclick')?.includes('snowball');
    if (isAvalanche && STATE.currentDebtMethod === 'avalanche') b.classList.add('active');
    else if (isSnowball && STATE.currentDebtMethod === 'snowball') b.classList.add('active');
    else b.classList.remove('active');
  });

  // Restore title and description
  if (STATE.currentDebtMethod === 'avalanche') {
    setTxt('debt-method-title', t('method_avalanche'));
    setTxt('debt-method-desc', t('debt_method_avalanche_desc'));
  } else {
    setTxt('debt-method-title', t('method_snowball'));
    setTxt('debt-method-desc', t('debt_method_snowball_desc'));
  }

  const allCardDebts = (STATE.cards || [])
    .filter(c => (c.type === 'Crédito' || c.type === 'credit') && c.balance > 0)
    .map(c => ({
      id:              c.id,
      name:            c.name,
      balance:         c.balance,
      originalBalance: c.limit,
      apr:             c.apr || 0,
      minPayment:      Math.max(25, c.balance * 0.02),
      dueDate:         c.dueDate,
      ownerType:       c.ownerType || 'personal',
      debtType:        'credit_card'
    }));

  const manualDebts = (STATE.debts || []).map(d => ({
    ...d,
    ownerType:   d.ownerType || 'personal',
    minPayment:  parseFloat(d.minPayment || d.minimum_payment) || Math.max(25, (d.balance || d.amount || 0) * 0.02)
  }));

  let allDebts = [...allCardDebts, ...manualDebts];
  STATE.totalDebtCache = allDebts.reduce((s, d) => s + (d.balance || 0), 0);

  // Sort based on active method
  const method = STATE.currentDebtMethod || 'avalanche';
  if (method === 'avalanche') {
    // Highest APR first
    allDebts.sort((a, b) => (b.apr || 0) - (a.apr || 0));
  } else {
    // Snowball: lowest balance first
    allDebts.sort((a, b) => (a.balance || 0) - (b.balance || 0));
  }

  const personalDebts = allDebts.filter(d => d.ownerType === 'personal');
  const businessDebts = allDebts.filter(d => d.ownerType === 'business');

  const total = allDebts.reduce((s, d) => s + (d.balance || 0), 0);

  const totalMinPay = allDebts.reduce((s, d) => s + (d.minPayment || 0), 0);

  const elDebtTotal   = document.getElementById('debt-stat-total');
  const elDebtTime    = document.getElementById('debt-stat-time');
  const elDebtMinPay  = document.getElementById('debt-stat-saving');
  if (elDebtTotal)  elDebtTotal.textContent  = formatCurrency(total);
  if (elDebtTime)   elDebtTime.textContent   = calcPayoffTime(allDebts);
  if (elDebtMinPay) elDebtMinPay.textContent = formatCurrency(totalMinPay);

  let container = gel('debt-items-list');
  if (!container) {
    const card = document.querySelector('#section-debts .content-grid .card');
    if (card) {
      container = document.createElement('div');
      container.id = 'debt-items-list';
      card.appendChild(container);
    } else return;
  }

  if (allDebts.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:#8892A4;">
        <div style="font-size:2.5rem;margin-bottom:12px;opacity:0.4;">📉</div>
        ${t('debts_empty')}<br>
        <button onclick="openAddDebt()" style="
          margin-top:12px;background:none;border:none;
          color:#00EEFF;cursor:pointer;
          text-decoration:underline;font-size:inherit;">
          ${t('debts_add')}
        </button>
      </div>`;
    return;
  }

  function renderDebtGroup(debts, startIndex) {
    return debts.map((d, i) => {
    // Buscar la tarjeta correspondiente para obtener el límite real
    const matchCard = (STATE.cards || []).find(c =>
      c.name && d.name && c.name.toLowerCase() === d.name.toLowerCase()
    );
    const cardLimit = matchCard ? (matchCard.limit || 0) : 0;
    const usedBalance = d.balance || 0;

    // % usado del límite (igual que en Mis Tarjetas)
    const pct = cardLimit > 0
      ? Math.min(Math.round((usedBalance / cardLimit) * 100), 100)
      : Math.min(Math.round((usedBalance / (d.originalBalance || usedBalance || 1)) * 100), 100);

    // Color basado en % usado (igual que en Mis Tarjetas)
    // Color barra: <30 verde, 30-60 amarillo, >60 rojo (igual que Mis Tarjetas)
    const barColor = pct < 30 ? '#00C851' : pct < 60 ? '#f59e0b' : '#FF4757';
    const usageClass = pct < 30 ? 'success' : pct < 50 ? 'warning' : 'danger';

    // Texto de prioridad sigue usando APR (info útil)
    const priorityText = d.apr > 22 ? t('debt_priority_high')
      : d.apr > 18 ? t('debt_priority_med') : t('debt_priority_low');
    const priorityColor = d.apr > 22 ? 'danger' : d.apr > 18 ? 'warning' : 'success';

    return `
      <div class="debt-item">
        <div class="debt-header">
          <span class="debt-name">${i + 1}. ${d.name}</span>
          <span class="debt-amount">${formatCurrency(d.balance)}</span>
        </div>
        <div style="font-size:12px;color:var(--${priorityColor});margin-bottom:6px;">
          APR: ${d.apr || 0}% — ${priorityText}
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${usageClass}" style="width:${pct}%;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-top:4px;margin-bottom:6px;">
          <span>${formatCurrency(usedBalance)} ${t('debt_used')}${cardLimit > 0 ? ' ' + t('debt_of') + ' ' + formatCurrency(cardLimit) : ''}</span>
          <span>${pct}% ${t('debt_utilized')}</span>
        </div>
        <div class="debt-meta">
          <span>${t('debt_min_pay')}: ${formatCurrency(d.minPayment)}</span>
          <button onclick="deleteDebt('${d.id}')" style="
            background:none;border:none;color:#FF4757;
            cursor:pointer;font-size:0.82rem;">${t('btn_delete')}</button>
        </div>
      </div>`;
    });
  }

  let html = '';

  if (personalDebts.length > 0) {
    html += `<div style="margin-bottom:8px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
        <span style="font-size:1.1rem;">👤</span>
        <span style="color:#fff;font-weight:600;font-size:15px;">${t('debts_personal')}</span>
        <span style="margin-left:auto;color:#00EEFF;font-weight:700;">${formatCurrency(personalDebts.reduce((s,d)=>s+d.balance,0))}</span>
      </div>
      ${renderDebtGroup(personalDebts, 0).join('')}
    </div>`;
  }

  if (businessDebts.length > 0) {
    html += `<div style="margin-top:${personalDebts.length>0?'24px':'0'};">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
        <span style="font-size:1.1rem;">🏢</span>
        <span style="color:#fff;font-weight:600;font-size:15px;">${t('debts_business')}</span>
        <span style="margin-left:auto;color:#a855f7;font-weight:700;">${formatCurrency(businessDebts.reduce((s,d)=>s+d.balance,0))}</span>
      </div>
      ${renderDebtGroup(businessDebts, 0).join('')}
    </div>`;
  }

  container.innerHTML = html;
  renderAIRecommendations(STATE.debts || []);
}

function renderAIRecommendations(allDebts) {
  const container = document.getElementById('ai-recommendations-content');
  if (!container) return;

  if (allDebts.length === 0) {
    container.innerHTML = '';
    return;
  }

  // ── Métricas base ──
  const totalDebt   = allDebts.reduce((s, d) => s + (d.balance || 0), 0);
  const totalMinPay = allDebts.reduce((s, d) => s + (d.minPayment || 0), 0);
  const avgAPR      = allDebts.reduce((s, d) => s + (d.apr || 0), 0) / allDebts.length;

  // Tarjeta con mayor APR
  const highAPR = [...allDebts].sort((a, b) => (b.apr || 0) - (a.apr || 0))[0];

  // Tarjeta con mayor % de uso
  const highUsage = allDebts
    .filter(d => (d.originalBalance || 0) > 0)
    .map(d => ({ ...d, pct: Math.round((d.balance / d.originalBalance) * 100) }))
    .sort((a, b) => b.pct - a.pct)[0];

  // Flujo de caja real
  const income   = (STATE.transactions || [])
    .filter(tx => tx.type === 'income')
    .reduce((s, tx) => s + (tx.amount || 0), 0);
  const expenses = (STATE.transactions || [])
    .filter(tx => tx.type === 'expense')
    .reduce((s, tx) => s + (tx.amount || 0), 0);
  const freeFlow    = income - expenses - totalMinPay;
  const debtRatio   = income > 0 ? (totalDebt / income) : 99;

  // Proyección inversión (7% anual, 10 años)
  const investAmount = Math.round(freeFlow * 0.3);
  const projection   = Math.round(investAmount * 12 * ((Math.pow(1.07, 10) - 1) / 0.07));

  // Tiempo y ahorro con pago extra
  const extraPayment  = freeFlow > 200 ? Math.round(freeFlow * 0.5) : 100;
  const totalMonthly  = totalMinPay + extraPayment;
  const monthsExtra   = totalMonthly > 0 ? Math.ceil(totalDebt / totalMonthly) : 0;
  const monthsMin     = totalMinPay  > 0 ? Math.ceil(totalDebt / totalMinPay)  : 0;
  const interestSaved = Math.round(totalDebt * (avgAPR / 100) * ((monthsMin - monthsExtra) / 12));

  // Tiempo libre de deuda
  const timeStr = monthsExtra >= 24
    ? Math.ceil(monthsExtra / 12) + ' ' + t('time_years')
    : monthsExtra + ' ' + t('time_months');

  let html = '';

  // ── PERFIL: gastos > ingresos ──
  if (freeFlow <= 0) {
    html += `
      <div style="background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.3);border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:var(--danger);margin-bottom:8px;">
          ${t('debt_negative_balance_title')}
        </div>
        <div style="font-size:13px;color:var(--gray);line-height:1.6;">
          ${t('debt_negative_balance_tip')}
        </div>
      </div>`;
  }

  // ── Card 1: Plan personalizado paso a paso ──
  if (highAPR && monthsExtra > 0) {
    html += `
      <div style="background:rgba(0,238,255,0.07);border:1px solid rgba(0,238,255,0.2);border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:var(--accent);margin-bottom:12px;">
          ${t('debt_plan_title')}
        </div>
        <div style="font-size:13px;color:var(--gray);line-height:1.8;">
          <div style="margin-bottom:6px;">
            ${t('debt_plan_step1').replace('{card}', '<strong style="color:var(--white);">' + highAPR.name + '</strong>')}
          </div>
          <div style="margin-bottom:6px;">
            ${t('debt_plan_step2')
              .replace('{card}', '<strong style="color:var(--white);">' + highAPR.name + '</strong>')
              .replace('{apr}', highAPR.apr || 0)}
          </div>
          <div style="margin-bottom:10px;">
            ${t('debt_plan_step3').replace('{card}', '<strong style="color:var(--white);">' + highAPR.name + '</strong>')}
          </div>
          <div style="background:rgba(0,200,150,0.1);border-radius:8px;padding:10px;color:var(--success);font-weight:600;">
            ${t('debt_plan_result')
              .replace('{time}', timeStr)
              .replace('{savings}', formatCurrency(interestSaved > 0 ? interestSaved : 0))}
          </div>
        </div>
      </div>`;
  }

  // ── Card 2: Flujo alto — acelerar deuda ──
  if (freeFlow > 300 && highAPR) {
    const suggested = Math.round(freeFlow * 0.5);
    html += `
      <div style="background:rgba(0,200,150,0.1);border:1px solid rgba(0,200,150,0.2);border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:var(--success);margin-bottom:8px;">
          ${t('debt_high_flow_title')}
        </div>
        <div style="font-size:13px;color:var(--gray);line-height:1.6;">
          ${t('debt_high_flow_tip')
            .replace('{flow}', formatCurrency(Math.round(freeFlow)))
            .replace('{suggested}', formatCurrency(suggested))
            .replace('{card}', '<strong style="color:var(--white);">' + highAPR.name + '</strong>')}
        </div>
      </div>`;
  }

  // ── Card 3: Score crediticio en riesgo ──
  if (highUsage && highUsage.pct >= 70) {
    html += `
      <div style="background:rgba(255,107,53,0.1);border:1px solid rgba(255,107,53,0.2);border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:var(--warning);margin-bottom:8px;">
          ⚠️ ${highUsage.name} ${t('debt_at')} ${highUsage.pct}%
        </div>
        <div style="font-size:13px;color:var(--gray);line-height:1.6;">
          ${t('debt_score_warn')}
        </div>
      </div>`;
  }

  // ── Card 4: Consolidación (APR promedio alto) ──
  if (avgAPR > 18 && allDebts.length >= 2) {
    html += `
      <div style="background:rgba(0,238,255,0.07);border:1px solid var(--border);border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:var(--accent);margin-bottom:8px;">
          💡 ${t('debt_consol_title')}
        </div>
        <div style="font-size:13px;color:var(--gray);line-height:1.6;">
          ${t('debt_consol_tip')}
        </div>
      </div>`;
  }

  // ── Card 5: Flujo muy alto — puerta a inversión ──
  if (freeFlow > 500 && debtRatio < 3) {
    html += `
      <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.2);border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:#a855f7;margin-bottom:8px;">
          ${t('debt_invest_title')}
        </div>
        <div style="font-size:13px;color:var(--gray);line-height:1.6;">
          ${t('debt_invest_tip')
            .replace('{amount}', formatCurrency(investAmount))
            .replace('{projection}', formatCurrency(projection))}
        </div>
      </div>`;
  }

  // ── Card 6: Balance libre moderado ──
  if (freeFlow > 0 && freeFlow <= 500 && highAPR) {
    const suggested  = Math.round(freeFlow * 0.3);
    const intSaved   = Math.round(suggested * (highAPR.apr / 100) * 2);
    html += `
      <div style="background:rgba(0,200,150,0.08);border:1px solid rgba(0,200,150,0.2);border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:var(--success);margin-bottom:8px;">
          ${t('debt_free_balance_title')}
        </div>
        <div style="font-size:13px;color:var(--gray);line-height:1.6;">
          ${t('debt_free_balance_tip')
            .replace('{amount}', formatCurrency(Math.round(freeFlow)))
            .replace('{suggested}', formatCurrency(suggested))
            .replace('{card}', '<strong style="color:var(--white);">' + highAPR.name + '</strong>')
            .replace('{interest}', formatCurrency(intSaved))}
        </div>
      </div>`;
  }

  container.innerHTML = html || '<div style="color:var(--gray);font-size:13px;padding:16px;">' + t('debts_empty') + '</div>';
}

function calcPayoffTime(debts) {
  const total   = debts.reduce((s, d) => s + (d.balance || 0), 0);
  const monthly = debts.reduce((s, d) => s + (d.minPayment || 0), 0);
  if (monthly <= 0) return 'N/A';
  const months = Math.ceil(total / monthly);
  return months >= 24 ? Math.ceil(months / 12) + ' ' + t('time_years') : months + ' ' + t('time_months');
}

function switchDebtMethod(method, btn) {
  document.querySelectorAll('#section-debts .section-tab')
    .forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  STATE.currentDebtMethod = method;
  if (method === 'avalanche') {
    setTxt('debt-method-title', t('method_avalanche'));
    setTxt('debt-method-desc', t('debt_method_avalanche_desc'));
    showToast(t('toast_avalanche'));
  } else {
    setTxt('debt-method-title', t('method_snowball'));
    setTxt('debt-method-desc', t('debt_method_snowball_desc'));
    showToast(t('toast_snowball'));
  }
  saveState();
  renderDebts();
}

function openAddDebt() {
  const existing = gel('modal-debt');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'modal-debt';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.85);
    backdrop-filter:blur(10px);z-index:9999;
    display:flex;align-items:center;
    justify-content:center;padding:20px;`;
  modal.innerHTML = `
    <div style="
      background:#0D1F35;border:1px solid rgba(0,238,255,0.2);
      border-radius:20px;padding:32px;max-width:480px;width:100%;
      font-family:'Segoe UI',Arial,sans-serif;">
      <div style="display:flex;justify-content:space-between;
        align-items:center;margin-bottom:24px;">
        <h2 style="color:#fff;font-size:1.3rem;">${t('debt_add_title')}</h2>
        <button onclick="gel('modal-debt').remove()" style="
          background:none;border:none;color:#8892A4;
          font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      <div class="form-group">
        <label>${t('debt_name_label')}</label>
        <input type="text" id="d-name"
          placeholder="${t('debt_name_placeholder')}" style="width:100%;">
      </div>
      <div class="form-group">
        <label>${t('debt_balance_label')}</label>
        <input type="number" id="d-balance"
          placeholder="0" style="width:100%;">
      </div>
      <div class="form-group">
        <label>${t('card_apr')}</label>
        <input type="number" id="d-apr"
          step="0.1" placeholder="24.99" style="width:100%;">
      </div>
      <div class="form-group">
        <label>${t('debt_min_label')}</label>
        <input type="number" id="d-min"
          placeholder="25" style="width:100%;">
      </div>
      <button onclick="saveDebt()" class="btn btn-primary"
        style="width:100%;margin-top:8px;">
        ${t('debt_save_btn')}
      </button>
    </div>`;
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
}

async function saveDebt() {
  const name       = getVal('d-name').trim();
  const balance    = parseFloat(getVal('d-balance'))  || 0;
  const apr        = parseFloat(getVal('d-apr'))      || 0;
  const minPayment = parseFloat(getVal('d-min'))      || 0;
  const dueDate    = parseInt(getVal('d-due-date'))   || null;
  const debtType   = getVal('d-type')                 || 'credit_card';
  if (!name)        { showToast(t('card_name_required'), 'error'); return; }
  if (balance <= 0) { showToast(t('debt_invalid_balance'), 'error'); return; }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { showToast(t('session_expired'), 'error'); return; }

    const { data, error } = await supabase
      .from('debts')
      .insert([{
        user_id: session.user.id,
        name,
        current_balance: balance,
        total_amount: balance,
        interest_rate: apr,
        minimum_payment: minPayment,
        due_date: dueDate,
        debt_type: debtType
      }])
      .select()
      .single();

    if (error) throw error;

    STATE.debts.push({
      id: data.id, name, balance, apr,
      minPayment, originalBalance: balance,
      dueDate, debtType,
      createdAt: data.created_at
    });

    const modal = gel('modal-debt');
    if (modal) modal.remove();
    renderDebts();
    showToast(t('debt_added'));
  } catch(e) {
    console.error('Error guardando deuda:', e);
    showToast(t('debt_save_error'), 'error');
  }
}

async function deleteDebt(id) {
  try {
    const { error } = await supabase
      .from('debts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    STATE.debts = STATE.debts.filter(d => d.id !== id);
    renderDebts();
    showToast(t('debt_deleted'));
  } catch(e) {
    console.error('Error eliminando deuda:', e);
    showToast(t('debt_delete_error'), 'error');
  }
}

// ============================================
// SECCIÓN 10: SUBSCRIPTIONS
// ============================================
function renderSubscriptions() {
  const subs   = STATE.subscriptions || [];
  const total  = subs.reduce((s, sub) => s + (sub.amount || 0), 0);
  const annual = total * 12;

  const statVals = document.querySelectorAll(
    '#section-subscriptions .stat-card-value'
  );
  if (statVals[0]) statVals[0].textContent = subs.length;
  if (statVals[1]) statVals[1].textContent = formatCurrency(total);
  if (statVals[2]) statVals[2].textContent = formatCurrency(annual);

  // Asignar ID al tbody si no lo tiene
  const section = gel('section-subscriptions');
  if (section) {
    const tbody = section.querySelector('table tbody');
    if (tbody && !tbody.id) tbody.id = 'subs-tbody';
  }

  // Render dashboard widget SIEMPRE, independiente de la tabla
  const dashList = gel('dashboard-subs-list');
  if (dashList) {
    const badgeEl = gel('dashboard-subs-badge');
    if (badgeEl) badgeEl.textContent = formatCurrency(total) + t('per_month_short');
    if (subs.length === 0) {
      dashList.innerHTML = '<p style="color:#8892A4;text-align:center;padding:20px;">' + t('no_subscriptions') + '</p>';
    } else {
      const catIconsD = {streaming:'📺',music:'🎵',software:'💻',fitness:'💪',news:'📰',productivity:'🤖',storage:'☁️',shopping:'📦',gaming:'🎮',design:'🎨',other:'📌'};
      dashList.innerHTML = subs.slice(0, 5).map(s => {
        const icon = catIconsD[s.category] || '📌';
        const today2 = new Date().getDate();
        const daysUntil2 = s.billingDay >= today2 ? s.billingDay - today2 : (30 - today2) + s.billingDay;
        return '<div class="sub-item"><div class="sub-icon">' + icon + '</div><div class="sub-info"><div class="sub-name">' + s.name + '</div><div class="sub-date">' + t('sub_renews') + ' ' + t('sub_day') + ' ' + (s.billingDay || '—') + '</div></div><div class="sub-amount">' + formatCurrency(s.amount) + '</div></div>';
      }).join('');
    }
  }

  const tbody = gel('subs-tbody')
    || (section && section.querySelector('table tbody'));
  if (!tbody) return;

  if (subs.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="6" style="text-align:center;padding:40px;color:#8892A4;">
        ${t('no_subscriptions')}<br>
        <button onclick="openAddSubscription()" style="
          background:none;border:none;color:#00EEFF;
          cursor:pointer;text-decoration:underline;
          font-size:inherit;margin-top:8px;">${t('add_sub_short')}</button>
      </td></tr>`;
    return;
  }

  const catIcons = {
    streaming:'📺', music:'🎵', software:'💻',
    fitness:'💪', news:'📰', productivity:'🤖',
    storage:'☁️', shopping:'📦', gaming:'🎮',
    design:'🎨', other:'📌'
  };

  tbody.innerHTML = subs.map(s => {
    const today = new Date().getDate();
    const daysUntil = s.billingDay >= today
      ? s.billingDay - today
      : (30 - today) + s.billingDay;
    const statusClass = daysUntil <= 3 ? 'badge-warning' : 'badge-success';
    const statusText  = daysUntil <= 3 ? t('status_due_soon') : t('status_active');
    return `
      <tr>
        <td>${catIcons[s.category] || '📌'} ${s.name}</td>
        <td>${s.category || t('cat_other')}</td>
        <td>${formatCurrency(s.amount)}${t('per_month_short')}</td>
        <td>${t('sub_day')} ${s.billingDay || '—'}</td>
        <td><span class="badge ${statusClass}">${statusText}</span></td>
        <td><button class="btn btn-outline btn-sm"
          onclick="deleteSubscription('${s.id}')">${t('cancel_sub')}</button></td>
      </tr>`;
  }).join('');

  // dashboard widget rendered above

  // Actualizar totales en sección subscriptions
  const totalAll = subs.reduce((s, sub) => s + (sub.amount || 0), 0);
  const monthlyEl = gel('subs-monthly-total');
  const annualEl  = gel('subs-annual-total');
  if (monthlyEl) monthlyEl.textContent = formatCurrency(totalAll);
  if (annualEl)  annualEl.textContent  = formatCurrency(totalAll * 12);
}

function openAddSubscription() {
  const existing = gel('modal-sub');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'modal-sub';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.85);
    backdrop-filter:blur(10px);z-index:9999;
    display:flex;align-items:center;
    justify-content:center;padding:20px;`;
  modal.innerHTML = `
    <div style="
      background:#0D1F35;border:1px solid rgba(0,238,255,0.2);
      border-radius:20px;padding:32px;max-width:480px;width:100%;
      font-family:'Segoe UI',Arial,sans-serif;">
      <div style="display:flex;justify-content:space-between;
        align-items:center;margin-bottom:24px;">
        <h2 style="color:#fff;font-size:1.3rem;">${t('add_sub_title')}</h2>
        <button onclick="gel('modal-sub').remove()" style="
          background:none;border:none;color:#8892A4;
          font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      <div class="form-group">
        <label>${t('sub_name_label')}</label>
        <input type="text" id="s-name"
          placeholder="ej: Netflix, Spotify..." style="width:100%;">
      </div>
      <div class="form-group">
        <label>${t('sub_amount_label')}</label>
        <input type="number" id="s-amount"
          step="0.01" placeholder="9.99" style="width:100%;">
      </div>
      <div class="form-group">
        <label>${t('sub_billing_day')}</label>
        <input type="number" id="s-day"
          min="1" max="31" placeholder="15" style="width:100%;">
      </div>
      <div class="form-group">
        <label>${t('sub_category')}</label>
        <select id="s-category" style="width:100%;">
          <option value="streaming">📺 Streaming</option>
          <option value="music">🎵 ${t('cat_music')}</option>
          <option value="software">💻 Software</option>
          <option value="productivity">🤖 ${t('cat_productivity')}</option>
          <option value="storage">☁️ ${t('cat_storage')}</option>
          <option value="shopping">📦 ${t('cat_shopping')}</option>
          <option value="gaming">🎮 ${t('cat_gaming')}</option>
          <option value="fitness">💪 ${t('cat_fitness')}</option>
          <option value="design">🎨 ${t('cat_design')}</option>
          <option value="other">📌 ${t('cat_other')}</option>
        </select>
      </div>
      <button onclick="saveSubscription()" class="btn btn-primary"
        style="width:100%;margin-top:8px;">
        ${t('sub_save')}
      </button>
    </div>`;
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
}

async function saveSubscription() {
  const name       = getVal('s-name').trim();
  const amount     = parseFloat(getVal('s-amount'))  || 0;
  const billingDay = parseInt(getVal('s-day'))        || 1;
  const category   = getVal('s-category') || 'other';
  if (!name)      { showToast(t('card_name_required'), 'error'); return; }
  if (amount <= 0) { showToast(t('subs_invalid_amount'), 'error'); return; }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { showToast(t('session_expired'), 'error'); return; }

    const nextDate = new Date();
    nextDate.setDate(billingDay);
    if (nextDate < new Date()) nextDate.setMonth(nextDate.getMonth() + 1);

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{
        user_id: session.user.id,
        name, amount, category,
        billing_cycle: 'monthly',
        next_billing_date: nextDate.toISOString().split('T')[0],
        status: 'active'
      }])
      .select()
      .single();

    if (error) throw error;

    STATE.subscriptions.push({
      id: data.id, name, amount,
      billingDay, category,
      billingCycle: 'monthly',
      nextBillingDate: nextDate.toISOString().split('T')[0],
      status: 'active',
      createdAt: data.created_at
    });

    const modal = gel('modal-sub');
    if (modal) modal.remove();
    renderSubscriptions();
    showToast(t('subs_added'));
  } catch(e) {
    console.error('Error guardando suscripción:', e);
    showToast(t('subs_save_error'), 'error');
  }
}

async function deleteSubscription(id) {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    STATE.subscriptions = STATE.subscriptions.filter(s => s.id !== id);
    renderSubscriptions();
    showToast(t('subs_deleted'));
  } catch(e) {
    console.error('Error eliminando suscripción:', e);
    showToast(t('subs_delete_error'), 'error');
  }
}

function detectSubscriptionsFromTransactions() {
  const keywords = [
    'netflix','spotify','hulu','disney','amazon prime',
    'youtube','apple','chatgpt','openai','adobe',
    'gym','xbox','playstation','icloud'
  ];
  const found = STATE.transactions.filter(tx =>
    keywords.some(k =>
      (tx.description || '').toLowerCase().includes(k)
    )
  );
  if (found.length > 0) {
    const names = [...new Set(found.map(tx => tx.description))].slice(0, 2);
    showToast(t('subs_detected') + names.join(', '), 'info');
  }
}

// ============================================
// SECCIÓN 11: AI ASSISTANT
// ============================================
function getFinancialContext() {
  const txs   = STATE.transactions || [];
  const cards = STATE.cards || [];
  const debts = STATE.debts || [];
  const subs  = STATE.subscriptions || [];

  const totalIncome  = txs.filter(tx => tx.type === 'income').reduce((s,tx) => s + Number(tx.amount||0), 0);
  const totalExpense = txs.filter(tx => tx.type === 'expense').reduce((s,tx) => s + Number(tx.amount||0), 0);
  const totalDebt    = debts.reduce((s,d) => s + Number(d.amount||0), 0);

  return [
    `${t('ctx_total_income')}: $${totalIncome.toFixed(2)}`,
    `${t('ctx_total_expense')}: $${totalExpense.toFixed(2)}`,
    `${t('ctx_net_balance')}: $${(totalIncome - totalExpense).toFixed(2)}`,
    `${t('ctx_total_debt')}: $${totalDebt.toFixed(2)}`,
    `${t('ctx_cards')}: ${cards.length}`,
    `${t('ctx_subscriptions')}: ${subs.length}`,
    `${t('ctx_plan')}: ${STATE.isVIP ? 'VIP' : t('plan_free_label')}`
  ].join('\n');
}

function appendChatMessage(containerId, role, text) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

async function sendDashChat() {
  const limits = getPlanLimits();
  const used = parseInt(localStorage.getItem('fai_ai_messages_today') || '0');
  if (limits.aiMessages !== -1 && used >= limits.aiMessages) {
    showUpgradeModal('gpt4');
    return;
  }
  const input = document.getElementById('dash-chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  // Verificar límite antes de enviar
  if (!hasAIMessagesLeft()) {
    appendChatMessage('dash-chat', 'user', msg);
    appendChatMessage('dash-chat', 'ai', t('ai_limit_reached'));
    showUpgradePrompt();
    return;
  }

  appendChatMessage('dash-chat', 'user', msg);
  appendChatMessage('dash-chat', 'ai', t('ai_analyzing'));

  try {
    const reply = await askOpenAI(msg, getFinancialContext());
    const msgs = document.getElementById('dash-chat');
    if (msgs) msgs.lastChild.textContent = reply;
  } catch(e) {
    const msgs = document.getElementById('dash-chat');
    if (e.message === 'LIMIT_REACHED') {
      msgs.lastChild.textContent = t('ai_limit_daily');
      showUpgradePrompt();
    } else {
      msgs.lastChild.textContent = t('ai_connect_error');
    }
    console.error('OpenAI error:', e);
  }
}

async function sendMainChat() {
  const limits = getPlanLimits();
  const used = parseInt(localStorage.getItem('fai_ai_messages_today') || '0');
  if (limits.aiMessages !== -1 && used >= limits.aiMessages) {
    showUpgradeModal('gpt4');
    return;
  }
  const input = document.getElementById('main-chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  // Verificar límite antes de enviar
  if (!hasAIMessagesLeft()) {
    appendChatMessage('main-chat', 'user', msg);
    appendChatMessage('main-chat', 'ai', t('ai_limit_reached'));
    showUpgradePrompt();
    return;
  }

  appendChatMessage('main-chat', 'user', msg);
  appendChatMessage('main-chat', 'ai', t('ai_analyzing'));

  try {
    const reply = await askOpenAI(msg, getFinancialContext());
    const msgs = document.getElementById('main-chat');
    if (msgs) msgs.lastChild.textContent = reply;
  } catch(e) {
    const msgs = document.getElementById('main-chat');
    if (e.message === 'LIMIT_REACHED') {
      msgs.lastChild.textContent = t('ai_limit_daily');
      showUpgradePrompt();
    } else {
      msgs.lastChild.textContent = t('ai_connect_error');
    }
    console.error('OpenAI error:', e);
  }
}

async function quickChat(msg) {
  const input = document.getElementById('main-chat-input');
  if (input) input.value = msg;
  await sendMainChat();
}

function checkAdminAccess() {
  const adminEmails = ['orledis.oliveros@gmail.com', 'orledisyuma@gmail.com', 'yula87ramos@gmail.com'];
  const userEmail = STATE.user?.email || '';
  STATE.isAdmin = adminEmails.includes(userEmail);
  const adminNav = document.getElementById('admin-nav-item');
  if (adminNav) adminNav.style.display = STATE.isAdmin ? 'block' : 'none';
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initMobileNav();
});

// ── Upgrade Prompt ─────────────────────────────────────────
function showUpgradePrompt() {
  const existing = document.getElementById('upgradeModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'upgradeModal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  `;
  modal.innerHTML = `
    <div style="background: linear-gradient(145deg, #1e293b, #0f172a); border-radius: 24px; padding: 32px 24px; max-width: 380px; width: 93%; text-align: center; border: 1px solid #f59e0b; box-shadow: 0 0 60px rgba(245,158,11,0.3);">

      <!-- Urgency badge -->
      <div style="background: #ef4444; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; display: inline-block; margin-bottom: 12px; letter-spacing: 1px; text-transform: uppercase;">
        ${t('upgrade_limited_offer')}
      </div>

      <!-- Header -->
      <div style="font-size: 56px; margin-bottom: 8px;">💸</div>
      <h2 style="color: #fff; font-size: 22px; font-weight: 800; margin-bottom: 6px; line-height: 1.3;">${t('upgrade_losing_money')}</h2>
      <p style="color: #94a3b8; font-size: 13px; margin-bottom: 18px; line-height: 1.6;">${t('upgrade_ai_limit_desc')}</p>

      <!-- Benefits -->
      <div style="background: rgba(15,23,42,0.8); border-radius: 14px; padding: 16px; margin-bottom: 18px; text-align: left; border: 1px solid rgba(245,158,11,0.15);">
        <p style="color: #f59e0b; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1px;">${t('upgrade_unlock_all')}</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">💬</span>
            <span style="color:#e2e8f0; font-size:13px;">${t('upgrade_feat_ai')}</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">🧠</span>
            <span style="color:#e2e8f0; font-size:13px;">${t('upgrade_feat_gpt4')}</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">📸</span>
            <span style="color:#e2e8f0; font-size:13px;">${t('upgrade_feat_scanner')}</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">📊</span>
            <span style="color:#e2e8f0; font-size:13px;">${t('upgrade_feat_reports')}</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">🎯</span>
            <span style="color:#e2e8f0; font-size:13px;">${t('upgrade_feat_goals')}</span>
          </div>
        </div>
      </div>

      <!-- Price with anchor -->
      <div style="margin-bottom: 20px;">
        <p style="color:#64748b; font-size:12px; text-decoration: line-through; margin-bottom:2px;">${t('upgrade_real_value')}</p>
        <p style="color:#94a3b8; font-size:12px; margin-bottom:4px;">${t('upgrade_today_get')}</p>
        <p style="color: #f59e0b; font-size: 38px; font-weight: 900; margin: 0; line-height:1;">$7.99<span style="font-size:15px; color:#94a3b8; font-weight:400;">/mes</span></p>
        <p style="color:#10b981; font-size:12px; margin-top:4px;">${t('upgrade_cancel_anytime')}</p>
      </div>

      <!-- Main CTA -->
      <button onclick="document.getElementById('upgradeModal').remove(); startCheckout('pro', 'monthly')"
        style="width:100%; padding: 18px; background: linear-gradient(135deg, #f59e0b, #d97706);
        border: none; border-radius: 14px; color: #000; font-weight: 900; font-size: 17px; cursor: pointer; margin-bottom: 8px;
        box-shadow: 0 6px 30px rgba(245,158,11,0.5); letter-spacing: 0.3px; transition: transform 0.1s;"
        onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
        ${t('cta_control_now')}
      </button>

      <!-- Secondary CTA annual -->
      <button onclick="document.getElementById('upgradeModal').remove(); startCheckout('pro', 'annual')"
        style="width:100%; padding: 12px; background: rgba(245,158,11,0.1);
        border: 1px solid #f59e0b; border-radius: 12px; color: #f59e0b; font-weight: 700; font-size: 13px; cursor: pointer; margin-bottom: 12px;">
        ${t('upgrade_annual_deal')}
      </button>

      <!-- Social proof -->
      <div style="margin-bottom: 12px;">
        <p style="color:#94a3b8; font-size:12px; margin-bottom:4px;">${t('upgrade_social_proof2')}</p>
        <p style="color:#64748b; font-size:11px;">${t('upgrade_testimonial')}</p>
      </div>

      <!-- Dismiss -->
      <button onclick="document.getElementById('upgradeModal').remove();"
        style="width:100%; padding: 10px; background: transparent;
        border: none; color: #334155; cursor: pointer; font-size: 11px;">
        ${t('upgrade_no_thanks')}
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

// ── VIP Code System ─────────────────────────────────────────

async function activateVIPCode() {
  const input = document.getElementById('vip-code-input') || document.getElementById('admin-vip-code-input');
  const msg   = document.getElementById('vip-code-msg');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    msg.style.color = '#ef4444';
    msg.textContent = '❌ ' + t('vip_invalid_code');
    return;
  }

  msg.style.color = '#94a3b8';
  msg.textContent = '⏳ Validating...';

  try {
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;

    const res = await fetch('/api/redeem-gift-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ code })
    });

    const data = await res.json();

    if (!res.ok) {
      const errMap = {
        invalid_code:     t('vip_code_wrong'),
        code_already_used: t('vip_code_used'),
        code_expired:     t('vip_code_wrong'),
      };
      msg.style.color = '#ef4444';
      msg.textContent = '❌ ' + (errMap[data.error] || data.error);
      return;
    }

    STATE.plan = data.plan;
    saveState();

    input.value = '';
    msg.style.color = '#22c55e';
    msg.textContent = '✅ ' + t('vip_code_ok') + ' ' + data.plan;

    applyProAccess();
    updateVIPStatus();
    showToast(`${t('vip_welcome')} ${data.plan}! ${t('enjoy_benefits')}`, 'success');

    localStorage.removeItem('fai_ai_count');
    localStorage.removeItem('fai_ai_date');
    updateAICounter();

  } catch (e) {
    msg.style.color = '#ef4444';
    msg.textContent = '❌ Error: ' + e.message;
  }
}


function updateVIPStatus() {
  const icon  = document.getElementById('vip-status-icon');
  const label = document.getElementById('vip-status-label');
  const sub   = document.getElementById('vip-status-sub');
  const name  = document.getElementById('vip-plan-name');

  if (!icon) return;

  if (STATE.isVIP) {
    const expiry = new Date(STATE.vipExpiry);
    const days   = Math.ceil((expiry - new Date()) / (1000*60*60*24));

    icon.textContent  = '👑';
    if (name) name.textContent = `VIP ${STATE.vipPlan}`;
    if (label) label.innerHTML = `${t('plan_actual')} <strong style="color:#f59e0b;">VIP ${STATE.vipPlan}</strong>`;
    if (sub)   sub.textContent = t('plan_vip_sub').replace('{n}', days);
    if (sub)   sub.style.color = days < 7 ? '#ef4444' : '#22c55e';
  } else {
    icon.textContent  = '🔓';
    if (name) name.textContent = t('plan_free');
    if (label) label.innerHTML = `${t('plan_actual')} <strong style="color:#fff;">${t('plan_free')}</strong>`;
    if (sub)   sub.textContent = t('ai_msgs_day');
    if (sub)   sub.style.color = '#64748b';
  }
}

// ── Admin Panel Functions ────────────────────────────────────
const ADMIN_GENERATED_CODES = [];

function adminGenerateCode() {
  const plan   = document.getElementById('admin-code-plan')?.value || 'Personal';
  const months = document.getElementById('admin-code-months')?.value || '1';

  // Generar código único
  const chars  = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const part1  = Array.from({length:4}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
  const part2  = Array.from({length:4}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
  const prefix = plan === 'Familia' ? 'FAM' : 'VIP';
  const code   = `${prefix}-${part1}-${part2}`;

  // Guardar en memoria y localStorage
  const entry = { code, plan, months: parseInt(months), created: new Date().toISOString(), used: false };
  ADMIN_GENERATED_CODES.push(entry);

  const stored = JSON.parse(localStorage.getItem('fai_admin_codes') || '[]');
  stored.push(entry);
  localStorage.setItem('fai_admin_codes', JSON.stringify(stored));

  // Agregar al sistema VIP_CODES dinámicamente
  VIP_CODES[code] = { plan, months: parseInt(months) };

  // Mostrar código generado
  const display = document.getElementById('admin-code-display');
  const box     = document.getElementById('admin-generated-code');
  if (display) display.textContent = code;
  if (box)     box.style.display   = 'block';

  // Actualizar lista
  adminRefreshCodesList();
  adminLoadStats();
  showToast(`✅ ${t('code_label')} ${code} ${t('code_generated')} — ${plan} ${months} ${t('months_label')}`, 'success');
}

function adminCopyCode() {
  const code = document.getElementById('admin-code-display')?.textContent;
  if (!code) return;
  navigator.clipboard.writeText(code).then(() => {
    showToast(t('code_copied_clipboard'), 'success');
  });
}

function adminRefreshCodesList() {
  const list = document.getElementById('admin-codes-list');
  if (!list) return;

  const stored = JSON.parse(localStorage.getItem('fai_admin_codes') || '[]');
  if (stored.length === 0) {
    list.innerHTML = `<p style="color:#475569; font-size:12px; text-align:center;">${t('no_codes_generated')}</p>`;
    return;
  }

  list.innerHTML = stored.slice().reverse().map(entry => `
    <div style="background:#0f172a; border-radius:8px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <span style="color:#f59e0b; font-size:13px; font-weight:bold; letter-spacing:1px;">${entry.code}</span>
        <span style="color:#64748b; font-size:11px; margin-left:8px;">${entry.plan} · ${entry.months}m</span>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        ${entry.used
          ? `<span style="color:#22c55e; font-size:11px;">${t('code_status_used')}</span>`
          : `<span style="color:#94a3b8; font-size:11px;">${t('code_status_pending')}</span>`}
        <button onclick="navigator.clipboard.writeText(\'${entry.code}\').then(()=>showToast(t(\'code_copied\'),\'success\'))"
          style="padding:3px 8px; background:#334155; border:none; border-radius:4px; color:#fff; cursor:pointer; font-size:11px;">
          📋
        </button>
      </div>
    </div>
  `).join('');
}

function adminLoadUsedCodes() {
  const list = document.getElementById('admin-used-codes-list');
  if (!list) return;

  const usedCodes = JSON.parse(localStorage.getItem('fai_used_codes') || '[]');
  if (usedCodes.length === 0) {
    list.innerHTML = `<p style="color:#475569; font-size:12px; text-align:center;">${t('no_codes_activated')}</p>`;
    return;
  }

  list.innerHTML = usedCodes.map(code => {
    const stored = JSON.parse(localStorage.getItem('fai_admin_codes') || '[]');
    const entry  = stored.find(e => e.code === code);
    return `
      <div style="background:#0f172a; border-radius:8px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="color:#22c55e; font-size:13px; font-weight:bold;">${code}</span>
          ${entry ? `<span style="color:#64748b; font-size:11px; margin-left:8px;">${entry.plan} · ${entry.months}m</span>` : ''}
        </div>
        <span style="color:#22c55e; font-size:11px;">${t('code_status_activated')}</span>
      </div>
    `;
  }).join('');
}

function adminLoadStats() {
  const stored   = JSON.parse(localStorage.getItem('fai_admin_codes') || '[]');
  const used     = JSON.parse(localStorage.getItem('fai_used_codes') || '[]');
  const aiDate   = localStorage.getItem('fai_ai_date');
  const today    = new Date().toISOString().split('T')[0];
  const aiCalls  = aiDate === today ? parseInt(localStorage.getItem('fai_ai_count') || '0') : 0;

  const el = (id, val) => { const e = document.getElementById(id); if(e) e.textContent = val; };
  el('admin-total-users', '1+');
  el('admin-vip-users',   STATE.isVIP ? '1' : '0');
  el('admin-codes-used',  used.length);
  el('admin-ai-calls',    aiCalls);

  adminRefreshCodesList();
  adminLoadUsedCodes();
}

// ── Render Settings ─────────────────────────────────────────

// ── Subscription Management ─────────────────────────────────

async function loadSubscriptionStatus() {
  const active  = document.getElementById('sub-mgmt-active');
  const inactive = document.getElementById('sub-mgmt-inactive');
  const loading  = document.getElementById('sub-mgmt-loading');

  if (!active || !inactive || !loading) return;

  // Show loading
  loading.style.display = 'block';
  active.style.display  = 'none';
  inactive.style.display = 'none';

  try {
    const plan    = STATE.settings.plan || STATE.userPlan || localStorage.getItem('fai_plan') || 'free';
    const billing  = STATE.settings.billingPeriod || localStorage.getItem('fai_billing') || 'monthly';
    const isPro    = ['pro', 'personal', 'business'].includes(plan);
    const hasVIP   = STATE.isVIP && STATE.vipExpiry;

    if (isPro || hasVIP) {
      // Has active subscription
      loading.style.display  = 'none';
      active.style.display   = 'block';
      inactive.style.display = 'none';

      const planNames = { free: 'Free', personal: 'Personal ⭐', pro: 'Pro 💎', business: 'Business 🏢' };
      const planName  = document.getElementById('sub-mgmt-plan-name');
      const renewal   = document.getElementById('sub-mgmt-renewal');
      const billingEl = document.getElementById('sub-mgmt-billing');

      if (planName) planName.textContent = planNames[plan] || 'Pro 💎';
      if (billingEl) billingEl.textContent = billing === 'annual' ? '📅 Anual' : '📅 Mensual';

      if (hasVIP && STATE.vipExpiry) {
        const expiry = new Date(STATE.vipExpiry);
        const days   = Math.ceil((expiry - new Date()) / (1000*60*60*24));
        if (renewal) renewal.textContent = days > 0
          ? `🔄 Renueva el ${expiry.toLocaleDateString()} (en ${days} días)`
          : `⚠️ Expiró el ${expiry.toLocaleDateString()}`;
      } else if (renewal) {
        renewal.textContent = '✅ Suscripción activa vía Stripe';
      }

    } else {
      // No active subscription
      loading.style.display   = 'none';
      inactive.style.display  = 'block';
      active.style.display    = 'none';
    }
  } catch(e) {
    loading.style.display = 'none';
    inactive.style.display = 'block';
  }
}

async function confirmCancelSubscription() {
  // Step 1: Show retention offer first
  const lang = STATE.lang || 'en';
  const reason = 'too_expensive'; // default reason, modal can override

  try {
    const { data: { session } } = await window.supabase.auth.getSession();
    if (!session) throw new Error('No session');

    // Fetch retention offer
    showToast('⏳ Cargando oferta especial...', 'info', 2000);
    const retRes = await fetch('/api/retention-offer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ reason, lang })
    });

    if (retRes.ok) {
      const offer = await retRes.json();
      const accepted = await showRetentionModal(offer, session);
      if (accepted) return; // User accepted offer, don't cancel
    }

    // Step 2: If offer rejected or failed, show classic confirm
    const confirmed = await showCancelConfirmModal();
    if (!confirmed) return;

    const btn = document.querySelector('[onclick="confirmCancelSubscription()"]');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Procesando...'; }

    const res = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cancelar');

    showToast('✅ Suscripción cancelada. Tu acceso continúa hasta ' + new Date(data.accessUntil).toLocaleDateString(), 'success', 6000);
    setTimeout(() => loadSubscriptionStatus(), 1500);

  } catch(e) {
    console.error('Cancel error:', e);
    showToast('❌ Error: ' + e.message, 'error');
  }
}

function showRetentionModal(offer, session) {
  return new Promise((resolve) => {
    const existing = document.getElementById('retention-modal');
    if (existing) existing.remove();

    const lang = STATE.lang || 'en';
    const isEs = lang === 'es';

    const modal = document.createElement('div');
    modal.id = 'retention-modal';
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.85);
      display:flex;align-items:center;justify-content:center;
      z-index:10000;padding:20px;
    `;

    const discountLabel = offer.offerType === 'discount_50'
      ? (isEs ? '50% de descuento' : '50% off')
      : offer.offerType === 'discount_30'
        ? (isEs ? '30% de descuento' : '30% off')
        : (isEs ? 'Pausa tu suscripción' : 'Pause subscription');

    const priceHtml = offer.discountedPrice
      ? `<div style="margin:16px 0;">
          <span style="color:#94a3b8;font-size:14px;text-decoration:line-through;">$${offer.originalPrice}/mo</span>
          <span style="color:#10b981;font-size:28px;font-weight:900;margin-left:8px;">$${offer.discountedPrice}/mo</span>
        </div>`
      : '';

    const expiryNote = offer.expiryDate
      ? `<p style="color:#f59e0b;font-size:11px;margin-top:8px;">⏰ ${isEs ? 'Oferta válida hasta' : 'Offer valid until'}: ${new Date(offer.expiryDate).toLocaleDateString()}</p>`
      : '';

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #6366f1;border-radius:20px;padding:32px;max-width:440px;width:100%;text-align:center;box-shadow:0 0 40px rgba(99,102,241,0.3);">
        <div style="font-size:52px;margin-bottom:12px;">🎁</div>
        <div style="background:linear-gradient(90deg,#6366f1,#8b5cf6);color:#fff;font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:12px;letter-spacing:1px;">
          ${isEs ? 'OFERTA EXCLUSIVA' : 'EXCLUSIVE OFFER'}
        </div>
        <h3 style="color:#fff;font-size:20px;font-weight:900;margin-bottom:8px;">
          ${isEs ? '¡Espera! Tenemos algo para ti' : 'Wait! We have something for you'}
        </h3>
        ${priceHtml}
        <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:12px 0 8px;">
          ${offer.aiMessage || (isEs ? 'Queremos que te quedes.' : 'We want you to stay.')}
        </p>
        ${expiryNote}
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">
          <button id="ret-accept-btn"
            style="padding:14px;background:linear-gradient(90deg,#6366f1,#8b5cf6);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.4);">
            ✨ ${isEs ? `Sí, quiero ${discountLabel}` : `Yes, give me ${discountLabel}`}
          </button>
          <button id="ret-reject-btn"
            style="padding:12px;background:transparent;border:1px solid #334155;border-radius:12px;color:#64748b;font-size:12px;cursor:pointer;">
            ${isEs ? 'No gracias, cancelar de todas formas' : 'No thanks, cancel anyway'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('ret-accept-btn').onclick = async () => {
      modal.remove();
      // Apply discount via API
      try {
        const applyRes = await fetch('/api/apply-retention-discount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ couponId: offer.couponId, retentionId: offer.retentionId })
        });
        const applyData = await applyRes.json();
        if (applyData.success) {
          showToast('🎉 ' + (isEs ? '¡Descuento aplicado! Gracias por quedarte.' : 'Discount applied! Thanks for staying.'), 'success', 5000);
        } else {
          showToast('⚠️ ' + (applyData.error || 'Error applying discount'), 'error');
        }
      } catch(e) {
        showToast('⚠️ Could not apply discount: ' + e.message, 'error');
      }
      resolve(true);
    };

    document.getElementById('ret-reject-btn').onclick = () => {
      modal.remove();
      resolve(false);
    };
  });
}

function showCancelConfirmModal() {
  return new Promise((resolve) => {
    // Remove existing
    const existing = document.getElementById('cancel-confirm-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'cancel-confirm-modal';
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.8);
      display:flex;align-items:center;justify-content:center;
      z-index:9999;padding:20px;
    `;

    modal.innerHTML = `
      <div style="background:#1e293b;border:1px solid #334155;border-radius:20px;padding:32px;max-width:400px;width:100%;text-align:center;">
        <div style="font-size:48px;margin-bottom:16px;">😢</div>
        <h3 style="color:#fff;font-size:18px;font-weight:800;margin-bottom:8px;">¿Seguro que quieres cancelar?</h3>
        <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin-bottom:8px;">
          Perderás acceso a todas las funciones Pro al final de tu periodo actual.
        </p>
        <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:12px;margin-bottom:24px;">
          <div style="color:#ef4444;font-size:12px;font-weight:600;margin-bottom:6px;">❌ Perderás acceso a:</div>
          <div style="color:#94a3b8;font-size:11px;line-height:1.8;">
            IA ilimitada · Reportes avanzados<br>
            Scanner de recibos · Metas financieras<br>
            Recomendaciones personalizadas
          </div>
        </div>
        <div style="display:flex;gap:12px;">
          <button id="cancel-keep-btn"
            style="flex:1;padding:12px;background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.4);border-radius:10px;color:#a5b4fc;font-size:13px;font-weight:700;cursor:pointer;">
            👈 Mantener Plan
          </button>
          <button id="cancel-confirm-btn"
            style="flex:1;padding:12px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);border-radius:10px;color:#ef4444;font-size:13px;font-weight:600;cursor:pointer;">
            Sí, cancelar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('cancel-keep-btn').onclick = () => {
      modal.remove();
      resolve(false);
    };

    document.getElementById('cancel-confirm-btn').onclick = () => {
      modal.remove();
      resolve(true);
    };
  });
}

function renderSettings() {
  updateVIPStatus();
  updateAICounter();
  loadSubscriptionStatus();

  // Mostrar email del usuario
  const emailEl = document.getElementById('settings-user-email');
  if (emailEl && STATE.user) emailEl.textContent = STATE.user.email || '—';

  // Cargar email real en el input
  const emailInput = document.getElementById('set-email');
  if (emailInput && STATE.user) emailInput.value = STATE.user.email || '';

  // Mostrar plan actual
  const planEl = document.getElementById('settings-plan-name');
  if (planEl) planEl.textContent = STATE.isVIP ? `VIP ${STATE.vipPlan}` : t('plan_free');

  // Mostrar vencimiento VIP
  const expiryEl = document.getElementById('settings-vip-expiry');
  if (expiryEl && STATE.isVIP && STATE.vipExpiry) {
    const expiry = new Date(STATE.vipExpiry);
    const days   = Math.ceil((expiry - new Date()) / (1000*60*60*24));
    expiryEl.textContent = t('plan_expires').replace('{n}', days) + ` (${expiry.toLocaleDateString()})`;
    expiryEl.style.color = days < 7 ? '#ef4444' : '#22c55e';
  } else if (expiryEl) {
    expiryEl.textContent = '';
  }

  // Actualizar badge de plan en pricing
  updateCurrentPlanBadge();

  // Cargar valores del perfil en el formulario
  const nameEl = document.getElementById("set-name");
  const countryEl = document.getElementById("set-country");
  const currencyEl = document.getElementById("set-currency");
  if (nameEl) nameEl.value = STATE.settings.displayName || STATE.user?.user_metadata?.full_name || "";
  if (countryEl) countryEl.value = STATE.settings.country || localStorage.getItem("fai_country") || "us";
  if (currencyEl) currencyEl.value = STATE.settings.currency || localStorage.getItem("fai_currency") || "USD";
}

// ── Render Reports ───────────────────────────────────────────
function renderReports() {
  if (!canUseFeature('reports')) { showUpgradeModal('reports'); return; }
  const txs = STATE.transactions || [];

  // Totales
  const totalIncome  = txs.filter(tx => tx.type === 'income').reduce((s,tx) => s + (tx.amount||0), 0);
  const totalExpense = txs.filter(tx => tx.type === 'expense').reduce((s,tx) => s + (tx.amount||0), 0);
  const balance      = totalIncome - totalExpense;

  const el = (id, val) => { const e = document.getElementById(id); if(e) e.textContent = val; };
  el('report-total-income',  `$${totalIncome.toFixed(2)}`);
  el('report-total-expense', `$${totalExpense.toFixed(2)}`);
  el('report-balance',       `$${balance.toFixed(2)}`);
  el('report-total-txs',     `${txs.length}`);

  // Render monthly summary
  renderMonthlyReport();

  // Top categorías de gastos
  const cats = {};
  txs.filter(tx => tx.type === 'expense').forEach(tx => {
    cats[tx.category || 'Otros'] = (cats[tx.category || 'Otros'] || 0) + (tx.amount || 0);
  });

  const topList = document.getElementById('report-top-categories');
  if (topList) {
    const sorted = Object.entries(cats).sort((a,b) => b[1]-a[1]).slice(0,5);
    if (sorted.length === 0) {
      topList.innerHTML = `<p style="color:#475569;font-size:13px;text-align:center;">${t('trans_empty')}</p>`;
    } else {
      const max = sorted[0][1];
      topList.innerHTML = sorted.map(([cat, amt]) => `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
            <span>${cat}</span>
            <span style="color:var(--danger);">$${amt.toFixed(2)}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill warning" style="width:${Math.round((amt/max)*100)}%"></div>
          </div>
        </div>
      `).join('');
    }
  }
}


// ── OpenAI via Vercel Function ──────────────────────────────
async function askOpenAI(userMessage, context = '') {
  // Incrementar contador diario de mensajes IA
  const todayKey = 'fai_ai_messages_today';
  const dateKey  = 'fai_ai_messages_date';
  const today    = new Date().toDateString();
  if (localStorage.getItem(dateKey) !== today) {
    localStorage.setItem(dateKey, today);
    localStorage.setItem(todayKey, '0');
  }
  const used = parseInt(localStorage.getItem(todayKey) || '0');
  localStorage.setItem(todayKey, used + 1);
  updateAiMessagesLeft();

  // Warning al 80% del límite
  const limits = getPlanLimits();
  if (limits.aiMessages !== -1) {
    const remaining = limits.aiMessages - (used + 1);
    if (remaining === Math.floor(limits.aiMessages * 0.2)) {
      showToast(t('ai_msgs_warning').replace('{n}', remaining), 'warning');
    }
  }
  const systemPrompt = `${t('ai_system_prompt')}
${context ? `\n${t('ctx_plan').replace('- Plan','Financial context')}:\n${context}` : ''}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage }
  ];

  const response = await fetch('/api/openai-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, plan: STATE.settings.plan || localStorage.getItem('fai_plan') || 'free' })
  });

  if (!response.ok) throw new Error('Network error');

  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message || 'OpenAI error');
  
  return data.choices?.[0]?.message?.content || t('ai_no_response');
}


function toggleSidebar() {
  const sb = gel('sidebar');
  const overlay = gel('sidebar-overlay');
  if (!sb) return;
  const isOpen = sb.classList.toggle('open');
  if (overlay) overlay.style.display = isOpen ? 'block' : 'none';
}
function closeSidebar() {
  const sb = gel('sidebar');
  const overlay = gel('sidebar-overlay');
  if (sb) sb.classList.remove('open');
  if (overlay) overlay.style.display = 'none';
}
function initMobileNav() {
  const btn = gel('hamburger-btn');
  const closeBtn = gel('sidebar-close');
  if (window.innerWidth <= 900) {
    if (btn) btn.style.display = 'block';
    if (closeBtn) closeBtn.style.display = 'block';
  } else {
    if (btn) btn.style.display = 'none';
    if (closeBtn) closeBtn.style.display = 'none';
    closeSidebar();
  }
}
window.addEventListener('resize', initMobileNav);

// ── Stripe Checkout ─────────────────────────────────────────

// ── PRICES MAP (sincronizado con payment.js) ─────────────────
const PRICES = {
  monthly: {
    personal: 5.99,
    pro:      11.99,
    business: 29.99
  },
  annual: {
    personal: 5.99,
    pro:      11.99,
    business: 29.99
  }
};

// ── Stripe Checkout ─────────────────────────────────────────
async function startCheckout(plan, billing = 'monthly') {
  const user = STATE.user;
  if (!user) {
    showToast(t('login_required'), 'error');
    showPage('auth');
    return;
  }

  const planLabels = { personal: 'Personal ⭐', pro: 'Pro 💎', business: 'Business 🏢' };
  const prices     = PRICES[billing] || PRICES['annual'];
  const price      = prices[plan] || 0;
  const label      = planLabels[plan] || plan;
  const suffix     = billing === 'annual' ? t('price_suffix_annual') : t('price_suffix_monthly');

  showToast(`${t('processing_payment')} ${label} — $${price.toFixed(2)}${suffix}...`, 'info');

  try {
    const res = await fetch('/api/stripe-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan,
        billing,
        userId: user.id,
        email:  user.email,
        price
      })
    });

    const data = await res.json();

    if (data.url) {
      // Toast final persuasivo antes de redirigir
      showToast(t('redirecting_stripe'), 'success');
      setTimeout(() => { window.location.href = data.url; }, 800);
    } else {
      showToast(t('stripe_session_error'), 'error');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    showToast(t('connection_error'), 'error');
  }
}


function updateCurrentPlanBadge() {
  const plan    = STATE.settings.plan || STATE.userPlan || localStorage.getItem('fai_plan') || 'free';
  const billing = STATE.settings.billingPeriod || localStorage.getItem('fai_billing') || 'monthly';
  const planLabels    = { free: 'FREE', personal: 'PERSONAL ⭐', pro: 'PRO 💎', business: 'BUSINESS 🏢' };
  const billingLabels = { monthly: t('billing_monthly'), annual: t('billing_annual') };

  // Badge superior
  const badge = document.getElementById('current-plan-badge');
  // Actualizar también el label de plan en sidebar
  const planDisplay = document.getElementById('user-display-plan');
  const isPro = ['pro', 'personal', 'business'].includes(plan);
  if (planDisplay && isPro) {
    planDisplay.style.color = '#f59e0b';
    planDisplay.style.fontWeight = '700';
  }

  if (badge) {
    if (plan === 'free') {
      badge.textContent = t('current_plan_badge') + ' ' + t('plan_free_label');
    } else {
      badge.textContent = t('current_plan_badge') + ' ' + (planLabels[plan] || plan.toUpperCase()) + ' · ' + (billingLabels[billing] || billing);
    }
  }

  // Badge inferior sidebar
  const sidebarPlan = document.getElementById('sidebar-plan-label');
  if (sidebarPlan) {
    if (plan === 'free') {
      sidebarPlan.textContent = t('plan_free');
    } else {
      sidebarPlan.textContent = (planLabels[plan] || plan) + ' · ' + (billingLabels[billing] || billing);
    }
  }

  const plans = ['free', 'personal', 'pro', 'business'];
  plans.forEach(function(p) {
    const card = document.getElementById('plan-card-' + p);
    if (!card) return;

    // Elimina badge anterior
    const oldBadge = card.querySelector('.plan-current-badge');
    if (oldBadge) oldBadge.remove();

    // Restaura botón
    const btn = card.querySelector('button');
    if (btn && btn.dataset.originalHtml) {
      btn.disabled = false;
      btn.style.cssText = btn.dataset.originalStyle || '';
      btn.innerHTML = btn.dataset.originalHtml;
    }

    // Restaura botón free si no es el plan actual
    if (p === 'free' && plan !== 'free') {
      const freeBtn = document.getElementById('btn-plan-free');
      if (freeBtn) {
        freeBtn.disabled = false;
        freeBtn.style.cssText = 'width:100%; padding:12px; background:#1e293b; border:1px solid #475569; border-radius:10px; color:#94a3b8; font-size:13px; font-weight:600; cursor:pointer;';
        freeBtn.textContent = t('plan_free_forever');
      }
    }

    if (p === plan) {
      // Agrega badge en la card correcta
      const header = card.querySelector('div');
      if (header) {
        const newBadge = document.createElement('span');
        newBadge.className = 'plan-current-badge';
        newBadge.style.cssText = 'background:#334155; color:#94a3b8; font-size:11px; padding:4px 10px; border-radius:10px; font-weight:600; margin-left:8px;';
        newBadge.textContent = t('plan_current');
        header.appendChild(newBadge);
      }

      // Deshabilita botón del plan activo
      if (btn) {
        btn.dataset.originalHtml = btn.innerHTML;
        btn.dataset.originalStyle = btn.style.cssText;
        btn.disabled = true;
        btn.style.cssText = 'width:100%; padding:14px; background:#1e293b; border:1px solid #334155; border-radius:10px; color:#475569; font-size:13px; font-weight:600; cursor:not-allowed;';
        if (p === 'free') {
          btn.textContent = t('plan_current_free');
        } else {
          btn.textContent = '✓ ' + (planLabels[p] || p) + ' · ' + (billingLabels[billing] || t('billing_monthly'));
        }
      }
    }
  });
}

// ── BILLING TOGGLE (landing + app) ───────────────────────────────────
let currentBilling = 'annual'; // billing toggle state

function setBilling(type) {
  currentBilling = type;

  var prices = {
    monthly: { personal: '$5.99',  pro: '$11.99', business: '$29.99',
                lp: '$5.99', lpr: '$11.99', lpb: '$29.99' },
    annual:  { personal: '$5.99',  pro: '$11.99', business: '$29.99',
                lp: '$5.99', lpr: '$11.99', lpb: '$29.99' }
  };
  var p = prices[type];

  // App IDs
  var els = {
    'price-personal':  p.personal,
    'price-pro':       p.pro,
    'price-business':  p.business,
    'cta-personal':    p.personal + (type === 'annual' ? t('price_suffix_annual') : t('price_suffix_monthly')),
    'cta-pro':         p.pro + (type === 'annual' ? t('price_suffix_annual') : t('price_suffix_monthly')),
    'cta-business':    p.business + (type === 'annual' ? t('price_suffix_annual') : t('price_suffix_monthly')),
    // Landing IDs
    'landing-price-personal': p.lp,
    'landing-price-pro':      p.lpr,
    'landing-price-business': p.lpb
  };

  Object.keys(els).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = els[id];
  });

  // Banner anual
  var banner = document.getElementById('annual-savings-banner');
  if (banner) banner.style.display = type === 'annual' ? 'block' : 'none';

  // Botones toggle app
  var btnM = document.getElementById('pricing-btn-monthly');
  var btnA = document.getElementById('pricing-btn-annual');
  if (type === 'annual') {
    if (btnA) { btnA.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; btnA.style.color = '#000'; }
    if (btnM) { btnM.style.background = '#334155'; btnM.style.color = '#94a3b8'; }
  } else {
    if (btnM) { btnM.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; btnM.style.color = '#000'; }
    if (btnA) { btnA.style.background = '#334155'; btnA.style.color = '#94a3b8'; }
  }

  // Botones toggle landing
  var lbtnM = document.getElementById('billing-monthly');
  var lbtnA = document.getElementById('billing-annual');
  if (type === 'annual') {
    if (lbtnA) { lbtnA.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; lbtnA.style.color = '#000'; }
    if (lbtnM) { lbtnM.style.background = '#334155'; lbtnM.style.color = '#94a3b8'; }
  } else {
    if (lbtnM) { lbtnM.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; lbtnM.style.color = '#000'; }
    if (lbtnA) { lbtnA.style.background = '#334155'; lbtnA.style.color = '#94a3b8'; }
  }
}

// Inicializar en annual al cargar
document.addEventListener('DOMContentLoaded', function() {
  setBilling('annual');
});
// ─────────────────────────────────────────────────────────────────────

// ============================================
// SECCIÓN: SCANNER DE RECIBOS IA
// ============================================
function resetScanner() {
  const uploadArea = document.querySelector('.upload-area');
  if (uploadArea) {
    uploadArea.innerHTML = `
      <span style="font-size:48px;">📸</span>
      <div style="margin-top:12px;font-weight:600;color:var(--text);">${t('scanner_upload_title')}</div>
      <div style="color:var(--gray);font-size:14px;margin-top:4px;">${t('scanner_upload_subtitle')}</div>
      <input type="file" id="receipt-input" accept="image/jpeg,image/png,image/gif,image/webp" style="display:none;" onchange="processReceipt(event)">`;
    uploadArea.querySelector('input') && uploadArea.addEventListener('click', () => uploadArea.querySelector('#receipt-input').click());
  }
}

async function processReceipt(event) {
  const file = event.target.files[0];
  if (!file) return;

  const limits = getPlanLimits();
  if (!limits.scanner) {
    showUpgradeModal('scanner');
    return;
  }

  const uploadArea = document.querySelector('.upload-area');
  if (uploadArea) {
    uploadArea.innerHTML = `<div style="padding:40px;text-align:center;"><span style="font-size:40px;">🤖</span><div style="margin-top:12px;color:var(--gray);font-weight:600;">${t('ai_reading_receipt')}<br><span style="font-size:12px;font-weight:400;">${t('ai_reading_seconds')}</span></div></div>`;
  }

  try {
    const base64OrFile = await fileToBase64(file);

    const { data: { session } } = await supabase.auth.getSession();
    const userToken = session?.access_token || SUPABASE_ANON_KEY;

    let response;
    if (base64OrFile && (base64OrFile._useMultipart || base64OrFile._isHeic)) {
      // HEIC file: send as multipart/form-data
      const formData = new FormData();
      formData.append('image', base64OrFile);
      if (base64OrFile._isHeic) formData.append('isHeic', 'true');
      formData.append('prompt', `Analyze this receipt and extract the information in exact JSON format:
{
  "merchant": "merchant name",
  "amount": number_without_symbol,
  "category": "category (${t('scan_prompt_categories')})",
  "date": "YYYY-MM-DD",
  "currency": "USD or detected currency"
}
Only respond with the JSON, no additional text.`);
      response = await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'apikey': SUPABASE_ANON_KEY
        },
        body: formData
      });
    } else {
      // Normal image: send as JSON with base64
      response = await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this receipt and extract the information in exact JSON format:
{
  "merchant": "merchant name",
  "amount": number_without_symbol,
  "category": "category (${t('scan_prompt_categories')})",
  "date": "YYYY-MM-DD",
  "currency": "USD or detected currency"
}
Only respond with the JSON, no additional text.`
                },
                {
                  type: 'image_url',
                  image_url: { url: base64OrFile, detail: 'low' }
                }
              ]
            }
          ],
          max_tokens: 300
        })
      });
    }

    if (!response.ok) throw new Error(t('scan_error_image'));
    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error(t('scan_error_extract'));
    const result = JSON.parse(jsonMatch[0]);

    const categoryEmojis = {
      [t('scan_cat_supermarket')]: '🛒', [t('scan_cat_restaurant')]: '🍽️', [t('scan_cat_gas')]: '⛽',
      [t('scan_cat_pharmacy')]: '💊', [t('scan_cat_clothing')]: '👕', [t('scan_cat_entertainment')]: '🎬',
      [t('scan_cat_transport')]: '🚗', [t('scan_cat_services')]: '⚡', [t('scan_cat_other')]: '📦'
    };
    const emoji = categoryEmojis[result.category] || '📦';

    document.getElementById('scan-merchant').textContent = result.merchant || t('scan_unknown');
    document.getElementById('scan-amount').textContent = `$${parseFloat(result.amount).toFixed(2)}`;
    document.getElementById('scan-category').textContent = `${emoji} ${result.category || t('scan_other')}`;
    document.getElementById('scan-date').textContent = result.date || new Date().toISOString().split('T')[0];

    STATE.lastScan = result;
    document.getElementById('scan-result').classList.add('show');

    // Poblar selector de tarjetas
    const cardSelect = document.getElementById('scan-card-select');
    if (cardSelect) {
      cardSelect.innerHTML = '<option value="">— Sin tarjeta —</option>';
      const cards = STATE.cards || [];
      cards.forEach(card => {
        const opt = document.createElement('option');
        opt.value = card.id;
        opt.textContent = `${card.name || card.bank} ····${card.lastFour || ''}`;
        cardSelect.appendChild(opt);
      });
    }

    showToast(t('receipt_detected'));

    if (uploadArea) {
      uploadArea.innerHTML = `
        <input type="file" id="receipt-input" accept="image/*" style="display:none;" onchange="processReceipt(event)">
        <div class="upload-icon">✅</div>
        <div class="upload-title">${t('receipt_analyzed')}</div>
        <div class="upload-subtitle">${t('scan_again')}</div>`;
      uploadArea.onclick = () => document.getElementById('receipt-input').click();
    }

  } catch(e) {
    console.error('Scanner error:', e);
    if (e.message === 'HEIC_FORMAT') {
      if (uploadArea) {
        uploadArea.innerHTML = `
          <div style="padding:32px;text-align:center;">
            <span style="font-size:48px;">📱</span>
            <div style="margin-top:16px;font-weight:700;font-size:16px;color:var(--text);">Formato HEIC no compatible</div>
            <div style="margin-top:8px;color:var(--gray);font-size:14px;line-height:1.6;">
              Tu iPhone guarda fotos en formato HEIC.<br>
              Para usar el scanner, cambia a JPG en:<br><br>
              <strong style="color:var(--text);">⚙️ Ajustes → Cámara → Formato<br>→ "Más compatible" (JPG)</strong><br><br>
              O toma la foto directamente desde aquí con la cámara.
            </div>
            <button onclick="resetScanner()" style="margin-top:20px;padding:10px 24px;background:var(--primary);color:white;border:none;border-radius:12px;cursor:pointer;font-weight:600;">Intentar de nuevo</button>
          </div>`;
      }
    } else {
      showToast(t('scan_read_error'), 'error');
      if (uploadArea) {
        uploadArea.innerHTML = `
          <input type="file" id="receipt-input" accept="image/*" style="display:none;" onchange="processReceipt(event)">
          <div class="upload-icon">📸</div>
          <div class="upload-title">${t('upload_receipt_title')}</div>
          <div class="upload-subtitle">${t('scan_upload_hint')}</div>`;
        uploadArea.onclick = () => document.getElementById('receipt-input').click();
      }
    }
  }
}

async function fileToBase64(file) {
  const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || 
                 file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
  
  if (isHeic) {
    try {
      // Read raw file as base64
      const rawBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      // Send to server for conversion
      const resp = await fetch('/api/convert-heic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: rawBase64 })
      });
      if (!resp.ok) throw new Error('Server conversion failed');
      const { base64: jpegBase64 } = await resp.json();
      return jpegBase64;
    } catch(e) {
      console.error('HEIC conversion error:', e);
      throw new Error('HEIC_FORMAT');
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function saveScannedTransaction() {
  if (!STATE.lastScan) {
    showToast(t('scan_first'), 'error');
    return;
  }

  const scan = STATE.lastScan;
  const typeEl = document.getElementById('scan-type-select');
  const typeRaw = typeEl ? typeEl.value : 'expense';
  // Normalize to valid Supabase constraint values
  const type = (typeRaw === 'income') ? 'income' : 'expense';
  const cardEl = document.getElementById('scan-card-select');
  const card_id = cardEl && cardEl.value ? cardEl.value : null;

  try {
    const transaction = {
      user_id: STATE.user.id,
      description: scan.merchant || t('receipt_scanned'),
      amount: -Math.abs(parseFloat(scan.amount)),
      category: scan.category || t('cat_other'),
      date: (() => {
        const today = new Date();
        const receiptDate = scan.date ? new Date(scan.date) : null;
        const diffDays = receiptDate ? (today - receiptDate) / (1000*60*60*24) : 999;
        // If receipt date is older than 60 days, use today
        return (diffDays > 60) ? today.toISOString().split('T')[0] : (scan.date || today.toISOString().split('T')[0]);
      })(),
      type: type,
      ...(card_id && { card_id })
    };

    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select();

    if (error) throw error;

    STATE.transactions = [data[0], ...(STATE.transactions || [])];
    document.getElementById('scan-result').classList.remove('show');
    STATE.lastScan = null;

    // Recalc card balance if a card was used
    if (card_id) await recalcCardBalance(card_id);

    // Refresh dashboard and transactions
    renderDashboard();
    renderTransactions();

    showToast(t('saved_history'));

  } catch(e) {
    console.error('Error guardando transacción:', e);
    showToast(t('scan_save_error2') + ' | ' + (e.message || e.code || JSON.stringify(e)), 'error');
  }
}

// ============================================
// SECCIÓN: EXPORT CSV / PDF
// ============================================
function exportData(format) {
  if (!canUseFeature('export')) {
    showToast(t('export_requires_pro'), 'info');
    setTimeout(() => showSection('subscriptions'), 1200);
    return;
  }

  const txs = STATE.transactions || [];
  if (txs.length === 0) {
    showToast(t('trans_export_empty'), 'error');
    return;
  }

  if (format === 'csv') exportCSV(txs);
  if (format === 'pdf') exportPDF(txs);
}

function exportCSV(txs) {
  const headers = [t('csv_header_date'), t('csv_header_desc'), t('csv_header_cat'), t('csv_header_amount'), t('csv_header_type')];
  const rows = txs.map(tx => [
    tx.date || '',
    `"${(tx.description || '').replace(/"/g, '""')}"`,
    tx.category || '',
    tx.amount || 0,
    tx.type || ''
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${t('export_filename')}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(t('csv_downloaded'));
}

function exportPDF(txs) {
  const totalIncome  = txs.filter(tx => tx.type === 'income').reduce((s,tx) => s + Math.abs(tx.amount), 0);
  const totalExpense = txs.filter(tx => tx.type === 'expense').reduce((s,tx) => s + Math.abs(tx.amount), 0);
  const balance      = totalIncome - totalExpense;

  const rows = txs.slice(0, 50).map(tx => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-size:12px;">${tx.date || '—'}</td>
      <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-size:12px;">${tx.description || '—'}</td>
      <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-size:12px;">${tx.category || '—'}</td>
      <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-size:12px;color:${tx.type === 'income' ? '#10b981' : '#ef4444'};font-weight:600;">
        ${tx.type === 'income' ? '+' : '-'}$${Math.abs(tx.amount).toFixed(2)}
      </td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${t('pdf_title')}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; border-bottom: 3px solid #f59e0b; padding-bottom: 16px; }
        .logo { font-size: 24px; font-weight: 800; color: #f59e0b; }
        .date { font-size: 13px; color: #64748b; }
        .summary { display: flex; gap: 24px; margin-bottom: 32px; }
        .summary-card { flex: 1; background: #f8fafc; border-radius: 12px; padding: 16px; text-align: center; }
        .summary-label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
        .summary-value { font-size: 22px; font-weight: 700; }
        .green { color: #10b981; }
        .red { color: #ef4444; }
        .blue { color: #3b82f6; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f59e0b; color: white; padding: 10px 8px; text-align: left; font-size: 13px; }
        .footer { margin-top: 32px; text-align: center; font-size: 11px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">💰 FinanceAI Pro</div>
        <div class="date">${t('pdf_generated')} ${new Date().toLocaleDateString(STATE.settings?.language === 'en' ? 'en-US' : 'es-ES', { year:'numeric', month:'long', day:'numeric' })}</div>
      </div>
      <div class="summary">
        <div class="summary-card">
          <div class="summary-label">${t('summary_income')}</div>
          <div class="summary-value green">+$${totalIncome.toFixed(2)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">${t('summary_expenses')}</div>
          <div class="summary-value red">-$${totalExpense.toFixed(2)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Balance</div>
          <div class="summary-value blue">$${balance.toFixed(2)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">${t('pdf_transactions')}</div>
          <div class="summary-value">${txs.length}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>${t('col_date')}</th><th>${t('col_desc')}</th><th>${t('col_cat')}</th><th>${t('col_amount')}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">
        ${t('pdf_footer')} · ${new Date().getFullYear()}
      </div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => {
    win.print();
    showToast(t('pdf_ready'));
  }, 500);
}

// ============================================
// SECCIÓN: RENDER MONTHLY REPORT (datos reales)
// ============================================
function renderMonthlyReport() {
  const txs = STATE.transactions || [];
  const tbody = document.getElementById('report-monthly-tbody');
  if (!tbody) return;

  const monthNames = [
    t('month_jan'),t('month_feb'),t('month_mar'),t('month_apr'),
    t('month_may'),t('month_jun'),t('month_jul'),t('month_aug'),
    t('month_sep'),t('month_oct'),t('month_nov'),t('month_dec')
  ];

  const byMonth = {};
  txs.forEach(tx => {
    if (!tx.date) return;
    const parts = tx.date.substring(0,10).split('-');
    const d = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if (!byMonth[key]) byMonth[key] = { income: 0, expense: 0 };
    if (tx.type === 'income') byMonth[key].income  += Math.abs(tx.amount);
    else                      byMonth[key].expense += Math.abs(tx.amount);
  });

  const sorted = Object.keys(byMonth).sort().reverse().slice(0, 12);

  if (sorted.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;padding:24px;color:#475569;font-size:13px;">
          ${t('reports_empty_1')}
          <span style="color:var(--accent);cursor:pointer;font-weight:600;"
                onclick="showSection('transactions')">
            ${t('reports_empty_2')}
          </span>
        </td>
      </tr>`;
    return;
  }

  // Detectar mes con más gastos para motivar upgrade
  const worstMonth = sorted.length > 1 ? sorted.reduce((a, b) =>
    byMonth[a].expense > byMonth[b].expense ? a : b
  ) : null;

  tbody.innerHTML = sorted.map(key => {
    const [year, month] = key.split('-');
    const data    = byMonth[key];
    const balance = data.income - data.expense;
    const isWorst = worstMonth && key === worstMonth && data.expense > 0;
    return `
      <tr style="${isWorst ? 'background:rgba(239,68,68,0.04);' : ''}">
        <td>
          <strong>${monthNames[parseInt(month)-1]} ${year}</strong>
          ${isWorst ? `<span style="font-size:10px;color:#ef4444;margin-left:6px;">⚠️ Worst Month</span>` : ''}
        </td>
        <td style="color:var(--success)">+$${data.income.toFixed(2)}</td>
        <td style="color:var(--danger)">-$${data.expense.toFixed(2)}</td>
        <td style="color:${balance >= 0 ? 'var(--accent)' : 'var(--danger)'};font-weight:600;">
          ${balance >= 0 ? '+' : ''}$${balance.toFixed(2)}
          ${balance < 0 ? `<span style="font-size:10px;margin-left:4px;cursor:pointer;" onclick="showSection('plans')">💡 Optimize</span>` : ''}
        </td>
      </tr>`;
  }).join('');
}

// ============================================
// TÉRMINOS Y POLÍTICA DE PRIVACIDAD
// ============================================
function showLegal(type) {
  const isTerms   = type === 'terms';
  const isPrivacy = type === 'privacy';
  const isCookies = type === 'cookies';
  const lang      = STATE.settings?.language || 'es';
  const isEN      = lang === 'en';

  const dateStr = new Date().toLocaleDateString(
    isEN ? 'en-US' : 'es-ES',
    { year:'numeric', month:'long', day:'numeric' }
  );

  const termsContent = isEN ? `
    <h2 style="color:#00EEFF;margin:0 0 8px;">Terms of Service</h2>
    <p style="color:#8892A4;font-size:13px;margin:0 0 24px;">Last updated: ${dateStr}</p>
    <div style="color:#CBD5E1;font-size:14px;line-height:1.8;">
      <h3 style="color:#fff;margin:20px 0 8px;">1. Acceptance of Terms</h3>
      <p>By accessing and using FinanceAI Pro ("the Application"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the service.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">2. Description of Service</h3>
      <p>FinanceAI Pro is a personal finance management platform that allows you to:</p>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Log and categorize income and expenses</li>
        <li>Manage credit and debit cards</li>
        <li>Scan and process receipts</li>
        <li>Analyze debts and subscriptions</li>
        <li>Generate AI-powered financial reports</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">3. Plans and Payments</h3>
      <p>FinanceAI Pro offers subscription plans (Free, Personal, Pro, and Business). Charges are securely processed via Stripe. By subscribing:</p>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>You agree to pay recurring fees</li>
        <li>You can cancel at any time from your customer portal</li>
        <li>No refunds for partial months</li>
        <li>Prices may change with notice</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">4. Acceptable Use</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Provide accurate account information</li>
        <li>Keep your credentials confidential</li>
        <li>Do not use the app for illegal activities</li>
        <li>Do not attempt to access other users data</li>
        <li>Do not reverse engineer or copy the software</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">5. Limitation of Liability</h3>
      <p>FinanceAI Pro is a personal finance organization tool. <strong style="color:#FF4757;">We are not financial advisors.</strong> AI-generated information is for guidance only and does not constitute professional financial, legal, or tax advice.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">6. Termination</h3>
      <p>We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from settings.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">7. Changes to Terms</h3>
      <p>We may update these terms. Continued use of the app after changes constitutes acceptance.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">8. Governing Law</h3>
      <p>These terms are governed by applicable laws in the user's jurisdiction. Disputes will be resolved through arbitration or competent courts.</p>
    </div>` : `
    <h2 style="color:#00EEFF;margin:0 0 8px;">${t('nav_terms')}</h2>
    <p style="color:#8892A4;font-size:13px;margin:0 0 24px;">${t('last_updated')} ${dateStr}</p>
    <div style="color:#CBD5E1;font-size:14px;line-height:1.8;">
      <h3 style="color:#fff;margin:20px 0 8px;">1. Aceptación de los Términos</h3>
      <p>Al acceder y utilizar FinanceAI Pro ("la Aplicación"), usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">2. Descripción del Servicio</h3>
      <p>FinanceAI Pro es una plataforma de gestión financiera personal que permite:</p>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Registrar y categorizar ingresos y gastos</li>
        <li>Gestionar tarjetas de crédito y débito</li>
        <li>Escanear y procesar recibos</li>
        <li>Analizar deudas y suscripciones</li>
        <li>Generar reportes financieros con inteligencia artificial</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">3. Planes y Pagos</h3>
      <p>FinanceAI Pro ofrece planes de suscripción (Free, Personal, Pro y Business). Los cargos son procesados de forma segura mediante Stripe. Al suscribirse:</p>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Acepta pagar las tarifas recurrentes</li>
        <li>Puede cancelar en cualquier momento desde su portal de cliente</li>
        <li>No se realizan reembolsos por meses parciales</li>
        <li>Los precios pueden cambiar con previo aviso</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">4. Uso Aceptable</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Proporcionar información verídica en su cuenta</li>
        <li>Mantener confidencialidad de sus credenciales</li>
        <li>No usar la aplicación para actividades ilegales o fraudulentas</li>
        <li>No intentar acceder a datos de otros usuarios</li>
        <li>No realizar ingeniería inversa o copiar el software</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">5. Limitación de Responsabilidad</h3>
      <p>FinanceAI Pro es una herramienta de organización financiera personal. <strong style="color:#FF4757;">No somos asesores financieros.</strong> La información generada por la IA es orientativa y no constituye asesoramiento financiero, legal o fiscal profesional.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">6. Terminación</h3>
      <p>Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos. Usted puede eliminar su cuenta en cualquier momento desde la configuración.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">7. Cambios a los Términos</h3>
      <p>Podemos actualizar estos términos. El uso continuado de la app después de los cambios constituye aceptación.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">8. Ley Aplicable</h3>
      <p>Estos términos se rigen por las leyes aplicables en la jurisdicción del usuario. Cualquier disputa se resolverá mediante arbitraje o en los tribunales competentes.</p>
    </div>`;

  const privacyContent = isEN ? `
    <h2 style="color:#00EEFF;margin:0 0 8px;">Privacy Policy</h2>
    <p style="color:#8892A4;font-size:13px;margin:0 0 24px;">Last updated: ${dateStr}</p>
    <div style="color:#CBD5E1;font-size:14px;line-height:1.8;">
      <h3 style="color:#fff;margin:20px 0 8px;">1. Information We Collect</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li><strong style="color:#CBD5E1;">Account info:</strong> name, email, encrypted password</li>
        <li><strong style="color:#CBD5E1;">Financial data:</strong> transactions, cards, debts, subscriptions</li>
        <li><strong style="color:#CBD5E1;">Usage data:</strong> pages visited, features used</li>
        <li><strong style="color:#CBD5E1;">Technical info:</strong> device type, browser, IP address</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">2. How We Use Your Information</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Provide and improve the service</li>
        <li>Process payments securely</li>
        <li>Generate personalized AI financial analysis</li>
        <li>Send important service communications</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">3. Data Sharing</h3>
      <p><strong style="color:#00EEFF;">We do not sell your personal data.</strong> We share information only with:</p>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li><strong style="color:#CBD5E1;">Supabase:</strong> secure data storage</li>
        <li><strong style="color:#CBD5E1;">Stripe:</strong> payment processing</li>
        <li><strong style="color:#CBD5E1;">OpenAI:</strong> AI analysis (anonymized data)</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">4. Data Security</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Encrypted HTTPS connections</li>
        <li>Passwords encrypted with bcrypt</li>
        <li>Row-level security in Supabase</li>
        <li>No financial data stored on our servers</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">5. Your Rights</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Access and export your data</li>
        <li>Correct inaccurate data</li>
        <li>Delete your account and all data</li>
        <li>Opt out of non-essential communications</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">6. Contact</h3>
      <p>Privacy questions: <a href="mailto:climberforsuccess@gmail.com" style="color:#00EEFF;">climberforsuccess@gmail.com</a></p>
    </div>` : `
    <h2 style="color:#00EEFF;margin:0 0 8px;">${t('nav_privacy')}</h2>
    <p style="color:#8892A4;font-size:13px;margin:0 0 24px;">${t('last_updated')} ${dateStr}</p>
    <div style="color:#CBD5E1;font-size:14px;line-height:1.8;">
      <h3 style="color:#fff;margin:20px 0 8px;">1. Información que Recopilamos</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li><strong style="color:#CBD5E1;">Información de cuenta:</strong> nombre, email, contraseña cifrada</li>
        <li><strong style="color:#CBD5E1;">Datos financieros:</strong> transacciones, tarjetas, deudas y suscripciones</li>
        <li><strong style="color:#CBD5E1;">Datos de uso:</strong> páginas visitadas, funciones utilizadas</li>
        <li><strong style="color:#CBD5E1;">Información técnica:</strong> tipo de dispositivo, navegador, dirección IP</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">2. Cómo Usamos su Información</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Proveer y mejorar el servicio</li>
        <li>Procesar pagos de forma segura</li>
        <li>Generar análisis financieros personalizados con IA</li>
        <li>Enviar comunicaciones importantes del servicio</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">3. Compartición de Datos</h3>
      <p><strong style="color:#00EEFF;">No vendemos sus datos personales.</strong> Compartimos información únicamente con:</p>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li><strong style="color:#CBD5E1;">Supabase:</strong> almacenamiento seguro de datos</li>
        <li><strong style="color:#CBD5E1;">Stripe:</strong> procesamiento de pagos</li>
        <li><strong style="color:#CBD5E1;">OpenAI:</strong> análisis de IA (datos anonimizados)</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">4. Seguridad de Datos</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Conexiones HTTPS cifradas</li>
        <li>Contraseñas cifradas con bcrypt</li>
        <li>Seguridad a nivel de fila en Supabase</li>
        <li>Sin datos financieros almacenados en nuestros servidores</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">5. Sus Derechos</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li>Acceder y exportar sus datos</li>
        <li>Corregir datos incorrectos</li>
        <li>Eliminar su cuenta y todos sus datos</li>
        <li>Optar por no recibir comunicaciones no esenciales</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">6. Contacto</h3>
      <p>Consultas de privacidad: <a href="mailto:climberforsuccess@gmail.com" style="color:#00EEFF;">climberforsuccess@gmail.com</a></p>
    </div>`;

  const cookiesContent = isEN ? `
    <h2 style="color:#00EEFF;margin:0 0 8px;">🍪 Cookie Policy</h2>
    <p style="color:#8892A4;font-size:13px;margin:0 0 24px;">Last updated: ${dateStr}</p>
    <div style="color:#CBD5E1;font-size:14px;line-height:1.8;">
      <h3 style="color:#fff;margin:20px 0 8px;">1. What are cookies?</h3>
      <p>Cookies are small text files stored on your device when you visit our application. They help us remember your preferences and keep your session active.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">2. Cookies we use</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li><strong style="color:#CBD5E1;">Session:</strong> Keep you securely logged in</li>
        <li><strong style="color:#CBD5E1;">Preferences:</strong> Save your language, currency, and settings</li>
        <li><strong style="color:#CBD5E1;">Security:</strong> Protect against unauthorized access</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">3. Third-party cookies</h3>
      <p>We do not use advertising tracking cookies. Stripe may use technical cookies for secure payment processing.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">4. Cookie control</h3>
      <p>You can configure your browser to reject cookies, though this may affect app functionality. Essential cookies cannot be disabled.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">5. Contact</h3>
      <p>Cookie queries: <a href="mailto:climberforsuccess@gmail.com" style="color:#00EEFF;">climberforsuccess@gmail.com</a></p>
    </div>` : `
    <h2 style="color:#00EEFF;margin:0 0 8px;">🍪 ${t('nav_cookies')}</h2>
    <p style="color:#8892A4;font-size:13px;margin:0 0 24px;">${t('last_updated')} ${dateStr}</p>
    <div style="color:#CBD5E1;font-size:14px;line-height:1.8;">
      <h3 style="color:#fff;margin:20px 0 8px;">1. ¿Qué son las cookies?</h3>
      <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo al visitar nuestra aplicación. Nos ayudan a recordar sus preferencias y mantener su sesión activa.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">2. Cookies que usamos</h3>
      <ul style="margin:8px 0 8px 20px;color:#8892A4;">
        <li><strong style="color:#CBD5E1;">Sesión:</strong> Mantienen su sesión iniciada de forma segura</li>
        <li><strong style="color:#CBD5E1;">Preferencias:</strong> Guardan su idioma, moneda y configuración</li>
        <li><strong style="color:#CBD5E1;">Seguridad:</strong> Protegen contra accesos no autorizados</li>
      </ul>
      <h3 style="color:#fff;margin:20px 0 8px;">3. Cookies de terceros</h3>
      <p>No utilizamos cookies de rastreo publicitario. Stripe puede usar cookies técnicas para el procesamiento seguro de pagos.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">4. Control de cookies</h3>
      <p>Puede configurar su navegador para rechazar cookies, aunque esto puede afectar el funcionamiento de la aplicación. Las cookies esenciales no pueden desactivarse.</p>
      <h3 style="color:#fff;margin:20px 0 8px;">5. Contacto</h3>
      <p>Consultas sobre cookies: <a href="mailto:climberforsuccess@gmail.com" style="color:#00EEFF;">climberforsuccess@gmail.com</a></p>
    </div>`;

  const existing = document.getElementById('legal-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'legal-modal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.85);
    display:flex;align-items:center;justify-content:center;
    z-index:99999;padding:20px;`;

  modal.innerHTML = `
    <div style="
      background:#1A2035;border-radius:20px;padding:32px;
      width:100%;max-width:680px;max-height:85vh;
      border:1px solid rgba(255,255,255,0.08);
      display:flex;flex-direction:column;">

      <div style="display:flex;gap:12px;margin-bottom:24px;">
        <button onclick="showLegal('terms')" style="
          flex:1;padding:10px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;
          background:${isTerms ? 'linear-gradient(135deg,#00EEFF,#0066FF)' : 'rgba(255,255,255,0.05)'};
          border:${isTerms ? 'none' : '1px solid rgba(255,255,255,0.1)'};
          color:${isTerms ? '#000' : '#8892A4'};">
          ${t('nav_terms')}
        </button>
        <button onclick="showLegal('privacy')" style="
          flex:1;padding:10px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;
          background:${isPrivacy ? 'linear-gradient(135deg,#00EEFF,#0066FF)' : 'rgba(255,255,255,0.05)'};
          border:${isPrivacy ? 'none' : '1px solid rgba(255,255,255,0.1)'};
          color:${isPrivacy ? '#000' : '#8892A4'};">
          ${t('nav_privacy')}
        </button>
        <button onclick="showLegal('cookies')" style="
          flex:1;padding:10px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;
          background:${isCookies ? 'linear-gradient(135deg,#00EEFF,#0066FF)' : 'rgba(255,255,255,0.05)'};
          border:${isCookies ? 'none' : '1px solid rgba(255,255,255,0.1)'};
          color:${isCookies ? '#000' : '#8892A4'};">
          ${t('nav_cookies')}
        </button>
      </div>

      <div style="overflow-y:auto;flex:1;padding-right:8px;">
        ${isTerms ? termsContent : isCookies ? cookiesContent : privacyContent}
      </div>

      <button onclick="document.getElementById('legal-modal').remove()" style="
        margin-top:24px;padding:12px;width:100%;
        background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
        border-radius:12px;color:#8892A4;cursor:pointer;font-size:14px;">
        ${t('btn_close')}
      </button>
    </div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
}

function openAddCard() {
  // Verificar límite del plan
  // El chequeo final se hace en saveNewCard con el tipo elegido

  // Crear modal
  let modal = document.getElementById('add-card-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'add-card-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div style="background:#1a1a3e;border-radius:16px;padding:32px;width:90%;max-width:440px;border:1px solid #00EEFF33;">
      <h2 style="color:#fff;margin-bottom:24px;font-size:20px;">${t('card_modal_title')}</h2>

      <label style="color:#94a3b8;font-size:13px;">${t('card_holder_label')}</label>
      <input id="nc-name" placeholder="${t('card_holder_placeholder')}" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">${t('card_bank_label')}</label>
      <input id="nc-bank" placeholder="${t('card_bank_placeholder')}" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">${t('card_type_label')}</label>
      <select id="nc-type" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">
        <option value="Crédito" data-i18n-val="Crédito">${t('card_type_credit')}</option>
        <option value="Débito">${t('card_type_debit')}</option>
      </select>

      <label style="color:#94a3b8;font-size:13px;">${t('card_usage_label')}</label>
      <select id="nc-owner-type" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">
        <option value="personal">${t('card_usage_personal')}</option>
        <option value="business">${t('card_usage_business')}</option>
      </select>

      <label style="color:#94a3b8;font-size:13px;">${t('card_last4')}</label>
      <input id="nc-last4" placeholder="1234" maxlength="4" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">${t('credit_limit')}</label>
      <input id="nc-limit" type="number" placeholder="0.00" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">${t('card_balance_lbl')}</label>
      <input id="nc-balance" type="number" placeholder="0.00" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">${t('card_apr')}</label>
      <input id="nc-apr" type="number" placeholder="0" style="width:100%;padding:10px;margin:6px 0 14px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">${t('card_due_day')}</label>
      <input id="nc-due" type="number" placeholder="15" min="1" max="31" style="width:100%;padding:10px;margin:6px 0 24px;background:#0d0d2b;border:1px solid #00EEFF33;border-radius:8px;color:#fff;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">${t('card_color')}</label>
      <div id="nc-colors" style="display:flex;gap:10px;margin:6px 0 24px;flex-wrap:wrap;">
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#00EEFF44)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#00EEFF44);outline:2px solid #fff;"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#2d1b69,#11998e)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#2d1b69,#11998e);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a2e,#e94560)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a2e,#e94560);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#0d1b2a,#1b4332)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#0d1b2a,#1b4332);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#f59e0b44)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#f59e0b44);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#a855f744)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#a855f744);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a1a,#2d2d2d)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a1a,#2d2d2d);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#e8e8e8,#ffffff)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#e8e8e8,#ffffff);"></div>
      </div>
      <div style="display:flex;gap:12px;">
        <button onclick="document.getElementById('add-card-modal').remove()" style="flex:1;padding:12px;background:transparent;border:1px solid #444;border-radius:8px;color:#94a3b8;cursor:pointer;">${t('btn_cancel')}</button>
        <button onclick="saveNewCard()" style="flex:1;padding:12px;background:linear-gradient(135deg,#00EEFF,#0066FF);border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">${t('btn_save_card')}</button>
      </div>
    </div>
  `;

  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

async function saveNewCard() {
  const name      = document.getElementById('nc-name').value.trim();
  const type      = document.getElementById('nc-type').value;
  const ownerType = document.getElementById('nc-owner-type').value;
  const lastFour  = document.getElementById('nc-last4').value.trim();
  const limit    = parseFloat(document.getElementById('nc-limit').value) || 0;
  const balance  = parseFloat(document.getElementById('nc-balance').value) || 0;
  const apr      = parseFloat(document.getElementById('nc-apr').value) || 0;
  const dueDate  = document.getElementById('nc-due').value.trim();
  const bank     = document.getElementById('nc-bank').value.trim();
  const colorEl  = document.querySelector('#nc-colors [data-gradient][style*="2px solid #fff"]');
  const color    = colorEl ? colorEl.dataset.gradient : 'linear-gradient(135deg,#1a1a3e,#00EEFF44)';

  if (!name) { showToast(t('card_name_required'), 'error'); return; }
  if (!checkCardLimit(ownerType)) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { showToast(t('session_expired'), 'error'); return; }

  const { data, error } = await supabase.from('cards').insert([{
    user_id:      session.user.id,
    name:         name,
    card_type:    type,
    owner_type:   ownerType,
    last_four:    lastFour,
    limit_amount: limit,
    balance:      balance,
    apr:          apr,
    due_date:     dueDate,
    color:        color,
    bank:         bank
  }]).select().single();

  if (error) {
    console.error('Error guardando tarjeta:', error);
    showToast(t('card_save_error'), 'error');
    return;
  }

  STATE.cards.push({
    id:        data.id,
    name:      data.name,
    type:      data.card_type,
    ownerType: data.owner_type || 'personal',
    limit:     data.limit_amount,
    balance:   data.balance,
    lastFour:  data.last_four,
    dueDate:   data.due_date,
    apr:       data.apr || 0,
    color:     data.color || null,
    bank:      data.bank || '',
    createdAt: data.created_at
  });

  document.getElementById('add-card-modal').remove();
  renderCards();
  showToast(t('card_saved_ok'));
}


function filterTransactions(filter, btn) {
  document.querySelectorAll('#section-transactions .section-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderTransactions(filter);
}


function openAddTransaction() {
  const modal = document.createElement('div');
  modal.id = 'modal-add-transaction';
  modal.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(0,0,0,0.7);z-index:9999;
    display:flex;align-items:center;justify-content:center;`;
  
  modal.innerHTML = `
    <div style="background:#1a1f2e;border-radius:16px;padding:32px;width:90%;max-width:480px;
                border:1px solid #ffffff15;">
      <h2 style="color:#fff;margin:0 0 24px;font-size:1.3rem;">${t('tx_new_title')}</h2>
      
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('tx_label_desc')}</label>
          <input id="tx-description" type="text" placeholder="${t('tx_placeholder_desc')}"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;">
        </div>
        
        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('tx_label_amount')}</label>
          <input id="tx-amount" type="number" placeholder="0.00" min="0" step="0.01"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;">
        </div>
        
        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('card_type_label')}</label>
          <select id="tx-type"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;">
            <option value="expense">${t('tx_opt_expense')}</option>
            <option value="income">${t('tx_opt_income')}</option>
          </select>
        </div>

        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('tx_label_owner')}</label>
          <select id="tx-category-type"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;">
            <option value="personal">${t('tx_opt_personal')}</option>
            <option value="business">${t('tx_opt_business')}</option>
          </select>
        </div>
        
        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('tx_label_category')}</label>
          <input id="tx-category" type="text" placeholder="${t('tx_cat_placeholder')}"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;">
        </div>
        
        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('card_label') || 'Card (optional)'}</label>
          <select id="tx-card"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;">
            <option value="">— No card —</option>
            ${(STATE.cards || []).map(c => `<option value="${c.id}">💳 ${c.name || ''} ····${c.lastFour || ''}</option>`).join('')}
          </select>
        </div>

        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('tx_label_date')}</label>
          <input id="tx-date" type="date"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;"
            value="${new Date().toISOString().split('T')[0]}">
        </div>
      </div>
      
      <div style="display:flex;gap:12px;margin-top:24px;">
        <button onclick="closeAddTransaction()"
          style="flex:1;padding:12px;background:#ffffff10;border:none;border-radius:8px;
                 color:#fff;font-size:14px;cursor:pointer;">${t('btn_cancel')}</button>
        <button onclick="saveNewTransaction()"
          style="flex:1;padding:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);
                 border:none;border-radius:8px;color:#fff;font-size:14px;
                 font-weight:600;cursor:pointer;">${t('btn_save_card')}</button>
      </div>
    </div>`;
  
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) closeAddTransaction(); });
}

function closeAddTransaction() {
  const modal = document.getElementById('modal-add-transaction');
  if (modal) modal.remove();
}

async function saveNewTransaction() {
  const description = document.getElementById('tx-description').value.trim();
  const amount = parseFloat(document.getElementById('tx-amount').value);
  const type = document.getElementById('tx-type').value;
  const category = document.getElementById('tx-category').value.trim();
  const category_type = document.getElementById('tx-category-type').value;
  const date = document.getElementById('tx-date').value;
  const cardId = document.getElementById('tx-card')?.value || null;

  if (!description || !amount || !date) {
    showToast(t('tx_alert_required'), 'error');
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from('transactions').insert([{
    user_id: user.id,
    description,
    amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
    type,
    category,
    expense_type: category_type,
    date,
    card_id: cardId || null
  }]);

  if (error) {
    showToast(t('tx_alert_error') + error.message, 'error');
    return;
  }

  closeAddTransaction();
  await loadTransactions();
  renderTransactions();
  if (cardId) await recalcCardBalance(cardId);
}
function openEditTransaction(id) {
  const tx = (STATE.transactions || []).find(t => t.id === id);
  if (!tx) return;

  const cards = (STATE.cards || []);
  const cardOptions = cards.map(c =>
    `<option value="${c.id}" ${tx.cardId === c.id ? 'selected' : ''}>💳 ${c.name} ····${c.lastFour || ''}</option>`
  ).join('');

  const modal = document.createElement('div');
  modal.id = 'edit-tx-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div style="background:#1a1a3e;border-radius:16px;padding:28px;width:90%;max-width:480px;border:1px solid #2a2a5e;">
      <h3 style="color:#fff;margin:0 0 20px 0;">✏️ ${t('edit_transaction') || 'Edit Transaction'}</h3>

      <label style="color:#94a3b8;font-size:13px;">Description</label>
      <input id="et-desc" value="${tx.description || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">Amount</label>
      <input id="et-amount" type="number" step="0.01" value="${Math.abs(tx.amount) || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">Type</label>
      <select id="et-type" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">
        <option value="expense" ${tx.type === 'expense' ? 'selected' : ''}>Expense</option>
        <option value="income" ${tx.type === 'income' ? 'selected' : ''}>Income</option>
      </select>

      <label style="color:#94a3b8;font-size:13px;">Category</label>
      <input id="et-cat" value="${tx.category || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">Date</label>
      <input id="et-date" type="date" value="${tx.date || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      ${cards.length > 0 ? `
      <label style="color:#94a3b8;font-size:13px;">Card (optional)</label>
      <select id="et-card" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">
        <option value="">No card</option>
        ${cardOptions}
      </select>` : ''}

      <div style="display:flex;gap:10px;margin-top:8px;">
        <button onclick="saveEditTransaction('${id}')" class="btn btn-primary" style="flex:1;">💾 Save</button>
        <button onclick="document.getElementById('edit-tx-modal').remove()" class="btn btn-outline" style="flex:1;">Cancel</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

async function saveEditTransaction(id) {
  const desc   = document.getElementById('et-desc')?.value?.trim();
  const amount = parseFloat(document.getElementById('et-amount')?.value) || 0;
  const type   = document.getElementById('et-type')?.value;
  const cat    = document.getElementById('et-cat')?.value?.trim();
  const date   = document.getElementById('et-date')?.value;
  const cardId = document.getElementById('et-card')?.value || null;

  if (!desc) { showToast('Description required', 'error'); return; }
  if (!amount) { showToast('Amount required', 'error'); return; }

  // Guardar cardId anterior para recalcular si cambió
  const oldTx = (STATE.transactions || []).find(t => t.id === id);
  const oldCardId = oldTx?.cardId || null;

  const finalAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

  const { error } = await supabase
    .from('transactions')
    .update({
      description: desc,
      amount: finalAmount,
      type,
      category: cat,
      date,
      card_id: cardId || null
    })
    .eq('id', id);

  if (error) { showToast('Error updating: ' + error.message, 'error'); return; }

  // Actualizar STATE
  const idx = (STATE.transactions || []).findIndex(t => t.id === id);
  if (idx !== -1) {
    STATE.transactions[idx] = {
      ...STATE.transactions[idx],
      description: desc,
      amount: finalAmount,
      type,
      category: cat,
      date,
      cardId: cardId || null
    };
  }

  document.getElementById('edit-tx-modal')?.remove();
  renderTransactions();
  renderDashboard();

  // Recalcular balance de tarjeta anterior y nueva
  if (oldCardId) await recalcCardBalance(oldCardId);
  if (cardId && cardId !== oldCardId) await recalcCardBalance(cardId);

  showToast('Transaction updated ✅');
}

async function deleteTransaction(id) {
  if (!confirm(t('tx_confirm_delete'))) return;

  // Guardar cardId antes de borrar
  const tx = (STATE.transactions || []).find(t => t.id === id);
  const cardId = tx?.cardId || null;

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    showToast(t('tx_alert_error') + error.message, 'error');
    return;
  }

  // Eliminar del STATE local
  STATE.transactions = STATE.transactions.filter(tx => tx.id !== id);
  renderTransactions();
  renderDashboard();
  if (cardId) await recalcCardBalance(cardId);
  showToast(t('notif_tx_deleted'), 'success');
}

// ===========================
// LANGUAGE CHANGE LISTENER
// ===========================
window.addEventListener('langChanged', async () => {
  const activeSection = STATE.currentSection || '';
  if (activeSection === 'dashboard') { renderDashboard(); }
  else if (activeSection === 'transactions') { renderTransactions(); }
  else if (activeSection === 'cards') { renderCards(); }
  else if (activeSection === 'debts') { renderDebts(); }
  else if (activeSection === 'subscriptions') { renderSubscriptions(); }
  else if (activeSection === 'reports') { renderReports(); }
  else if (activeSection === 'settings') { renderSettings(); }

  // Re-apply translations after dynamic render
  const lang = localStorage.getItem('financeai_lang') || 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && typeof t === 'function') el.innerHTML = t(key);
  });
});


function updateSubscriptionDisplay() {
  const plan    = STATE.settings.plan || 'free';
  const billing = STATE.settings.billingPeriod || 'monthly';
  const isPro   = ['pro', 'personal', 'business'].includes(plan);
  const planNames = { free: 'Free', personal: 'Personal ⭐', pro: 'Pro 💎', business: 'Business 🏢' };
  const planName  = planNames[plan] || 'Free';

  // 1) current-plan-label en settings
  const label = document.getElementById('current-plan-label');
  if (label) {
    label.textContent = isPro
      ? `⚡ Tu plan actual: ${planName} · ${billing}`
      : '✨ Tu plan actual: FREE';
    label.style.color = isPro ? '#f59e0b' : '';
  }

  // 2) Texto "Estás en el plan X" en suscripción
  const subsPlanEls = document.querySelectorAll('[data-subs-plan]');
  subsPlanEls.forEach(el => el.textContent = planName);

  // Buscar el div con "Estás en el plan"
  document.querySelectorAll('div, p, span').forEach(el => {
    if (el.children.length === 0 && el.textContent.includes('Estás en el plan')) {
      el.innerHTML = `Estás en el plan <strong style="color:${isPro ? '#f59e0b' : '#94a3b8'}">${planName}</strong>`;
    }
  });

  // 3) Botón upgrade — ocultar si ya es pro
  const upgradeBtn = document.querySelector('[onclick*="startCheckout"]') || document.querySelector('[onclick*="pricing"]') || document.querySelector('.upgrade-btn');
  if (upgradeBtn && isPro) {
    upgradeBtn.style.display = 'none';
  }

  // 4) Ícono de plan en settings
  const planIcon = document.querySelector('.plan-icon, #plan-icon, .subscription-icon');
  if (planIcon && isPro) {
    planIcon.textContent = '💎';
  }
}

// ============================================================
// PRO BADGE + SECTION LOCK
// ============================================================

const PRO_SECTIONS = ['reports', 'investments'];

function applyProAccess() {
  const plan = STATE.settings.plan || 'free';
  const isPro = ['pro', 'personal', 'business'].includes(plan);

  // 1) Badge en header
  let badge = document.getElementById('pro-plan-badge');
  if (!badge) {
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
      badge = document.createElement('span');
      badge.id = 'pro-plan-badge';
      badge.style.cssText = `
        display:inline-block;
        background: linear-gradient(135deg,#f59e0b,#f97316);
        color:#fff;
        font-size:10px;
        font-weight:700;
        padding:2px 8px;
        border-radius:20px;
        margin-left:6px;
        letter-spacing:0.5px;
        text-transform:uppercase;
        vertical-align:middle;
      `;
      userInfo.appendChild(badge);
    }
  }
  updateSubscriptionDisplay();

  if (badge) {
    badge.textContent = isPro ? '⚡ PRO' : '🆓 FREE';
    badge.style.background = isPro
      ? 'linear-gradient(135deg,#f59e0b,#f97316)'
      : 'linear-gradient(135deg,#64748b,#475569)';
  }

  // 2) Lock nav items para free users
  PRO_SECTIONS.forEach(sectionId => {
    const navItem = document.querySelector(`[onclick*="showSection('${sectionId}')"]`);
    if (!navItem) return;

    // Remover lock previo
    const oldLock = navItem.querySelector('.nav-lock-icon');
    if (oldLock) oldLock.remove();

    if (!isPro) {
      const lock = document.createElement('span');
      lock.className = 'nav-lock-icon';
      lock.textContent = ' 🔒';
      lock.style.cssText = 'font-size:11px; opacity:0.7;';
      navItem.appendChild(lock);
    }
  updateAiMessagesLeft();
  });
}

function checkProAccess(sectionId) {
  const plan = STATE.settings.plan || 'free';
  const isPro = ['pro', 'personal', 'business'].includes(plan);
  if (!isPro && PRO_SECTIONS.includes(sectionId)) {
    showUpgradeModal(sectionId);
    return false;
  }
  return true;
}

// ============================================
// PERFILES DE USUARIO (Business)
// ============================================

async function loadUserProfiles() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: true });

  if (error) { console.error('Error cargando perfiles:', error); return; }

  STATE.profiles = data || [];

  // Si no hay perfil activo, usar el default o el primero
  if (!STATE.currentProfile && STATE.profiles.length > 0) {
    const def = STATE.profiles.find(p => p.is_default) || STATE.profiles[0];
    STATE.currentProfile = def.id;
    localStorage.setItem('fai_current_profile', def.id);
  }

  renderProfileSelector();
}

async function createUserProfile(name, emoji, color) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const plan = STATE.settings.plan || 'free';
  if (plan !== 'business') {
    showToast('Los perfiles múltiples requieren el plan Business', 'warning');
    return null;
  }

  if (STATE.profiles.length >= 5) {
    showToast('Máximo 5 perfiles por cuenta', 'warning');
    return null;
  }

  const isFirst = STATE.profiles.length === 0;

  const { data, error } = await supabase
    .from('user_profiles')
    .insert([{
      user_id: session.user.id,
      name,
      emoji: emoji || '👤',
      color: color || '#6366f1',
      is_default: isFirst
    }])
    .select()
    .single();

  if (error) { console.error('Error creando perfil:', error); return null; }

  STATE.profiles.push(data);
  if (isFirst || !STATE.currentProfile) {
    STATE.currentProfile = data.id;
    localStorage.setItem('fai_current_profile', data.id);
  }

  renderProfileSelector();
  showToast(`Perfil "${name}" creado`, 'success');
  return data;
}

async function deleteUserProfile(profileId) {
  const profile = STATE.profiles.find(p => p.id === profileId);
  if (!profile) return;
  if (profile.is_default) {
    showToast('No puedes eliminar el perfil principal', 'warning');
    return;
  }

  const { error } = await supabase
    .from('user_profiles')
    .delete()
    .eq('id', profileId);

  if (error) { console.error('Error eliminando perfil:', error); return; }

  STATE.profiles = STATE.profiles.filter(p => p.id !== profileId);

  if (STATE.currentProfile === profileId) {
    const def = STATE.profiles.find(p => p.is_default) || STATE.profiles[0];
    STATE.currentProfile = def ? def.id : null;
    localStorage.setItem('fai_current_profile', STATE.currentProfile || '');
  }

  renderProfileSelector();
  await reloadAllData();
  showToast(`Perfil "${profile.name}" eliminado`, 'success');
}

async function switchProfile(profileId) {
  if (STATE.currentProfile === profileId) return;
  STATE.currentProfile = profileId;
  localStorage.setItem('fai_current_profile', profileId);
  renderProfileSelector();
  await reloadAllData();
  const profile = STATE.profiles.find(p => p.id === profileId);
  if (profile) showToast(`Perfil: ${profile.emoji} ${profile.name}`, 'success');
}

async function reloadAllData() {
  await Promise.all([
    loadTransactions(),
    loadCards(),
    loadDebts(),
    loadSubscriptions()
  ]);
  // Re-render sección activa
  const section = STATE.currentSection;
  if (section === 'dashboard') renderDashboard();
  else if (section === 'transactions') renderTransactions();
  else if (section === 'cards') renderCards();
  else if (section === 'debts') renderDebts();
  else if (section === 'subscriptions') renderSubscriptions();
  else if (section === 'reports') renderReports();
}

function renderProfileSelector() {
  const plan = STATE.settings.plan || 'free';
  const selector = document.getElementById('profile-selector');
  if (!selector) return;

  // Solo visible para Business
  if (plan !== 'business' || STATE.profiles.length === 0) {
    selector.style.display = 'none';
    return;
  }

  selector.style.display = 'flex';
  const current = STATE.profiles.find(p => p.id === STATE.currentProfile);

  selector.innerHTML = `
    <div class="profile-selector-inner" onclick="toggleProfileDropdown()">
      <span class="profile-emoji">${current ? current.emoji : '👤'}</span>
      <span class="profile-name">${current ? current.name : 'Perfil'}</span>
      <span class="profile-chevron">▾</span>
    </div>
    <div class="profile-dropdown" id="profile-dropdown" style="display:none">
      ${STATE.profiles.map(p => `
        <div class="profile-option ${p.id === STATE.currentProfile ? 'active' : ''}"
             onclick="switchProfile('${p.id}')">
          <span>${p.emoji}</span>
          <span>${p.name}</span>
          ${p.is_default ? '<span class="profile-default-badge">principal</span>' : ''}
        </div>
      `).join('')}
      ${STATE.profiles.length < 5 ? `
        <div class="profile-option add-profile" onclick="openAddProfileModal()">
          <span>➕</span>
          <span>Añadir perfil</span>
        </div>
      ` : ''}
    </div>
  `;
}

function toggleProfileDropdown() {
  const dd = document.getElementById('profile-dropdown');
  if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

function openAddProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.getElementById('profile-dropdown').style.display = 'none';
  }
}

function closeAddProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (modal) modal.style.display = 'none';
}

async function saveNewProfile() {
  const name  = document.getElementById('new-profile-name')?.value?.trim();
  const emoji = document.getElementById('new-profile-emoji')?.value?.trim() || '👤';
  const color = document.getElementById('new-profile-color')?.value || '#6366f1';

  if (!name) { showToast('El nombre es obligatorio', 'warning'); return; }

  await createUserProfile(name, emoji, color);
  closeAddProfileModal();

  // Limpiar form
  const nameEl = document.getElementById('new-profile-name');
  if (nameEl) nameEl.value = '';
}


// ─── PWA Service Worker ───────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('✅ SW registrado:', reg.scope);
        // Detectar actualización disponible
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showToast('Nueva versión disponible — recarga para actualizar', 'info');
            }
          });
        });
      })
      .catch(err => console.warn('SW error:', err));
  });
}

// ─── PWA Install Prompt ───────────────────────────────────────────────────────
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.style.display = 'flex';
});

// iOS: Apple bloquea beforeinstallprompt en todos los browsers
function checkIOSInstall() {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone === true;
  if (!isIOS || isStandalone) return;
  const applyBtn = () => {
    const btn = document.getElementById('pwa-install-btn');
    if (btn) {
      btn.style.display = 'flex';
      btn.onclick = () => {
        showToast('📲 Para instalar: abre en Safari → toca ⬆️ Compartir → "Añadir a pantalla de inicio"', 'info', 6000);
      };
      return true;
    }
    return false;
  };
  if (!applyBtn()) {
    // fallback si el DOM no está listo aún
    setTimeout(applyBtn, 1000);
    setTimeout(applyBtn, 3000);
  }
}
window.addEventListener('load', checkIOSInstall);

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.style.display = 'none';
  showToast('✅ FinanceAI instalada correctamente', 'success');
});

function triggerPWAInstall() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(result => {
    if (result.outcome === 'accepted') {
      showToast('✅ Instalando FinanceAI...', 'success');
    }
    deferredInstallPrompt = null;
  });
}

async function doLogout() {
  try {
    await supabase.auth.signOut();
    STATE.user = null;
    STATE.transactions = [];
    STATE.cards = [];
    localStorage.clear();
    sessionStorage.clear();
    showToast('Sesión cerrada correctamente', 'success');
    setTimeout(() => {
      window.location.href = window.location.origin + window.location.pathname;
    }, 800);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    showToast('Error al cerrar sesión', 'error');
  }
}
