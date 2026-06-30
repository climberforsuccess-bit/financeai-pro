with open('app.js', 'r') as f:
    content = f.read()

# Only show worst month badge if there are 2+ months
old = """const worstKey  = Object.keys(byMonth).reduce((a,b) => byMonth[a].expense > byMonth[b].expense ? a : b, Object.keys(byMonth)[0]);"""
new = """const monthKeys = Object.keys(byMonth);
  const worstKey  = monthKeys.length > 1 ? monthKeys.reduce((a,b) => byMonth[a].expense > byMonth[b].expense ? a : b, monthKeys[0]) : null;"""

if old in content:
    content = content.replace(old, new)
    print("✅ Fixed worst month logic")
else:
    print("❌ Pattern not found")

# Fix isWorst check
old2 = """const isWorst  = key === worstKey;"""
new2 = """const isWorst  = worstKey && key === worstKey;"""

if old2 in content:
    content = content.replace(old2, new2)
    print("✅ Fixed isWorst check")
else:
    print("❌ isWorst pattern not found")

with open('app.js', 'w') as f:
    f.write(content)
