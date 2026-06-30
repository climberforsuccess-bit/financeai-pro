with open('app.js', 'r') as f:
    content = f.read()

# Find the end of renderReports function and add the call
old = """function renderMonthlyReport() {"""

new = """function renderMonthlyReport() {"""

# Find renderReports closing and add call before renderMonthlyReport definition
# Better approach: find the line just before function renderMonthlyReport
old2 = "\nfunction renderMonthlyReport() {"
new2 = "\n\nfunction renderMonthlyReport() {"

# Actually let's add renderMonthlyReport() call at end of renderReports
# Find the closing brace of renderReports
old3 = """  el('report-total-txs',     `${txs.length}`);"""
new3 = """  el('report-total-txs',     `${txs.length}`);

  // Render monthly summary
  renderMonthlyReport();"""

if old3 in content:
    content = content.replace(old3, new3)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Added renderMonthlyReport() inside renderReports()")
else:
    print("❌ Pattern not found")
