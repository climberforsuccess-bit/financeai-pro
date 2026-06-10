// ===========================
// FINANCEAI PRO — APP.JS
// Dashboard Logic
// Climberforsuccess LLC
// ===========================
// ============================================
// CÓDIGOS VIP - ACCESO GRATUITO
// ============================================
const VIP_CODES = {
  'FAMILIA2026': { 
    plan: 'pro', 
    name: 'Familia VIP',
    unlimited: true 
  },
  'BUSINESS2026': { 
    plan: 'business', 
    name: 'Business VIP',
    unlimited: true 
  }
};

function validateVIPCode(code) {
  const upperCode = code.toUpperCase().trim();
  if (VIP_CODES[upperCode]) {
    return {
      valid: true,
      plan: VIP_CODES[upperCode].plan,
      name: VIP_CODES[upperCode].name
    };
  }
  return { valid: false };
}

function applyVIPAccess(code) {
  const result = validateVIPCode(code);
  if (result.valid) {
    localStorage.setItem('financeai_plan', result.plan);
    localStorage.setItem('vipAccess', 'true');
    localStorage.setItem('vipCode', code.toUpperCase());
    localStorage.setItem('planName', result.name);
    return true;
  }
  return false;
}

function activateVIPCode() {
  const input = document.getElementById('vipCodeInput');
  if (!input) return;
  
  const code = input.value.trim().toUpperCase();
  
  if (!code) {
    showToast('Please enter a code', 'error');
    return;
  }

  const success = applyVIPAccess(code);
  
  if (success) {
    const result = validateVIPCode(code);
    const planNames = {
      free: 'Free Plan',
      personal: 'Personal Plan', 
      pro: 'Pro Plan',
      business: 'Business Plan'
    };
    showToast(`✅ ${result.name} access activated!`, 'success');
    document.getElementById('sidebarPlan').textContent = 
      planNames[result.plan];
    document.getElementById('currentPlanDisplay').textContent = 
      planNames[result.plan];
    input.value = '';
  } else {
    showToast('❌ Invalid code. Try again.', 'error');
  }
}


// ===========================
// STATE
// ===========================
let appData = {
  transactions: [],
  cards: [],
  debts: [],
  subscriptions: [],
  settings: {
    name: 'User',
    email: '',
    currency: 'USD',
    lang: 'en'
  },
  debtMethod: 'avalanche'
};

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initApp();
  checkMobile();
  setDefaultDate();
});

function initApp() {

    // Load settings
    const s = appData.settings;
    
    // Get real user from Supabase
    const savedUser = localStorage.getItem('financeai_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        // Use full_name, display_name, or email
        const realName = user.user_metadata?.full_name || 
                        user.user_metadata?.name ||
                        user.email?.split('@')[0] || 
                        'User';
        appData.settings.name = realName;
        s.name = realName;
    }
    
    document.getElementById('userName').textContent = s.name;
    document.getElementById('settingName').value = s.name;

  document.getElementById('settingName').value = s.name;
  document.getElementById('settingEmail').value = s.email;
  document.getElementById('settingCurrency').value = s.currency;
  document.getElementById('settingLang').value = s.lang;

  // Load plan
  const plan = localStorage.getItem('financeai_plan') || 'free';
  const planNames = {
    free: 'Free Plan',
    personal: 'Personal Plan',
    pro: 'Pro Plan',
    business: 'Business Plan'
  };
  document.getElementById('sidebarPlan').textContent = planNames[plan] || 'Free Plan';
  document.getElementById('currentPlanDisplay').textContent = planNames[plan] || 'Free Plan';

  // Apply language
  applyLanguage(s.lang);

  // Render all
  renderDashboard();
  renderTransactions();
  renderCards();
  renderDebts();
  renderSubscriptions();
}

function setDefaultDate() {
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = ['txDate', 'scanDate'];
  dateInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = today;
  });
}

// ===========================
// DATA PERSISTENCE
// ===========================
function saveData() {
  localStorage.setItem('financeai_data', JSON.stringify(appData));
}

function loadData() {
  const saved = localStorage.getItem('financeai_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appData = { ...appData, ...parsed };
    } catch (e) {
      console.error('Error loading data:', e);
    }
  }
}

// ===========================
// PAGE NAVIGATION
// ===========================
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show selected
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(pageId)) {
      item.classList.add('active');
    }
  });

  // Close sidebar on mobile
  if (window.innerWidth <= 900) {
    document.getElementById('sidebar').classList.remove('open');
  }

  // Scroll to top
  document.getElementById('mainContent').scrollTop = 0;
}

// ===========================
// MOBILE
// ===========================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function checkMobile() {
  const mobileHeader = document.getElementById('mobileHeader');
  if (window.innerWidth <= 900) {
    mobileHeader.style.display = 'flex';
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 900) {
      mobileHeader.style.display = 'flex';
    } else {
      mobileHeader.style.display = 'none';
      document.getElementById('sidebar').classList.remove('open');
    }
  });
}

// ===========================
// DASHBOARD
// ===========================
function renderDashboard() {
  const currency = getCurrencySymbol();
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // Filter this month
  const monthTx = appData.transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const income = monthTx
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const expenses = monthTx
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.round((balance / income) * 100) : 0;

  document.getElementById('statIncome').textContent = currency + formatNumber(income);
  document.getElementById('statExpenses').textContent = currency + formatNumber(expenses);
  document.getElementById('statBalance').textContent = currency + formatNumber(balance);
  document.getElementById('statSavings').textContent = savingsRate + '%';

  // Recent transactions
  renderRecentTransactions();
}

function renderRecentTransactions() {
  const container = document.getElementById('recentTransactions');
  const recent = [...appData.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; color:#A0B0C0; font-size:0.9rem;">
        <i class="fas fa-receipt" style="font-size:2rem; margin-bottom:10px; display:block; opacity:0.3;"></i>
        No transactions yet.<br>
        <button onclick="showPage('scanner')" style="
          margin-top:10px; background:none; border:none;
          color:#00EEFF; cursor:pointer; font-size:0.9rem;
          text-decoration:underline;
        ">Scan your first receipt</button>
      </div>
    `;
    return;
  }

  container.innerHTML = recent.map(tx => `
    <div class="transaction-item">
      <div class="transaction-icon">${getCategoryEmoji(tx.category)}</div>
      <div class="transaction-info">
        <div class="transaction-name">${tx.description}</div>
        <div class="transaction-date">${formatDate(tx.date)} · 
          <span class="badge badge-${tx.expenseType || 'personal'}">${tx.expenseType || 'personal'}</span>
        </div>
      </div>
      <div class="transaction-amount ${tx.type}">
        ${tx.type === 'income' ? '+' : '-'}${getCurrencySymbol()}${formatNumber(tx.amount)}
      </div>
    </div>
  `).join('');
}

// ===========================
// TRANSACTIONS
// ===========================
function showAddTransaction() {
  document.getElementById('addTransactionModal').classList.add('active');
  setDefaultDate();
}

function saveTransaction() {
  const desc = document.getElementById('txDesc').value.trim();
  const amount = parseFloat(document.getElementById('txAmount').value);
  const type = document.getElementById('txType').value;
  const category = document.getElementById('txCategory').value;
  const expenseType = document.getElementById('txExpenseType').value;
  const date = document.getElementById('txDate').value;

  if (!desc || !amount || !date) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const tx = {
    id: Date.now(),
    description: desc,
    amount: amount,
    type: type,
    category: category,
    expenseType: expenseType,
    date: date,
    source: 'manual'
  };

  appData.transactions.push(tx);
  saveData();

  // Close modal & reset
  document.getElementById('addTransactionModal').classList.remove('active');
  document.getElementById('txDesc').value = '';
  document.getElementById('txAmount').value = '';

  // Re-render
  renderDashboard();
  renderTransactions();

  showToast('Transaction saved! ✅');
}

function renderTransactions() {
  const container = document.getElementById('transactionsList');
  const filterType = document.getElementById('filterType')?.value || 'all';
  const filterCat = document.getElementById('filterCategory')?.value || 'all';
  const filterExpType = document.getElementById('filterExpenseType')?.value || 'all';

  let filtered = [...appData.transactions];

  if (filterType !== 'all') filtered = filtered.filter(tx => tx.type === filterType);
  if (filterCat !== 'all') filtered = filtered.filter(tx => tx.category === filterCat);
  if (filterExpType !== 'all') filtered = filtered.filter(tx => tx.expenseType === filterExpType);

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; color:#A0B0C0; font-size:0.9rem;">
        <i class="fas fa-receipt" style="font-size:2.5rem; margin-bottom:12px; display:block; opacity:0.3;"></i>
        No transactions found.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(tx => `
    <div class="transaction-item">
      <div class="transaction-icon">${getCategoryEmoji(tx.category)}</div>
      <div class="transaction-info">
        <div class="transaction-name">${tx.description}</div>
        <div class="transaction-date">
          ${formatDate(tx.date)} ·
          <span class="badge badge-${tx.category}">${tx.category}</span>
          <span class="badge badge-${tx.expenseType || 'personal'}">${tx.expenseType || 'personal'}</span>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <div class="transaction-amount ${tx.type}">
          ${tx.type === 'income' ? '+' : '-'}${getCurrencySymbol()}${formatNumber(tx.amount)}
        </div>
        <button onclick="deleteTransaction(${tx.id})" style="
          background:none; border:none; color:#FF4466;
          cursor:pointer; font-size:0.85rem; padding:4px;
        ">✕</button>
      </div>
    </div>
  `).join('');
}

function filterTransactions() {
  renderTransactions();
}

function deleteTransaction(id) {
  appData.transactions = appData.transactions.filter(tx => tx.id !== id);
  saveData();
  renderTransactions();
  renderDashboard();
  showToast('Transaction deleted');
}

// ===========================
// RECEIPT SCANNER
// ===========================
function analyzeReceipt(input) {
  const file = input.files[0];
  if (!file) return;

  // Show analyzing state
  const uploadArea = document.getElementById('uploadArea');
  uploadArea.innerHTML = `
    <div style="text-align:center; padding:20px;">
      <div style="
        width:50px; height:50px;
        border:3px solid rgba(0,238,255,0.2);
        border-top-color:#00EEFF;
        border-radius:50%;
        animation:spin 0.8s linear infinite;
        margin:0 auto 16px;
      "></div>
      <p style="color:#00EEFF; font-weight:600;">Analyzing receipt...</p>
      <p style="color:#A0B0C0; font-size:0.85rem; margin-top:4px;">AI is detecting expense details</p>
    </div>
  `;

  // Simulate AI analysis (replace with real OCR API later)
  setTimeout(() => {
    const mockData = simulateOCR(file.name);
    showScanResult(mockData);
  }, 2000);
}

function simulateOCR(filename) {
  // Mock data — replace with real OCR (Google Vision, AWS Textract, etc.)
  const merchants = [
    { name: 'Walmart', amount: 47.32, category: 'shopping' },
    { name: 'McDonald\'s', amount: 12.50, category: 'food' },
    { name: 'Shell Gas Station', amount: 65.00, category: 'transport' },
    { name: 'CVS Pharmacy', amount: 23.18, category: 'health' },
    { name: 'Amazon', amount: 89.99, category: 'shopping' },
    { name: 'Starbucks', amount: 8.75, category: 'food' },
    { name: 'Target', amount: 134.50, category: 'shopping' },
    { name: 'Uber', amount: 18.40, category: 'transport' },
  ];

  const mock = merchants[Math.floor(Math.random() * merchants.length)];
  return {
    merchant: mock.name,
    amount: mock.amount,
    category: mock.category,
    date: new Date().toISOString().split('T')[0]
  };
}

function showScanResult(data) {
  // Restore upload area
  document.getElementById('uploadArea').innerHTML = `
    <div class="upload-icon">📷</div>
    <p style="font-size:1rem; font-weight:600; margin-bottom:6px;">Receipt scanned successfully!</p>
    <p style="color:#00FF88;">✅ AI detected expense details below</p>
  `;

  // Fill form
  document.getElementById('scanMerchant').value = data.merchant;
  document.getElementById('scanAmount').value = data.amount;
  document.getElementById('scanDate').value = data.date;
  document.getElementById('scanCategory').value = data.category;

  // Show result
  document.getElementById('scanResult').style.display = 'block';
}

function saveScannedExpense() {
  const merchant = document.getElementById('scanMerchant').value.trim();
  const amount = parseFloat(document.getElementById('scanAmount').value);
  const date = document.getElementById('scanDate').value;
  const category = document.getElementById('scanCategory').value;
  const expenseType = document.getElementById('scanType').value;

  if (!merchant || !amount || !date) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const tx = {
    id: Date.now(),
    description: merchant,
    amount: amount,
    type: 'expense',
    category: category,
    expenseType: expenseType,
    date: date,
    source: 'scanner'
  };

  appData.transactions.push(tx);
  saveData();

  // Add to recent scans
  addRecentScan(tx);

  // Reset
  resetScanner();

  // Re-render
  renderDashboard();
  renderTransactions();

  showToast('Expense saved! ✅');
  showPage('transactions');
}

function addRecentScan(tx) {
  const container = document.getElementById('recentScans');
  const item = document.createElement('div');
  item.className = 'transaction-item';
  item.innerHTML = `
    <div class="transaction-icon">${getCategoryEmoji(tx.category)}</div>
    <div class="transaction-info">
      <div class="transaction-name">${tx.description}</div>
      <div class="transaction-date">${formatDate(tx.date)}</div>
    </div>
    <div class="transaction-amount expense">
      -${getCurrencySymbol()}${formatNumber(tx.amount)}
    </div>
  `;

  // Remove empty state
  const empty = container.querySelector('div[style]');
  if (empty) empty.remove();

  container.insertBefore(item, container.firstChild);
}

function resetScanner() {
  document.getElementById('scanResult').style.display = 'none';
  document.getElementById('receiptInput').value = '';
  document.getElementById('uploadArea').innerHTML = `
    <div class="upload-icon">📷</div>
    <p style="font-size:1rem; font-weight:600; margin-bottom:6px;">Drop your receipt here or click to upload</p>
    <p>Supports JPG, PNG, PDF</p>
  `;
  document.getElementById('uploadArea').onclick = () => document.getElementById('receiptInput').click();
}

// ===========================
// CARDS
// ===========================
function showAddCard() {
  document.getElementById('addCardModal').classList.add('active');
}

function saveCard() {
  const name = document.getElementById('cardName').value.trim();
  const type = document.getElementById('cardType').value;
  const limit = parseFloat(document.getElementById('cardLimit').value) || 0;
  const balance = parseFloat(document.getElementById('cardBalance').value) || 0;
  const apr = parseFloat(document.getElementById('cardAPR').value) || 0;
  const rewards = document.getElementById('cardRewards').value;

  if (!name) {
    showToast('Please enter a card name', 'error');
    return;
  }

  const card = {
    id: Date.now(),
    name, type, limit, balance, apr, rewards
  };

  appData.cards.push(card);
  saveData();

  document.getElementById('addCardModal').classList.remove('active');
  document.getElementById('cardName').value = '';
  document.getElementById('cardLimit').value = '';
  document.getElementById('cardBalance').value = '';
  document.getElementById('cardAPR').value = '';

  renderCards();
  showToast('Card saved! ✅');
}

function renderCards() {
  const container = document.getElementById('cardsList');
  const currency = getCurrencySymbol();

  if (appData.cards.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; color:#A0B0C0; font-size:0.9rem;">
        <i class="fas fa-credit-card" style="font-size:2.5rem; margin-bottom:12px; display:block; opacity:0.3;"></i>
        No cards added yet.<br>Add your first card to get recommendations.
      </div>
    `;
    return;
  }

  container.innerHTML = appData.cards.map(card => {
    const usedPercent = card.limit > 0 ? Math.round((card.balance / card.limit) * 100) : 0;
    const available = card.limit - card.balance;
    const cardEmoji = { visa: '💳', mastercard: '💳', amex: '💎', discover: '🔶' };

    return `
      <div class="debt-card">
        <div class="debt-header">
          <div>
            <div class="debt-name">${cardEmoji[card.type] || '💳'} ${card.name}</div>
            <div style="font-size:0.8rem; color:#A0B0C0; margin-top:2px;">
              ${card.type.toUpperCase()} · APR: ${card.apr}% · Rewards: ${card.rewards}
            </div>
          </div>
          <button onclick="deleteCard(${card.id})" style="
            background:none; border:none; color:#FF4466;
            cursor:pointer; font-size:0.9rem;
          ">✕</button>
        </div>
        <div class="debt-progress">
          <div class="debt-progress-fill" style="width:${usedPercent}%"></div>
        </div>
        <div class="debt-info">
          <span>Balance: ${currency}${formatNumber(card.balance)}</span>
          <span>${usedPercent}% used</span>
          <span>Available: ${currency}${formatNumber(available)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function deleteCard(id) {
  appData.cards = appData.cards.filter(c => c.id !== id);
  saveData();
  renderCards();
  showToast('Card removed');
}

function recommendCard() {
  const category = document.getElementById('recommendCategory').value;
  const container = document.getElementById('cardRecommendation');

  if (!category) {
    container.innerHTML = '';
    return;
  }

  if (appData.cards.length === 0) {
    container.innerHTML = `
      <div style="
        background:rgba(255,184,0,0.1);
        border:1px solid rgba(255,184,0,0.3);
        border-radius:12px;
        padding:16px;
        color:#FFB800;
        font-size:0.9rem;
        margin-top:12px;
      ">
        ⚠️ Add your cards first to get personalized recommendations.
      </div>
    `;
    return;
  }

  // Find best card for category
  const best = appData.cards.find(c => c.rewards === category)
    || appData.cards.find(c => c.rewards === 'cashback')
    || appData.cards.reduce((prev, curr) => prev.apr < curr.apr ? prev : curr);

  container.innerHTML = `
    <div style="
      background:rgba(0,238,255,0.05);
      border:1px solid rgba(0,238,255,0.2);
      border-radius:12px;
      padding:16px;
      margin-top:12px;
    ">
      <div style="font-size:0.85rem; color:#A0B0C0; margin-bottom:6px;">
        Recommended for ${category}:
      </div>
      <div style="font-size:1.1rem; font-weight:700; color:#00EEFF; margin-bottom:6px;">
        💳 ${best.name}
      </div>
      <div style="font-size:0.85rem; color:#A0B0C0;">
        APR: ${best.apr}% · Rewards: ${best.rewards} · 
        Available: ${getCurrencySymbol()}${formatNumber(best.limit - best.balance)}
      </div>
    </div>
  `;
}

// ===========================
// DEBT PLAN
// ===========================
function showAddDebt() {
  document.getElementById('addDebtModal').classList.add('active');
}

function saveDebt() {
  const name = document.getElementById('debtName').value.trim();
  const balance = parseFloat(document.getElementById('debtBalance').value) || 0;
  const rate = parseFloat(document.getElementById('debtRate').value) || 0;
  const min = parseFloat(document.getElementById('debtMin').value) || 0;

  if (!name || !balance) {
    showToast('Please fill all required fields', 'error');
    return;
  }

  const debt = { id: Date.now(), name, balance, rate, min };
  appData.debts.push(debt);
  saveData();

  document.getElementById('addDebtModal').classList.remove('active');
  document.getElementById('debtName').value = '';
  document.getElementById('debtBalance').value = '';
  document.getElementById('debtRate').value = '';
  document.getElementById('debtMin').value = '';

  renderDebts();
  showToast('Debt added! ✅');
}

function setDebtMethod(method) {
  appData.debtMethod = method;
  saveData();

  const btnA = document.getElementById('btnAvalanche');
  const btnS = document.getElementById('btnSnowball');

  if (method === 'avalanche') {
    btnA.className = 'btn-primary';
    btnA.style.cssText = '';
    btnS.style.cssText = `
      flex:1; min-width:200px; padding:10px;
      background:transparent;
      border:1px solid rgba(0,238,255,0.2);
      border-radius:50px; color:#A0B0C0;
      cursor:pointer; font-family:'Inter',sans-serif;
      font-size:0.9rem;
    `;
  } else {
    btnS.className = 'btn-primary';
    btnS.style.cssText = '';
    btnA.style.cssText = `
      flex:1; min-width:200px; padding:10px;
      background:transparent;
      border:1px solid rgba(0,238,255,0.2);
      border-radius:50px; color:#A0B0C0;
      cursor:pointer; font-family:'Inter',sans-serif;
      font-size:0.9rem;
    `;
  }

  renderDebts();
}

function renderDebts() {
  const container = document.getElementById('debtList');
  const currency = getCurrencySymbol();

  if (appData.debts.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; color:#A0B0C0; font-size:0.9rem;">
        <i class="fas fa-chart-pie" style="font-size:2.5rem; margin-bottom:12px; display:block; opacity:0.3;"></i>
        No debts added yet.<br>Add your credit cards or loans to get a payoff plan.
      </div>
    `;
    updateDebtSummary(0, 0, '—', 0);
    return;
  }

  // Sort by method
  let sorted = [...appData.debts];
  if (appData.debtMethod === 'avalanche') {
    sorted.sort((a, b) => b.rate - a.rate);
  } else {
    sorted.sort((a, b) => a.balance - b.balance);
  }

  const totalDebt = sorted.reduce((sum, d) => sum + d.balance, 0);
  const totalMin = sorted.reduce((sum, d) => sum + d.min, 0);

  // Estimate payoff (simplified)
  const estMonths = estimatePayoff(sorted);
  const interestSaved = calculateInterestSaved(sorted);

  updateDebtSummary(totalDebt, totalMin, estMonths, interestSaved);

  container.innerHTML = sorted.map((debt, index) => {
    const monthsToPayoff = debt.min > 0
      ? Math.ceil(debt.balance / debt.min)
      : 999;
    const payoffPercent = Math.min(95, Math.max(5,
      100 - (debt.balance / (debt.balance + debt.min * 12) * 100)
    ));

    return `
      <div class="debt-card">
        <div class="debt-header">
          <div>
            <div class="debt-name">
              ${index === 0 ? '🎯 ' : ''}${debt.name}
              ${index === 0 ? '<span style="font-size:0.75rem; color:#00EEFF; margin-left:6px;">Focus here first</span>' : ''}
            </div>
            <div style="font-size:0.8rem; color:#A0B0C0; margin-top:2px;">
              ${debt.rate}% APR · Min payment: ${currency}${formatNumber(debt.min)}/mo
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="debt-amount">${currency}${formatNumber(debt.balance)}</div>
            <button onclick="deleteDebt(${debt.id})" style="
              background:none; border:none; color:#FF4466;
              cursor:pointer; font-size:0.9rem;
            ">✕</button>
          </div>
        </div>
        <div class="debt-progress">
          <div class="debt-progress-fill" style="width:${payoffPercent}%"></div>
        </div>
        <div class="debt-info">
          <span>Est. payoff: ~${monthsToPayoff} months</span>
          <span>${debt.rate}% interest</span>
          <span>Min: ${currency}${formatNumber(debt.min)}/mo</span>
        </div>
      </div>
    `;
  }).join('');
}

function updateDebtSummary(total, monthly, months, saved) {
  const currency = getCurrencySymbol();
  document.getElementById('totalDebt').textContent = currency + formatNumber(total);
  document.getElementById('totalMonthly').textContent = currency + formatNumber(monthly);
  document.getElementById('estPayoff').textContent = months === '—' ? '—' : months + ' mo';
  document.getElementById('interestSaved').textContent = currency + formatNumber(saved);
}

function estimatePayoff(debts) {
  if (debts.length === 0) return '—';
  const maxMonths = debts.reduce((max, d) => {
    const m = d.min > 0 ? Math.ceil(d.balance / d.min) : 999;
    return Math.max(max, m);
  }, 0);
  return maxMonths > 500 ? '500+' : maxMonths;
}

function calculateInterestSaved(debts) {
  return debts.reduce((sum, d) => {
    const months = d.min > 0 ? Math.ceil(d.balance / d.min) : 0;
    const interest = (d.balance * (d.rate / 100 / 12)) * months * 0.3;
    return sum + interest;
  }, 0);
}

function deleteDebt(id) {
  appData.debts = appData.debts.filter(d => d.id !== id);
  saveData();
  renderDebts();
  showToast('Debt removed');
}

// ===========================
// SUBSCRIPTIONS
// ===========================
function showAddSubscription() {
  document.getElementById('addSubModal').classList.add('active');
}

function saveSubscription() {
  const name = document.getElementById('subName').value.trim();
  const amount = parseFloat(document.getElementById('subAmount').value) || 0;
  const date = parseInt(document.getElementById('subDate').value) || 1;
  const category = document.getElementById('subCategory').value;

  if (!name || !amount) {
    showToast('Please fill all required fields', 'error');
    return;
  }

  const sub = {
    id: Date.now(),
    name, amount, date, category,
    active: true
  };

  appData.subscriptions.push(sub);
  saveData();

  document.getElementById('addSubModal').classList.remove('active');
  document.getElementById('subName').value = '';
  document.getElementById('subAmount').value = '';
  document.getElementById('subDate').value = '';

  renderSubscriptions();
  showToast('Subscription added! ✅');
}

function renderSubscriptions() {
  const container = document.getElementById('subscriptionsList');
  const currency = getCurrencySymbol();
  const active = appData.subscriptions.filter(s => s.active);

  // Update stats
  const total = active.reduce((sum, s) => sum + s.amount, 0);
  document.getElementById('totalSubs').textContent = currency + formatNumber(total);
  document.getElementById('subsCount').textContent = active.length;

  // Next charge
  const today = new Date().getDate();
  const upcoming = active
    .map(s => ({
      ...s,
      daysUntil: s.date >= today ? s.date - today : 31 - today + s.date
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  if (upcoming.length > 0) {
    document.getElementById('nextCharge').textContent =
      upcoming[0].daysUntil === 0 ? 'Today' :
      upcoming[0].daysUntil === 1 ? 'Tomorrow' :
      `Day ${upcoming[0].date}`;
  }

  if (active.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; color:#A0B0C0; font-size:0.9rem;">
        <i class="fas fa-sync" style="font-size:2.5rem; margin-bottom:12px; display:block; opacity:0.3;"></i>
        No subscriptions tracked yet.
      </div>
    `;
    return;
  }

  const catEmoji = {
    streaming: '🎬',
    music: '🎵',
    software: '💻',
    fitness: '💪',
    news: '📰',
    other: '📦'
  };

  container.innerHTML = active.map(sub => `
    <div class="subscription-item">
      <div class="sub-info">
        <div class="sub-icon">${catEmoji[sub.category] || '📦'}</div>
        <div>
          <div class="sub-name">${sub.name}</div>
          <div class="sub-date">Billed day ${sub.date} of each month</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="sub-amount">-${currency}${formatNumber(sub.amount)}/mo</div>
        <button onclick="cancelSubscription(${sub.id})" style="
          background:rgba(255,68,102,0.1);
          border:1px solid rgba(255,68,102,0.3);
          border-radius:6px;
          color:#FF4466;
          padding:4px 10px;
          font-size:0.75rem;
          cursor:pointer;
          font-family:'Inter',sans-serif;
        " data-key="subs_cancel">Cancel</button>
      </div>
    </div>
  `).join('');
}

function cancelSubscription(id) {
  const sub = appData.subscriptions.find(s => s.id === id);
  if (sub) {
    sub.active = false;
    saveData();
    renderSubscriptions();
    showToast(`${sub.name} marked as cancelled`);
  }
}

// ===========================
// AI ASSISTANT
// ===========================
function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  askAI(message);
  input.value = '';
}

function askAI(message) {
  const messages = document.getElementById('chatMessages');

  // Add user message
  messages.innerHTML += `
    <div class="chat-message user">${message}</div>
  `;

  // Show typing
  const typingId = 'typing-' + Date.now();
  messages.innerHTML += `
    <div class="chat-message ai" id="${typingId}">
      <span style="opacity:0.6;">AI is thinking...</span>
      <span style="animation:blink 1s infinite;">💭</span>
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;

  // Generate response
  setTimeout(() => {
    const response = generateAIResponse(message);
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.innerHTML = response;
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

function generateAIResponse(message) {
  const msg = message.toLowerCase();
  const currency = getCurrencySymbol();

  // Debt related
  if (msg.includes('debt') || msg.includes('credit card') || msg.includes('pay off') || msg.includes('deuda')) {
    const totalDebt = appData.debts.reduce((sum, d) => sum + d.balance, 0);
    if (totalDebt > 0) {
      const sorted = [...appData.debts].sort((a, b) => b.rate - a.rate);
      const highest = sorted[0];
      return `📊 <strong>Debt Payoff Strategy:</strong><br><br>
        Your total debt is <strong style="color:#FF4466">${currency}${formatNumber(totalDebt)}</strong>.<br><br>
        🎯 <strong>Focus on:</strong> ${highest.name} first (${highest.rate}% APR)<br>
        💡 <strong>Tip:</strong> Pay the minimum on all other cards and put every extra dollar toward ${highest.name}.<br><br>
        Using the <strong>Avalanche method</strong>, you could save hundreds in interest charges!`;
    }
    return `📊 <strong>Debt Payoff Tips:</strong><br><br>
      1. 🎯 <strong>Avalanche Method:</strong> Pay highest interest rate first — saves the most money.<br>
      2. ⛄ <strong>Snowball Method:</strong> Pay smallest balance first — gives psychological wins.<br>
      3. 💡 Always pay more than the minimum payment.<br>
      4. 🚫 Stop adding new charges while paying off.<br><br>
      Add your debts in the <strong>Debt Plan</strong> section for a personalized payoff schedule!`;
  }

  // Subscriptions
  if (msg.includes('subscription') || msg.includes('suscripcion') || msg.includes('netflix') || msg.includes('spotify')) {
    const total = appData.subscriptions
      .filter(s => s.active)
      .reduce((sum, s) => sum + s.amount, 0);
    const count = appData.subscriptions.filter(s => s.active).length;
    if (count > 0) {
      return `🔄 <strong>Your Subscriptions:</strong><br><br>
        You have <strong>${count} active subscriptions</strong> costing 
        <strong style="color:#FF4466">${currency}${formatNumber(total)}/month</strong> 
        (${currency}${formatNumber(total * 12)}/year).<br><br>
        💡 <strong>Tips to save:</strong><br>
        • Review each subscription — do you actually use it?<br>
        • Switch to annual plans for 15-20% savings<br>
        • Share plans with family when possible<br>
        • Cancel trials before they charge you`;
    }
    return `🔄 <strong>Subscription Management:</strong><br><br>
      Track all your subscriptions in the <strong>Subscriptions</strong> section.<br><br>
      💡 The average person wastes <strong>$50-100/month</strong> on forgotten subscriptions.<br>
      Add yours to see your total monthly cost!`;
  }

  // Card recommendations
  if (msg.includes('card') || msg.includes('tarjeta') || msg.includes('groceries') || msg.includes('best card')) {
    if (appData.cards.length > 0) {
      const bestCard = appData.cards.reduce((prev, curr) =>
        prev.apr < curr.apr ? prev : curr
      );
      return `💳 <strong>Card Recommendation:</strong><br><br>
        Based on your cards, <strong style="color:#00EEFF">${bestCard.name}</strong> has the lowest APR at ${bestCard.apr}%.<br><br>
        🎯 <strong>General tips:</strong><br>
        • Use rewards cards for your biggest spending categories<br>
        • Always pay full balance to avoid interest<br>
        • Keep utilization below 30% for good credit score<br><br>
        Visit <strong>My Cards</strong> for personalized recommendations by category!`;
    }
    return `💳 <strong>Card Tips:</strong><br><br>
      Add your cards in <strong>My Cards</strong> to get personalized recommendations!<br><br>
      🏆 <strong>Best cards by category (general):</strong><br>
      • 🍔 Food: Cards with dining rewards (3-4% cashback)<br>
      • ✈️ Travel: Cards with miles/points<br>
      • ⛽ Gas: Cards with gas rewards (3-5% cashback)<br>
      • 🛍️ Shopping: Cards with retail rewards`;
  }

  // Budget
  if (msg.includes('budget') || msg.includes('presupuesto') || msg.includes('save') || msg.includes('ahorrar')) {
    const income = appData.transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
    const expenses = appData.transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);

    return `📅 <strong>Budget Plan (50/30/20 Rule):</strong><br><br>
      ${income > 0 ? `Your income: <strong>${currency}${formatNumber(income)}</strong><br><br>` : ''}
      📊 <strong>Recommended split:</strong><br>
      • 🏠 <strong>50% Needs:</strong> ${currency}${formatNumber(income * 0.5)} (rent, food, utilities)<br>
      • 🎉 <strong>30% Wants:</strong> ${currency}${formatNumber(income * 0.3)} (dining out, entertainment)<br>
      • 💰 <strong>20% Savings:</strong> ${currency}${formatNumber(income * 0.2)} (emergency fund, investments)<br><br>
      ${expenses > income * 0.8 ? '⚠️ <strong>Alert:</strong> Your expenses seem high. Look for areas to cut!' :
      '✅ <strong>Great job!</strong> Keep tracking to stay on budget.'}`;
  }

  // Spending analysis
  if (msg.includes('spending') || msg.includes('gastos') || msg.includes('how much')) {
    const expenses = appData.transactions.filter(tx => tx.type === 'expense');
    if (expenses.length > 0) {
      const byCategory = {};
      expenses.forEach(tx => {
        byCategory[tx.category] = (byCategory[tx.category] || 0) + tx.amount;
      });
      const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
      const top3 = sorted.slice(0, 3);
      return `📊 <strong>Your Spending Analysis:</strong><br><br>
        <strong>Top categories:</strong><br>
        ${top3.map(([cat, amount]) =>
          `${getCategoryEmoji(cat)} ${cat}: <strong>${currency}${formatNumber(amount)}</strong>`
        ).join('<br>')}<br><br>
        💡 <strong>Tip:</strong> Focus on reducing your top spending category first for maximum savings!`;
    }
    return `📊 Add some transactions first and I'll analyze your spending patterns!`;
  }

  // Default response
  const responses = [
    `💡 <strong>Financial Tip of the Day:</strong><br><br>
      The <strong>50/30/20 rule</strong> is a great budgeting framework:<br>
      • 50% for needs (housing, food, transport)<br>
      • 30% for wants (entertainment, dining)<br>
      • 20% for savings and debt payoff<br><br>
      Try asking me about your debts, subscriptions, or card recommendations!`,
    `🎯 <strong>Smart Money Moves:</strong><br><br>
      1. Build a 3-6 month emergency fund first<br>
      2. Pay off high-interest debt aggressively<br>
      3. Maximize employer 401k match<br>
      4. Then invest the rest<br><br>
      What specific financial question can I help you with?`,
    `📈 <strong>I can help you with:</strong><br><br>
      • 💳 Which card to use for purchases<br>
      • 📊 Debt payoff strategies<br>
      • 🔄 Subscription optimization<br>
      • 📅 Budget planning<br>
      • 💰 Savings tips<br><br>
      Just ask me anything!`
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

// ===========================
// SETTINGS
// ===========================
function saveSettings() {
  const name = document.getElementById('settingName').value.trim() || 'User';
  const email = document.getElementById('settingEmail').value.trim();
  const currency = document.getElementById('settingCurrency').value;
  const lang = document.getElementById('settingLang').value;

  appData.settings = { name, email, currency, lang };
  saveData();

  // Apply changes
  document.getElementById('userName').textContent = name;
  applyLanguage(lang);

  showToast('Settings saved! ✅');
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function getCurrencySymbol() {
  const symbols = {
    USD: '$', EUR: '€', MXN: '$',
    COP: '$', ARS: '$', BRL: 'R$',
    CLP: '$', PEN: 'S/', CAD: 'CA$'
  };
  return symbols[appData.settings.currency] || '$';
}

function formatNumber(num) {
  return parseFloat(num || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

function getCategoryEmoji(category) {
  const emojis = {
    food: '🍔', transport: '🚗', shopping: '🛍️',
    health: '🏥', entertainment: '🎬', utilities: '💡',
    travel: '✈️', salary: '💼', other: '📦',
    streaming: '🎬', music: '🎵', software: '💻',
    fitness: '💪', news: '📰'
  };
  return emojis[category] || '📦';
}

// ===========================
// TOAST NOTIFICATIONS
// ===========================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const colors = {
    success: { bg: 'rgba(0,255,136,0.15)', border: 'rgba(0,255,136,0.4)', text: '#00FF88' },
    error: { bg: 'rgba(255,68,102,0.15)', border: 'rgba(255,68,102,0.4)', text: '#FF4466' },
    info: { bg: 'rgba(0,238,255,0.15)', border: 'rgba(0,238,255,0.4)', text: '#00EEFF' }
  };
  const c = colors[type] || colors.success;

  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: ${c.bg};
    border: 1px solid ${c.border};
    border-radius: 12px;
    padding: 14px 20px;
    color: ${c.text};
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 99999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===========================
// PAGE STYLES
// ===========================
const appStyles = document.createElement('style');
appStyles.textContent = `
  .page { display: none; }
  .page.active { display: block; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @media (max-width: 900px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s;
    }
    .sidebar.open {
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(appStyles);

// ================================
// LOGIN HANDLER FIX
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-pass').value.trim();
            if (!email || !pass) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            // Save user session
            const userData = { email: email, user_metadata: { full_name: email.split('@')[0] } };
            localStorage.setItem('financeai_user', JSON.stringify(userData));
            appData.settings.name = email.split('@')[0];
            appData.settings.email = email;
            saveData();
            // Go to app dashboard
            showPage('app');
            showSection('dashboard');
            renderDashboard();
        });
    }
});
