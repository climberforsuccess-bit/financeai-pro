with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

OLD = '''  if (sectionId === 'debts')         renderDebts();'''

NEW = '''  if (sectionId === 'debts')         loadCards().then(() => renderDebts());'''

if OLD in content:
    content = content.replace(OLD, NEW, 1)
    print('✅ showSection debts ahora recarga tarjetas antes de renderizar')
else:
    print('❌ No se encontró la línea')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
