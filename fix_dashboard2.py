with open('app.js', 'r') as f:
    content = f.read()

old = """function renderDashboard() {
  clearTimeout(_rdTimer);
  _rdTimer = setTimeout(async () => {
    await Promise.all([loadCards(), loadDebts()]);
    _renderDashboardCore();
  }, 80);
}"""

new = """function renderDashboard() {
  clearTimeout(_rdTimer);
  _rdTimer = setTimeout(async () => {
    await Promise.all([loadCards(), loadDebts()]);
    await _renderDashboardCore();
  }, 0);
}"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fix aplicado correctamente")
else:
    print("❌ No se encontró el texto")
