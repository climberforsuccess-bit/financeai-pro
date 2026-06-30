with open('app.js', 'r') as f:
    content = f.read()

# Only show worst month badge if there are 2+ months
old = """  const worstMonth = sorted.reduce((a, b) =>"""
new = """  const worstMonth = sorted.length > 1 ? sorted.reduce((a, b) =>"""

if old in content:
    content = content.replace(old, new)
    print("✅ Step 1 done")
else:
    print("❌ Step 1 not found")

with open('app.js', 'w') as f:
    f.write(content)
