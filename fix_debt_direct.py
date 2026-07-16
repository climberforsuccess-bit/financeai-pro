with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = """  const totalDebt = STATE.totalDebtCache || 0;"""

new = """  const cardDebt = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance || d.amount) || 0), 0);
  const totalDebt = cardDebt + manualDebt;"""

if old in content:
    content = content.replace(old, new, 1)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Done")
else:
    print("❌ No encontrado")
