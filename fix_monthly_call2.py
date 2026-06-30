with open('app.js', 'r') as f:
    content = f.read()

# Remove the standalone call
old = "\nrenderMonthlyReport();\n"
new = "\n"

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Removed standalone renderMonthlyReport() call")
else:
    print("❌ Pattern not found")
