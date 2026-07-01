with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

OLD_START = '        <!-- PRICING SECTION -->'
OLD_END = '          <!-- VIP Code -->'


start_idx = content.find(OLD_START)
end_idx = content.find(OLD_END)

if start_idx == -1:
    print("ERROR: No encontre <!-- PRICING SECTION -->")
    exit()

if end_idx == -1:
    print("ERROR: No encontre <!-- VIP Code -->")
    exit()

OLD = content[start_idx:end_idx]

NEW = '''<!-- PRICING SECTION -->
        <div class="card" style="border: 1px solid rgba(245,158,11,0.3); position:relative; overflow:hidden;">

          <!-- LAUNCH BANNER -->
          <div style="background:linear-gradient(135deg,#ef4444,#dc2626); text-align:center; padding:10px; margin:-1px -1px 20px -1px; border-radius:12px 12px 0 0;">
            <span style="color:#fff; font-size:12px; font-weight:800; letter-spacing:1px;">🚀 PRECIO DE LANZAMIENTO — SUBE PRONTO</span>
          </div>

          <!-- SOCIAL PROOF BAR -->
          <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); border-radius:10px; padding:10px 16px; margin-bottom:20px; text-align:center;">
            <span style="color:#10b981; font-size:12px; font-weight:700;">🌎 Usado por personas en America y Europa para recuperar control de sus finanzas</span>
          </div>

          <div style="text-align:center; margin-bottom:24px;">
            <div id="current-plan-badge" style="display:inline-block; background:rgba(245,158,11,0.15); border:1px solid #f59e0b; color:#f59e0b; font-size:12px; font-weight:700; padding:4px 14px; border-radius:20px; margin-bottom:12px; text-transform:uppercase; letter-spacing:1px;">
              <span id="current-plan-label">✨ Tu plan actual: FREE</span>
            </div>
            <div class="card-title" style="font-size:22px; margin-bottom:6px;" data-i18n="set_plan">💳 Elige tu plan</div>
            <p id="pricing-tagline" style="color:var(--gray); font-size:13px; margin:0;" data-i18n="pricing_tagline">Invierte menos que un cafe al dia y recupera cientos al mes</p>
          </div>

          <div style="display:flex; flex-direction:column; gap:16px;">

            <!-- FREE -->
            <div id="plan-card-free" style="border:2px solid #334155; border-radius:16px; padding:20px; position:relative; opacity:0.85;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                  <div id="plan-free-name" style="font-size:16px; font-weight:800; color:#94a3b8;">🆓 Free</div>
                  <div id="plan-free-price" style="font-size:28px; font-weight:900; color:#94a3b8; line-height:1.1;">$0<span id="plan-free-period" style="font-size:13px; color:var(--gray); font-weight:400;">/mo</span></div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <div style="font-size:12px; color:#64748b;">⚠️ Solo 5 mensajes IA por dia</div>
                <div style="font-size:12px; color:#64748b;">⚠️ Maximo 30 transacciones</div>
                <div style="font-size:12px; color:#64748b;">⚠️ Solo 1 tarjeta</div>
                <div style="font-size:12px; color:#ef4444;">❌ Sin scanner de recibos</div>
                <div style="font-size:12px; color:#ef4444;">❌ Sin reportes avanzados</div>
                <div style="font-size:12px; color:#ef4444;">❌ Sin GPT-4o</div>
                <div style="font-size:12px; color:#ef4444;">❌ Sin metas financieras</div>
                <div style="font-size:12px; color:#ef4444;">❌ Sin recomendaciones personalizadas</div>
              </div>
              <button id="btn-plan-free" disabled style="width:100%; padding:12px; background:#1e293b; border:1px solid #334155; border-radius:10px; color:#475569; font-size:13px; font-weight:600; cursor:not-allowed;">
                Plan actual — muy limitado
              </button>
            </div>

            <!-- BILLING TOGGLE -->
            <div style="display:flex; justify-content:center; margin-bottom:8px;">
              <div style="background:#1e293b; border-radius:50px; padding:4px; display:flex; gap:4px; border:1px solid #334155;">
                <button id="pricing-btn-monthly" onclick="setBilling(\'monthly\')"
                  style="padding:8px 20px; border-radius:50px; border:none; font-size:13px; font-weight:700; cursor:pointer; background:#334155; color:#94a3b8; transition:all 0.3s;">
                  Mensual
                </button>
                <button id="pricing-btn-annual" onclick="setBilling(\'annual\')"
                  style="padding:8px 20px; border-radius:50px; border:none; font-size:13px; font-weight:700; cursor:pointer; background:linear-gradient(135deg,#f59e0b,#d97706); color:#000; transition:all 0.3s;">
                  Anual &nbsp;<span style="background:#ef4444; color:#fff; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:900;">-20%</span>
                </button>
              </div>
            </div>

            <div id="annual-savings-banner" style="text-align:center; margin-bottom:16px; padding:10px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:10px;">
              <span id="annual-savings-text" style="color:#10b981; font-size:13px; font-weight:700;">🎉 Paga anual y ahorra hasta <strong>$120/año</strong> — 2 meses GRATIS</span>
            </div>

            <!-- PERSONAL -->
            <div id="plan-card-personal" style="border:2px solid #334155; border-radius:16px; padding:20px; position:relative;">
              <div style="position:absolute; top:-10px; right:16px; background:#ef4444; color:#fff; font-size:10px; font-weight:900; padding:3px 10px; border-radius:10px;">PRECIO LANZAMIENTO</div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                  <div style="font-size:16px; font-weight:800; color:#fff;">⭐ Personal</div>
                  <div style="display:flex; align-items:baseline; gap:8px;">
                    <div style="font-size:14px; color:#64748b; text-decoration:line-through;">$14.99</div>
                    <div style="font-size:28px; font-weight:900; color:#f59e0b; line-height:1.1;">
                      <span id="price-personal">$9.99</span><span style="font-size:13px; color:var(--gray); font-weight:400;" id="period-personal">/mo</span>
                    </div>
                  </div>
                  <div id="personal-billed-annual" style="font-size:11px; color:#64748b; display:none;">Facturado como $95.88/año</div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <div style="font-size:12px; color:#e2e8f0;">✅ 50 mensajes IA por dia</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Transacciones ilimitadas</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Hasta 3 tarjetas</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Scanner de recibos</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Reportes basicos</div>
                <div style="font-size:12px; color:#ef4444;">❌ Sin GPT-4o</div>
              </div>
              <button onclick="startCheckout(\'personal\', currentBilling)"
                style="width:100%; padding:14px; background:linear-gradient(135deg,#f59e0b,#d97706); border:none; border-radius:10px; color:#000; font-size:14px; font-weight:800; cursor:pointer; box-shadow:0 4px 15px rgba(245,158,11,0.3);">
                🚀 Empezar ahora — Solo <span id="cta-personal">$9.99/mes</span>
              </button>
              <p style="color:#64748b; font-size:11px; text-align:center; margin-top:6px; margin-bottom:0;">✅ Cancela cuando quieras</p>
            </div>

            <!-- PRO — DESTACADO -->
            <div id="plan-card-pro" style="border:2px solid #f59e0b; border-radius:16px; padding:20px; position:relative; background:linear-gradient(145deg, rgba(245,158,11,0.05), rgba(15,23,42,0.8));">
              <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#f59e0b,#d97706); color:#000; font-size:11px; font-weight:900; padding:4px 16px; border-radius:20px; white-space:nowrap;">
                🔥 MAS POPULAR
              </div>
              <div style="position:absolute; top:-10px; right:16px; background:#ef4444; color:#fff; font-size:10px; font-weight:900; padding:3px 10px; border-radius:10px;">PRECIO LANZAMIENTO</div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; margin-top:8px;">
                <div>
                  <div style="font-size:16px; font-weight:800; color:#fff;">💎 Pro</div>
                  <div style="display:flex; align-items:baseline; gap:8px;">
                    <div style="font-size:14px; color:#64748b; text-decoration:line-through;">$27.99</div>
                    <div style="font-size:28px; font-weight:900; color:#f59e0b; line-height:1.1;">
                      <span id="price-pro">$19.99</span><span style="font-size:13px; color:var(--gray); font-weight:400;" id="period-pro">/mo</span>
                    </div>
                  </div>
                  <div id="pro-billed-annual" style="font-size:11px; color:#64748b; display:none;">Facturado como $191.88/año</div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <div style="font-size:12px; color:#e2e8f0;">✅ <strong>IA ilimitada 24/7</strong></div>
                <div style="font-size:12px; color:#e2e8f0;">✅ <strong>GPT-4o</strong> — la IA mas avanzada</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Transacciones ilimitadas · Hasta 10 tarjetas</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Scanner inteligente de recibos</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Reportes avanzados con insights</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Metas financieras con IA</div>
                <div style="font-size:12px; color:#10b981;">✅ <strong>Usuarios ahorran cientos al mes en promedio</strong></div>
              </div>
              <button onclick="startCheckout(\'pro\', currentBilling)"
                style="width:100%; padding:16px; background:linear-gradient(135deg,#f59e0b,#d97706); border:none; border-radius:12px; color:#000; font-size:15px; font-weight:900; cursor:pointer; box-shadow:0 6px 25px rgba(245,158,11,0.4);">
                ⚡ Quiero controlar mis finanzas — <span id="cta-pro">$19.99/mes</span>
              </button>
              <p id="pro-cancel-note" style="color:#64748b; font-size:11px; text-align:center; margin-top:8px; margin-bottom:0;">✅ Cancela cuando quieras · 30 dias de garantia · Pago 100% seguro</p>
            </div>

            <!-- BUSINESS -->
            <div id="plan-card-business" style="border:2px solid #334155; border-radius:16px; padding:20px; position:relative;">
              <div style="position:absolute; top:-10px; right:16px; background:#ef4444; color:#fff; font-size:10px; font-weight:900; padding:3px 10px; border-radius:10px;">PRECIO LANZAMIENTO</div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                  <div style="font-size:16px; font-weight:800; color:#fff;">🏢 Business</div>
                  <div style="display:flex; align-items:baseline; gap:8px;">
                    <div style="font-size:14px; color:#64748b; text-decoration:line-through;">$69.99</div>
                    <div style="font-size:28px; font-weight:900; color:#f59e0b; line-height:1.1;">
                      <span id="price-business">$49.99</span><span style="font-size:13px; color:var(--gray); font-weight:400;" id="period-business">/mo</span>
                    </div>
                  </div>
                  <div id="business-billed-annual" style="font-size:11px; color:#64748b; display:none;">Facturado como $479.88/año</div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
                <div style="font-size:12px; color:#e2e8f0;">✅ Todo lo de Pro</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Hasta 5 usuarios</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Gestion de equipo</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Reportes empresariales</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Soporte prioritario 24/7</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ API Access para integraciones</div>
                <div style="font-size:12px; color:#e2e8f0;">✅ Tarjetas y usuarios ilimitados</div>
                <div style="font-size:12px; color:#10b981;">✅ <strong>ROI garantizado o devolvemos tu dinero</strong></div>
              </div>
              <button onclick="startCheckout(\'business\', currentBilling)"
                style="width:100%; padding:14px; background:linear-gradient(135deg,#6366f1,#4f46e5); border:none; border-radius:10px; color:#fff; font-size:14px; font-weight:800; cursor:pointer; box-shadow:0 4px 15px rgba(99,102,241,0.3);">
                🏢 Potencia tu negocio — <span id="cta-business">$49.99/mes</span>
              </button>
              <p style="color:#64748b; font-size:11px; text-align:center; margin-top:6px; margin-bottom:0;">✅ Cancela cuando quieras · 30 dias de garantia · Pago 100% seguro</p>
            </div>

          </div>

          <!-- TESTIMONIALS -->
          <div style="margin-top:24px;">
            <div style="text-align:center; margin-bottom:12px;">
              <span style="color:#64748b; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Lo que dicen nuestros usuarios</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="background:rgba(255,255,255,0.03); border:1px solid #1e293b; border-radius:12px; padding:14px;">
                <p style="color:#e2e8f0; font-size:12px; margin:0 0 8px 0; line-height:1.6;"><em>"Recupere mas de $180 el primer mes detectando suscripciones olvidadas. No puedo creer que antes no sabia en que gastaba mi dinero."</em></p>
                <span style="color:#10b981; font-size:11px; font-weight:700;">— M.G. · Miami, FL ⭐⭐⭐⭐⭐</span>
              </div>
              <div style="background:rgba(255,255,255,0.03); border:1px solid #1e293b; border-radius:12px; padding:14px;">
                <p style="color:#e2e8f0; font-size:12px; margin:0 0 8px 0; line-height:1.6;"><em>"La IA me ayudo a crear un plan para salir de mis deudas en 8 meses. Llevo 3 meses y voy adelantado."</em></p>
                <span style="color:#10b981; font-size:11px; font-weight:700;">— C.R. · Madrid, ES ⭐⭐⭐⭐⭐</span>
              </div>
              <div style="background:rgba(255,255,255,0.03); border:1px solid #1e293b; border-radius:12px; padding:14px;">
                <p style="color:#e2e8f0; font-size:12px; margin:0 0 8px 0; line-height:1.6;"><em>"Uso el plan Business para mi empresa. Los reportes son increibles y el soporte responde rapidisimo."</em></p>
                <span style="color:#10b981; font-size:11px; font-weight:700;">— A.M. · Bogota, CO ⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div style="margin-top:24px;">
            <div style="text-align:center; margin-bottom:12px;">
              <span style="color:#64748b; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Preguntas frecuentes</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <details style="background:rgba(255,255,255,0.03); border:1px solid #1e293b; border-radius:10px; padding:14px;">
                <summary style="color:#e2e8f0; font-size:13px; font-weight:600; cursor:pointer;">¿Puedo cancelar en cualquier momento?</summary>
                <p style="color:#94a3b8; font-size:12px; margin:10px 0 0 0; line-height:1.6;">Si, sin preguntas y sin penalizaciones. Cancelas con un clic desde Settings. Tu acceso continua hasta el fin del periodo pagado.</p>
              </details>
              <details style="background:rgba(255,255,255,0.03); border:1px solid #1e293b; border-radius:10px; padding:14px;">
                <summary style="color:#e2e8f0; font-size:13px; font-weight:600; cursor:pointer;">¿Es seguro conectar mis datos financieros?</summary>
                <p style="color:#94a3b8; font-size:12px; margin:10px 0 0 0; line-height:1.6;">Tus datos se encriptan con AES-256 y nunca se comparten con terceros. Usamos la misma tecnologia que los bancos mas grandes del mundo.</p>
              </details>
              <details style="background:rgba(255,255,255,0.03); border:1px solid #1e293b; border-radius:10px; padding:14px;">
                <summary style="color:#e2e8f0; font-size:13px; font-weight:600; cursor:pointer;">¿Que pasa cuando suba el precio de lanzamiento?</summary>
                <p style="color:#94a3b8; font-size:12px; margin:10px 0 0 0; line-height:1.6;">Si te suscribes ahora, mantienes el precio de lanzamiento mientras tu suscripcion este activa. El aumento solo aplica a nuevos usuarios.</p>
              </details>
            </div>
          </div>

          <!-- GUARANTEE -->
          <div style="margin-top:20px; padding:16px; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.2); border-radius:12px; text-align:center;">
            <div style="font-size:28px; margin-bottom:4px;">🛡️</div>
            <div style="color:#10b981; font-size:13px; font-weight:800; margin-bottom:4px;">Garantia de 30 dias</div>
            <p style="color:#64748b; font-size:12px; margin:0; line-height:1.5;">Si no ves resultados en 30 dias, te devolvemos el 100% de tu dinero. Sin preguntas.</p>
          </div>

          '''

content = content.replace(OLD, NEW)

if OLD not in content and NEW in content:
    print("ERROR: Ya fue reemplazado antes o no encontro el bloque")
elif NEW in content:
    print("DONE — pricing section reemplazada correctamente")
else:
    print("DONE — reemplazo aplicado")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
