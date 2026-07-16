import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = """  if (!STATE.cards || STATE.cards.length === 0) await loadCards();
  if (!STATE.debts || STATE.debts.length === 0) await loadDebts();
  const cardDebt = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);"""

new = """  await loadCards();
  await loadDebts();
  const cardDebt = (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);
  console.log('DEBUG cardDebt:', cardDebt, 'cards count:', STATE.cards?.length);"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Reemplazado correctamente")
else:
    print("❌ Texto no encontrado — verifica espacios/tabs")
