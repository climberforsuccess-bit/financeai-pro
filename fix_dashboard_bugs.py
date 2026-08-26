path = '/Users/orledisoliveros/Desktop/FinanceAI/app.js'

with open(path, 'r') as f:
    content = f.read()

# Fix 1: Total Debt no debe incluir card balance
old_debt = '''  const totalDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.amount) || 0), 0)
                  + (STATE.cards || []).reduce((s, c) => s + (parseFloat(c.balance) || 0), 0);'''
new_debt = '''  const totalDebt = (STATE.debts || []).reduce((s, d) => s + (parseFloat(d.amount) || 0), 0);'''

if old_debt in content:
    content = content.replace(old_debt, new_debt)
    print("✅ Fix 1: card balance removido de totalDebt")
else:
    print("❌ Fix 1: no encontrado")

# Fix 2: doble signo en tabla transacciones
old_sign = '''          const sign     = isIncome ? '+' : '-';
          const color    = isIncome ? '#22c55e' : '#ef4444';'''
new_sign = '''          const sign     = isIncome ? '+' : '';
          const color    = isIncome ? '#22c55e' : '#ef4444';'''

if old_sign in content:
    content = content.replace(old_sign, new_sign)
    print("✅ Fix 2: signo negativo removido (formatCurrency ya lo incluye)")
else:
    print("❌ Fix 2: no encontrado")

# Fix 3: asegurar que amount se muestre siempre con abs en la tabla
old_td = '''              <td style="color:${color};font-weight:700;">${sign}${formatCurrency(Math.abs(tx.amount))}</td>'''
new_td = '''              <td style="color:${color};font-weight:700;">${sign}${formatCurrency(Math.abs(parseFloat(tx.amount) || 0))}</td>'''

if old_td in content:
    content = content.replace(old_td, new_td)
    print("✅ Fix 3: parseFloat en amount de tabla")
else:
    print("❌ Fix 3: no encontrado")

# Fix 4: $340 hardcodeado en debt change - buscar
import re
# Buscar el texto "340 this month" hardcodeado
matches = [(m.start(), m.group()) for m in re.finditer(r'340', content)]
for pos, match in matches:
    line = content[:pos].count('\n') + 1
    print(f"   Encontrado '340' en línea {line}")

with open(path, 'w') as f:
    f.write(content)
print("✅ Guardado")
