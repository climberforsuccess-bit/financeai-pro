with open('app.js', 'r') as f:
    content = f.read()

old_system = """{role:'system', content:'You are a credit card expert. Respond with valid JSON array only. No markdown. No explanations.'},"""

new_system = """{role:'system', content:'You are a credit card expert. Respond ONLY with a valid JSON array. No markdown, no code blocks, no apostrophes in text, no special characters. Use only plain ASCII text in all string values. No explanations outside JSON.'},"""

if old_system in content:
    content = content.replace(old_system, new_system)
    print("✅ System prompt updated")
else:
    print("❌ System prompt not found")

old_parse = """    const match = text.match(/\\[\\s\\S]*\\]/);
    if (!match) throw new Error('No JSON found');
    const cards = JSON.parse(match[0]);"""

new_parse = """    const match = text.match(/\\[\\s\\S]*\\]/);
    if (!match) throw new Error('No JSON found');
    // Clean common JSON-breaking characters
    let jsonStr = match[0]
      .replace(/[\\u2018\\u2019]/g, "'")   // smart single quotes
      .replace(/[\\u201C\\u201D]/g, '"')   // smart double quotes
      .replace(/\\n/g, ' ')               // newlines
      .replace(/,\\s*]/g, ']')            // trailing commas
      .replace(/,\\s*}/g, '}');           // trailing commas in objects
    const cards = JSON.parse(jsonStr);"""

if old_parse in content:
    content = content.replace(old_parse, new_parse)
    print("✅ JSON parse cleaned")
else:
    print("❌ Parse pattern not found — trying alternate...")
    # Try with escaped brackets
    old_parse2 = "    const match = text.match(/\\[[\\s\\S]*\\]/);\n    if (!match) throw new Error('No JSON found');\n    const cards = JSON.parse(match[0]);"
    new_parse2 = """    const match = text.match(/\\[[\\s\\S]*\\]/);\n    if (!match) throw new Error('No JSON found');\n    let jsonStr = match[0]\n      .replace(/[\\u2018\\u2019]/g, "'")\n      .replace(/[\\u201C\\u201D]/g, '"')\n      .replace(/\\n/g, ' ')\n      .replace(/,\\s*]/g, ']')\n      .replace(/,\\s*}/g, '}');\n    const cards = JSON.parse(jsonStr);"""
    if old_parse2 in content:
        content = content.replace(old_parse2, new_parse2)
        print("✅ JSON parse cleaned (alternate)")
    else:
        print("❌ Neither pattern found")

with open('app.js', 'w') as f:
    f.write(content)
