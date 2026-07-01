with open('lang.js', 'r') as f:
    content = f.read()

# 1) Add missing English keys before the closing of en: block
old_en_end = """    tx_label_date:           'Date',
  },"""

new_en_end = """    tx_label_date:           'Date',
    nav_terms:               'Terms of Service',
    nav_privacy:             'Privacy Policy',
    nav_cookies:             '🍪 Cookies',
    btn_close:               '✖ Close',
    debt_method_avalanche_desc: '📊 Pay highest interest rate first — saves the most money overall',
    debt_method_snowball_desc:  '⛄ Pay smallest balance first — builds momentum and motivation',
  },"""

if old_en_end in content:
    content = content.replace(old_en_end, new_en_end)
    print("✅ Added missing English keys")
else:
    print("❌ English end pattern not found")

# 2) Add Spanish equivalents for debt descriptions (near existing Spanish debt keys)
old_es_debt = """    method_avalanche:     '❄️ Método Avalanche',
    method_snowball:      '⛄ Método Snowball',"""

new_es_debt = """    method_avalanche:     '❄️ Método Avalanche',
    method_snowball:      '⛄ Método Snowball',
    debt_method_avalanche_desc: '📊 Paga primero la deuda con mayor interés — ahorras más dinero en total',
    debt_method_snowball_desc:  '⛄ Paga primero la deuda más pequeña — genera impulso y motivación',"""

if old_es_debt in content:
    content = content.replace(old_es_debt, new_es_debt)
    print("✅ Added Spanish debt descriptions")
else:
    print("❌ Spanish debt pattern not found")

with open('lang.js', 'w') as f:
    f.write(content)
