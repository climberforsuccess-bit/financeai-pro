with open('app.js', 'r') as f:
    content = f.read()

# Fix renderRecentTransactions - add null check for container
old = """function renderRecentTransactions() {
  const container = document.getElementById('recentTransactions');
  container.innerHTML = '';"""

new = """function renderRecentTransactions() {
  const container = document.getElementById('recentTransactions');
  if (!container) return;
  container.innerHTML = '';"""

if old in content:
    content = content.replace(old, new)
    print("✅ Fixed renderRecentTransactions!")
else:
    print("❌ Pattern not found - trying alternate...")
    # Try with different spacing
    import re
    content = re.sub(
        r"(function renderRecentTransactions\(\)\s*\{[^}]*?getElementById\('recentTransactions'\);)\s*\n(\s*container\.innerHTML)",
        r"\1\n  if (!container) return;\n\2",
        content
    )
    print("✅ Fixed with regex!")

with open('app.js', 'w') as f:
    f.write(content)
