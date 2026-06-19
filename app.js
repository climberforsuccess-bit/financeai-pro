// FINANCEAI PRO — app.js v3.1 LIMPIO
// Climberforsuccess LLC
// ============================================

'use strict';

// billing handled in payment.js


// ── LANDING BILLING TOGGLE ──────────────────────────────────────────
var currentLandingBilling = 'annual';
var landingPrices = {
  monthly: { personal: '$9.99',  pro: '$19.99', business: '$49.99' },
  annual:  { personal: '$7.99',  pro: '$15.99', business: '$39.99' }
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
    if (banner) banner.style.display = 'block';
    if (btnA) { btnA.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; btnA.style.color = '#000'; }
    if (btnM) { btnM.style.background = '#334155'; btnM.style.color = '#94a3b8'; }
  } else {
    if (op)     op.style.display  = 'none';
    if (opr)    opr.style.display = 'none';
    if (opb)    opb.style.display = 'none';
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
  settings: { currency: 'USD', lang: 'es', plan: 'free' }
};

function loadState() {
  try {
    STATE.transactions  = JSON.parse(localStorage.getItem('fai_transactions')  || '[]');
    STATE.cards         = JSON.parse(localStorage.getItem('fai_cards')         || '[]');
    STATE.debts         = JSON.parse(localStorage.getItem('fai_debts')         || '[]');
    STATE.subscriptions = JSON.parse(localStorage.getItem('fai_subscriptions') || '[]');
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

  if (sectionId === 'dashboard')     renderDashboard();
  if (sectionId === 'transactions')  renderTransactions();
  if (sectionId === 'cards')         renderCards();
  if (sectionId === 'debts')         renderDebts();
  if (sectionId === 'subscriptions') renderSubscriptions();
  if (sectionId === 'reports')       renderReports();
  if (sectionId === 'settings')      renderSettings();
  if (sectionId === 'admin')         adminLoadStats();
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

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', session.user.id)
    .order('date', { ascending: false });

  if (error) { console.error('Error cargando transacciones:', error); return; }

  STATE.transactions = data.map(t => ({
    id: t.id,
    description: t.description,
    amount: t.amount,
    type: t.type,
    category: t.category,
    expenseType: t.expense_type,
    date: t.date,
    createdAt: t.created_at
  }));
}

async function loadCards() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) { console.error('Error cargando tarjetas:', error); return; }

  STATE.cards = data.map(c => ({
    id: c.id,
    name: c.name,
    type: c.card_type,
    limit: c.limit_amount,
    balance: c.balance,
    lastFour: c.last_four,
    dueDate: c.due_date,
    color: c.color,
    apr: c.apr || 0,
    createdAt: c.created_at
  }));
}

async function loadDebts() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const { data, error } = await supabase
    .from('debts')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) { console.error('Error cargando deudas:', error); return; }

  STATE.debts = data.map(d => ({
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
}

async function loadSubscriptions() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

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
}

async function initApp() {
  // Ocultar todas las páginas primero
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  loadState();
  if (localStorage.getItem('fai_just_logged_in') === 'true') {
    localStorage.removeItem('fai_just_logged_in');
  }
  if (localStorage.getItem('fai_just_logged_in') === 'true') {
    localStorage.removeItem('fai_just_logged_in');
  }

  try {
    if (typeof supabase !== 'undefined') {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        STATE.user = session.user;
        const savedPlan = localStorage.getItem('fai_plan');
        if (savedPlan) STATE.settings.plan = savedPlan;
        await loadTransactions();
        await loadCards();
        await loadDebts();
        await loadSubscriptions();
        showPage('app');
        showSection('dashboard');
        updateUserDisplay();
        checkAdminAccess();
        return;
      }
    }
  } catch(e) {
    console.warn('Session error:', e);
  }

  showPage('landing');
}

function updateUserDisplay() {
  if (!STATE.user) return;
  const name = STATE.user.user_metadata?.full_name
    || STATE.user.user_metadata?.name
    || STATE.user.email?.split('@')[0]
    || 'Usuario';
  const plan = STATE.settings.plan || 'free';
  const planLabel = {
    free: 'Free', personal: '⭐ Personal',
    pro: '🚀 Pro', business: '💼 Business'
  }[plan] || 'Free';

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
function renderDashboard() {
  const now = new Date();
  const txs = STATE.transactions || [];
  const month = txs.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth()
      && d.getFullYear() === now.getFullYear();
  });

  const income  = month.filter(t => t.type === 'income')
    .reduce((s, t) => s + (t.amount || 0), 0);
  const expense = month.filter(t => t.type === 'expense')
    .reduce((s, t) => s + (t.amount || 0), 0);
  const balance = income - expense;
  const debt    = (STATE.debts || [])
    .reduce((s, d) => s + (d.balance || 0), 0);

  setTxt('val-income',  formatCurrency(income));
  setTxt('val-expense', formatCurrency(expense));
  setTxt('val-balance', formatCurrency(balance));
  setTxt('val-debt',    formatCurrency(debt));

  renderRecentTransactions();
  initDashChat();
}

function renderRecentTransactions() {
  const container = gel('recent-transactions');
  if (!container) return;
  const recent = [...(STATE.transactions || [])].reverse().slice(0, 5);
  if (recent.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:30px;color:#8892A4;font-size:0.9rem;">
        <div style="font-size:2rem;margin-bottom:10px;opacity:0.4;">🧾</div>
        No hay transacciones aún.<br>
        <button onclick="openAddTransaction()" style="
          margin-top:10px;background:none;border:none;
          color:#00EEFF;cursor:pointer;font-size:0.9rem;
          text-decoration:underline;">
          Agrega tu primera transacción
        </button>
      </div>`;
    return;
  }
  container.innerHTML = recent.map(t => `
    <div class="transaction-item">
      <div class="transaction-icon" style="background:rgba(${
        t.type === 'income' ? '0,200,150' : '255,71,87'},0.15);">
        ${getCatIcon(t.category)}
      </div>
      <div class="transaction-info">
        <div class="transaction-name">${t.description || t.category}</div>
        <div class="transaction-date">
          ${formatDate(t.date)} ·
          ${t.expenseType === 'business' ? '🏢 Empresa' : '👤 Personal'}
        </div>
      </div>
      <div class="transaction-amount ${t.type === 'income' ? 'income' : 'expense'}">
        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
      </div>
    </div>`).join('');
}

function initDashChat() {
  const container = gel('dash-chat');
  if (!container || container.children.length > 0) return;
  container.innerHTML = `
    <div class="chat-msg ai" style="
      padding:12px 16px;border-radius:16px 16px 16px 4px;
      background:rgba(0,238,255,0.08);color:#fff;
      margin-bottom:12px;font-size:0.9rem;line-height:1.5;
      border:1px solid rgba(0,238,255,0.15);">
      🤖 ¡Hola! Soy tu asistente IA. ¿En qué te puedo ayudar hoy?
    </div>`;
}

// ============================================
// SECCIÓN 6: TRANSACTIONS
// ============================================
function renderTransactions(filter = 'all') {
  const tbody = gel('transactions-body');
  if (!tbody) return;
  let list = [...(STATE.transactions || [])].reverse();
  if (filter === 'income')   list = list.filter(t => t.type === 'income');
  if (filter === 'expense')  list = list.filter(t => t.type === 'expense');
  if (filter === 'personal') list = list.filter(t => (t.expenseType || 'personal') === 'personal');
  if (filter === 'business') list = list.filter(t => t.expenseType === 'business');

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="6" style="text-align:center;padding:40px;color:#8892A4;">
        No hay transacciones.
        <button onclick="openAddTransaction()" style="
          background:none;border:none;color:#00EEFF;
          cursor:pointer;text-decoration:underline;
          font-size:inherit;margin-left:8px;">+ Agregar</button>
      </td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(t => `
    <tr>
      <td>${getCatIcon(t.category)} ${t.description || '—'}</td>
      <td>${t.category || '—'}</td>
      <td><span class="badge ${
        t.type === 'income' ? 'badge-success' :
        t.expenseType === 'business' ? 'badge-warning' : 'badge-cyan'}">
        ${t.type === 'income' ? 'Ingreso' :
          t.expenseType === 'business' ? 'Empresa' : 'Personal'}
      </span></td>
      <td>${formatDate(t.date)}</td>
      <td class="transaction-amount ${t.type === 'income' ? 'income' : 'expense'}">
        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
      </td>
      <td><button class="btn btn-outline btn-sm"
        onclick="deleteTransaction('${t.id}')">🗑️</button></td>
    </tr>`).join('');
}

function filterTransactions(filter, btn) {
  document.querySelectorAll('#section-transactions .section-tab')
    .forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderTransactions(filter);
}

function openAddTransaction() {
  const existing = gel('modal-tx');
  if (existing) existing.remove();
  const today = new Date().toISOString().split('T')[0];
  const modal = document.createElement('div');
  modal.id = 'modal-tx';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.85);
    backdrop-filter:blur(10px);z-index:9999;
    display:flex;align-items:center;
    justify-content:center;padding:20px;`;
  modal.innerHTML = `
    <div style="
      background:#0D1F35;border:1px solid rgba(0,238,255,0.2);
      border-radius:20px;padding:32px;max-width:480px;width:100%;
      max-height:90vh;overflow-y:auto;
      font-family:'Segoe UI',Arial,sans-serif;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <h2 style="color:#fff;font-size:1.3rem;">➕ Nueva Transacción</h2>
        <button onclick="gel('modal-tx').remove()" style="
          background:none;border:none;color:#8892A4;
          font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      <div class="form-group">
        <label>Descripción</label>
        <input type="text" id="tx-desc" placeholder="ej: Walmart, Salario..." style="width:100%;">
      </div>
      <div class="form-group">
        <label>Monto ($)</label>
        <input type="number" id="tx-amount" step="0.01" placeholder="0.00" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select id="tx-type" style="width:100%;">
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </div>
      <div class="form-group">
        <label>Categoría</label>
        <select id="tx-category" style="width:100%;">
          <option value="groceries">🛒 Supermercado</option>
          <option value="food">🍔 Comida / Restaurante</option>
          <option value="transport">🚗 Transporte</option>
          <option value="gas">⛽ Gasolina</option>
          <option value="shopping">🛍️ Compras</option>
          <option value="health">💊 Salud</option>
          <option value="entertainment">🎬 Entretenimiento</option>
          <option value="utilities">💡 Servicios</option>
          <option value="rent">🏠 Renta / Hogar</option>
          <option value="travel">✈️ Viajes</option>
          <option value="education">📚 Educación</option>
          <option value="technology">💻 Tecnología</option>
          <option value="salary">💵 Salario</option>
          <option value="freelance">💼 Freelance</option>
          <option value="subscriptions">🔄 Suscripciones</option>
          <option value="other">📌 Otro</option>
        </select>
      </div>
      <div class="form-group">
        <label>Personal / Empresa</label>
        <select id="tx-etype" style="width:100%;">
          <option value="personal">👤 Personal</option>
          <option value="business">🏢 Empresa</option>
        </select>
      </div>
      <div class="form-group">
        <label>Fecha</label>
        <input type="date" id="tx-date" value="${today}" style="width:100%;">
      </div>
      <button onclick="saveTransaction()" class="btn btn-primary"
        style="width:100%;margin-top:8px;">
        💾 Guardar Transacción
      </button>
    </div>`;
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
}

async function saveTransaction() {
  const desc   = getVal('tx-desc').trim();
  const amount = parseFloat(getVal('tx-amount'));
  const type   = getVal('tx-type')     || 'expense';
  const cat    = getVal('tx-category') || 'other';
  const etype  = getVal('tx-etype')    || 'personal';
  const date   = getVal('tx-date')     || new Date().toISOString().split('T')[0];

  if (!desc)               { showToast('Ingresa una descripción', 'error'); return; }
  if (!amount || amount <= 0) { showToast('Ingresa un monto válido', 'error'); return; }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { showToast('No hay sesión activa', 'error'); return; }

  const { data, error } = await supabase
    .from('transactions')
    .insert([{
      user_id:      session.user.id,
      description:  desc,
      amount:       amount,
      type:         type,
      category:     cat,
      expense_type: etype,
      date:         date
    }])
    .select()
    .single();

  if (error) { showToast('Error: ' + error.message, 'error'); return; }

  STATE.transactions.push({
    id: data.id, description: data.description,
    amount: data.amount, type: data.type,
    category: data.category, expenseType: data.expense_type,
    date: data.date, createdAt: data.created_at
  });

  gel('modal-tx')?.remove();
  showToast('✅ Transacción guardada!');
  renderTransactions();
  renderDashboard();
  detectSubscriptionsFromTransactions();
}

async function deleteTransaction(id) {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) { showToast('Error eliminando: ' + error.message, 'error'); return; }

  STATE.transactions = STATE.transactions.filter(t => t.id !== id);
  renderTransactions();
  renderDashboard();
  showToast('🗑️ Transacción eliminada');
}

// ============================================
// SECCIÓN 7: SCANNER
// ============================================
function processReceipt(event) {
  const file = event.target.files[0];
  if (!file) return;
  const uploadArea = document.querySelector('.upload-area');
  if (uploadArea) {
    uploadArea.innerHTML = `
      <div style="text-align:center;padding:20px;">
        <div style="font-size:2.5rem;margin-bottom:12px;">⏳</div>
        <div style="color:#00EEFF;font-weight:700;">Analizando recibo con IA...</div>
        <div style="color:#8892A4;font-size:0.85rem;margin-top:6px;">${file.name}</div>
      </div>`;
  }
  setTimeout(() => {
    const merchants  = ['Walmart Supercenter','Target','Whole Foods','Costco','CVS Pharmacy','Starbucks','Shell Gas Station'];
    const categories = ['groceries','food','gas','shopping','health'];
    const cards      = ['Chase Freedom · 5% cashback','Amex Gold · 4x puntos','Citi Double Cash · 2%'];
    const merchant   = merchants[Math.floor(Math.random() * merchants.length)];
    const amount     = (Math.random() * 120 + 10).toFixed(2);
    const category   = categories[Math.floor(Math.random() * categories.length)];
    const card       = cards[Math.floor(Math.random() * cards.length)];
    const today      = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

    setTxt('scan-merchant', merchant);
    setTxt('scan-amount',   '$' + amount);
    setTxt('scan-category', getCatIcon(category) + ' ' + category);
    setTxt('scan-date',     today);
    setTxt('scan-card',     card);

    const scanResult = gel('scan-result');
    if (scanResult) scanResult.classList.add('show');

    if (uploadArea) {
      uploadArea.innerHTML = `
        <div class="upload-icon">📸</div>
        <div class="upload-title">Subir Foto del Recibo</div>
        <div class="upload-subtitle">Click aquí o arrastra · JPG, PNG, HEIC</div>`;
    }
    window._scannedData = { merchant, amount: parseFloat(amount), category };
  }, 1800);
}

function saveScannedTransaction() {
  const data = window._scannedData;
  if (!data) { showToast('No hay recibo escaneado', 'error'); return; }
  const filterCat = gel('filter-category');
  const etype = filterCat
    ? (filterCat.value === 'Empresa' ? 'business' : 'personal')
    : 'personal';
  STATE.transactions.push({
    id: Date.now(), description: data.merchant,
    amount: data.amount, type: 'expense',
    category: data.category, expenseType: etype,
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(), scanned: true
  });
  saveState();
  const scanResult = gel('scan-result');
  if (scanResult) scanResult.classList.remove('show');
  window._scannedData = null;
  showToast('✅ Recibo guardado!');
  renderDashboard();
}

// ============================================
// SECCIÓN 8: CARDS
// ============================================
function renderCards() {
  const container = gel('cards-list');
  if (!container) return;
  if (STATE.cards.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px 40px;color:#8892A4;
        background:#0D1F35;border-radius:16px;
        border:1px dashed rgba(0,238,255,0.2);">
        <div style="font-size:3rem;margin-bottom:16px;opacity:0.4;">💳</div>
        No tienes tarjetas agregadas.<br>
        <button onclick="openAddCard()" style="
          margin-top:12px;background:none;border:none;
          color:#00EEFF;cursor:pointer;
          text-decoration:underline;font-size:0.95rem;">
          + Agregar tu primera tarjeta
        </button>
      </div>`;
    return;
  }
  const gradients = {
    visa:       'linear-gradient(135deg,#0d1b35,#1a2f50)',
    mastercard: 'linear-gradient(135deg,#1a1a35,#2d1a35)',
    amex:       'linear-gradient(135deg,#1a2a1a,#0d2b1a)',
    discover:   'linear-gradient(135deg,#2a1a0d,#3a2a0d)',
    other:      'linear-gradient(135deg,#0d1f35,#1e3a5f)'
  };
  container.innerHTML = STATE.cards.map(c => {
    const pct = c.limit > 0 ? Math.min(100, Math.round((c.balance / c.limit) * 100)) : 0;
    const barColor = pct > 70 ? 'danger' : pct > 40 ? 'warning' : '';
    const bgStyle = c.color && c.color !== '#00EEFF'
      ? 'background:linear-gradient(135deg,' + c.color + '22,' + c.color + '44);border:1px solid ' + c.color + '44;'
      : 'background:' + (gradients[c.type] || gradients.other) + ';';
    return `
      <div class="credit-card-visual"
        style="${bgStyle}">
        <div class="card-chip">💳</div>
        <div class="card-number">•••• •••• •••• ${c.lastFour || '****'}</div>
        <div class="card-meta">
          <div>
            <div style="font-size:11px;color:#8892A4;">TARJETA</div>
            <div class="card-holder">${c.name}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;color:#8892A4;">LÍMITE</div>
            <div class="card-limit">${formatCurrency(c.limit || 0)}</div>
          </div>
        </div>
        <div style="margin-top:12px;padding-top:12px;
          border-top:1px solid rgba(255,255,255,0.1);">
          <div style="display:flex;justify-content:space-between;
            font-size:12px;margin-bottom:6px;">
            <span style="color:#8892A4;">${c.type?.toUpperCase()} · ${c.apr || 0}% APR${c.dueDate ? ' · Vence día ' + c.dueDate : ''}</span>
            <span style="color:${pct > 70 ? '#FF4757' : '#FF6B35'};">
              ${formatCurrency(c.balance || 0)} usado
            </span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${barColor}" style="width:${pct}%;"></div>
          </div>
          <div style="display:flex;justify-content:space-between;
            font-size:11px;color:#8892A4;margin-top:6px;">
            <span>${pct}% utilizado</span>
            <button onclick="deleteCard('${c.id}')" style="
              background:none;border:none;color:#FF4757;
              cursor:pointer;font-size:11px;">Eliminar</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function openAddCard() {
  const existing = gel('modal-card');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'modal-card';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.85);
    backdrop-filter:blur(10px);z-index:9999;
    display:flex;align-items:center;
    justify-content:center;padding:20px;`;
  modal.innerHTML = `
    <div style="
      background:#0D1F35;border:1px solid rgba(0,238,255,0.2);
      border-radius:20px;padding:32px;max-width:480px;width:100%;
      max-height:90vh;overflow-y:auto;
      font-family:'Segoe UI',Arial,sans-serif;">
      <div style="display:flex;justify-content:space-between;
        align-items:center;margin-bottom:24px;">
        <h2 style="color:#fff;font-size:1.3rem;">💳 Agregar Tarjeta</h2>
        <button onclick="gel('modal-card').remove()" style="
          background:none;border:none;color:#8892A4;
          font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      <div class="form-group">
        <label>Nombre de la Tarjeta</label>
        <input type="text" id="c-name"
          placeholder="ej: Chase Sapphire, Amex Gold..."
          style="width:100%;">
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select id="c-type" style="width:100%;">
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
          <option value="discover">Discover</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <div class="form-group">
        <label>Límite de Crédito ($)</label>
        <input type="number" id="c-limit"
          placeholder="5000" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Balance Actual / Deuda ($)</label>
        <input type="number" id="c-balance"
          placeholder="0" style="width:100%;">
      </div>
      <div class="form-group">
        <label>APR (%)</label>
        <input type="number" id="c-apr"
          step="0.1" placeholder="24.99" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Últimos 4 dígitos</label>
        <input type="text" id="c-last-four"
          placeholder="1234" maxlength="4" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Día de pago (1-31)</label>
        <input type="number" id="c-due-date"
          placeholder="15" min="1" max="31" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Color de tarjeta</label>
        <select id="c-color" style="width:100%;">
          <option value="#00EEFF">Cyan (default)</option>
          <option value="#00FF88">Verde</option>
          <option value="#FF6B35">Naranja</option>
          <option value="#A855F7">Morado</option>
          <option value="#FF4757">Rojo</option>
          <option value="#FFD700">Dorado</option>
        </select>
      </div>
      <button onclick="saveCard()" class="btn btn-primary"
        style="width:100%;margin-top:8px;">
        💾 Guardar Tarjeta
      </button>
    </div>`;
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
}

async function saveCard() {
  const name     = getVal('c-name').trim();
  const type     = getVal('c-type')     || 'credit';
  const limit    = parseFloat(getVal('c-limit'))    || 0;
  const balance  = parseFloat(getVal('c-balance'))  || 0;
  const apr      = parseFloat(getVal('c-apr'))      || 0;
  const lastFour = getVal('c-last-four')?.trim()    || '';
  const dueDate  = parseInt(getVal('c-due-date'))   || null;
  const color    = getVal('c-color')                || '#00EEFF';
  if (!name) { showToast('El nombre es requerido', 'error'); return; }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { showToast('Sesión expirada', 'error'); return; }

    const { data, error } = await supabase
      .from('cards')
      .insert([{
        user_id: session.user.id,
        name,
        card_type: type,
        limit_amount: limit,
        balance: balance,
        apr,
        last_four: lastFour,
        due_date: dueDate,
        color
      }])
      .select()
      .single();

    if (error) throw error;

    STATE.cards.push({
      id: data.id, name, type,
      limit, balance, apr,
      lastFour, dueDate, color,
      createdAt: data.created_at
    });

    const modal = gel('modal-card');
    if (modal) modal.remove();
    renderCards();
    showToast('✅ Tarjeta agregada!');
  } catch(e) {
    console.error('Error guardando tarjeta:', e);
    showToast('Error al guardar tarjeta', 'error');
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
    showToast('Tarjeta eliminada');
  } catch(e) {
    console.error('Error eliminando tarjeta:', e);
    showToast('Error al eliminar tarjeta', 'error');
  }
}

// ============================================
// SECCIÓN 9: DEBTS
// ============================================
function renderDebts() {
  const debts = STATE.debts || [];
  const total = debts.reduce((s, d) => s + (d.balance || 0), 0);

  const statVals = document.querySelectorAll(
    '#section-debts .stat-card-value'
  );
  if (statVals[0]) statVals[0].textContent = formatCurrency(total);
  if (statVals[1]) statVals[1].textContent = calcPayoffTime(debts);

  let container = gel('debt-items-list');
  if (!container) {
    const card = document.querySelector('#section-debts .content-grid .card');
    if (card) {
      container = document.createElement('div');
      container.id = 'debt-items-list';
      card.appendChild(container);
    } else return;
  }

  if (debts.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:#8892A4;">
        <div style="font-size:2.5rem;margin-bottom:12px;opacity:0.4;">📉</div>
        No tienes deudas registradas.<br>
        <button onclick="openAddDebt()" style="
          margin-top:12px;background:none;border:none;
          color:#00EEFF;cursor:pointer;
          text-decoration:underline;font-size:inherit;">
          + Agregar deuda
        </button>
      </div>`;
    return;
  }

  container.innerHTML = debts.map((d, i) => {
    const pct = d.originalBalance
      ? Math.round(((d.originalBalance - d.balance) / d.originalBalance) * 100)
      : 0;
    const priority = d.apr > 22 ? 'danger' : d.apr > 18 ? 'warning' : 'success';
    const priorityText = d.apr > 22 ? 'Prioridad ALTA'
      : d.apr > 18 ? 'Prioridad MEDIA' : 'Pago mínimo por ahora';
    return `
      <div class="debt-item">
        <div class="debt-header">
          <span class="debt-name">${i + 1}. ${d.name}</span>
          <span class="debt-amount">${formatCurrency(d.balance)}</span>
        </div>
        <div style="font-size:12px;color:var(--${priority});margin-bottom:6px;">
          APR: ${d.apr || 0}% — ${priorityText}
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${priority}" style="width:${pct}%;"></div>
        </div>
        <div class="debt-meta">
          <span>Pago mínimo: ${formatCurrency(d.minPayment)}</span>
          <button onclick="deleteDebt('${d.id}')" style="
            background:none;border:none;color:#FF4757;
            cursor:pointer;font-size:0.82rem;">Eliminar</button>
        </div>
      </div>`;
  }).join('');
}

function calcPayoffTime(debts) {
  const total   = debts.reduce((s, d) => s + (d.balance || 0), 0);
  const monthly = debts.reduce((s, d) => s + (d.minPayment || 0), 0);
  if (monthly <= 0) return 'N/A';
  const months = Math.ceil(total / monthly);
  return months >= 24 ? Math.ceil(months / 12) + ' años' : months + ' meses';
}

function switchDebtMethod(method, btn) {
  document.querySelectorAll('#section-debts .section-tab')
    .forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (method === 'avalanche') {
    STATE.debts.sort((a, b) => (b.apr || 0) - (a.apr || 0));
    setTxt('debt-method-title', '❄️ Método Avalanche');
    showToast('📊 Avalanche: Pagas menos intereses en total!');
  } else {
    STATE.debts.sort((a, b) => (a.balance || 0) - (b.balance || 0));
    setTxt('debt-method-title', '⛄ Método Snowball');
    showToast('⛄ Snowball: Más motivación para seguir!');
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
        <h2 style="color:#fff;font-size:1.3rem;">📉 Agregar Deuda</h2>
        <button onclick="gel('modal-debt').remove()" style="
          background:none;border:none;color:#8892A4;
          font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      <div class="form-group">
        <label>Nombre (Tarjeta / Préstamo)</label>
        <input type="text" id="d-name"
          placeholder="ej: Chase Visa..." style="width:100%;">
      </div>
      <div class="form-group">
        <label>Balance Actual ($)</label>
        <input type="number" id="d-balance"
          placeholder="0" style="width:100%;">
      </div>
      <div class="form-group">
        <label>APR (%)</label>
        <input type="number" id="d-apr"
          step="0.1" placeholder="24.99" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Pago Mínimo Mensual ($)</label>
        <input type="number" id="d-min"
          placeholder="25" style="width:100%;">
      </div>
      <button onclick="saveDebt()" class="btn btn-primary"
        style="width:100%;margin-top:8px;">
        💾 Guardar Deuda
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
  if (!name)        { showToast('El nombre es requerido', 'error'); return; }
  if (balance <= 0) { showToast('Ingresa un balance válido', 'error'); return; }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { showToast('Sesión expirada', 'error'); return; }

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
    showToast('✅ Deuda agregada!');
  } catch(e) {
    console.error('Error guardando deuda:', e);
    showToast('Error al guardar deuda', 'error');
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
    showToast('Deuda eliminada');
  } catch(e) {
    console.error('Error eliminando deuda:', e);
    showToast('Error al eliminar deuda', 'error');
  }
}

// ============================================
// SECCIÓN 10: SUBSCRIPTIONS
// ============================================
function renderSubscriptions() {
  const subs   = STATE.subscriptions || [];
  if (subs.length === 0) return; // mantener HTML demo
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

  const tbody = gel('subs-tbody')
    || (section && section.querySelector('table tbody'));
  if (!tbody) return;

  if (subs.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="6" style="text-align:center;padding:40px;color:#8892A4;">
        No tienes suscripciones.<br>
        <button onclick="openAddSubscription()" style="
          background:none;border:none;color:#00EEFF;
          cursor:pointer;text-decoration:underline;
          font-size:inherit;margin-top:8px;">+ Agregar</button>
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
    const statusText  = daysUntil <= 3 ? 'Vence pronto' : 'Activa';
    return `
      <tr>
        <td>${catIcons[s.category] || '📌'} ${s.name}</td>
        <td>${s.category || 'Otro'}</td>
        <td>${formatCurrency(s.amount)}/mes</td>
        <td>Día ${s.billingDay || '—'}</td>
        <td><span class="badge ${statusClass}">${statusText}</span></td>
        <td><button class="btn btn-outline btn-sm"
          onclick="deleteSubscription('${s.id}')">Cancelar</button></td>
      </tr>`;
  }).join('');
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
        <h2 style="color:#fff;font-size:1.3rem;">🔄 Agregar Suscripción</h2>
        <button onclick="gel('modal-sub').remove()" style="
          background:none;border:none;color:#8892A4;
          font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      <div class="form-group">
        <label>Nombre del Servicio</label>
        <input type="text" id="s-name"
          placeholder="ej: Netflix, Spotify..." style="width:100%;">
      </div>
      <div class="form-group">
        <label>Monto Mensual ($)</label>
        <input type="number" id="s-amount"
          step="0.01" placeholder="9.99" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Día de Cobro (1-31)</label>
        <input type="number" id="s-day"
          min="1" max="31" placeholder="15" style="width:100%;">
      </div>
      <div class="form-group">
        <label>Categoría</label>
        <select id="s-category" style="width:100%;">
          <option value="streaming">📺 Streaming</option>
          <option value="music">🎵 Música</option>
          <option value="software">💻 Software</option>
          <option value="productivity">🤖 Productividad</option>
          <option value="storage">☁️ Almacenamiento</option>
          <option value="shopping">📦 Compras</option>
          <option value="gaming">🎮 Juegos</option>
          <option value="fitness">💪 Fitness</option>
          <option value="design">🎨 Diseño</option>
          <option value="other">📌 Otro</option>
        </select>
      </div>
      <button onclick="saveSubscription()" class="btn btn-primary"
        style="width:100%;margin-top:8px;">
        💾 Guardar Suscripción
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
  if (!name)      { showToast('El nombre es requerido', 'error'); return; }
  if (amount <= 0) { showToast('Ingresa un monto válido', 'error'); return; }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { showToast('Sesión expirada', 'error'); return; }

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
    showToast('✅ Suscripción agregada!');
  } catch(e) {
    console.error('Error guardando suscripción:', e);
    showToast('Error al guardar suscripción', 'error');
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
    showToast('Suscripción eliminada');
  } catch(e) {
    console.error('Error eliminando suscripción:', e);
    showToast('Error al eliminar suscripción', 'error');
  }
}

function detectSubscriptionsFromTransactions() {
  const keywords = [
    'netflix','spotify','hulu','disney','amazon prime',
    'youtube','apple','chatgpt','openai','adobe',
    'gym','xbox','playstation','icloud'
  ];
  const found = STATE.transactions.filter(t =>
    keywords.some(k =>
      (t.description || '').toLowerCase().includes(k)
    )
  );
  if (found.length > 0) {
    const names = [...new Set(found.map(t => t.description))].slice(0, 2);
    showToast('💡 Suscripción detectada: ' + names.join(', '), 'info');
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

  const totalIncome  = txs.filter(t => t.type === 'income').reduce((s,t) => s + Number(t.amount||0), 0);
  const totalExpense = txs.filter(t => t.type === 'expense').reduce((s,t) => s + Number(t.amount||0), 0);
  const totalDebt    = debts.reduce((s,d) => s + Number(d.amount||0), 0);

  return [
    `- Ingresos totales: $${totalIncome.toFixed(2)}`,
    `- Gastos totales: $${totalExpense.toFixed(2)}`,
    `- Balance neto: $${(totalIncome - totalExpense).toFixed(2)}`,
    `- Deuda total: $${totalDebt.toFixed(2)}`,
    `- Tarjetas: ${cards.length}`,
    `- Suscripciones: ${subs.length}`,
    `- Plan: ${STATE.isVIP ? 'VIP' : 'Gratuito'}`
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
  const input = document.getElementById('dash-chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  // Verificar límite antes de enviar
  if (!hasAIMessagesLeft()) {
    appendChatMessage('dash-chat', 'user', msg);
    appendChatMessage('dash-chat', 'ai', '🔒 Alcanzaste tu límite de 5 mensajes hoy. ¡Actualiza a VIP para mensajes ilimitados! 🌟');
    showUpgradePrompt();
    return;
  }

  appendChatMessage('dash-chat', 'user', msg);
  appendChatMessage('dash-chat', 'ai', '⏳ Analizando...');

  try {
    const reply = await askOpenAI(msg, getFinancialContext());
    const msgs = document.getElementById('dash-chat');
    if (msgs) msgs.lastChild.textContent = reply;
  } catch(e) {
    const msgs = document.getElementById('dash-chat');
    if (e.message === 'LIMIT_REACHED') {
      msgs.lastChild.textContent = '🔒 Límite diario alcanzado. ¡Actualiza a VIP! 🌟';
      showUpgradePrompt();
    } else {
      msgs.lastChild.textContent = '❌ Error al conectar con IA. Intenta de nuevo.';
    }
    console.error('OpenAI error:', e);
  }
}

async function sendMainChat() {
  const input = document.getElementById('main-chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  // Verificar límite antes de enviar
  if (!hasAIMessagesLeft()) {
    appendChatMessage('main-chat', 'user', msg);
    appendChatMessage('main-chat', 'ai', '🔒 Alcanzaste tu límite de 5 mensajes hoy. ¡Actualiza a VIP para mensajes ilimitados! 🌟');
    showUpgradePrompt();
    return;
  }

  appendChatMessage('main-chat', 'user', msg);
  appendChatMessage('main-chat', 'ai', '⏳ Analizando...');

  try {
    const reply = await askOpenAI(msg, getFinancialContext());
    const msgs = document.getElementById('main-chat');
    if (msgs) msgs.lastChild.textContent = reply;
  } catch(e) {
    const msgs = document.getElementById('main-chat');
    if (e.message === 'LIMIT_REACHED') {
      msgs.lastChild.textContent = '🔒 Límite diario alcanzado. ¡Actualiza a VIP! 🌟';
      showUpgradePrompt();
    } else {
      msgs.lastChild.textContent = '❌ Error al conectar con IA. Intenta de nuevo.';
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
  const adminEmails = ['orledisoliveros@gmail.com', 'orledisyuma@gmail.com'];
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
        ⚡ Oferta limitada — Solo hoy
      </div>

      <!-- Header -->
      <div style="font-size: 56px; margin-bottom: 8px;">💸</div>
      <h2 style="color: #fff; font-size: 22px; font-weight: 800; margin-bottom: 6px; line-height: 1.3;">Estás perdiendo dinero<br>sin saberlo</h2>
      <p style="color: #94a3b8; font-size: 13px; margin-bottom: 18px; line-height: 1.6;">Alcanzaste tu límite de IA gratuita. Los usuarios Pro detectan gastos ocultos y ahorran en promedio <strong style="color:#f59e0b;">$340 al mes</strong>. ¿Cuánto estás perdiendo tú?</p>

      <!-- Benefits -->
      <div style="background: rgba(15,23,42,0.8); border-radius: 14px; padding: 16px; margin-bottom: 18px; text-align: left; border: 1px solid rgba(245,158,11,0.15);">
        <p style="color: #f59e0b; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1px;">🔓 Desbloquea todo ahora:</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">💬</span>
            <span style="color:#e2e8f0; font-size:13px;"><strong>IA ilimitada 24/7</strong> — tu asesor financiero personal siempre disponible</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">🧠</span>
            <span style="color:#e2e8f0; font-size:13px;"><strong>GPT-4o</strong> — detecta patrones de gasto que tú no ves</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">📸</span>
            <span style="color:#e2e8f0; font-size:13px;"><strong>Scanner inteligente</strong> — registra recibos en 2 segundos</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">📊</span>
            <span style="color:#e2e8f0; font-size:13px;"><strong>Reportes que te hacen ahorrar</strong> — ve exactamente dónde va tu dinero</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">🎯</span>
            <span style="color:#e2e8f0; font-size:13px;"><strong>Metas con IA</strong> — alcanza libertad financiera más rápido</span>
          </div>
        </div>
      </div>

      <!-- Price with anchor -->
      <div style="margin-bottom: 20px;">
        <p style="color:#64748b; font-size:12px; text-decoration: line-through; margin-bottom:2px;">Valor real: $29.99/mes</p>
        <p style="color:#94a3b8; font-size:12px; margin-bottom:4px;">Hoy lo obtienes por</p>
        <p style="color: #f59e0b; font-size: 38px; font-weight: 900; margin: 0; line-height:1;">$9.99<span style="font-size:15px; color:#94a3b8; font-weight:400;">/mes</span></p>
        <p style="color:#10b981; font-size:12px; margin-top:4px;">✅ Cancela cuando quieras · Sin contratos</p>
      </div>

      <!-- Main CTA -->
      <button onclick="document.getElementById('upgradeModal').remove(); startCheckout('pro', 'monthly')"
        style="width:100%; padding: 18px; background: linear-gradient(135deg, #f59e0b, #d97706);
        border: none; border-radius: 14px; color: #000; font-weight: 900; font-size: 17px; cursor: pointer; margin-bottom: 8px;
        box-shadow: 0 6px 30px rgba(245,158,11,0.5); letter-spacing: 0.3px; transition: transform 0.1s;"
        onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
        ⚡ Sí, quiero controlar mi dinero ahora
      </button>

      <!-- Secondary CTA annual -->
      <button onclick="document.getElementById('upgradeModal').remove(); startCheckout('pro', 'yearly')"
        style="width:100%; padding: 12px; background: rgba(245,158,11,0.1);
        border: 1px solid #f59e0b; border-radius: 12px; color: #f59e0b; font-weight: 700; font-size: 13px; cursor: pointer; margin-bottom: 12px;">
        💰 Mejor deal: Plan anual — Ahorra 40%
      </button>

      <!-- Social proof -->
      <div style="margin-bottom: 12px;">
        <p style="color:#94a3b8; font-size:12px; margin-bottom:4px;">⭐⭐⭐⭐⭐ <strong style="color:#fff;">+1,200 usuarios</strong> ya toman control de su dinero</p>
        <p style="color:#64748b; font-size:11px;">"Recuperé $180 el primer mes detectando suscripciones olvidadas" — María G.</p>
      </div>

      <!-- Dismiss -->
      <button onclick="document.getElementById('upgradeModal').remove();"
        style="width:100%; padding: 10px; background: transparent;
        border: none; color: #334155; cursor: pointer; font-size: 11px;">
        No me interesa ahorrar dinero ahora mismo
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

// ── VIP Code System ─────────────────────────────────────────
const VIP_CODES = {
  'VIP-GOLD-2024': { plan: 'Personal', months: 1 },
  'VIP-GOLD-6MOS': { plan: 'Personal', months: 6 },
  'VIP-GOLD-YEAR': { plan: 'Personal', months: 12 },
  'VIP-FAM-2024':  { plan: 'Familia',  months: 1 },
  'VIP-FAM-6MOS':  { plan: 'Familia',  months: 6 },
  'VIP-FAM-YEAR':  { plan: 'Familia',  months: 12 },
  'VIP-BETA-FREE': { plan: 'Personal', months: 3 },
  'VIP-PROMO-50':  { plan: 'Personal', months: 1 },
};

function activateVIPCode() {
  const input = document.getElementById('vip-code-input');
  const msg   = document.getElementById('vip-code-msg');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    msg.style.color = '#ef4444';
    msg.textContent = '❌ Ingresa un código válido.';
    return;
  }

  // Verificar si ya fue usado
  const usedCodes = JSON.parse(localStorage.getItem('fai_used_codes') || '[]');
  if (usedCodes.includes(code)) {
    msg.style.color = '#ef4444';
    msg.textContent = '❌ Este código ya fue usado.';
    return;
  }

  const vipData = VIP_CODES[code];
  if (!vipData) {
    msg.style.color = '#ef4444';
    msg.textContent = '❌ Código inválido. Verifica e intenta de nuevo.';
    return;
  }

  // Activar VIP
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + vipData.months);

  STATE.isVIP    = true;
  STATE.vipPlan  = vipData.plan;
  STATE.vipExpiry = expiry.toISOString();
  saveState();

  // Marcar código como usado
  usedCodes.push(code);
  localStorage.setItem('fai_used_codes', JSON.stringify(usedCodes));

  // Actualizar UI
  input.value = '';
  msg.style.color = '#22c55e';
  msg.textContent = `✅ ¡Código activado! Plan VIP ${vipData.plan} por ${vipData.months} mes(es).`;

  updateVIPStatus();
  showToast(`🌟 ¡Bienvenido a VIP ${vipData.plan}! Disfruta tus beneficios.`, 'success');

  // Reset contador IA
  localStorage.removeItem('fai_ai_count');
  localStorage.removeItem('fai_ai_date');
  updateAICounter();
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
    if (label) label.innerHTML = `Plan actual: <strong style="color:#f59e0b;">VIP ${STATE.vipPlan}</strong>`;
    if (sub)   sub.textContent = `Mensajes ilimitados · Vence en ${days} días`;
    if (sub)   sub.style.color = days < 7 ? '#ef4444' : '#22c55e';
  } else {
    icon.textContent  = '🔓';
    if (name) name.textContent = 'Gratuito';
    if (label) label.innerHTML = `Plan actual: <strong style="color:#fff;">Gratuito</strong>`;
    if (sub)   sub.textContent = '5 mensajes IA por día';
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
  showToast(`✅ Código ${code} generado — ${plan} ${months} mes(es)`, 'success');
}

function adminCopyCode() {
  const code = document.getElementById('admin-code-display')?.textContent;
  if (!code) return;
  navigator.clipboard.writeText(code).then(() => {
    showToast('📋 Código copiado al portapapeles', 'success');
  });
}

function adminRefreshCodesList() {
  const list = document.getElementById('admin-codes-list');
  if (!list) return;

  const stored = JSON.parse(localStorage.getItem('fai_admin_codes') || '[]');
  if (stored.length === 0) {
    list.innerHTML = '<p style="color:#475569; font-size:12px; text-align:center;">No hay códigos generados aún</p>';
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
          ? '<span style="color:#22c55e; font-size:11px;">✅ Usado</span>'
          : '<span style="color:#94a3b8; font-size:11px;">⏳ Pendiente</span>'}
        <button onclick="navigator.clipboard.writeText(\'${entry.code}\').then(()=>showToast(\'📋 Copiado\',\'success\'))"
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
    list.innerHTML = '<p style="color:#475569; font-size:12px; text-align:center;">Ningún código activado aún</p>';
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
        <span style="color:#22c55e; font-size:11px;">✅ Activado</span>
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
function renderSettings() {
  updateVIPStatus();
  updateAICounter();

  // Mostrar email del usuario
  const emailEl = document.getElementById('settings-user-email');
  if (emailEl && STATE.user) emailEl.textContent = STATE.user.email || '—';

  // Mostrar plan actual
  const planEl = document.getElementById('settings-plan-name');
  if (planEl) planEl.textContent = STATE.isVIP ? `VIP ${STATE.vipPlan}` : 'Gratuito';

  // Mostrar vencimiento VIP
  const expiryEl = document.getElementById('settings-vip-expiry');
  if (expiryEl && STATE.isVIP && STATE.vipExpiry) {
    const expiry = new Date(STATE.vipExpiry);
    const days   = Math.ceil((expiry - new Date()) / (1000*60*60*24));
    expiryEl.textContent = `Vence en ${days} días (${expiry.toLocaleDateString()})`;
    expiryEl.style.color = days < 7 ? '#ef4444' : '#22c55e';
  } else if (expiryEl) {
    expiryEl.textContent = '';
  }

  // Actualizar badge de plan en pricing
  updateCurrentPlanBadge();
}

// ── Render Reports ───────────────────────────────────────────
function renderReports() {
  const txs = STATE.transactions || [];

  // Totales
  const totalIncome  = txs.filter(t => t.type === 'income').reduce((s,t) => s + (t.amount||0), 0);
  const totalExpense = txs.filter(t => t.type === 'expense').reduce((s,t) => s + (t.amount||0), 0);
  const balance      = totalIncome - totalExpense;

  const el = (id, val) => { const e = document.getElementById(id); if(e) e.textContent = val; };
  el('report-total-income',  `$${totalIncome.toFixed(2)}`);
  el('report-total-expense', `$${totalExpense.toFixed(2)}`);
  el('report-balance',       `$${balance.toFixed(2)}`);
  el('report-total-txs',     `${txs.length}`);

  // Top categorías de gastos
  const cats = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    cats[t.category || 'Otros'] = (cats[t.category || 'Otros'] || 0) + (t.amount || 0);
  });

  const topList = document.getElementById('report-top-categories');
  if (topList) {
    const sorted = Object.entries(cats).sort((a,b) => b[1]-a[1]).slice(0,5);
    if (sorted.length === 0) {
      topList.innerHTML = '<p style="color:#475569;font-size:13px;text-align:center;">Sin transacciones aún</p>';
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

// ── OpenAI via Netlify Function ─────────────────────────────
async function askOpenAI(userMessage, context = '') {
  const systemPrompt = `Eres un asistente financiero personal inteligente llamado FinanceAI. 
Ayudas a los usuarios a entender sus finanzas, dar consejos de ahorro, analizar gastos y más.
Responde siempre en el idioma que use el usuario (español o inglés).
Sé conciso, amigable y útil. Máximo 3 párrafos.
${context ? `\nContexto financiero del usuario:\n${context}` : ''}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage }
  ];

  const response = await fetch('/.netlify/functions/openai-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model: 'gpt-4o-mini' })
  });

  if (!response.ok) throw new Error('Network error');

  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message || 'OpenAI error');
  
  return data.choices?.[0]?.message?.content || '❌ Sin respuesta';
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
// ── Stripe Checkout ─────────────────────────────────────────
async function startCheckout(plan, billing = 'monthly') {
  const user = STATE.user;
  if (!user) {
    showToast('⚠️ Inicia sesión para continuar', 'error');
    showPage('auth');
    return;
  }

  const planLabels = { personal: 'Personal ⭐', pro: 'Pro 💎', business: 'Business 🏢' };
  const prices     = PRICES[billing] || PRICES['monthly'];
  const price      = prices[plan] || 0;
  const label      = planLabels[plan] || plan;
  const suffix     = billing === 'yearly' ? '/mes (anual)' : '/mes';

  showToast(`🔒 Procesando ${label} — $${price.toFixed(2)}${suffix}...`, 'info');

  try {
    const res = await fetch('/api/create-checkout', {
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
      showToast(`🚀 ¡Redirigiendo al pago seguro con Stripe!`, 'success');
      setTimeout(() => { window.location.href = data.url; }, 800);
    } else {
      showToast('❌ Error al crear sesión de pago — intenta de nuevo', 'error');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    showToast('❌ Error de conexión — verifica tu internet', 'error');
  }
}


function updateCurrentPlanBadge() {
  const badge = document.getElementById('current-plan-badge');
  if (!badge) return;
  const plan = STATE.userPlan || 'free';
  const labels = { free: 'FREE', personal: 'PERSONAL ⭐', pro: 'PRO 💎', business: 'BUSINESS 🏢' };
  badge.textContent = `✨ Tu plan actual: ${labels[plan] || 'FREE'}`;
}
