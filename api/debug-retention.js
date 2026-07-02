import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  const errors = [];
  const info = {};

  // Check env vars
  info.hasSupabaseUrl = !!process.env.SUPABASE_URL;
  info.hasSupabaseKey = !!process.env.SUPABASE_SERVICE_KEY;
  info.hasStripeKey = !!process.env.STRIPE_SECRET_KEY;
  info.hasOpenAIKey = !!process.env.OPENAI_API_KEY;

  // Test Supabase connection
  try {
    const { data, error } = await supabase
      .from('retention_offers')
      .select('id')
      .limit(1);
    if (error) errors.push('Supabase retention_offers: ' + error.message);
    else info.retentionOffersOk = true;
  } catch(e) {
    errors.push('Supabase exception: ' + e.message);
  }

  // Test insert
  try {
    const { data, error } = await supabase
      .from('retention_offers')
      .insert({
        user_id: '00000000-0000-0000-0000-000000000000',
        reason: 'test',
        offer_type: 'discount_50',
        offer_accepted: false,
        discount_coupon: null,
        ai_message: 'test',
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
      })
      .select()
      .single();
    if (error) errors.push('Insert error: ' + error.message);
    else info.insertOk = true;
  } catch(e) {
    errors.push('Insert exception: ' + e.message);
  }

  return res.status(200).json({ info, errors });
}
