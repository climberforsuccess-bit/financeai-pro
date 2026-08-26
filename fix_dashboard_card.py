path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

old = '<div style="font-weight:600;color:#E8EBF0;">${tx.description || tx.category || \'—\'}</div>'

new = '<div style="font-weight:600;color:#E8EBF0;">${tx.description || tx.category || \'—\'} ${(() => { const card = (STATE.cards || []).find(c => c.id === tx.cardId); return card ? `<span style="font-size:11px;background:#ffffff15;padding:2px 6px;border-radius:4px;color:#8892A4;">💳 ····${card.lastFour || \'\'}</span>` : \'\'; })()}</div>'

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print("✅ Fix aplicado")
else:
    print("❌ No encontrado — busca manualmente")
