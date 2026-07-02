import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify auth
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

    // Get subscription from Supabase
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_subscription_id, stripe_customer_id, vip_expiry, vip_plan')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (!profile.stripe_subscription_id) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    // Cancel at period end (not immediately)
    const subscription = await stripe.subscriptions.update(
      profile.stripe_subscription_id,
      { cancel_at_period_end: true }
    );

    const accessUntil = new Date(subscription.current_period_end * 1000);

    // Update Supabase
    await supabase
      .from('profiles')
      .update({
        subscription_status: 'canceling',
        cancel_at_period_end: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    // Schedule cancellation emails
    const emailsToSchedule = [
      {
        user_id: user.id,
        email: user.email,
        email_type: 'cancellation_confirmed',
        scheduled_for: new Date().toISOString(),
        metadata: {
          plan: profile.vip_plan,
          access_until: accessUntil.toISOString()
        }
      },
      {
        user_id: user.id,
        email: user.email,
        email_type: 'win_back_day3',
        scheduled_for: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: { plan: profile.vip_plan }
      },
      {
        user_id: user.id,
        email: user.email,
        email_type: 'win_back_day14',
        scheduled_for: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: { plan: profile.vip_plan }
      },
      {
        user_id: user.id,
        email: user.email,
        email_type: 'win_back_day30',
        scheduled_for: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: { plan: profile.vip_plan }
      }
    ];

    await supabase
      .from('scheduled_emails')
      .insert(emailsToSchedule);

    return res.status(200).json({
      success: true,
      message: 'Subscription will cancel at period end',
      accessUntil: accessUntil.toISOString(),
      cancelAt: subscription.cancel_at
    });

  } catch (error) {
    console.error('Cancel subscription error:', error);
    return res.status(500).json({ error: error.message });
  }
}
