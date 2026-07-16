with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = ".filter(c => (c.type === 'Crédito' || c.type === 'credit') && parseFloat(c.balance) > 0)"
new = ".filter(c => parseFloat(c.balance) > 0)"

if old in content:
    content = content.replace(old, new, 1)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Done")
else:
    print("❌ No encontrado — buscando...")
    idx = content.find('cardDebt = (STATE.cards')
    print(repr(content[idx:idx+150]))
