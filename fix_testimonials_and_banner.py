with open("index.html", "r") as f:
    html = f.read()

# ============================================
# 1) FIX TESTIMONIALS - Credible for early adopters
# ============================================
old_t1 = '"Recupere mas de $180 el primer mes detectando suscripciones olvidadas. No puedo creer que antes no sabia en que gastaba mi dinero."'
new_t1 = '"En la primera semana ya tenia claro en que estaba gastando mi dinero. Nunca habia visto mis finanzas tan organizadas."'

old_t2 = '"La IA me ayudo a crear un plan para salir de mis deudas en 8 meses. Llevo 3 meses y voy adelantado."'
new_t2 = '"Llevo dos semanas usando FinanceAI y por fin entiendo mis gastos. La IA explica todo de forma muy clara."'

count1 = html.count(old_t1)
count2 = html.count(old_t2)

html = html.replace(old_t1, new_t1)
html = html.replace(old_t2, new_t2)

print(f"✅ Testimonial 1 fixed: {count1}x")
print(f"✅ Testimonial 2 fixed: {count2}x")

# ============================================
# 2) FIX COUNTDOWN BANNER POSITION
# Move banner to be visible - before navbar not inside content
# Also fix z-index and make it more visible
# ============================================
old_banner_style = 'background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 14px 20px; text-align: center; position: sticky; top: 0; z-index: 999;'
new_banner_style = 'background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 12px 20px; text-align: center; position: fixed; top: 0; left: 0; right: 0; z-index: 99999; box-shadow: 0 2px 10px rgba(0,0,0,0.3);'

html = html.replace(old_banner_style, new_banner_style)
print("✅ Banner style fixed - now fixed position top")

# ============================================
# 3) ADD MARGIN TO BODY so banner doesn't overlap content
# ============================================
old_body = '<body>'
new_body = '<body style="padding-top: 52px;">'

if old_body in html and 'padding-top: 52px' not in html:
    html = html.replace(old_body, new_body, 1)
    print("✅ Body padding added for banner")
else:
    print("⚠️  Body padding already exists or <body> not found")

# ============================================
# 4) FIX STRIKETHROUGH PRICES - they show wrong numbers
# Personal: $14.99 should be $9.99
# Pro: $27.99 should be $19.99  
# Business: $69.99 should be $49.99
# ============================================
price_fixes = [
    ('$14.99', '$9.99'),
    ('$27.99', '$19.99'),
    ('$69.99', '$49.99'),
    ('14.99',  '9.99'),
    ('27.99',  '19.99'),
    ('69.99',  '49.99'),
]

for old, new in price_fixes:
    count = html.count(old)
    if count > 0:
        html = html.replace(old, new)
        print(f"✅ Price fixed {count}x: {old} → {new}")
    else:
        print(f"⚠️  Not found: {old}")

with open("index.html", "w") as f:
    f.write(html)

print("\n✅ index.html saved")
print("🎉 All fixes applied!")
