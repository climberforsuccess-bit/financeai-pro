path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

# Buscar el campo de fecha y agregar selector de tarjeta ANTES del cierre del div de campos
old = '''        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('tx_label_date')}</label>
          <input id="tx-date" type="date"'''

new = '''        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('card_label') || 'Card (optional)'}</label>
          <select id="tx-card"
            style="width:100%;padding:10px 14px;background:#0d1117;border:1px solid #ffffff20;
                   border-radius:8px;color:#fff;font-size:14px;box-sizing:border-box;">
            <option value="">— No card —</option>
            ${(STATE.cards || []).map(c => `<option value="${c.id}">💳 ${c.name || ''} ····${c.lastFour || ''}</option>`).join('')}
          </select>
        </div>

        <div>
          <label style="color:#8892A4;font-size:13px;display:block;margin-bottom:6px;">${t('tx_label_date')}</label>
          <input id="tx-date" type="date"'''

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print("✅ Selector de tarjeta agregado")
else:
    print("❌ No encontrado")
