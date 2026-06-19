const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const session = event.data.object;

  if (event.type === 'checkout.session.completed') {
    const userId = session.metadata?.userId;
    const plan   = session.metadata?.plan;
    const billing = session.metadata?.billing;

    if (userId) {
      await supabase.from('profiles').upsert({
        id: userId,
        plan: plan,
        subscription_status: 'active',
        billing_period: billing,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        updated_at: new Date().toISOString()
      });
      console.log(`✅ Plan actualizado: ${userId} → ${plan}`);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const customerId = session.customer;
    await supabase.from('profiles')
      .update({ plan: 'free', subscription_status: 'inactive', updated_at: new Date().toISOString() })
      .eq('stripe_customer_id', customerId);
  }

  return res.status(200).json({ received: true });
};
