import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''<div class="page-header">
        <div>
                <div>
          <div class="page-title">📉 Plan de Pago de Deudas</div>
          <div class="page-subtitle">Estrategia personalizada para salir de deudas más rápido</div>
        </div>
        <button onclick="openAddDebt()" class="btn btn-primary">+ Agregar Deuda</button>
      </div>'''

new = '''<div class="page-header">
        <div>
          <div class="page-title">📉 Plan de Pago de Deudas</div>
          <div class="page-subtitle">Estrategia personalizada para salir de deudas más rápido</div>
        </div>
        <button onclick="openAddDebt()" class="btn btn-primary">+ Agregar Deuda</button>
      </div>'''

if old in content:
    content = content.replace(old, new, 1)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Fix aplicado correctamente")
else:
    print("❌ No se encontró el bloque exacto - verifica espacios/tabs")
