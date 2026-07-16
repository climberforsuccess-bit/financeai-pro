with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = """async function _renderDashboardCore() {
  await loadDebts();
  await loadCards();
  updateAiMessagesLeft();"""

new = """async function _renderDashboardCore() {
  updateAiMessagesLeft();"""

if old in content:
    content = content.replace(old, new, 1)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Done")
else:
    print("❌ No encontrado")
