with open('app.js', 'r') as f:
    content = f.read()

# Fix 1: date parsing UTC issue
old1 = "    const d = new Date(tx.date);"
new1 = "    const parts = tx.date.substring(0,10).split('-');\n    const d = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));"

# Fix 2: worst_month_badge translation key
old2 = "${t('worst_month_badge')}"
new2 = "⚠️ Worst Month"

# Fix 3: optimize_cta translation key
old3 = "${t('optimize_cta')}"
new3 = "💡 Optimize"

if old1 in content:
    content = content.replace(old1, new1)
    print("✅ Fixed date parsing")
else:
    print("❌ date pattern not found")

if old2 in content:
    content = content.replace(old2, new2)
    print("✅ Fixed worst_month_badge")
else:
    print("❌ worst_month_badge not found")

if old3 in content:
    content = content.replace(old3, new3)
    print("✅ Fixed optimize_cta")
else:
    print("❌ optimize_cta not found")

with open('app.js', 'w') as f:
    f.write(content)
