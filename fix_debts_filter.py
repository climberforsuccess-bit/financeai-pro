with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

changes = [
    (
        ".filter(c => c.type === 'credit' && c.balance > 0)",
        ".filter(c => (c.type === 'Crédito' || c.type === 'credit') && c.balance > 0)",
        "FIX 1: Filtro de deudas corregido"
    ),
    (
        '''        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#a855f744)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#a855f744);"></div>''',
        '''        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a3e,#a855f744)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a3e,#a855f744);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#1a1a1a,#2d2d2d)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#1a1a1a,#2d2d2d);"></div>
        <div onclick="selectCardColor(this)" data-gradient="linear-gradient(135deg,#e8e8e8,#ffffff)" style="width:40px;height:28px;border-radius:6px;cursor:pointer;background:linear-gradient(135deg,#e8e8e8,#ffffff);"></div>''',
        "FIX 2: Colores negro y blanco agregados"
    ),
    (
        "    const { error } = await supabase\n      .from('cards')\n      .update({\n        name,\n        card_type:    type,\n        limit_amount: limit,\n        balance,\n        last_four:    lastFour,\n        apr,\n        due_date:     dueDate\n      })\n      .eq('id', id);\n\n    if (error) throw error;\n\n    const idx = STATE.cards.findIndex(c => c.id === id);\n    if (idx !== -1) {\n      STATE.cards[idx] = { ...STATE.cards[idx], name, type, limit, balance, lastFour, apr, dueDate };\n    }",
        "    const { error } = await supabase\n      .from('cards')\n      .update({\n        name,\n        card_type:    type,\n        limit_amount: limit,\n        balance,\n        last_four:    lastFour,\n        apr,\n        due_date:     dueDate\n      })\n      .eq('id', id);\n\n    if (error) throw error;\n\n    const idx = STATE.cards.findIndex(c => c.id === id);\n    if (idx !== -1) {\n      const existingColor = STATE.cards[idx].color;\n      STATE.cards[idx] = { ...STATE.cards[idx], name, type, limit, balance, lastFour, apr, dueDate, color: existingColor };\n    }",
        "FIX 3: Color protegido al editar tarjeta"
    ),
]

for old, new, label in changes:
    if old in content:
        content = content.replace(old, new, 1)
        print(f'✅ {label}')
    else:
        print(f'❌ NO encontrado: {label}')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n✅ app.js actualizado')
