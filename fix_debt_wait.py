with open('app.js', 'r') as f:
    content = f.read()

old = """  const cardDebt = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance || d.amount) || 0), 0);"""

new = """  // Asegurar datos frescos de cards y debts
  if (!STATE.cards || STATE.cards.length === 0) await loadCards();
  if (!STATE.debts || STATE.debts.length === 0) await loadDebts();
  const cardDebt = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance || d.amount) || 0), 0);"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fix aplicado")
else:
    print("❌ No encontrado")
