import re

with open('app.js', 'r') as f:
    content = f.read()

# Fix pattern: document.getElementById('id').textContent = value;
# Replace with: const _el = document.getElementById('id'); if(_el) _el.textContent = value;
def fix_direct_access(match):
    id_name = match.group(1)
    prop = match.group(2)
    value = match.group(3)
    var_name = f"_el_{id_name}"
    return f"const {var_name} = document.getElementById('{id_name}'); if({var_name}) {var_name}.{prop} = {value}"

# Only fix lines that directly chain .property = value (not already in if blocks)
pattern = r"document\.getElementById\('([^']+)'\)\.(\w+)\s*=\s*([^;]+)"

lines = content.split('\n')
new_lines = []
for line in lines:
    stripped = line.lstrip()
    # Skip lines already protected
    if stripped.startswith('if(') or 'if(' in line and 'getElementById' not in line.split('if(')[0]:
        new_lines.append(line)
        continue
    # Fix direct assignments
    if re.search(r"document\.getElementById\('[^']+'\)\.\w+\s*=", line) and not line.strip().startswith('//'):
        indent = len(line) - len(line.lstrip())
        spaces = ' ' * indent
        new_line = re.sub(
            r"document\.getElementById\('([^']+)'\)\.(\w+)\s*=\s*(.+)$",
            lambda m: f"const _e_{m.group(1)} = document.getElementById('{m.group(1)}'); if(_e_{m.group(1)}) _e_{m.group(1)}.{m.group(2)} = {m.group(3)}",
            line.strip()
        )
        new_lines.append(spaces + new_line)
    else:
        new_lines.append(line)

with open('app.js', 'w') as f:
    f.write('\n'.join(new_lines))

print("Done! All direct getElementById assignments now have null checks.")
