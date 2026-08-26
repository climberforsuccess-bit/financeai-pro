path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

# 1) Agregar función recalcCardBalance antes de saveEditCard
new_func = '''async function recalcCardBalance(cardId) {
  if (!cardId) return;
  const txs = (STATE.transactions || []).filter(t => t.cardId === cardId);
  const spent = txs
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(parseFloat(t.amount) || 0), 0);
  const income = txs
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + Math.abs(parseFloat(t.amount) || 0), 0);
  const newBalance = Math.max(0, spent - income);

  // Actualizar en Supabase
  const { error } = await supabase
    .from('cards')
    .update({ balance: newBalance })
    .eq('id', cardId);

  if (error) { console.error('recalcCardBalance error:', error); return; }

  // Actualizar STATE
  const idx = STATE.cards.findIndex(c => c.id === cardId);
  if (idx !== -1) STATE.cards[idx].balance = newBalance;

  renderCards();
}

'''

target = 'async function saveEditCard(id) {'
if target in content:
    content = content.replace(target, new_func + target)
    print("✅ recalcCardBalance agregado")
else:
    print("❌ No encontrado saveEditCard")

# 2) Llamar recalcCardBalance en saveNewTransaction después de renderTransactions
old_save = '''  closeAddTransaction();
  await loadTransactions();
  renderTransactions();
}'''

new_save = '''  closeAddTransaction();
  await loadTransactions();
  renderTransactions();
  if (cardId) await recalcCardBalance(cardId);
}'''

if old_save in content:
    content = content.replace(old_save, new_save)
    print("✅ recalcCardBalance llamado tras guardar tx")
else:
    print("❌ No encontrado closeAddTransaction block")

# 3) Recalcular todos los balances al cargar transacciones
old_load = '''  closeAddTransaction();
  await loadTransactions();
  renderTransactions();
  if (cardId) await recalcCardBalance(cardId);
}'''

# Buscar loadTransactions y agregar recalc al final
old_render = '''  renderTransactions();
  if (cardId) await recalcCardBalance(cardId);'''

# También al cambiar a sección cards
old_switch = '''renderCards();
  showToast(t(\'card_updated\'));'''

with open(path, 'w') as f:
    f.write(content)
print("✅ Guardado")
