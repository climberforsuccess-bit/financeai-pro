const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const userId = session.metadata.userId;

    await supabase
      .from('profiles')
      .update({ 
        is_premium: true,
        stripe_customer_id: session.customer,
        subscription_id: session.subscription
      })
      .eq('id', userId);
  }

  if (stripeEvent.type === 'customer.subscription.deleted') {
    const subscription = stripeEvent.data.object;

    await supabase
      .from('profiles')
      .update({ is_premium: false })
      .eq('stripe_customer_id', subscription.customer);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
