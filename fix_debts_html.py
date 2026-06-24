with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

OLD = '''          <div class="stat-card-value red">$8,320.00</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">📅</div>
          <div class="stat-card-label">Tiempo Estimado</div>
          <div class="stat-card-value cyan">18 meses</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">💰</div>
          <div class="stat-card-label">Ahorro en Intereses</div>
          <div class="stat-card-value green">$1,240</div>
        </div>'''

NEW = '''          <div class="stat-card-value red" id="debt-stat-total">$0.00</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">📅</div>
          <div class="stat-card-label">Tiempo Estimado</div>
          <div class="stat-card-value cyan" id="debt-stat-time">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">💰</div>
          <div class="stat-card-label">Pago Mínimo Total</div>
          <div class="stat-card-value green" id="debt-stat-saving">$0.00</div>
        </div>'''

if OLD in content:
    content = content.replace(OLD, NEW, 1)
    print('✅ IDs agregados a stat-cards de Deudas')
else:
    print('❌ No se encontró el bloque')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
