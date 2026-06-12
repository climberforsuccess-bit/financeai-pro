// FINANCEAI PRO — app.js v3.1 LIMPIO
// Climberforsuccess LLC
// ============================================

'use strict';

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
    apr: 0,
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
    billingDay: new Date(s.next_billing_date).getDate(),
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
        onclick="deleteTransaction(${t.id})">🗑️</button></td>
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
    return `
      <div class="credit-card-visual"
        style="background:${gradients[c.type] || gradients.other};">
        <div class="card-chip">💳</div>
        <div class="card-number">•••• •••• •••• ****</div>
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
            <span style="color:#8892A4;">${c.type?.toUpperCase()} · ${c.apr || 0}% APR</span>
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
            <button onclick="deleteCard(${c.id})" style="
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
        balance,
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
          <button onclick="deleteDebt(${d.id})" style="
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
  const balance    = parseFloat(getVal('d-balance')) || 0;
  const apr        = parseFloat(getVal('d-apr'))     || 0;
  const minPayment = parseFloat(getVal('d-min'))     || 0;
  if (!name)      { showToast('El nombre es requerido', 'error'); return; }
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
        minimum_payment: minPayment
      }])
      .select()
      .single();

    if (error) throw error;

    STATE.debts.push({
      id: data.id, name, balance, apr,
      minPayment, originalBalance: balance,
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
          onclick="deleteSubscription(${s.id})">Cancelar</button></td>
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
function sendMainChat() {
  const input = gel('main-chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  addChatMessage(msg, 'user', 'main-chat');
  setTimeout(() => {
    addChatMessage(generateAIResponse(msg), 'ai', 'main-chat');
  }, 800);
}

function quickChat(question) {
  const input = gel('main-chat-input');
  if (input) { input.value = question; sendMainChat(); }
}

function sendDashChat() {
  const input = gel('dash-chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  addChatMessage(msg, 'user', 'dash-chat');
  setTimeout(() => {
    addChatMessage(generateAIResponse(msg), 'ai', 'dash-chat');
  }, 800);
}

function addChatMessage(text, sender, containerId) {
  const container = gel(containerId);
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'chat-msg ' + sender;
  div.style.cssText = `
    padding:12px 16px;margin-bottom:12px;
    border-radius:${sender === 'user'
      ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
    background:${sender === 'user'
      ? '#00EEFF' : 'rgba(0,238,255,0.08)'};
    color:${sender === 'user' ? '#050D1A' : '#fff'};
    max-width:85%;
    margin-left:${sender === 'user' ? 'auto' : '0'};
    font-size:0.9rem;line-height:1.5;
    border:${sender === 'user'
      ? 'none' : '1px solid rgba(0,238,255,0.15)'};
    font-family:'Segoe UI',Arial,sans-serif;`;
  div.innerHTML = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function generateAIResponse(msg) {
  const m       = msg.toLowerCase();
  const income  = (STATE.transactions || [])
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const expense = (STATE.transactions || [])
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);
  const debt    = (STATE.debts || [])
    .reduce((s, d) => s + d.balance, 0);
  const subCost = (STATE.subscriptions || [])
    .reduce((s, sub) => s + sub.amount, 0);

  if (m.includes('deuda') || m.includes('debt')) {
    if (debt > 0)
      return `💳 Tu deuda total es <strong>${formatCurrency(debt)}</strong>. 
        Usa el método <strong>Avalanche</strong>: paga primero la tarjeta 
        con mayor APR para ahorrar más en intereses.`;
    return '🎉 ¡No tienes deudas registradas! Agrega tus tarjetas en la sección Deudas.';
  }
  if (m.includes('suscripcion') || m.includes('subscription')) {
    return `📱 Tienes <strong>${STATE.subscriptions.length}</strong> suscripciones 
      costando <strong>${formatCurrency(subCost)}/mes</strong> 
      (${formatCurrency(subCost * 12)}/año).`;
  }
  if (m.includes('gasto') || m.includes('expense') || m.includes('spend')) {
    return `📊 Gastos totales: <strong>${formatCurrency(expense)}</strong>. 
      ${expense > income * 0.8
        ? '⚠️ Estás gastando más del 80% de tus ingresos!'
        : '✅ Tu nivel de gasto se ve saludable!'}`;
  }
  if (m.includes('ahorro') || m.includes('save') || m.includes('saving')) {
    const savings = income - expense;
    return `💰 Balance disponible: <strong>${formatCurrency(savings)}</strong><br>
      Regla 50/30/20:<br>
      • 50% necesidades: ${formatCurrency(income * 0.5)}<br>
      • 30% deseos: ${formatCurrency(income * 0.3)}<br>
      • 20% ahorro: ${formatCurrency(income * 0.2)}`;
  }
  if (m.includes('presupuesto') || m.includes('budget')) {
    return `📋 Presupuesto para ${formatCurrency(income)}/mes:<br>
      • 🏠 Vivienda: ${formatCurrency(income * 0.35)}<br>
      • 🍔 Comida: ${formatCurrency(income * 0.15)}<br>
      • 🚗 Transporte: ${formatCurrency(income * 0.10)}<br>
      • 🎬 Entretenimiento: ${formatCurrency(income * 0.10)}<br>
      • 💳 Deudas: ${formatCurrency(income * 0.15)}<br>
      • 💰 Ahorro: ${formatCurrency(income * 0.15)}`;
  }
  if (m.includes('supermercado') || m.includes('grocery')) {
    return '🛒 Mejores tarjetas:<br>• <strong>Blue Cash Preferred Amex</strong> — 6%<br>• <strong>Chase Freedom Flex</strong> — 5%<br>• <strong>Capital One SavorOne</strong> — 3%';
  }
  if (m.includes('gasolina') || m.includes('gas')) {
    return '⛽ Mejores tarjetas:<br>• <strong>PenFed Platinum</strong> — 5x<br>• <strong>Costco Visa</strong> — 4%<br>• <strong>BofA Cash Rewards</strong> — 3%';
  }
  if (m.includes('reducir') || m.includes('ahorrar') || m.includes('cut')) {
    return `💡 Tips para reducir gastos:<br>
      1. 🔄 Cancela suscripciones sin uso (tienes ${STATE.subscriptions.length})<br>
      2. 🍔 Cocina en casa 3-4 días<br>
      3. ⛽ Usa GasBuddy para gasolina<br>
      4. 🛒 Compra en Costco/Aldi<br>
      5. 💳 Usa cashback en cada compra`;
  }
  if (m.includes('hola') || m.includes('hello') || m.includes('hi')) {
    return '👋 ¡Hola! Soy tu asistente financiero IA. Pregúntame sobre presupuestos, deudas, tarjetas o suscripciones.';
  }
  return `🤖 Puedo ayudarte con:<br>
    • 📊 Análisis de gastos<br>
    • 💳 Recomendaciones de tarjetas<br>
    • 📉 Plan de deudas<br>
    • 📋 Presupuesto mensual<br>
    • 🔄 Revisión de suscripciones<br><br>
    Intenta: <em>"¿Cómo reduzco mis gastos?"</em>`;
}

// ============================================
// SECCIÓN 12: REPORTS
// ============================================
function renderReports() {
  const txs = STATE.transactions || [];
  const now = new Date();
  const ytd = txs.filter(t =>
    new Date(t.date).getFullYear() === now.getFullYear()
  );
  const ytdIncome  = ytd.filter(t => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const ytdExpense = ytd.filter(t => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);
  const ytdSavings = ytdIncome - ytdExpense;
  const rate = ytdIncome > 0
    ? Math.round((ytdSavings / ytdIncome) * 100) : 0;

  const vals = document.querySelectorAll(
    '#section-reports .stat-card-value'
  );
  if (vals[0]) vals[0].textContent = formatCurrency(ytdIncome);
  if (vals[1]) vals[1].textContent = formatCurrency(ytdExpense);
  if (vals[2]) vals[2].textContent = formatCurrency(ytdSavings);
  if (vals[3]) vals[3].textContent = rate + '%';
}

// ============================================
// SECCIÓN 13: SETTINGS
// ============================================
function renderSettings() {
  if (!STATE.user) return;
  const name  = STATE.user.user_metadata?.full_name || '';
  const email = STATE.user.email || '';
  const nameEl  = gel('set-name');
  const emailEl = gel('set-email');
  if (nameEl)  nameEl.value  = name;
  if (emailEl) emailEl.value = email;
}

function saveSettings() {
  const currency = getVal('set-currency') || 'USD';
  STATE.settings.currency = currency;
  saveState();
  showToast('✅ Configuración guardada!');
}

function setLang(lang) {
  STATE.settings.lang = lang;
  saveState();
  const btnEs = gel('app-lang-es');
  const btnEn = gel('app-lang-en');
  if (lang === 'es') {
    if (btnEs) btnEs.classList.add('active');
    if (btnEn) btnEn.classList.remove('active');
  } else {
    if (btnEn) btnEn.classList.add('active');
    if (btnEs) btnEs.classList.remove('active');
  }
  if (window.FinanceAILang) window.FinanceAILang.apply(lang);
  showToast(lang === 'es' ? '🇪🇸 Español activado' : '🇺🇸 English activated');
}

function activateVIPCode() {
  const input = gel('vip-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  const codes = {
    'VIPFREE2024': 'pro',    'LAUNCH50':   'personal',
    'FINANCEAI':   'pro',    'CLIMBER2024':'business',
    'CLIMBER':     'personal','FAMILY2024': 'pro',
    'FOUNDER':     'business'
  };
  if (codes[code]) {
    STATE.settings.plan = codes[code];
    saveState();
    localStorage.setItem('fai_plan', codes[code]);
    input.value = '';
    updateUserDisplay();
    showToast('🎉 Plan ' + codes[code] + ' activado!');
  } else {
    showToast('Código VIP inválido', 'error');
  }
}

// ============================================
// SECCIÓN 14: ADMIN
// ============================================
function checkAdminAccess() {
  const admins = [
    'orledisoliveros@gmail.com',
    'admin@climberforsuccess.online',
    'admin@financeaipro.com'
  ];
  const adminNav = gel('admin-nav-item');
  if (!adminNav) return;
  adminNav.style.display =
    admins.includes(STATE.user?.email) ? 'flex' : 'none';
}

// ============================================
// SECCIÓN 15: LEGAL
// ============================================
let lastPage = 'landing';

function showLegal(type) {
  lastPage = STATE.currentPage;
  showPage('legal');
  const content = gel('legal-content');
  if (!content) return;
  const legal = {
    privacy: `<h2 style="color:#00EEFF;margin-bottom:16px;">🔒 Privacy Policy</h2>
      <p style="color:#8892A4;margin-bottom:16px;">Last updated: June 2025 · Climberforsuccess LLC</p>
      <p style="line-height:1.7;margin-bottom:16px;">
        We collect email, name, and financial data you voluntarily input.
        We do not share your data with third parties without consent.
      </p>
      <p style="color:#8892A4;">privacy@climberforsuccess.online</p>`,
    terms: `<h2 style="color:#00EEFF;margin-bottom:16px;">📋 Terms of Service</h2>
      <p style="color:#8892A4;margin-bottom:16px;">Last updated: June 2025 · Climberforsuccess LLC</p>
      <p style="line-height:1.7;margin-bottom:16px;">
        By using FinanceAI Pro you agree to these terms.
        You must be 18+ to use this service.
      </p>
      <p style="color:#8892A4;">legal@climberforsuccess.online</p>`,
    cookies: `<h2 style="color:#00EEFF;margin-bottom:16px;">🍪 Cookie Policy</h2>
      <p style="color:#8892A4;margin-bottom:16px;">Last updated: June 2025 · Climberforsuccess LLC</p>
      <p style="line-height:1.7;margin-bottom:16px;">
        We use localStorage for preferences and Supabase for authentication cookies.
      </p>
      <p style="color:#8892A4;">privacy@climberforsuccess.online</p>`
  };
  content.innerHTML = legal[type] || legal.privacy;
}

// ============================================
// SECCIÓN 16: INIT
// ============================================
document.addEventListener('DOMContentLoaded', async function() {
  // Ocultar todo inmediatamente
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  await initApp();

  // Detectar si viene de login
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("login") === "true") {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      showPage("app");
      showSection("dashboard");
    }
  }
});
