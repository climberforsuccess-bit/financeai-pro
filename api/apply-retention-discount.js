import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' });

  const { retentionId, offerType } = req.body;

  try {
    // 1) Get retention offer
    const { data: offer, error: offerError } = await supabase
      .from('retention_offers')
      .select('*')
      .eq('id', retentionId)
      .eq('user_id', user.id)
      .single();

    if (offerError || !offer) return res.status(404).json({ error: 'Offer not found' });

    // 2) Check not expired
    if (new Date(offer.expires_at) < new Date()) {
      return res.status(400).json({ error: 'offer_expired' });
    }

    // 3) Check not already accepted
    if (offer.offer_accepted) {
      return res.status(400).json({ error: 'offer_already_used' });
    }

    // 4) Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_subscription_id, stripe_customer_id, retention_offer_used')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_subscription_id) {
      return res.status(400).json({ error: 'No active subscription' });
    }

    // 5) Apply based on offer type
    let result = {};

    if (offerType === 'discount_50' && offer.discount_coupon && offer.discount_coupon !== null) {
      // Apply coupon to subscription
      await stripe.subscriptions.update(profile.stripe_subscription_id, {
        coupon: offer.discount_coupon,
        cancel_at_period_end: false // undo any pending cancellation
      });
      result = { applied: 'discount_50', coupon: offer.discount_coupon };

    } else if (offerType === 'pause_30') {
      // Pause subscription for 30 days using Stripe pause_collection
      await stripe.subscriptions.update(profile.stripe_subscription_id, {
        pause_collection: {
          behavior: 'mark_uncollectible',
          resumes_at: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
        },
        cancel_at_period_end: false
      });
      result = { applied: 'pause_30', resumesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() };

    } else if (offerType === 'free_session' || offerType === 'support_priority' || offerType === 'keep_history') {
      // These are handled manually — just cancel the pending cancellation
      await stripe.subscriptions.update(profile.stripe_subscription_id, {
        cancel_at_period_end: false
      });
      result = { applied: offerType };
    }

    // 6) Mark offer as accepted
    await supabase
      .from('retention_offers')
      .update({ offer_accepted: true })
      .eq('id', retentionId);

    // 7) Update profile — mark offer used + reset canceling status
    await supabase
      .from('profiles')
      .update({
        retention_offer_used: true,
        subscription_status: 'active',
        cancel_at_period_end: false
      })
      .eq('id', user.id);

    return res.status(200).json({ success: true, ...result });

  } catch (e) {
    console.error('apply-retention-discount error:', e);
    return res.status(500).json({ error: e.message });
  }
}
