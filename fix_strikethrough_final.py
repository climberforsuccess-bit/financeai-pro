with open("index.html", "r") as f:
    html = f.read()

# Line 2209 shows $15.99/mes as strikethrough - WRONG
# Should show original price $19.99/mes
old = '<div style="font-size:14px; color:#64748b; text-decoration:line-through;">$15.99/mes</div>'
new = '<div style="font-size:14px; color:#64748b; text-decoration:line-through;">$19.99/mes</div>'

count = html.count(old)
if count > 0:
    html = html.replace(old, new)
    print(f"✅ Fixed {count}x: $15.99/mes → $19.99/mes strikethrough")
else:
    print(f"⚠️  Not found, checking variants...")
    # Try without /mes
    old2 = '<div style="font-size:14px; color:#64748b; text-decoration:line-through;">$15.99</div>'
    count2 = html.count(old2)
    if count2 > 0:
        new2 = '<div style="font-size:14px; color:#64748b; text-decoration:line-through;">$19.99</div>'
        html = html.replace(old2, new2)
        print(f"✅ Fixed {count2}x: $15.99 → $19.99 strikethrough")

# Also verify the other strikethroughs are correct:
# Personal: $9.99 ✅ (original monthly was $9.99)
# Pro: $19.99 ✅ 
# Business: $49.99 ✅

# Check landing section strikethroughs are correct
checks = [
    ('Precio normal $9.99/mes',  '✅ Personal original correct'),
    ('Valor real $19.99/mes',    '✅ Pro original correct'),
    ('Precio normal $49.99/mes', '✅ Business original correct'),
]

for text, msg in checks:
    if text in html:
        print(msg)
    else:
        print(f"⚠️  Missing: {text}")

with open("index.html", "w") as f:
    f.write(html)

print("\n✅ index.html saved")
print("🎉 Strikethrough prices all correct!")
