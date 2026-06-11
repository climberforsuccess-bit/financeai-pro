import re

with open('app.js', 'r') as f:
    content = f.read()

# Find all render functions and add null guard after getElementById
pattern = r'(function \w+\([^)]*\)\s*\{[^{]*?)(const container = document\.getElementById\([^)]+\);)(\s*\n)'

def add_null_check(m):
    before = m.group(1)
    getelem = m.group(2)
    after = m.group(3)
    return f"{before}{getelem}{after}  if (!container) return;\n"

new_content = re.sub(pattern, add_null_check, content)

# Count fixes
fixes = new_content.count('if (!container) return;')
print(f"Total null guards for container: {fixes}")

with open('app.js', 'w') as f:
    f.write(new_content)
print("Done!")
