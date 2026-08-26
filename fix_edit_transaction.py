path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

# 1) Agregar botón edit en la tabla
old_btn = '''                <button class="btn btn-outline btn-sm" onclick="deleteTransaction('${tx.id}')">🗑️</button>'''
new_btn = '''                <button class="btn btn-outline btn-sm" onclick="openEditTransaction('${tx.id}')" style="margin-right:4px;">✏️</button>
                <button class="btn btn-outline btn-sm" onclick="deleteTransaction('${tx.id}')">🗑️</button>'''

if old_btn in content:
    content = content.replace(old_btn, new_btn)
    print("✅ Botón edit agregado en tabla")
else:
    print("❌ No encontrado botón delete")

# 2) Agregar funciones openEditTransaction y saveEditTransaction antes de deleteTransaction
edit_functions = '''function openEditTransaction(id) {
  const tx = (STATE.transactions || []).find(t => t.id === id);
  if (!tx) return;

  const cards = (STATE.cards || []);
  const cardOptions = cards.map(c =>
    `<option value="${c.id}" ${tx.cardId === c.id ? 'selected' : ''}>💳 ${c.name} ····${c.lastFour || ''}</option>`
  ).join('');

  const modal = document.createElement('div');
  modal.id = 'edit-tx-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div style="background:#1a1a3e;border-radius:16px;padding:28px;width:90%;max-width:480px;border:1px solid #2a2a5e;">
      <h3 style="color:#fff;margin:0 0 20px 0;">✏️ ${t('edit_transaction') || 'Edit Transaction'}</h3>

      <label style="color:#94a3b8;font-size:13px;">Description</label>
      <input id="et-desc" value="${tx.description || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">Amount</label>
      <input id="et-amount" type="number" step="0.01" value="${Math.abs(tx.amount) || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">Type</label>
      <select id="et-type" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">
        <option value="expense" ${tx.type === 'expense' ? 'selected' : ''}>Expense</option>
        <option value="income" ${tx.type === 'income' ? 'selected' : ''}>Income</option>
      </select>

      <label style="color:#94a3b8;font-size:13px;">Category</label>
      <input id="et-cat" value="${tx.category || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      <label style="color:#94a3b8;font-size:13px;">Date</label>
      <input id="et-date" type="date" value="${tx.date || ''}" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">

      ${cards.length > 0 ? `
      <label style="color:#94a3b8;font-size:13px;">Card (optional)</label>
      <select id="et-card" style="width:100%;padding:10px;background:#0d0d2b;border:1px solid #2a2a5e;border-radius:8px;color:#fff;margin:6px 0 14px 0;box-sizing:border-box;">
        <option value="">No card</option>
        ${cardOptions}
      </select>` : ''}

      <div style="display:flex;gap:10px;margin-top:8px;">
        <button onclick="saveEditTransaction('${id}')" class="btn btn-primary" style="flex:1;">💾 Save</button>
        <button onclick="document.getElementById('edit-tx-modal').remove()" class="btn btn-outline" style="flex:1;">Cancel</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

async function saveEditTransaction(id) {
  const desc   = document.getElementById('et-desc')?.value?.trim();
  const amount = parseFloat(document.getElementById('et-amount')?.value) || 0;
  const type   = document.getElementById('et-type')?.value;
  const cat    = document.getElementById('et-cat')?.value?.trim();
  const date   = document.getElementById('et-date')?.value;
  const cardId = document.getElementById('et-card')?.value || null;

  if (!desc) { showToast('Description required', 'error'); return; }
  if (!amount) { showToast('Amount required', 'error'); return; }

  // Guardar cardId anterior para recalcular si cambió
  const oldTx = (STATE.transactions || []).find(t => t.id === id);
  const oldCardId = oldTx?.cardId || null;

  const finalAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

  const { error } = await supabase
    .from('transactions')
    .update({
      description: desc,
      amount: finalAmount,
      type,
      category: cat,
      date,
      card_id: cardId || null
    })
    .eq('id', id);

  if (error) { showToast('Error updating: ' + error.message, 'error'); return; }

  // Actualizar STATE
  const idx = (STATE.transactions || []).findIndex(t => t.id === id);
  if (idx !== -1) {
    STATE.transactions[idx] = {
      ...STATE.transactions[idx],
      description: desc,
      amount: finalAmount,
      type,
      category: cat,
      date,
      cardId: cardId || null
    };
  }

  document.getElementById('edit-tx-modal')?.remove();
  renderTransactions();
  renderDashboard();

  // Recalcular balance de tarjeta anterior y nueva
  if (oldCardId) await recalcCardBalance(oldCardId);
  if (cardId && cardId !== oldCardId) await recalcCardBalance(cardId);

  showToast('Transaction updated ✅');
}

'''

target = 'async function deleteTransaction(id) {'
if target in content:
    content = content.replace(target, edit_functions + target)
    print("✅ openEditTransaction y saveEditTransaction agregados")
else:
    print("❌ No encontrado deleteTransaction")

with open(path, 'w') as f:
    f.write(content)
print("✅ Guardado")
