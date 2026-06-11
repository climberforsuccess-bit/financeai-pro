with open('app.js', 'r') as f:
    content = f.read()

# Fix renderRecentTransactions function - wrap innerHTML assignments
import re
# Fix any remaining direct .innerHTML = assignments
def fix_inner(m):
    eid = m.group(1)
    val = m.group(2)
    vname = '_rx_' + re.sub(r'[^a-zA-Z0-9]','_', eid)
    return f"const {vname} = document.getElementById('{eid}'); if({vname}) {vname}.innerHTML = {val}"

content = re.sub(
    r"document\.getElementById\('([^']+)'\)\.innerHTML\s*=\s*([^;]+)",
    fix_inner,
    content
)

with open('app.js', 'w') as f:
    f.write(content)
print("Done!")
