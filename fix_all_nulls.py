import re

with open('app.js', 'r') as f:
    content = f.read()

# Find all direct getElementById().property = patterns
# Pattern: document.getElementById('id').property = value
pattern = r"document\.getElementById\('([^']+)'\)\.(innerHTML|textContent|value|style|className|src|href)\s*="

lines = content.split('\n')
new_lines = []
counter = 0

for i, line in enumerate(lines):
    match = re.search(pattern, line)
    if match and 'if(' not in line and 'const _e' not in line and '//' not in line.lstrip()[:2]:
        elem_id = match.group(1)
        # Make safe variable name (replace hyphens and special chars)
        var_name = '_null_' + re.sub(r'[^a-zA-Z0-9]', '_', elem_id) + f'_{counter}'
        counter += 1
        indent = len(line) - len(line.lstrip())
        spaces = ' ' * indent
        # Replace the direct access with null-safe version
        new_line = re.sub(
            r"document\.getElementById\('" + re.escape(elem_id) + r"'\)\.",
            f"const {var_name} = document.getElementById('{elem_id}'); if({var_name}) {var_name}.",
            line.strip()
        )
        new_lines.append(spaces + new_line)
    else:
        new_lines.append(line)

with open('app.js', 'w') as f:
    f.write('\n'.join(new_lines))

print(f"Fixed {counter} direct getElementById accesses!")
