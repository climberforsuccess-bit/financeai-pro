import re

with open('app.js', 'r') as f:
    content = f.read()

old = """window.addEventListener('langChanged', async () => {
  const activeSection = STATE.currentSection || '';
  if (activeSection === 'dashboard') { renderDashboard(); }
  else if (activeSection === 'transactions') { renderTransactions(); }
  else if (activeSection === 'cards') { renderCards(); }
  else if (activeSection === 'debts') { renderDebts(); }
  else if (activeSection === 'subscriptions') { renderSubscriptions(); }
  else if (activeSection === 'reports') { renderReports(); }
  else if (activeSection === 'settings') { renderSettings(); }
});"""

new = """window.addEventListener('langChanged', async () => {
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
});"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fix applied successfully")
else:
    print("❌ Block not found - check manually")
