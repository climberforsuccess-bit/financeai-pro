with open('app.js', 'r') as f:
    content = f.read()

old = """    try {
      cards = JSON.parse(jsonStr);
    } catch(parseErr) {
      // Last resort: strip all non-ASCII and retry
      const ascii = jsonStr.replace(/[^\\x20-\\x7E,\\[\\]{}":]/g, '');
      cards = JSON.parse(ascii);
    }"""

new = """    try {
      cards = JSON.parse(jsonStr);
    } catch(parseErr) {
      try {
        // Last resort: strip all non-ASCII and retry
        const ascii = jsonStr.replace(/[^\\x20-\\x7E,\\[\\]{}":]/g, '');
        cards = JSON.parse(ascii);
      } catch(e2) {
        console.warn('loadCardRecommendations: JSON inválido, skipping', e2);
        return;
      }
    }"""

if old in content:
    content = content.replace(old, new)
    with open('app.js', 'w') as f:
        f.write(content)
    print("✅ Fix aplicado")
else:
    print("❌ No encontrado")
