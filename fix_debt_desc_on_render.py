with open('app.js', 'r') as f:
    content = f.read()

old_restore = """  // Restore active button based on current method
  const methodBtns = document.querySelectorAll('#section-debts .section-tab');
  methodBtns.forEach(b => {
    const isAvalanche = b.getAttribute('onclick')?.includes('avalanche');
    const isSnowball  = b.getAttribute('onclick')?.includes('snowball');
    if (isAvalanche && STATE.currentDebtMethod === 'avalanche') b.classList.add('active');
    else if (isSnowball && STATE.currentDebtMethod === 'snowball') b.classList.add('active');
    else b.classList.remove('active');
  });"""

new_restore = """  // Restore active button and description based on current method
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
  }"""

if old_restore in content:
    content = content.replace(old_restore, new_restore)
    print("✅ renderDebts updated with title+desc restore")
else:
    print("❌ Pattern not found in renderDebts")

with open('app.js', 'w') as f:
    f.write(content)
