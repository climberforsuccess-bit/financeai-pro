with open('app.js', 'r') as f:
    content = f.read()

old = """  STATE.totalDebtCache = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance) || 0), 0);
}

async function loadSubscriptions()"""

new = """  const cardDebt = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  const manualDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance) || 0), 0);
  STATE.totalDebtCache = cardDebt + manualDebt;
}

async function loadSubscriptions()"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fix aplicado")
else:
    print("❌ No encontrado")
