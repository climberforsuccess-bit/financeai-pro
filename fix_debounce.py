with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = 'function renderDashboard() {'
new = 'let _rdTimer = null;\nfunction renderDashboard() {\n  clearTimeout(_rdTimer);\n  _rdTimer = setTimeout(() => _renderDashboardCore(), 80);\n}\nfunction _renderDashboardCore() {'

if old in content:
    content = content.replace(old, new, 1)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Done")
else:
    print("❌ No encontrado")
