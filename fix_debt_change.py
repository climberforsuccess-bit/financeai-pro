path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

old = "  if (el('val-debt')) el('val-debt').textContent = fmt(totalDebt);"
new = """  if (el('val-debt')) el('val-debt').textContent = fmt(totalDebt);

  // Debt change vs last month (basado en transacciones reales)
  const lastMonthDebt = lastMonthTxs.filter(tx => tx.type === 'expense')
    .reduce((s, tx) => s + Math.abs(parseFloat(tx.amount) || 0), 0);
  const thisMonthDebt = thisMonthTxs.filter(tx => tx.type === 'expense')
    .reduce((s, tx) => s + Math.abs(parseFloat(tx.amount) || 0), 0);
  const debtDiff = thisMonthDebt - lastMonthDebt;
  const debtChangeEl = el('val-debt-change');
  if (debtChangeEl) {
    if (debtDiff === 0 && thisMonthDebt === 0) {
      debtChangeEl.textContent = '-';
      debtChangeEl.style.color = 'var(--text-muted)';
    } else if (debtDiff <= 0) {
      debtChangeEl.textContent = '↓ ' + fmt(Math.abs(debtDiff)) + ' this month';
      debtChangeEl.style.color = 'var(--success)';
    } else {
      debtChangeEl.textContent = '↑ ' + fmt(debtDiff) + ' this month';
      debtChangeEl.style.color = '#ef4444';
    }
  }"""

if old in content:
    content = content.replace(old, new)
    print("✅ val-debt-change dinámico agregado")
else:
    print("❌ No encontrado")

with open(path, 'w') as f:
    f.write(content)
print("✅ Guardado")
