with open('app.js', 'r') as f:
    js = f.read()

old = """  // --- Deuda total (tarjetas) ---
  const cardDebts = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebts = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.amount) || 0), 0);
  const totalDebt = cardDebts + manualDebts;
  if (el('val-debt')) el('val-debt').textContent = fmt(totalDebt);"""

new = """  // --- Deuda total (tarjetas) ---
  if (el('val-debt')) el('val-debt').textContent = fmt(totalDebt);"""

if old in js:
    js = js.replace(old, new)
    print("✅ app.js — duplicate totalDebt removed")
else:
    print("⚠️  texto no encontrado exacto")

with open('app.js', 'w') as f:
    f.write(js)
