with open('app.js', 'r') as f:
    content = f.read()

old_switch = """  if (method === 'avalanche') {
    setTxt('debt-method-title', t('method_avalanche'));
    showToast(t('toast_avalanche'));
  } else {
    setTxt('debt-method-title', t('method_snowball'));
    showToast(t('toast_snowball'));
  }"""

new_switch = """  if (method === 'avalanche') {
    setTxt('debt-method-title', t('method_avalanche'));
    setTxt('debt-method-desc', t('debt_method_avalanche_desc'));
    showToast(t('toast_avalanche'));
  } else {
    setTxt('debt-method-title', t('method_snowball'));
    setTxt('debt-method-desc', t('debt_method_snowball_desc'));
    showToast(t('toast_snowball'));
  }"""

if old_switch in content:
    content = content.replace(old_switch, new_switch)
    print("✅ switchDebtMethod updated with description")
else:
    print("❌ Pattern not found in switchDebtMethod")

with open('app.js', 'w') as f:
    f.write(content)
