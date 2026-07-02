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
      .select('plan, subscription_status, subscription_ends_at, stripe_customer_id, stripe_subscription_id')
      .eq('id', user.id)
      .single();

    if (profileError) return res.status(500).json({ error: profileError.message });

    const now = new Date();
    const endsAt = profile.subscription_ends_at ? new Date(profile.subscription_ends_at) : null;
    const isPro = profile.plan === 'pro' || profile.plan === 'Pro' || profile.plan === 'PRO';
    const isActive = isPro && profile.subscription_status === 'active';
    const isCanceling = profile.subscription_status === 'canceling';

    return res.status(200).json({
      plan: profile.plan || 'free',
      isPro,
      isActive,
      isCanceling,
      subscriptionStatus: profile.subscription_status,
      subscriptionEndsAt: profile.subscription_ends_at,
      stripeSubscriptionId: profile.stripe_subscription_id,
      stripeCustomerId: profile.stripe_customer_id
    });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
