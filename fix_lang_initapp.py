with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = """        showPage('app');
        showSection('dashboard');
        updateUserDisplay();"""

new = """        showPage('app');
        showSection('dashboard');
        if (typeof applyLanguage === 'function') {
          const lang = localStorage.getItem('financeai_lang') || 'en';
          applyLanguage(lang);
        }
        updateUserDisplay();"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Fix aplicado correctamente en initApp()")
else:
    print("❌ No se encontró el bloque exacto")
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if "showPage('app')" in line:
            print(f"Línea {i+1}: '{line}'")
        if "showSection('dashboard')" in line:
            print(f"Línea {i+1}: '{line}'")
        if "updateUserDisplay" in line:
            print(f"Línea {i+1}: '{line}'")
