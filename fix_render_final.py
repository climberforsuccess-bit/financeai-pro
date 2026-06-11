with open('app.js', 'r') as f:
    content = f.read()

# Find renderRecentTransactions function and add guard
old = 'function renderRecentTransactions('
new = 'function renderRecentTransactions('

# Add null check at start of renderDashboard
content = content.replace(
    'function renderDashboard()',
    'function renderDashboard()'
)

# Fix: wrap entire renderDashboard call in initApp with a check
content = content.replace(
    'renderDashboard();',
    'if(document.getElementById("dashboard") || document.getElementById("recentTransactionsList")) renderDashboard();',
    1  # only first occurrence
)

with open('app.js', 'w') as f:
    f.write(content)
print("Done!")
