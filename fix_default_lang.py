with open('lang.js', 'r') as f:
    content = f.read()

old = "let currentLang = localStorage.getItem('financeai_lang') || 'es';"
new = "let currentLang = localStorage.getItem('financeai_lang') || 'en';"

if old in content:
    content = content.replace(old, new)
    with open('lang.js', 'w') as f:
        f.write(content)
    print("✅ Default language changed to 'en'")
else:
    print("❌ Line not found")
