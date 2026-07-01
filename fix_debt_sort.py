with open('app.js', 'r') as f:
    content = f.read()

# 1) Add currentDebtMethod to initial STATE
old_state = """  debts:         [],
  cards:         [],"""

new_state = """  debts:         [],
  cards:         [],
  currentDebtMethod: 'avalanche',"""

if old_state in content:
    content = content.replace(old_state, new_state)
    print("✅ Added currentDebtMethod to STATE")
else:
    print("❌ STATE pattern not found")

# 2) Fix switchDebtMethod to save method in STATE
old_switch = """function switchDebtMethod(method, btn) {
  document.querySelectorAll('#section-debts .section-tab')
    .forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (method === 'avalanche') {
    STATE.debts.sort((a, b) => (b.apr || 0) - (a.apr || 0));
    setTxt('debt-method-title', t('method_avalanche'));
    showToast(t('toast_avalanche'));
  } else {
    STATE.debts.sort((a, b) => (a.balance || 0) - (b.balance || 0));
    setTxt('debt-method-title', t('method_snowball'));
    showToast(t('toast_snowball'));
  }
  saveState();
  renderDebts();
}"""

new_switch = """function switchDebtMethod(method, btn) {
  document.querySelectorAll('#section-debts .section-tab')
    .forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  STATE.currentDebtMethod = method;
  if (method === 'avalanche') {
    setTxt('debt-method-title', t('method_avalanche'));
    showToast(t('toast_avalanche'));
  } else {
    setTxt('debt-method-title', t('method_snowball'));
    showToast(t('toast_snowball'));
  }
  saveState();
  renderDebts();
}"""

if old_switch in content:
    content = content.replace(old_switch, new_switch)
    print("✅ Fixed switchDebtMethod")
else:
    print("❌ switchDebtMethod pattern not found")

# 3) Fix renderDebts to sort allDebts based on currentDebtMethod
old_render = """  const allDebts = [...allCardDebts, ...manualDebts];

  const personalDebts = allDebts.filter(d => d.ownerType === 'personal');
  const businessDebts = allDebts.filter(d => d.ownerType === 'business');"""

new_render = """  let allDebts = [...allCardDebts, ...manualDebts];

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
  const businessDebts = allDebts.filter(d => d.ownerType === 'business');"""

if old_render in content:
    content = content.replace(old_render, new_render)
    print("✅ Fixed renderDebts sorting")
else:
    print("❌ renderDebts sort pattern not found")

with open('app.js', 'w') as f:
    f.write(content)
