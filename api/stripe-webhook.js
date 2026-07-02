import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  const sig = req.headers['stripe-signature'];
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const rawBody = Buffer.concat(chunks);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const obj = event.data.object;

  // ============================================
  // 1) CHECKOUT COMPLETED — Activate plan
  // ============================================
  if (event.type === 'checkout.session.completed') {
    const userId  = obj.metadata?.userId;
    const plan    = obj.metadata?.plan;
    const billing = obj.metadata?.billing;

    console.log('checkout.session.completed', { userId, plan, billing });

    if (userId) {
      const { error } = await supabase.from('profiles').upsert({
        id: userId,
        plan: plan,
        subscription_status: 'active',
        billing_period: billing,
        stripe_customer_id: obj.customer,
        stripe_subscription_id: obj.subscription,
        updated_at: new Date().toISOString()
      });
      if (error) console.error('Supabase upsert error:', error);
      else console.log('Plan activated:', userId, '->', plan);

      // Get user email
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single();

      if (profile?.email) {
        await resend.emails.send({
          from: 'FinanceAI <noreply@climberforsuccess.online>',
          to: profile.email,
          subject: '🎉 ¡Bienvenido a FinanceAI Pro!',
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
              <h1 style="color:#10b981;">¡Bienvenido a FinanceAI Pro!</h1>
              <p>Hola ${profile.full_name || 'there'},</p>
              <p>Tu plan <strong>${plan}</strong> está activo. Ya tienes acceso completo a todas las funciones.</p>
              <a href="https://www.climberforsuccess.online" 
                 style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
                Ir a mi dashboard →
              </a>
              <p style="color:#64748b;font-size:12px;margin-top:32px;">Puedes cancelar en cualquier momento desde Settings → Subscriptions.</p>
            </div>
          `
        });
        console.log('Welcome email sent to:', profile.email);
      }
    }
  }

  // ============================================
  // 2) SUBSCRIPTION UPDATED — Handle cancel_at_period_end
  // This fires when user cancels but still has access
  // ============================================
  if (event.type === 'customer.subscription.updated') {
    const cancelAtPeriodEnd = obj.cancel_at_period_end;
    const periodEnd = obj.current_period_end
      ? new Date(obj.current_period_end * 1000).toISOString()
      : null;

    console.log('subscription.updated', { cancelAtPeriodEnd, periodEnd });

    if (cancelAtPeriodEnd) {
      // User just cancelled — keep access until period end
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, email, full_name, plan')
        .eq('stripe_customer_id', obj.customer)
        .single();

      if (profile) {
        await supabase.from('profiles')
          .update({
            subscription_status: 'canceling',
            subscription_ends_at: periodEnd,
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id);

        console.log('Marked as canceling:', profile.id, 'until', periodEnd);

        // Email 1: Immediate cancellation confirmation
        if (profile.email) {
          const endDate = periodEnd
            ? new Date(periodEnd).toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' })
            : 'el fin del período';

          await resend.emails.send({
            from: 'FinanceAI <noreply@climberforsuccess.online>',
            to: profile.email,
            subject: 'Tu cancelación fue confirmada — acceso hasta ' + endDate,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
                <h1 style="color:#f59e0b;">Cancelación confirmada</h1>
                <p>Hola ${profile.full_name || 'there'},</p>
                <p>Hemos recibido tu solicitud de cancelación. Tu acceso a <strong>FinanceAI ${profile.plan}</strong> continuará activo hasta el <strong style="color:#10b981;">${endDate}</strong>.</p>
                <p>Durante este tiempo puedes seguir usando todas las funciones de tu plan sin restricciones.</p>
                <div style="background:#1e293b;border-radius:8px;padding:16px;margin:24px 0;">
                  <p style="margin:0;color:#94a3b8;font-size:14px;">¿Cancelaste por error o cambiaste de opinión?</p>
                  <a href="https://www.climberforsuccess.online/#pricing" 
                     style="display:inline-block;background:#10b981;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:12px;font-size:14px;">
                    Reactivar mi plan →
                  </a>
                </div>
                <p style="color:#64748b;font-size:12px;">Después del ${endDate} tu cuenta pasará al plan gratuito automáticamente.</p>
              </div>
            `
          });

          // Schedule follow-up emails via Supabase
          // We store them in a scheduled_emails table to be sent by a cron job
          const emailSchedule = [
            {
              user_id: profile.id,
              email: profile.email,
              send_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Day 3
              type: 'cancel_followup_day3',
              metadata: { plan: profile.plan, period_end: periodEnd, full_name: profile.full_name }
            },
            {
              user_id: profile.id,
              email: profile.email,
              send_at: new Date(obj.current_period_end * 1000 - 24 * 60 * 60 * 1000).toISOString(), // Day before end
              type: 'cancel_followup_last_day',
              metadata: { plan: profile.plan, period_end: periodEnd, full_name: profile.full_name }
            },
            {
              user_id: profile.id,
              email: profile.email,
              send_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // Day 14
              type: 'cancel_reengagement_day14',
              metadata: { plan: profile.plan, full_name: profile.full_name }
            },
            {
              user_id: profile.id,
              email: profile.email,
              send_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Day 30
              type: 'cancel_reengagement_day30',
              metadata: { plan: profile.plan, full_name: profile.full_name }
            }
          ];

          const { error: schedErr } = await supabase
            .from('scheduled_emails')
            .insert(emailSchedule);

          if (schedErr) console.error('Error scheduling emails:', schedErr);
          else console.log('Follow-up emails scheduled for:', profile.email);
        }
      }
    }
  }

  // ============================================
// 3) SUBSCRIPTION DELETED — Downgrade to free
// + Auto-refund if cancelled within 14 days
// ============================================
if (event.type === 'customer.subscription.deleted') {
  console.log('subscription.deleted for customer:', obj.customer);

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name, plan')
    .eq('stripe_customer_id', obj.customer)
    .single();

  // Check if within 14-day guarantee window
  const createdAt = new Date(obj.created * 1000);
  const now = new Date();
  const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);
  const withinGuarantee = diffDays <= 14;

  console.log('Days since subscription created:', Math.floor(diffDays), '| Within guarantee:', withinGuarantee);

  // Downgrade to free immediately
  await supabase.from('profiles')
    .update({
      plan: 'free',
      subscription_status: 'inactive',
      subscription_ends_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', obj.customer);

  console.log('Downgraded to free:', obj.customer);

  // Auto-refund if within 14 days
  if (withinGuarantee) {
    try {
      // Get latest invoice to find the charge
      const invoice = await stripe.invoices.retrieve(obj.latest_invoice);
      const paymentIntentId = invoice.payment_intent;

      if (paymentIntentId) {
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
          reason: 'requested_by_customer'
        });
        console.log('✅ Auto-refund issued:', refund.id, 'Amount:', refund.amount / 100);

        // Email: Refund confirmation
        if (profile?.email) {
          await resend.emails.send({
            from: 'FinanceAI <noreply@climberforsuccess.online>',
            to: profile.email,
            subject: '✅ Tu reembolso está en camino',
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
                <h1 style="color:#10b981;">Reembolso procesado ✅</h1>
                <p>Hola ${profile.full_name || 'there'},</p>
                <p>Hemos procesado tu reembolso completo. El dinero llegará a tu cuenta en <strong>5-10 días hábiles</strong> dependiendo de tu banco.</p>
                <div style="background:#1e293b;border-radius:8px;padding:16px;margin:24px 0;">
                  <p style="color:#94a3b8;font-size:14px;margin:0;">¿Quieres volver en el futuro? Tus datos siguen guardados.</p>
                  <a href="https://www.climberforsuccess.online/#pricing" 
                     style="display:inline-block;background:#10b981;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:12px;font-size:14px;">
                    Ver planes →
                  </a>
                </div>
                <p style="color:#64748b;font-size:12px;">Gracias por haber probado FinanceAI Pro.</p>
              </div>
            `
          });
          console.log('Refund email sent to:', profile.email);
        }
      }
    } catch (err) {
      console.error('❌ Error processing refund:', err.message);
    }
  } else {
    // Normal cancellation email (after 14 days)
    if (profile?.email) {
      await resend.emails.send({
        from: 'FinanceAI <noreply@climberforsuccess.online>',
        to: profile.email,
        subject: 'Tu cuenta cambió al plan gratuito',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:40px;border-radius:12px;">
            <h1 style="color:#94a3b8;">Tu cuenta es ahora Free</h1>
            <p>Hola ${profile.full_name || 'there'},</p>
            <p>Tu suscripción a <strong>FinanceAI ${profile.plan || 'Pro'}</strong> ha finalizado. Tu cuenta ha pasado al plan gratuito.</p>
            <div style="background:#1e293b;border-radius:8px;padding:16px;margin:24px 0;">
              <p style="color:#f59e0b;font-weight:700;margin:0 0 8px 0;">¿Quieres volver?</p>
              <p style="color:#94a3b8;font-size:14px;margin:0 0 12px 0;">Tus datos siguen guardados. Puedes reactivar tu plan en cualquier momento.</p>
              <a href="https://www.climberforsuccess.online/#pricing" 
                 style="display:inline-block;background:#10b981;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">
                Ver planes →
              </a>
            </div>
            <p style="color:#64748b;font-size:12px;">Gracias por haber sido parte de FinanceAI.</p>
          </div>
        `
      });
    }
  }
}
