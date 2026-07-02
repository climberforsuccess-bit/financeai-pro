# ============================================
# Fix all hardcoded prices in app.js
# to use FOUNDER_PRICES
# ============================================

with open("app.js", "r") as f:
    js = f.read()

# ============================================
# REPLACEMENTS — Old prices → Founder prices
# ============================================

replacements = [
    # Monthly prices (strings with $)
    ("'$9.99'",   "'$7.99'"),
    ('"$9.99"',   '"$7.99"'),
    ("'$19.99'",  "'$15.99'"),
    ('"$19.99"',  '"$15.99"'),
    ("'$49.99'",  "'$39.99'"),
    ('"$49.99"',  '"$39.99"'),

    # Annual prices (strings with $)
    ("'$7.99'",   "'$5.99'"),
    ('"$7.99"',   '"$5.99"'),
    ("'$15.99'",  "'$11.99'"),
    ('"$15.99"',  '"$11.99"'),
    ("'$39.99'",  "'$29.99'"),
    ('"$39.99"',  '"$29.99"'),

    # Monthly prices (numbers)
    ("personal: 9.99",  "personal: 7.99"),
    ("pro:      19.99", "pro:      15.99"),
    ("business: 49.99", "business: 39.99"),

    # Annual prices (numbers)
    ("personal: 7.99",  "personal: 5.99"),
    ("pro:      15.99", "pro:      11.99"),
    ("business: 39.99", "business: 29.99"),

    # Inline HTML prices
    ("$9.99<span",  "$7.99<span"),
    ("desde $9.99/mes", "desde $7.99/mes"),

    # lp prices in pricingData
    ("lp: '$9.99'",   "lp: '$7.99'"),
    ("lpr: '$19.99'", "lpr: '$15.99'"),
    ("lpb: '$49.99'", "lpb: '$39.99'"),
    ("lp: '$7.99'",   "lp: '$5.99'"),
    ("lpr: '$15.99'", "lpr: '$11.99'"),
    ("lpb: '$39.99'", "lpb: '$29.99'"),
]

changes = 0
for old, new in replacements:
    count = js.count(old)
    if count > 0:
        js = js.replace(old, new)
        print(f"✅ Replaced {count}x: {old} → {new}")
        changes += count
    else:
        print(f"⚠️  Not found: {old}")

print(f"\n📊 Total changes: {changes}")

with open("app.js", "w") as f:
    f.write(js)

print("✅ app.js saved")

# ============================================
# Now fix index.html prices too
# ============================================
with open("index.html", "r") as f:
    html = f.read()

html_replacements = [
    ("$9.99/mes",  "$7.99/mes"),
    ("$19.99/mes", "$15.99/mes"),
    ("$49.99/mes", "$39.99/mes"),
    ("$7.99/mes",  "$5.99/mes"),
    ("$15.99/mes", "$11.99/mes"),
    ("$39.99/mes", "$29.99/mes"),
    # Original prices shown as strikethrough
    ("$9.99/mo",   "$9.99/mo"),   # keep originals as-is for strikethrough
]

html_changes = 0
for old, new in html_replacements:
    count = html.count(old)
    if count > 0:
        html = html.replace(old, new)
        print(f"✅ HTML Replaced {count}x: {old} → {new}")
        html_changes += count

print(f"\n📊 Total HTML changes: {html_changes}")

with open("index.html", "w") as f:
    f.write(html)

print("✅ index.html saved")
print("\n🎉 All founder prices updated!")
