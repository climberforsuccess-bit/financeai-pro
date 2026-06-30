with open('app.js', 'r') as f:
    content = f.read()

# Find renderReports function and check if renderMonthlyReport is called inside it
old = """function renderReports() {"""

# Check what's at line 2466 context
import re
lines = content.split('\n')
for i, line in enumerate(lines):
    if 'renderMonthlyReport()' in line and i < 2500:
        print(f"Line {i+1}: {line}")
