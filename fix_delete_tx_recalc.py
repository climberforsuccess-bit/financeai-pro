path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

old = '''async function deleteTransaction(id) {
  if (!confirm(t('tx_confirm_delete'))) return;

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    showToast(t('tx_alert_error') + error.message, 'error');
    return;
  }

  // Eliminar del STATE local
  STATE.transactions = STATE.transactions.filter(tx => tx.id !== id);
  renderTransactions();
  renderDashboard();
  showToast(t('notif_tx_deleted'), 'success');
}'''

new = '''async function deleteTransaction(id) {
  if (!confirm(t('tx_confirm_delete'))) return;

  // Guardar cardId antes de borrar
  const tx = (STATE.transactions || []).find(t => t.id === id);
  const cardId = tx?.cardId || null;

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    showToast(t('tx_alert_error') + error.message, 'error');
    return;
  }

  // Eliminar del STATE local
  STATE.transactions = STATE.transactions.filter(tx => tx.id !== id);
  renderTransactions();
  renderDashboard();
  if (cardId) await recalcCardBalance(cardId);
  showToast(t('notif_tx_deleted'), 'success');
}'''

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print("✅ deleteTransaction ahora recalcula balance de tarjeta")
else:
    print("❌ No encontrado")
