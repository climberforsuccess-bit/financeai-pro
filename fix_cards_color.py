import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# FIX 1: Agregar selector de color en el modal de nueva tarjeta
# ============================================================
old_buttons = '''      <div style="display:flex;gap:12px;">
        <button onclick="document.getElementById('add-card-modal').remove()" style="flex:1;padding:12px;background:transparent;border:1px solid #444;border-radius:8px;color:#94a3b8;cursor:pointer;">Cancelar</button>
        <button onclick="saveNewCard()" style="flex:1;padding:12px;background:linear-gradient(135deg,#00EEFF,#0066FF);border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">Guardar</button>
      </div>'''

new_buttons = '''      <label style="color:#94a3b8;font-size:13px;">Color de tarjeta</label>
      <div id="nc-colors" style="display:flex;gap:10px;margin:6px 0 24px;flex-wrap:wrap;">
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#00EEFF44)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#00EEFF44);outline:2px solid #fff;"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#2d1b69,#11998e)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#2d1b69,#11998e);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a2e,#e94560)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a2e,#e94560);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#0d1b2a,#1b4332)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#0d1b2a,#1b4332);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#f59e0b44)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#f59e0b44);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#a855f744)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#a855f744);"></div>
      </div>
      <div style="display:flex;gap:12px;">
        <button onclick="document.getElementById('add-card-modal').remove()" style="flex:1;padding:12px;background:transparent;border:1px solid #444;border-radius:8px;color:#94a3b8;cursor:pointer;">Cancelar</button>
        <button onclick="saveNewCard()" style="flex:1;padding:12px;background:linear-gradient(135deg,#00EEFF,#0066FF);border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">Guardar</button>
      </div>'''

# ============================================================
# FIX 2: Leer color en saveNewCard
# ============================================================
old_save_start = '''  const name     = document.getElementById('nc-name').value.trim();
  const type     = document.getElementById('nc-type').value;
  const lastFour = document.getElementById('nc-last4').value.trim();
  const limit    = parseFloat(document.getElementById('nc-limit').value) || 0;
  const balance  = parseFloat(document.getElementById('nc-balance').value) || 0;
  const apr      = parseFloat(document.getElementById('nc-apr').value) || 0;
  const dueDate  = document.getElementById('nc-due').value.trim();'''

new_save_start = '''  const name     = document.getElementById('nc-name').value.trim();
  const type     = document.getElementById('nc-type').value;
  const lastFour = document.getElementById('nc-last4').value.trim();
  const limit    = parseFloat(document.getElementById('nc-limit').value) || 0;
  const balance  = parseFloat(document.getElementById('nc-balance').value) || 0;
  const apr      = parseFloat(document.getElementById('nc-apr').value) || 0;
  const dueDate  = document.getElementById('nc-due').value.trim();
  const colorEl  = document.querySelector('#nc-colors [data-gradient][style*="2px solid #fff"]');
  const color    = colorEl ? colorEl.dataset.gradient : 'linear-gradient(135deg,#1a1a3e,#00EEFF44)';'''

# ============================================================
# FIX 3: Guardar color en Supabase insert
# ============================================================
old_insert = '''    user_id:      session.user.id,
    name:         name,
    card_type:    type,
    last_four:    lastFour,
    limit_amount: limit,
    balance:      balance,
    apr:          apr,
    due_date:     dueDate'''

new_insert = '''    user_id:      session.user.id,
    name:         name,
    card_type:    type,
    last_four:    lastFour,
    limit_amount: limit,
    balance:      balance,
    apr:          apr,
    due_date:     dueDate,
    color:        color'''

# ============================================================
# FIX 4: Guardar color en STATE.cards.push
# ============================================================
old_push = '''  STATE.cards.push({
    id:        data.id,
    name:      data.name,
    type:      data.card_type,
    limit:     data.limit_amount,
    balance:   data.balance,
    lastFour:  data.last_four,
    dueDate:   data.due_date,
    apr:       data.apr || 0,
    createdAt: data.created_at
  });'''

new_push = '''  STATE.cards.push({
    id:        data.id,
    name:      data.name,
    type:      data.card_type,
    limit:     data.limit_amount,
    balance:   data.balance,
    lastFour:  data.last_four,
    dueDate:   data.due_date,
    apr:       data.apr || 0,
    color:     data.color || null,
    createdAt: data.created_at
  });'''

# ============================================================
# FIX 5: Agregar función selectCardColor y renderTransactions
# ============================================================
helper_functions = '''
function selectCardColor(el) {
  el.closest('#nc-colors').querySelectorAll('div').forEach(d => d.style.outline = 'none');
  el.style.outline = '2px solid #fff';
}

function renderTransactions() {
  const txs = STATE.transactions || [];
  const section = document.getElementById('section-transactions');
  if (!section) return;

  let container = document.getElementById('transactions-list');
  if (!container) {
    const card = section.querySelector('.content-grid .card') || section.querySelector('.card');
    if (!card) return;
    container = document.createElement('div');
    container.id = 'transactions-list';
    card.appendChild(container);
  }

  if (txs.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px;color:#8892A4;">
        <div style="font-size:3rem;margin-bottom:12px;opacity:0.4;">💸</div>
        No tienes transacciones registradas.
      </div>`;
    return;
  }

  container.innerHTML = txs.map(t => {
    const isIncome = t.type === 'income';
    const sign = isIncome ? '+' : '-';
    const color = isIncome ? '#22c55e' : '#ef4444';
    const icon = isIncome ? '📈' : '📉';
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;
                  padding:14px 16px;border-bottom:1px solid #ffffff0d;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.4rem;">${icon}</span>
          <div>
            <div style="color:#fff;font-size:14px;font-weight:500;">${t.description || 'Sin descripción'}</div>
            <div style="color:#8892A4;font-size:12px;">${t.category || ''} · ${t.date || ''}</div>
          </div>
        </div>
        <div style="color:${color};font-weight:700;font-size:15px;">
          ${sign}${formatCurrency(Math.abs(t.amount))}
        </div>
      </div>`;
  }).join('');
}
'''

# Insertar helpers antes de renderDashboard
insert_before = 'function renderDashboard() {'

# ============================================================
# Aplicar todos los cambios
# ============================================================
changes = [
    (old_buttons,     new_buttons,     'FIX 1: Color selector en modal'),
    (old_save_start,  new_save_start,  'FIX 2: Leer color en saveNewCard'),
    (old_insert,      new_insert,      'FIX 3: Color en Supabase insert'),
    (old_push,        new_push,        'FIX 4: Color en STATE.cards.push'),
]

for old, new, label in changes:
    if old in content:
        content = content.replace(old, new, 1)
        print(f'✅ {label}')
    else:
        print(f'❌ NO encontrado: {label}')

# Insertar funciones helper
if insert_before in content:
    content = content.replace(insert_before, helper_functions + insert_before, 1)
    print('✅ FIX 5: Funciones helper agregadas')
else:
    print('❌ NO encontrado: punto de inserción para helpers')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n✅ app.js actualizado correctamente')
