with open('app.js', 'r') as f:
    content = f.read()

old_render_start = """function renderDebts() {
  const allCardDebts = (STATE.cards || [])"""

new_render_start = """function renderDebts() {
  // Restore active button based on current method
  const methodBtns = document.querySelectorAll('#section-debts .section-tab');
  methodBtns.forEach(b => {
    const isAvalanche = b.getAttribute('onclick')?.includes('avalanche');
    const isSnowball  = b.getAttribute('onclick')?.includes('snowball');
    if (isAvalanche && STATE.currentDebtMethod === 'avalanche') b.classList.add('active');
    else if (isSnowball && STATE.currentDebtMethod === 'snowball') b.classList.add('active');
    else b.classList.remove('active');
  });

  const allCardDebts = (STATE.cards || [])"""

if old_render_start in content:
    content = content.replace(old_render_start, new_render_start)
    print("✅ Added active button restore to renderDebts")
else:
    print("❌ renderDebts start pattern not found")

with open('app.js', 'w') as f:
    f.write(content)
