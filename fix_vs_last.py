with open('lang.js', 'r') as f:
    lang = f.read()

lang = lang.replace(
    "dash_vs_last:        '↑ % vs last month',",
    "dash_vs_last:        'vs last month',"
)

lang = lang.replace(
    "dash_vs_last:        '↑ % vs mes anterior',",
    "dash_vs_last:        'vs mes anterior',"
)

with open('lang.js', 'w') as f:
    f.write(lang)
print("✅ lang.js — dash_vs_last fixed en EN y ES")
