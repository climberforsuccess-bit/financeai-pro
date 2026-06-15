const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const sig = req.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;
      const userId  = session.metadata.userId;
      const plan    = session.metadata.plan;

      await supabase.from('profiles').update({
        plan:                plan,
        stripe_customer_id:  session.customer,
        subscription_status: 'active'
      }).eq('id', userId);

      console.log(`✅ Plan activado: ${plan} para usuario ${userId}`);
    }

    if (stripeEvent.type === 'customer.subscription.deleted') {
      const sub = stripeEvent.data.object;

      await supabase.from('profiles').update({
        plan:                'free',
        subscription_status: 'canceled'
      }).eq('stripe_customer_id', sub.customer);

      console.log(`⚠️ Suscripción cancelada para customer ${sub.customer}`);
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: err.message });
  }
};
