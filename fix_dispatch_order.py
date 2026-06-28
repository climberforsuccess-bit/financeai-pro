with open('lang.js', 'r') as f:
    content = f.read()

old = """  // 5. Lang button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclick.includes(`'${lang}'`));
  });

  // 6. Dispatch event for app.js dynamic content
  window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}"""

new = """  // 5. Lang button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclick.includes(`'${lang}'`));
  });

  // 6. Dispatch event for app.js dynamic content
  // Fire FIRST so renders happen, then re-translate below
  window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));

  // 7. Re-apply data-i18n AFTER dynamic renders
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.innerHTML = t(key);
  });
}"""

if old in content:
    content = content.replace(old, new)
    with open('lang.js', 'w') as f:
        f.write(content)
    print("✅ Fix applied - translations now run AFTER dynamic renders")
else:
    print("❌ Block not found")
