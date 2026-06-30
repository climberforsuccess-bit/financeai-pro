import re

with open('index.html', 'r') as f:
    html = f.read()

html = html.replace(
    '<div class="stat-card-change">✓ Finanzas saludables</div>',
    '<div class="stat-card-change" id="val-balance-status">✓ Finanzas saludables</div>'
)

with open('index.html', 'w') as f:
    f.write(html)
print("✅ index.html — ID agregado a val-balance-status")

with open('lang.js', 'r') as f:
    lang = f.read()

lang = lang.replace(
    "dash_healthy:        '✓ Healthy finances',",
    "dash_healthy:        '✓ Healthy finances',\n    dash_watch:          '⚠️ Watch your spending',\n    dash_critical:       '🔴 Critical: High debt',"
)

lang = lang.replace(
    "dash_healthy:        '✓ Finanzas saludables',",
    "dash_healthy:        '✓ Finanzas saludables',\n    dash_watch:          '⚠️ Controla tus gastos',\n    dash_critical:       '🔴 Crítico: Deuda alta',"
)

with open('lang.js', 'w') as f:
    f.write(lang)
print("✅ lang.js — dash_watch y dash_critical agregados")

with open('app.js', 'r') as f:
    js = f.read()

old_code = "  if (el('val-balance')) el('val-balance').textContent  = fmt(balance);\n  if (el('val-balance')) el('val-balance').textContent  = savings + '%';"

new_code = """  if (el('val-balance')) el('val-balance').textContent = fmt(balance);

  const totalDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.amount) || 0), 0)
                  + (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
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
  }"""

if old_code in js:
    js = js.replace(old_code, new_code)
    print("✅ app.js — val-balance corregido + lógica de status agregada")
else:
    print("⚠️  app.js — texto no encontrado exacto, revisa manualmente")

with open('app.js', 'w') as f:
    f.write(js)

print("\n🎉 Listo. Corre: git add -A && git commit -m 'fix: balance status reflects real debt' && git push")
