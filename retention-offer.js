// ============================================================
// RETENTION FLOW — 5 Steps to keep the user
// ============================================================

window.RetentionFlow = {
  currentStep: 1,
  reason: null,
  offerData: null,
  timerInterval: null,
  retentionId: null,

  // ── i18n strings ─────────────────────────────────────────
  strings: {
    es: {
      step1_emoji: '😢',
      step1_title: (name) => `${name}, ¿de verdad quieres irte?`,
      step1_stats_days: (d) => `🔥 Llevas <strong>${d} días</strong> construyendo tu libertad financiera`,
      step1_stats_txs: (n) => `📊 Has registrado <strong>${n} transacciones</strong>`,
      step1_stats_goals: (n, p) => `🎯 Tienes <strong>${n} metas activas</strong> con ${p}% de progreso`,
      step1_stats_ai: (n) => `🤖 Has hecho <strong>${n} consultas</strong> a tu IA financiera`,
      step1_keep: '💪 Quiero seguir mejorando',
      step1_continue: 'continuar con la cancelación...',

      step2_title: '¿Por qué quieres cancelar?',
      step2_subtitle: 'Tu opinión nos ayuda a mejorar',
      reasons: [
        { key: 'too_expensive',  emoji: '💸', label: 'Es muy caro para mí' },
        { key: 'no_use',         emoji: '😕', label: 'No le encuentro uso' },
        { key: 'technical',      emoji: '🐛', label: 'Tiene errores técnicos' },
        { key: 'pause',          emoji: '⏸️', label: 'Solo quiero pausar un tiempo' },
        { key: 'goal_achieved',  emoji: '🏆', label: 'Ya logré mi objetivo financiero' },
        { key: 'other',          emoji: '💭', label: 'Otro motivo' }
      ],

      step3_loading: '✨ Preparando tu oferta personalizada...',
      step3_ai_thinking: 'La IA está analizando tu perfil...',

      offers: {
        discount_50: {
          emoji: '🎁',
          title: '¡Espera! Tenemos algo especial para ti',
          badge: '50% OFF — SOLO PARA TI',
          desc: (price, months) => `Quédate por solo <strong>$${price}/mes</strong> durante ${months} meses`,
          cta: (price) => `✅ Acepto — quedarme por $${price}/mes`,
          secondary: 'No, prefiero cancelar de todas formas'
        },
        pause_30: {
          emoji: '⏸️',
          title: '¿Y si simplemente pausas?',
          badge: 'PAUSA GRATIS — 30 DÍAS',
          desc: () => 'Pausa tu cuenta por 30 días sin costo. Cuando vuelvas, todo estará igual.',
          cta: () => '✅ Pausar mi cuenta 30 días',
          secondary: 'No, prefiero cancelar de todas formas'
        },
        free_session: {
          emoji: '🎓',
          title: 'Te asignamos un experto financiero',
          badge: 'SESIÓN 1:1 GRATUITA',
          desc: () => 'Una sesión personalizada con nuestro equipo para que saques el máximo provecho.',
          cta: () => '✅ Quiero mi sesión gratuita',
          secondary: 'No, prefiero cancelar de todas formas'
        },
        support_priority: {
          emoji: '⚡',
          title: 'Resolvemos tu problema hoy',
          badge: 'SOPORTE PRIORITARIO',
          desc: () => 'Un agente te contactará en menos de 2 horas para resolver cualquier problema.',
          cta: () => '✅ Quiero soporte prioritario',
          secondary: 'No, prefiero cancelar de todas formas'
        },
        keep_history: {
          emoji: '🏆',
          title: '¡Felicidades por tu logro!',
          badge: 'MANTÉN TU HISTORIAL',
          desc: () => 'Tu historial financiero vale oro. Mantén el acceso para seguir tomando mejores decisiones.',
          cta: () => '✅ Mantener mi historial Pro',
          secondary: 'No, prefiero cancelar de todas formas'
        }
      },

      step4_title: 'Si cancelas hoy, perderás:',
      step4_history: (months) => `📊 ${months} ${months === 1 ? 'mes' : 'meses'} de historial financiero`,
      step4_goals: (n) => `🎯 ${n} metas activas en progreso`,
      step4_ai: (n) => `🤖 ${n} análisis de IA guardados`,
      step4_price: (current, original) => `⚡ Precio fundador ($${current} → $${original} después)`,
      step4_features: '💳 Recomendaciones · Scanner · Reportes Pro',
      step4_keep: '💪 No quiero perder mi progreso',
      step4_continue: 'Entiendo, cancelar de todas formas',

      step5_title: '🔥 Última oportunidad — Solo para ti',
      step5_badge: 'OFERTA FINAL',
      step5_desc: (price) => `3 meses de Pro por solo <strong>$${price}/mes</strong>`,
      step5_timer: (s) => `⏱️ Esta oferta expira en ${s} segundos`,
      step5_cta: (price) => `🎁 Acepto — 3 meses por $${price}/mes`,
      step5_cancel: 'No, cancelar mi suscripción',

      canceling: 'Cancelando...',
      cancel_confirmed: '✅ Suscripción cancelada. Tu acceso continúa hasta',
      offer_accepted: '🎉 ¡Oferta aplicada! Bienvenido de vuelta.',
      offer_expired: '⏰ La oferta expiró. Generando nueva...',
    },

    en: {
      step1_emoji: '😢',
      step1_title: (name) => `${name}, are you sure you want to leave?`,
      step1_stats_days: (d) => `🔥 You've been <strong>${d} days</strong> building your financial freedom`,
      step1_stats_txs: (n) => `📊 You've recorded <strong>${n} transactions</strong>`,
      step1_stats_goals: (n, p) => `🎯 You have <strong>${n} active goals</strong> with ${p}% progress`,
      step1_stats_ai: (n) => `🤖 You've made <strong>${n} queries</strong> to your financial AI`,
      step1_keep: '💪 I want to keep improving',
      step1_continue: 'continue with cancellation...',

      step2_title: 'Why do you want to cancel?',
      step2_subtitle: 'Your feedback helps us improve',
      reasons: [
        { key: 'too_expensive',  emoji: '💸', label: 'It\'s too expensive for me' },
        { key: 'no_use',         emoji: '😕', label: 'I don\'t find it useful' },
        { key: 'technical',      emoji: '🐛', label: 'Technical issues' },
        { key: 'pause',          emoji: '⏸️', label: 'I just want to pause for a while' },
        { key: 'goal_achieved',  emoji: '🏆', label: 'I already achieved my financial goal' },
        { key: 'other',          emoji: '💭', label: 'Other reason' }
      ],

      step3_loading: '✨ Preparing your personalized offer...',
      step3_ai_thinking: 'AI is analyzing your profile...',

      offers: {
        discount_50: {
          emoji: '🎁',
          title: 'Wait! We have something special for you',
          badge: '50% OFF — JUST FOR YOU',
          desc: (price, months) => `Stay for only <strong>$${price}/mo</strong> for ${months} months`,
          cta: (price) => `✅ Accept — stay for $${price}/mo`,
          secondary: 'No, I prefer to cancel anyway'
        },
        pause_30: {
          emoji: '⏸️',
          title: 'What if you just pause?',
          badge: 'FREE PAUSE — 30 DAYS',
          desc: () => 'Pause your account for 30 days at no cost. When you come back, everything will be the same.',
          cta: () => '✅ Pause my account for 30 days',
          secondary: 'No, I prefer to cancel anyway'
        },
        free_session: {
          emoji: '🎓',
          title: 'We\'ll assign you a financial expert',
          badge: 'FREE 1:1 SESSION',
          desc: () => 'A personalized session with our team to help you get the most out of FinanceAI.',
          cta: () => '✅ I want my free session',
          secondary: 'No, I prefer to cancel anyway'
        },
        support_priority: {
          emoji: '⚡',
          title: 'We\'ll fix your issue today',
          badge: 'PRIORITY SUPPORT',
          desc: () => 'An agent will contact you within 2 hours to resolve any issue.',
          cta: () => '✅ I want priority support',
          secondary: 'No, I prefer to cancel anyway'
        },
        keep_history: {
          emoji: '🏆',
          title: 'Congrats on your achievement!',
          badge: 'KEEP YOUR HISTORY',
          desc: () => 'Your financial history is priceless. Keep access to keep making better decisions.',
          cta: () => '✅ Keep my Pro history',
          secondary: 'No, I prefer to cancel anyway'
        }
      },

      step4_title: 'If you cancel today, you will lose:',
      step4_history: (months) => `📊 ${months} months of financial history`,
      step4_goals: (n) => `🎯 ${n} active goals in progress`,
      step4_ai: (n) => `🤖 ${n} saved AI analyses`,
      step4_price: (current, original) => `⚡ Founder price ($${current} → $${original} after)`,
      step4_features: '💳 Recommendations · Scanner · Pro Reports',
      step4_keep: '💪 I don\'t want to lose my progress',
      step4_continue: 'I understand, cancel anyway',

      step5_title: '🔥 Last chance — Just for you',
      step5_badge: 'FINAL OFFER',
      step5_desc: (price) => `3 months of Pro for only <strong>$${price}/mo</strong>`,
      step5_timer: (s) => `⏱️ This offer expires in ${s} seconds`,
      step5_cta: (price) => `🎁 Accept — 3 months for $${price}/mo`,
      step5_cancel: 'No, cancel my subscription',

      canceling: 'Cancelling...',
      cancel_confirmed: '✅ Subscription cancelled. Your access continues until',
      offer_accepted: '🎉 Offer applied! Welcome back.',
      offer_expired: '⏰ Offer expired. Generating a new one...',
    }
  },

  // ── Helpers ───────────────────────────────────────────────
  getLang() {
    return (typeof STATE !== 'undefined' && STATE.language) ? STATE.language : 'es';
  },

  s() {
    return this.strings[this.getLang()];
  },

  getUserStats() {
    const txs = (typeof STATE !== 'undefined' && STATE.transactions) ? STATE.transactions : [];
    const goals = (typeof STATE !== 'undefined' && STATE.goals) ? STATE.goals : [];
    const activeGoals = goals.filter(g => g.status === 'active');
    const goalsProgress = activeGoals.length
      ? Math.round(activeGoals.reduce((sum, g) => sum + ((g.current_amount / g.target_amount) * 100), 0) / activeGoals.length)
      : 0;

    const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const saved = Math.max(0, income - expense);

    const daysActive = STATE?.daysActive
      ?? (STATE?.user?.created_at
        ? Math.floor((Date.now() - new Date(STATE.user.created_at)) / (1000 * 60 * 60 * 24))
        : 0);

    const monthsActive = Math.max(1, Math.floor(daysActive / 30));

    return {
      transactions: txs.length,
      activeGoals: activeGoals.length,
      goalsProgress,
      saved: saved.toFixed(2),
      daysActive,
      monthsActive,
      aiUsage: STATE?.aiUsageCount || 0
    };
  },

  getUserName() {
    const email = STATE?.user?.email || '';
    const meta = STATE?.user?.user_metadata?.full_name || '';
    if (meta) return meta.split(' ')[0];
    if (email) return email.split('@')[0];
    return this.getLang() === 'es' ? 'Amigo' : 'Friend';
  },

  // ── Modal shell ───────────────────────────────────────────
  createModal() {
    const existing = document.getElementById('retention-modal');
    if (existing) existing.remove();
    if (this.timerInterval) clearInterval(this.timerInterval);

    const modal = document.createElement('div');
    modal.id = 'retention-modal';
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.85);
      display:flex;align-items:center;justify-content:center;
      z-index:99999;padding:20px;backdrop-filter:blur(8px);
      animation:fadeIn 0.3s ease;
    `;
    document.body.appendChild(modal);
    return modal;
  },

  close() {
    const modal = document.getElementById('retention-modal');
    if (modal) modal.remove();
    if (this.timerInterval) clearInterval(this.timerInterval);
  },

  // ── STEP 1: Emotional impact ──────────────────────────────
  showStep1() {
    this.currentStep = 1;
    const modal = this.createModal();
    const s = this.s();
    const stats = this.getUserStats();
    const name = this.getUserName();

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;
        border-radius:24px;padding:36px;max-width:460px;width:100%;text-align:center;
        box-shadow:0 25px 50px rgba(0,0,0,0.5);">
        <div style="font-size:64px;margin-bottom:8px;animation:bounce 1s infinite;">${s.step1_emoji}</div>
        <h2 style="color:#fff;font-size:22px;font-weight:900;margin-bottom:20px;line-height:1.3;">
          ${s.step1_title(name)}
        </h2>

        <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);
          border-radius:16px;padding:20px;margin-bottom:24px;text-align:left;">
          <div style="color:#c7d2fe;font-size:13px;line-height:2.2;">
            <div>${s.step1_stats_days(stats.daysActive)}</div>
            <div>${s.step1_stats_txs(stats.transactions)}</div>
            ${stats.activeGoals > 0 ? `<div>${s.step1_stats_goals(stats.activeGoals, stats.goalsProgress)}</div>` : ''}
            ${stats.aiUsage > 0 ? `<div>${s.step1_stats_ai(stats.aiUsage)}</div>` : ''}
          </div>
        </div>

        <button onclick="RetentionFlow.close()"
          style="width:100%;padding:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);
          border:none;border-radius:14px;color:#fff;font-size:16px;font-weight:800;
          cursor:pointer;margin-bottom:12px;box-shadow:0 4px 15px rgba(99,102,241,0.4);
          transition:transform 0.2s;"
          onmouseover="this.style.transform='scale(1.02)'"
          onmouseout="this.style.transform='scale(1)'">
          ${s.step1_keep}
        </button>
        <button onclick="RetentionFlow.showStep2()"
          style="background:none;border:none;color:#64748b;font-size:12px;
          cursor:pointer;text-decoration:underline;padding:4px;">
          ${s.step1_continue}
        </button>
      </div>
    `;
  },

  // ── STEP 2: Reason selection ──────────────────────────────
  showStep2() {
    this.currentStep = 2;
    const modal = this.createModal();
    const s = this.s();

    const reasonsHTML = s.reasons.map(r => `
      <button onclick="RetentionFlow.selectReason('${r.key}')"
        style="width:100%;padding:14px 16px;background:rgba(30,41,59,0.8);
        border:1px solid #334155;border-radius:12px;color:#e2e8f0;
        font-size:13px;font-weight:600;cursor:pointer;text-align:left;
        display:flex;align-items:center;gap:10px;transition:all 0.2s;margin-bottom:8px;"
        onmouseover="this.style.background='rgba(99,102,241,0.2)';this.style.borderColor='#6366f1'"
        onmouseout="this.style.background='rgba(30,41,59,0.8)';this.style.borderColor='#334155'">
        <span style="font-size:20px;">${r.emoji}</span>
        <span>${r.label}</span>
      </button>
    `).join('');

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;
        border-radius:24px;padding:36px;max-width:460px;width:100%;
        box-shadow:0 25px 50px rgba(0,0,0,0.5);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
          <button onclick="RetentionFlow.showStep1()"
            style="background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.3);
            border-radius:8px;color:#a5b4fc;padding:6px 12px;font-size:12px;cursor:pointer;">
            ← Atrás
          </button>
          <div style="color:#64748b;font-size:12px;">Paso 2 de 5</div>
        </div>
        <h2 style="color:#fff;font-size:20px;font-weight:900;margin-bottom:4px;margin-top:16px;">
          ${s.step2_title}
        </h2>
        <p style="color:#64748b;font-size:13px;margin-bottom:20px;">${s.step2_subtitle}</p>
        ${reasonsHTML}
      </div>
    `;
  },

  // ── STEP 3: AI personalized offer ────────────────────────
  async selectReason(reason) {
    this.reason = reason;
    this.currentStep = 3;
    const modal = this.createModal();
    const s = this.s();

    // Show loading
    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;
        border-radius:24px;padding:48px;max-width:460px;width:100%;text-align:center;">
        <div style="font-size:48px;margin-bottom:16px;animation:spin 2s linear infinite;">✨</div>
        <p style="color:#a5b4fc;font-size:16px;font-weight:600;">${s.step3_loading}</p>
        <p style="color:#64748b;font-size:13px;margin-top:8px;">${s.step3_ai_thinking}</p>
        <div style="margin-top:20px;display:flex;gap:6px;justify-content:center;">
          <div style="width:8px;height:8px;background:#6366f1;border-radius:50%;animation:pulse 1s infinite;"></div>
          <div style="width:8px;height:8px;background:#8b5cf6;border-radius:50%;animation:pulse 1s infinite 0.2s;"></div>
          <div style="width:8px;height:8px;background:#a78bfa;border-radius:50%;animation:pulse 1s infinite 0.4s;"></div>
        </div>
      </div>
    `;

    try {
      const stats = this.getUserStats();
      const token = (await supabase.auth.getSession()).data.session?.access_token;

      const res = await fetch('/api/retention-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          reason,
          lang: this.getLang(),
          userStats: stats
        })
      });

      this.offerData = await res.json();
      this.retentionId = this.offerData.retentionId;
      this.showStep3Offer();

    } catch (e) {
      console.error('Retention offer error:', e);
      this.showStep4();
    }
  },

  showStep3Offer() {
    const modal = this.createModal();
    const s = this.s();
    const offer = this.offerData;
    const offerStrings = s.offers[offer.offerType] || s.offers.discount_50;

    const descText = offer.offerType === 'discount_50'
      ? offerStrings.desc(offer.discountedPrice, 3)
      : offerStrings.desc();

    const ctaText = offer.offerType === 'discount_50'
      ? offerStrings.cta(offer.discountedPrice)
      : offerStrings.cta();

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;
        border-radius:24px;padding:36px;max-width:460px;width:100%;text-align:center;
        box-shadow:0 25px 50px rgba(0,0,0,0.5);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
          <button onclick="RetentionFlow.showStep2()"
            style="background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.3);
            border-radius:8px;color:#a5b4fc;padding:6px 12px;font-size:12px;cursor:pointer;">
            ← Atrás
          </button>
          <div style="color:#64748b;font-size:12px;">Paso 3 de 5</div>
        </div>

        <div style="font-size:56px;margin-bottom:12px;">${offerStrings.emoji}</div>

        <div style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#ef4444);
          color:#fff;font-size:11px;font-weight:900;padding:4px 14px;border-radius:20px;
          letter-spacing:1px;margin-bottom:12px;animation:pulse 2s infinite;">
          ${offerStrings.badge}
        </div>

        <h2 style="color:#fff;font-size:20px;font-weight:900;margin-bottom:12px;">
          ${offerStrings.title}
        </h2>

        ${offer.aiMessage ? `
        <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);
          border-radius:12px;padding:16px;margin-bottom:16px;">
          <div style="font-size:20px;margin-bottom:6px;">🤖</div>
          <p style="color:#c7d2fe;font-size:13px;line-height:1.6;font-style:italic;">
            "${offer.aiMessage}"
          </p>
        </div>` : ''}

        <p style="color:#94a3b8;font-size:14px;margin-bottom:24px;line-height:1.6;">
          ${descText}
        </p>

        <button onclick="RetentionFlow.acceptOffer()"
          style="width:100%;padding:16px;background:linear-gradient(135deg,#10b981,#059669);
          border:none;border-radius:14px;color:#fff;font-size:15px;font-weight:800;
          cursor:pointer;margin-bottom:12px;box-shadow:0 4px 15px rgba(16,185,129,0.4);
          transition:transform 0.2s;"
          onmouseover="this.style.transform='scale(1.02)'"
          onmouseout="this.style.transform='scale(1)'">
          ${ctaText}
        </button>
        <button onclick="RetentionFlow.showStep4()"
          style="background:none;border:none;color:#64748b;font-size:12px;
          cursor:pointer;text-decoration:underline;padding:4px;">
          ${offerStrings.secondary}
        </button>
      </div>
    `;
  },

  // ── STEP 4: What they lose ────────────────────────────────
  showStep4() {
    this.currentStep = 4;
    const modal = this.createModal();
    const s = this.s();
    const stats = this.getUserStats();
    const plan = STATE?.vipPlan || 'monthly';
    const currentPrice = plan === 'annual' ? '8.33' : '9.99';
    const originalPrice = '24.99';

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;
        border-radius:24px;padding:36px;max-width:460px;width:100%;
        box-shadow:0 25px 50px rgba(0,0,0,0.5);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
          <div style="color:#64748b;font-size:12px;">Paso 4 de 5</div>
        </div>

        <div style="font-size:48px;text-align:center;margin-bottom:12px;">⚠️</div>
        <h2 style="color:#fff;font-size:20px;font-weight:900;margin-bottom:20px;text-align:center;">
          ${s.step4_title}
        </h2>

        <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);
          border-radius:16px;padding:20px;margin-bottom:24px;">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;gap:10px;color:#fca5a5;font-size:13px;font-weight:600;">
              <span style="font-size:18px;">❌</span>${s.step4_history(stats.monthsActive)}
            </div>
            ${stats.activeGoals > 0 ? `
            <div style="display:flex;align-items:center;gap:10px;color:#fca5a5;font-size:13px;font-weight:600;">
              <span style="font-size:18px;">❌</span>${s.step4_goals(stats.activeGoals)}
            </div>` : ''}
            ${stats.aiUsage > 0 ? `
            <div style="display:flex;align-items:center;gap:10px;color:#fca5a5;font-size:13px;font-weight:600;">
              <span style="font-size:18px;">❌</span>${s.step4_ai(stats.aiUsage)}
            </div>` : ''}
            <div style="display:flex;align-items:center;gap:10px;color:#fca5a5;font-size:13px;font-weight:600;">
              <span style="font-size:18px;">❌</span>${s.step4_price(currentPrice, originalPrice)}
            </div>
            <div style="display:flex;align-items:center;gap:10px;color:#fca5a5;font-size:13px;font-weight:600;">
              <span style="font-size:18px;">❌</span>${s.step4_features}
            </div>
          </div>
        </div>

        <button onclick="RetentionFlow.close()"
          style="width:100%;padding:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);
          border:none;border-radius:14px;color:#fff;font-size:15px;font-weight:800;
          cursor:pointer;margin-bottom:12px;box-shadow:0 4px 15px rgba(99,102,241,0.4);
          transition:transform 0.2s;"
          onmouseover="this.style.transform='scale(1.02)'"
          onmouseout="this.style.transform='scale(1)'">
          ${s.step4_keep}
        </button>
        <button onclick="RetentionFlow.showStep5()"
          style="background:none;border:none;color:#64748b;font-size:12px;
          cursor:pointer;text-decoration:underline;padding:4px;display:block;
          text-align:center;width:100%;">
          ${s.step4_continue}
        </button>
      </div>
    `;
  },

  // ── STEP 5: Final offer with countdown ───────────────────
  showStep5() {
    this.currentStep = 5;
    const modal = this.createModal();
    const s = this.s();
    const plan = STATE?.vipPlan || 'monthly';
    const finalPrice = plan === 'annual' ? '29.99' : '9.99';
    let timeLeft = 60;

    const renderTimer = () => {
      const el = document.getElementById('retention-timer');
      if (el) el.textContent = s.step5_timer(timeLeft);
    };

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid rgba(239,68,68,0.3);
        border-radius:24px;padding:36px;max-width:460px;width:100%;text-align:center;
        box-shadow:0 25px 50px rgba(239,68,68,0.2);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
          <button onclick="RetentionFlow.showStep4()"
            style="background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.3);
            border-radius:8px;color:#a5b4fc;padding:6px 12px;font-size:12px;cursor:pointer;">
            ← Atrás
          </button>
          <div style="color:#64748b;font-size:12px;">Paso 5 de 5</div>
        </div>

        <div style="display:inline-block;background:linear-gradient(135deg,#ef4444,#dc2626);
          color:#fff;font-size:11px;font-weight:900;padding:4px 14px;border-radius:20px;
          letter-spacing:1px;margin-bottom:16px;animation:pulse 1s infinite;">
          ${s.step5_badge}
        </div>

        <h2 style="color:#fff;font-size:22px;font-weight:900;margin-bottom:12px;">
          ${s.step5_title}
        </h2>

        <p style="color:#94a3b8;font-size:14px;margin-bottom:16px;line-height:1.6;">
          ${s.step5_desc(finalPrice)}
        </p>

        <div id="retention-timer"
          style="color:#fbbf24;font-size:14px;font-weight:700;margin-bottom:24px;
          background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);
          border-radius:10px;padding:10px;">
          ${s.step5_timer(timeLeft)}
        </div>

        <button onclick="RetentionFlow.acceptFinalOffer()"
          style="width:100%;padding:16px;background:linear-gradient(135deg,#ef4444,#dc2626);
          border:none;border-radius:14px;color:#fff;font-size:15px;font-weight:800;
          cursor:pointer;margin-bottom:12px;box-shadow:0 4px 15px rgba(239,68,68,0.4);
          animation:pulse 2s infinite;transition:transform 0.2s;"
          onmouseover="this.style.transform='scale(1.02)'"
          onmouseout="this.style.transform='scale(1)'">
          ${s.step5_cta(finalPrice)}
        </button>
        <button onclick="RetentionFlow.confirmCancel()"
          style="background:none;border:none;color:#475569;font-size:11px;
          cursor:pointer;padding:4px;display:block;text-align:center;width:100%;">
          ${s.step5_cancel}
        </button>
      </div>
    `;

    // Start countdown
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      timeLeft--;
      renderTimer();
      if (timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.confirmCancel();
      }
    }, 1000);
  },

  // ── Accept offer ──────────────────────────────────────────
  async acceptOffer() {
    if (!this.retentionId || !this.offerData) return;
    const modal = this.createModal();
    const s = this.s();

    modal.innerHTML = `
      <div style="background:#1e293b;border:1px solid #334155;border-radius:24px;
        padding:48px;max-width:400px;width:100%;text-align:center;">
        <div style="font-size:48px;animation:spin 1s linear infinite;">⚡</div>
        <p style="color:#a5b4fc;font-size:16px;margin-top:16px;">${s.canceling}</p>
      </div>
    `;

    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      const res = await fetch('/api/apply-retention-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          retentionId: this.retentionId,
          offerType: this.offerData.offerType
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'offer_expired') {
          showToast(s.offer_expired, 'warning', 4000);
          this.showStep1();
          return;
        }
        throw new Error(data.error);
      }

      this.close();
      showToast(s.offer_accepted, 'success', 5000);

    } catch (e) {
      console.error('Accept offer error:', e);
      this.close();
      showToast('❌ ' + e.message, 'error', 4000);
    }
  },

  // ── Accept final offer (step 5) ───────────────────────────
  async acceptFinalOffer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    // Reuse the same offer if available, else go back to step1
    if (this.retentionId && this.offerData) {
      await this.acceptOffer();
    } else {
      this.close();
    }
  },

  // ── Confirm cancel ────────────────────────────────────────
  async confirmCancel() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.close();

    // Call the actual cancel API
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      const s = this.s();

      if (res.ok && data.accessUntil) {
        const until = new Date(data.accessUntil * 1000).toLocaleDateString();
        showToast(`${s.cancel_confirmed} ${until}`, 'success', 7000);
        if (typeof loadSubscriptionStatus === 'function') loadSubscriptionStatus();
      } else {
        showToast('❌ ' + (data.error || 'Error'), 'error', 4000);
      }
    } catch (e) {
      showToast('❌ ' + e.message, 'error', 4000);
    }
  },

  // ── Entry point ───────────────────────────────────────────
  start() {
    this.currentStep = 1;
    this.reason = null;
    this.offerData = null;
    this.retentionId = null;
    this.showStep1();
  }
};

// Global entry point called from Settings button
function confirmCancelSubscription() {
  RetentionFlow.start();
}
