with open('app.js', 'r') as f:
    content = f.read()

old = """    if (tx.amount > 0) byMonth[key].income  += tx.amount;
    else              byMonth[key].expense += Math.abs(tx.amount);"""

new = """    if (tx.type === 'income') byMonth[key].income  += Math.abs(tx.amount);
    else                      byMonth[key].expense += Math.abs(tx.amount);"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fixed: monthly report now uses tx.type")
else:
    print("❌ Pattern not found — paste exact lines")
