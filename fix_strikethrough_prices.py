with open("index.html", "r") as f:
    html = f.read()

# ============================================
# Fix strikethrough/original prices
# These should show the ORIGINAL price (before founder discount)
# Monthly: Personal $9.99, Pro $19.99, Business $49.99
# Annual:  Personal $7.99, Pro $15.99, Business $39.99
# ============================================

replacements = [
    # Fix wrong strikethrough prices
    ("Precio normal $5.99/mes",   "Precio normal $9.99/mes"),
    ("Valor real $29.99/mes",     "Valor real $19.99/mes"),
    ("Precio normal $29.99/mes",  "Precio normal $49.99/mes"),

    # Fix wrong $27.99 strikethrough
    ('"font-size:14px; color:#64748b; text-decoration:line-through;">$27.99</div>',
     '"font-size:14px; color:#64748b; text-decoration:line-through;">$15.99/mes</div>'),

    # Fix landing prices - these should show FOUNDER prices not original
    # Personal landing should be $7.99 monthly / $5.99 annual
    # They look correct already, just fix the strikethrough text

    # Fix option values in dropdowns
    ('Personal — $5.99/mes',  'Personal — $7.99/mes'),
    ('Pro — $11.99/mes',      'Pro — $15.99/mes'),
    ('Business — $29.99/mes', 'Business — $39.99/mes'),
]

changes = 0
for old, new in replacements:
    count = html.count(old)
    if count > 0:
        html = html.replace(old, new)
        print(f"✅ Fixed {count}x: {old[:50]} → {new[:50]}")
        changes += count
    else:
        print(f"⚠️  Not found: {old[:60]}")

print(f"\n📊 Total fixes: {changes}")

with open("index.html", "w") as f:
    f.write(html)

print("✅ index.html saved")
