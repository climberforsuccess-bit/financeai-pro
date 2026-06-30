with open('app.js', 'r') as f:
    content = f.read()

old = """  const worstMonth = sorted.length > 1 ? sorted.reduce((a, b) =>
    byMonth[a].expense > byMonth[b].expense ? a : b
  );"""

new = """  const worstMonth = sorted.length > 1 ? sorted.reduce((a, b) =>
    byMonth[a].expense > byMonth[b].expense ? a : b
  ) : null;"""

if old in content:
    content = content.replace(old, new)
    print("✅ Fixed worstMonth null case")
else:
    print("❌ Pattern not found")

# Also fix isWorst to check null
old2 = """    const isWorst = key === worstMonth && data.expense > 0;"""
new2 = """    const isWorst = worstMonth && key === worstMonth && data.expense > 0;"""

if old2 in content:
    content = content.replace(old2, new2)
    print("✅ Fixed isWorst null check")
else:
    print("❌ isWorst pattern not found")

with open('app.js', 'w') as f:
    f.write(content)
