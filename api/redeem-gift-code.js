import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' });

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'code required' });

  const normalizedCode = code.trim().toUpperCase();

  // 1) Find code in DB
  const { data: gift, error: giftError } = await supabase
    .from('gift_codes')
    .select('*')
    .eq('code', normalizedCode)
    .single();

  if (giftError || !gift) return res.status(404).json({ error: 'invalid_code' });

  // 2) Check not already used
  if (gift.used) return res.status(400).json({ error: 'code_already_used' });

  // 3) Check not expired
  if (new Date(gift.expires_at) < new Date()) return res.status(400).json({ error: 'code_expired' });

  // 4) Mark as used
  const { error: updateError } = await supabase
    .from('gift_codes')
    .update({ used: true, used_by: user.id, used_at: new Date().toISOString() })
    .eq('code', normalizedCode);

  if (updateError) return res.status(500).json({ error: updateError.message });

  // 5) Update profile plan
  const planMap = {
    'Personal': 'personal',
    'Pro': 'pro',
    'Business': 'business'
  };
  const plan = planMap[gift.plan] || 'pro';

  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  await supabase
    .from('profiles')
    .update({
      plan,
      billing_period: gift.billing || 'monthly',
      subscription_status: 'gift',
      subscription_ends_at: expiresAt.toISOString()
    })
    .eq('id', user.id);

  return res.status(200).json({
    success: true,
    plan,
    billing: gift.billing || 'monthly'
  });
}
