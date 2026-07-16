content = '''import { createClient } from \'@supabase/supabase-js\';
import Stripe from \'stripe\';
import OpenAI from \'openai\';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== \'POST\') return res.status(405).json({ error: \'Method not allowed\' });

  const authHeader = req.headers.authorization || \'\';
  const token = authHeader.replace(\'Bearer \', \'\');
  if (!token) return res.status(401).json({ error: \'Unauthorized\' });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: \'Unauthorized\' });

  const { action } = req.body;

  // ── ACTION: offer ──────────────────────────────────────────────
  if (action === \'offer\') {
    const { reason, lang = \'es\', userStats } = req.body;
    try {
      const { data: profile, error: profileError } = await supabase
        .from(\'profiles\')
        .select(\'plan, billing_period, created_at, days_active, ai_usage_count, retention_offer_used, stripe_customer_id, stripe_subscription_id, subscription_ends_at, subscription_status\')
        .eq(\'id\', user.id)
        .single();

      if (profileError) console.error(\'Profile fetch error:\', profileError.message);

      const daysActive = profile?.days_active
        || (profile?.created_at
          ? Math.floor((Date.now() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24))
          : userStats?.daysActive || 0);

      const activePlan = profile?.billing_period || \'monthly\';
      const planPriceMap = { free: 0, personal: 9.99, pro: 19.99, business: 49.99 };
      const planPrice = planPriceMap[profile?.plan] || (activePlan === \'annual\' ? 15.99 : 9.99);
      const planNames = { free: \'Free\', personal: \'Personal\', pro: \'Pro\', business: \'Business\' };
      const planBase = planNames[profile?.plan] || \'Pro\';
      const planLabel = `${planBase} ${activePlan === \'annual\' ? (lang === \'es\' ? \'Anual\' : \'Annual\') : (lang === \'es\' ? \'Mensual\' : \'Monthly\')}`;

      const expiryDate = profile?.subscription_ends_at
        ? new Date(profile.subscription_ends_at).toLocaleDateString(lang === \'es\' ? \'es-ES\' : \'en-US\')
        : null;

      const alreadyUsedOffer = profile?.retention_offer_used || false;

      const offerMap = {
        too_expensive: \'discount_50\', no_use: \'free_session\', technical: \'support_priority\',
        pause: \'pause_30\', goal_achieved: \'keep_history\', other: \'discount_50\'
      };
      const offerType = offerMap[reason] || \'discount_50\';

      let couponId = null;
      let discountedPrice = null;

      if (offerType === \'discount_50\' && !alreadyUsedOffer) {
        discountedPrice = (planPrice * 0.5).toFixed(2);
        if (profile?.stripe_customer_id) {
          try {
            const coupon = await stripe.coupons.create({
              percent_off: 50, duration: \'repeating\', duration_in_months: 3,
              max_redemptions: 1, metadata: { user_id: user.id, reason }
            });
            couponId = coupon.id;
          } catch (e) { console.error(\'Coupon creation failed:\', e.message); }
        }
      }

      const systemPrompt = lang === \'es\'
        ? `Eres el asistente de retención de FinanceAI. Tu objetivo es convencer al usuario de NO cancelar su suscripción. Sé empático, persuasivo, personalizado y emocional. Usa los datos reales del usuario. Máximo 3 oraciones. No uses markdown. Habla directamente al usuario.`
        : `You are FinanceAI\'s retention assistant. Your goal is to convince the user NOT to cancel their subscription. Be empathetic, persuasive, personalized and emotional. Use the user\'s real data. Maximum 3 sentences. No markdown. Speak directly to the user.`;

      const userContext = lang === \'es\'
        ? `El usuario lleva ${daysActive} días con FinanceAI Pro (${planLabel}). Ha realizado ${userStats?.transactions || 0} transacciones, tiene ${userStats?.activeGoals || 0} metas activas con ${userStats?.goalsProgress || 0}% de progreso promedio, y ha hecho ${profile?.ai_usage_count || 0} consultas a la IA. Su razón para cancelar es: ${reason}. ${alreadyUsedOffer ? \'Ya usó una oferta antes.\' : \'Es la primera vez que intenta cancelar.\'}`
        : `The user has been with FinanceAI Pro (${planLabel}) for ${daysActive} days. They have ${userStats?.transactions || 0} transactions, ${userStats?.activeGoals || 0} active goals with ${userStats?.goalsProgress || 0}% average progress, and made ${profile?.ai_usage_count || 0} AI queries. Their reason to cancel: ${reason}. ${alreadyUsedOffer ? \'They already used an offer before.\' : \'First time trying to cancel.\'}`;

      const aiResponse = await openai.chat.completions.create({
        model: \'gpt-4o-mini\',
        messages: [{ role: \'system\', content: systemPrompt }, { role: \'user\', content: userContext }],
        max_tokens: 150, temperature: 0.8
      });

      const aiMessage = aiResponse.choices[0]?.message?.content?.trim() || \'\';

      let retentionRecord = null;
      const { data: profileCheck } = await supabase.from(\'profiles\').select(\'id\').eq(\'id\', user.id).single();
      if (profileCheck) {
        const { data: inserted, error: insertError } = await supabase
          .from(\'retention_offers\')
          .insert({
            user_id: user.id, reason, offer_type: offerType, offer_accepted: false,
            discount_coupon: couponId, ai_message: aiMessage,
            expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
          }).select().single();
        if (insertError) console.error(\'Retention insert error:\', insertError.message);
        else retentionRecord = inserted;
      }

      return res.status(200).json({
        success: true, offerType, couponId, discountedPrice, originalPrice: planPrice,
        planLabel, daysActive, expiryDate, aiMessage, alreadyUsedOffer,
        retentionId: retentionRecord?.id,
        stats: { transactions: userStats?.transactions || 0, activeGoals: userStats?.activeGoals || 0, goalsProgress: userStats?.goalsProgress || 0, aiUsage: profile?.ai_usage_count || 0 }
      });
    } catch (e) {
      console.error(\'retention offer error:\', e);
      return res.status(500).json({ error: e.message });
    }
  }

  // ── ACTION: apply ──────────────────────────────────────────────
  if (action === \'apply\') {
    const { retentionId, offerType } = req.body;
    try {
      const { data: offer, error: offerError } = await supabase
        .from(\'retention_offers\').select(\'*\').eq(\'id\', retentionId).eq(\'user_id\', user.id).single();

      if (offerError || !offer) return res.status(404).json({ error: \'Offer not found\' });
      if (new Date(offer.expires_at) < new Date()) return res.status(400).json({ error: \'offer_expired\' });
      if (offer.offer_accepted) return res.status(400).json({ error: \'offer_already_used\' });

      const { data: profile } = await supabase
        .from(\'profiles\').select(\'stripe_subscription_id, stripe_customer_id, retention_offer_used\').eq(\'id\', user.id).single();

      if (!profile?.stripe_subscription_id) return res.status(400).json({ error: \'No active subscription\' });

      let result = {};

      if (offerType === \'discount_50\' && offer.discount_coupon) {
        await stripe.subscriptions.update(profile.stripe_subscription_id, { coupon: offer.discount_coupon, cancel_at_period_end: false });
        result = { applied: \'discount_50\', coupon: offer.discount_coupon };
      } else if (offerType === \'pause_30\') {
        await stripe.subscriptions.update(profile.stripe_subscription_id, {
          pause_collection: { behavior: \'mark_uncollectible\', resumes_at: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) },
          cancel_at_period_end: false
        });
        result = { applied: \'pause_30\', resumesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() };
      } else {
        await stripe.subscriptions.update(profile.stripe_subscription_id, { cancel_at_period_end: false });
        result = { applied: offerType };
      }

      await supabase.from(\'retention_offers\').update({ offer_accepted: true }).eq(\'id\', retentionId);
      await supabase.from(\'profiles\').update({ retention_offer_used: true, subscription_status: \'active\', cancel_at_period_end: false }).eq(\'id\', user.id);

      return res.status(200).json({ success: true, ...result });
    } catch (e) {
      console.error(\'apply retention error:\', e);
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(400).json({ error: \'Invalid action. Use action: offer or action: apply\' });
}
'''

with open('api/retention.js', 'w') as f:
    f.write(content)
print("✅ api/retention.js creado")
