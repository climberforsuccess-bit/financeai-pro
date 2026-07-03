import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Security: only allow GET with secret header or POST from cron
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Get all pending emails that should be sent now
  const { data: pending, error } = await supabase
    .from('scheduled_emails')
    .select('*')
    .eq('sent', false)
    .lte('send_at', new Date().toISOString())
    .limit(50);

  if (error) {
    console.error('Error fetching scheduled emails:', error);
    return res.status(500).json({ error: error.message });
  }

  console.log(`Processing ${pending?.length || 0} scheduled emails`);

  const results = [];

  for (const item of pending || []) {
    try {
      const emailContent = getEmailContent(item.type, item.metadata);
      if (!emailContent) {
        console.log('Unknown email type:', item.type);
        continue;
      }

      await resend.emails.send({
        from: 'FinanceAI <noreply@climberforsuccess.online>',
        to: item.email,
        subject: emailContent.subject,
        html: emailContent.html
      });

      // Mark as sent
      await supabase
        .from('scheduled_emails')
        .update({ sent: true, sent_at: new Date().toISOString() })
        .eq('id', item.id);

      results.push({ id: item.id, type: item.type, status: 'sent' });
      console.log('Email sent:', item.type, '->', item.email);

    } catch (err) {
      console.error('Error sending email:', item.id, err.message);
      results.push({ id: item.id, type: item.type, status: 'error', error: err.message });
    }
  }

  return res.status(200).json({
    processed: results.length,
    results
  });
}

// ============================================
// Email templates for each follow-up type
// ============================================
function getEmailContent(type, meta) {
  const name = meta?.full_name || 'there';
  const plan = meta?.plan || 'Pro';
  const endDate = meta?.period_end
    ? new Date(meta.period_end).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const templates = {

    // Day 3 — We miss you
    cancel_followup_day3: {
      subject: '¿Todo bien con tus finanzas? 👀',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
          <h1 style="color:#10b981;">Te extrañamos, ${name}</h1>
          <p>Hace 3 días cancelaste tu plan <strong>FinanceAI ${plan}</strong>. Todavía tienes acceso hasta el <strong>${endDate || 'fin del período'}</strong>.</p>
          <p>Antes de que se acabe tu acceso, ¿sabías que puedes:</p>
          <ul style="color:#94a3b8;line-height:2;">
            <li>📊 Ver reportes detallados de tus gastos</li>
            <li>🤖 Preguntarle a la IA cualquier duda financiera</li>
            <li>💳 Obtener recomendaciones de tarjetas personalizadas</li>
            <li>📄 Escanear recibos automáticamente</li>
          </ul>
          <a href="https://www.climberforsuccess.online/#pricing" 
             style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
            Reactivar mi plan →
          </a>
          <p style="color:#64748b;font-size:12px;margin-top:32px;">Si ya tomaste tu decisión, no hay problema. Siempre puedes volver cuando quieras.</p>
        </div>
      `
    },

    // Last day before downgrade
    cancel_followup_last_day: {
      subject: '⏰ Último día de acceso completo',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
          <h1 style="color:#f59e0b;">Mañana tu cuenta cambia a Free</h1>
          <p>Hola ${name},</p>
          <p>Hoy es tu último día con acceso completo a <strong>FinanceAI ${plan}</strong>. Mañana tu cuenta pasará al plan gratuito.</p>
          <div style="background:#1e293b;border-radius:8px;padding:16px;margin:24px 0;border-left:4px solid #f59e0b;">
            <p style="margin:0;font-weight:700;color:#f59e0b;">¿Cambias de opinión?</p>
            <p style="color:#94a3b8;font-size:14px;margin:8px 0 0 0;">Reactiva hoy y no perderás nada. Tus datos siguen intactos.</p>
          </div>
          <a href="https://www.climberforsuccess.online/#pricing" 
             style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">
            Reactivar antes de que expire →
          </a>
          <p style="color:#64748b;font-size:12px;margin-top:32px;">Gracias por haber usado FinanceAI.</p>
        </div>
      `
    },

    // Day 14 — Re-engagement
    cancel_reengagement_day14: {
      subject: '¿Cómo van tus finanzas este mes? 📊',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
          <h1 style="color:#10b981;">¿Cómo van tus finanzas, ${name}?</h1>
          <p>Han pasado 2 semanas desde que dejaste FinanceAI. Solo queríamos saber cómo estás manejando tus finanzas.</p>
          <p style="color:#94a3b8;">Si extrañas tener todo organizado en un solo lugar, siempre puedes volver. Tus datos siguen guardados.</p>
          <a href="https://www.climberforsuccess.online/#pricing" 
             style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:8px;">
            Ver mi cuenta →
          </a>
          <p style="color:#64748b;font-size:12px;margin-top:32px;">Este es un email automático. Puedes ignorarlo si no estás interesado.</p>
        </div>
      `
    },

    // Day 30 — Final offer
    cancel_reengagement_day30: {
      subject: '🎁 Oferta especial para volver — solo para ti',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
          <h1 style="color:#f59e0b;">Una oferta especial para ti, ${name}</h1>
          <p>Hace un mes dejaste FinanceAI. Queremos que vuelvas con una oferta exclusiva:</p>
          <div style="background:#1e293b;border-radius:12px;padding:24px;margin:24px 0;text-align:center;border:2px solid #10b981;">
            <p style="color:#10b981;font-size:24px;font-weight:700;margin:0;">20% de descuento</p>
            <p style="color:#94a3b8;margin:8px 0 0 0;">en tu primer mes al reactivar</p>
            <p style="font-size:11px;color:#64748b;margin:8px 0 0 0;">Válido por 48 horas</p>
          </div>
          <a href="https://www.climberforsuccess.online/#pricing?prefilled_promo_code=COMEBACK20
" 
             style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;width:100%;text-align:center;box-sizing:border-box;">
            Reclamar mi descuento →
          </a>
          <p style="color:#64748b;font-size:12px;margin-top:32px;">Si no quieres recibir más emails, ignora este mensaje.</p>
        </div>
      `
    }
  };

  return templates[type] || null;
}
