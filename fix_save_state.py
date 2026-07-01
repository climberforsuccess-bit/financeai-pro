with open('app.js', 'r') as f:
    content = f.read()

old_save = """    localStorage.setItem('fai_subscriptions', JSON.stringify(STATE.subscriptions));
    localStorage.setItem('fai_settings',      JSON.stringify(STATE.settings));"""

new_save = """    localStorage.setItem('fai_subscriptions', JSON.stringify(STATE.subscriptions));
    localStorage.setItem('fai_debt_method',   STATE.currentDebtMethod || 'avalanche');
    localStorage.setItem('fai_settings',      JSON.stringify(STATE.settings));"""

if old_save in content:
    content = content.replace(old_save, new_save)
    print("✅ Added currentDebtMethod to saveState")
else:
    print("❌ saveState pattern not found")

with open('app.js', 'w') as f:
    f.write(content)
