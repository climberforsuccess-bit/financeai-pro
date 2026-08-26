path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

old = '''  const date = document.getElementById('tx-date').value;

  if (!description || !amount || !date) {'''

new = '''  const date = document.getElementById('tx-date').value;
  const cardId = document.getElementById('tx-card')?.value || null;

  if (!description || !amount || !date) {'''

if old in content:
    content = content.replace(old, new)
    print("✅ cardId leído del selector")
else:
    print("❌ No encontrado (1)")

old2 = '''    expense_type: category_type,
    date
  }]);'''

new2 = '''    expense_type: category_type,
    date,
    card_id: cardId || null
  }]);'''

if old2 in content:
    content = content.replace(old2, new2)
    with open(path, 'w') as f:
        f.write(content)
    print("✅ card_id guardado en Supabase")
else:
    print("❌ No encontrado (2)")
