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
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const obj = event.data.object;

  if (event.type === 'checkout.session.completed') {
    const userId  = obj.metadata?.userId;
    const plan    = obj.metadata?.plan;
    const billing = obj.metadata?.billing;

    console.log('checkout.session.completed:', { userId, plan, billing });

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
      if (error) console.error('Supabase error:', error);
      else console.log('Plan actualizado:', userId, '->', plan);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const customerId = obj.customer;
    await supabase.from('profiles')
      .update({ 
        plan: 'free', 
        subscription_status: 'inactive', 
        updated_at: new Date().toISOString() 
      })
      .eq('stripe_customer_id', customerId);
  }

  return res.status(200).json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };
