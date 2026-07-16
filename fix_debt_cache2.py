with open('app.js', 'r') as f:
    content = f.read()

old = """  STATE.debts = (data || []).map(d => ({
    id: d.id,
    name: d.name,
    balance: d.current_balance,
    originalBalance: d.total_amount,
    apr: d.interest_rate,
    minPayment: d.minimum_payment,
    dueDate: d.due_date,
    debtType: d.debt_type,
    createdAt: d.created_at
  }));
}

async function loadSubscriptions()"""

new = """  STATE.debts = (data || []).map(d => ({
    id: d.id,
    name: d.name,
    balance: d.current_balance,
    originalBalance: d.total_amount,
    apr: d.interest_rate,
    minPayment: d.minimum_payment,
    dueDate: d.due_date,
    debtType: d.debt_type,
    createdAt: d.created_at
  }));
  STATE.totalDebtCache = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.balance) || 0), 0);
}

async function loadSubscriptions()"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fix aplicado")
else:
    print("❌ No encontrado")
