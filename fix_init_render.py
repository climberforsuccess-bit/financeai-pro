with open('app.js', 'r') as f:
    content = f.read()

old = """        showPage('app');
        renderDashboard();
        showSection('dashboard');"""

new = """        showPage('app');
        showSection('dashboard');"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fix aplicado")
else:
    print("❌ No encontrado - busca manualmente")
