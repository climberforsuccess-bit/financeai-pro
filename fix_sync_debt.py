with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1) En renderDebts(), guardar el total en STATE justo después de construir allDebts
old1 = "  let allDebts = [...allCardDebts, ...manualDebts];"
new1 = "  let allDebts = [...allCardDebts, ...manualDebts];\n  STATE.totalDebtCache = allDebts.reduce((s, d) => s + (d.balance || 0), 0);"

# 2) En el dashboard, usar STATE.totalDebtCache si existe
old2 = """  const cardDebt = (STATE.cards || [])
    .filter(c => parseFloat(c.balance) > 0)
    .reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance || d.amount) || 0), 0);
  const totalDebt = manualDebt + cardDebt;"""

new2 = """  const cardDebt = (STATE.cards || [])
    .filter(c => (c.type === 'Crédito' || c.type === 'credit' || c.type === 'Credito') && parseFloat(c.balance) > 0)
    .reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance || d.amount) || 0), 0);
  const totalDebt = STATE.totalDebtCache !== undefined ? STATE.totalDebtCache : (manualDebt + cardDebt);"""

if old1 in content:
    content = content.replace(old1, new1, 1)
    print("✅ Paso 1 OK")
else:
    print("❌ Paso 1 no encontrado")

if old2 in content:
    content = content.replace(old2, new2, 1)
    print("✅ Paso 2 OK")
else:
    print("❌ Paso 2 no encontrado")
    idx = content.find('const cardDebt')
    print(repr(content[idx:idx+250]))

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
