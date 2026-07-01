with open('app.js', 'r') as f:
    content = f.read()

old_state = """const STATE = {
  user: null,
  currentSection: 'dashboard',
  currentPage: 'landing',
  transactions: [],
  cards: [],
  debts: [],
  subscriptions: [],
  settings: { currency: 'USD', lang: 'es', plan: 'free' }
};"""

new_state = """const STATE = {
  user: null,
  currentSection: 'dashboard',
  currentPage: 'landing',
  transactions: [],
  cards: [],
  debts: [],
  subscriptions: [],
  currentDebtMethod: 'avalanche',
  settings: { currency: 'USD', lang: 'es', plan: 'free' }
};"""

if old_state in content:
    content = content.replace(old_state, new_state)
    print("✅ Added currentDebtMethod to STATE")
else:
    print("❌ STATE pattern not found")

# Also persist it in loadState
old_load = """    STATE.subscriptions = JSON.parse(localStorage.getItem('fai_subscriptions') || '[]');
    const s = localStorage.getItem('fai_settings');"""

new_load = """    STATE.subscriptions = JSON.parse(localStorage.getItem('fai_subscriptions') || '[]');
    STATE.currentDebtMethod = localStorage.getItem('fai_debt_method') || 'avalanche';
    const s = localStorage.getItem('fai_settings');"""

if old_load in content:
    content = content.replace(old_load, new_load)
    print("✅ Added currentDebtMethod to loadState")
else:
    print("❌ loadState pattern not found")

# Also save it in saveState
old_save = """function saveState() {
  localStorage.setItem('fai_transactions',  JSON.stringify(STATE.transactions));
  localStorage.setItem('fai_cards',         JSON.stringify(STATE.cards));
  localStorage.setItem('fai_debts',         JSON.stringify(STATE.debts));
  localStorage.setItem('fai_subscriptions', JSON.stringify(STATE.subscriptions));
  localStorage.setItem('fai_settings',      JSON.stringify(STATE.settings));"""

new_save = """function saveState() {
  localStorage.setItem('fai_transactions',  JSON.stringify(STATE.transactions));
  localStorage.setItem('fai_cards',         JSON.stringify(STATE.cards));
  localStorage.setItem('fai_debts',         JSON.stringify(STATE.debts));
  localStorage.setItem('fai_subscriptions', JSON.stringify(STATE.subscriptions));
  localStorage.setItem('fai_debt_method',   STATE.currentDebtMethod || 'avalanche');
  localStorage.setItem('fai_settings',      JSON.stringify(STATE.settings));"""

if old_save in content:
    content = content.replace(old_save, new_save)
    print("✅ Added currentDebtMethod to saveState")
else:
    print("❌ saveState pattern not found")

with open('app.js', 'w') as f:
    f.write(content)
