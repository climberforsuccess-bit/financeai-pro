import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No auth header' });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('vip_plan, vip_expiry, stripe_customer_id, stripe_subscription_id, subscription_status')
      .eq('id', user.id)
      .single();

    if (profileError) return res.status(500).json({ error: profileError.message });

    const now = new Date();
    const expiry = profile.vip_expiry ? new Date(profile.vip_expiry) : null;
    const isActive = expiry ? expiry > now : false;
    const isPro = (profile.vip_plan === 'pro' || profile.vip_plan === 'Pro' || profile.vip_plan === 'PRO') && isActive;

    return res.status(200).json({
      plan: isPro ? 'pro' : 'free',
      isActive,
      isPro,
      planExpiry: profile.vip_expiry,
      stripeSubscriptionId: profile.stripe_subscription_id,
      stripeCustomerId: profile.stripe_customer_id,
      subscriptionStatus: profile.subscription_status
    });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
