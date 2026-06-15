import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const plan = session.metadata.plan;

    await supabase.from('profiles').update({
      plan: plan,
      stripe_customer_id: session.customer,
      subscription_status: 'active'
    }).eq('id', userId);
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    await supabase.from('profiles').update({
      plan: 'free',
      subscription_status: 'canceled'
    }).eq('stripe_customer_id', sub.customer);
  }

  res.json({ received: true });
}
