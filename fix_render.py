with open('app.js', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    line_num = i + 1
    if 260 <= line_num <= 285:
        print(f"{line_num}: {line}", end='')
