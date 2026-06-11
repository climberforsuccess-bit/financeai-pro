with open('app.js', 'r') as f:
    lines = f.readlines()

seen_vars = set()
new_lines = []

for line in lines:
    stripped = line.strip()
    if stripped.startswith('const _e_'):
        var_name = stripped.split('=')[0].strip()
        if var_name in seen_vars:
            # Skip duplicate declaration, just keep the if() check
            rest = '='.join(stripped.split('=')[1:]).strip()
            indent = len(line) - len(line.lstrip())
            # Extract just the if() part
            if 'if(' in stripped:
                if_part = stripped[stripped.index('if('):]
                new_lines.append(' ' * indent + if_part + '\n')
            continue
        else:
            seen_vars.add(var_name)
    new_lines.append(line)

with open('app.js', 'w') as f:
    f.writelines(new_lines)

print(f"Done! Removed duplicate const declarations.")
