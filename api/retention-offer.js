import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import OpenAI from 'openai';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' });

  const { reason, lang = 'es', userStats } = req.body;

  try {
    // 1) Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('plan, billing_period, created_at, days_active, ai_usage_count, retention_offer_used, stripe_customer_id, stripe_subscription_id, subscription_ends_at, subscription_status')
      .eq('id', user.id)
      .single();

    if (profileError) console.error('Profile fetch error:', profileError.message);

    // 2) Calculate real stats
    const daysActive = profile?.days_active
      || (profile?.created_at
        ? Math.floor((Date.now() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24))
        : userStats?.daysActive || 0);

    const activePlan = profile?.billing_period || 'monthly';
    const planPriceMap = { free: 0, personal: 9.99, pro: 19.99, business: 49.99 };
    const planPrice = planPriceMap[profile?.plan] || (activePlan === 'annual' ? 15.99 : 9.99);
    const planNames = { free: 'Free', personal: 'Personal', pro: 'Pro', business: 'Business' };
    const planBase = planNames[profile?.plan] || 'Pro';
    const planLabel = `${planBase} ${activePlan === 'annual' ? (lang === 'es' ? 'Anual' : 'Annual') : (lang === 'es' ? 'Mensual' : 'Monthly')}`;

    const expiryDate = profile?.subscription_ends_at
      ? new Date(profile.subscription_ends_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US')
      : null;

    const alreadyUsedOffer = profile?.retention_offer_used || false;

    // 3) Determine offer type based on reason
    const offerMap = {
      too_expensive:  'discount_50',
      no_use:         'free_session',
      technical:      'support_priority',
      pause:          'pause_30',
      goal_achieved:  'keep_history',
      other:          'discount_50'
    };
    const offerType = offerMap[reason] || 'discount_50';

    // 4) Generate Stripe coupon if discount offer and not already used
    let couponId = null;
    let discountedPrice = null;

    if (offerType === 'discount_50' && !alreadyUsedOffer) {
      // Always calculate discounted price for display
      discountedPrice = (planPrice * 0.5).toFixed(2);

      // Only create Stripe coupon if customer exists
      if (profile?.stripe_customer_id) {
        try {
          const coupon = await stripe.coupons.create({
            percent_off: 50,
            duration: 'repeating',
            duration_in_months: 3,
            max_redemptions: 1,
            metadata: { user_id: user.id, reason }
          });
          couponId = coupon.id;
        } catch (e) {
          console.error('Coupon creation failed:', e.message);
        }
      }
    }

    // 5) Generate AI personalized message
    const systemPrompt = lang === 'es'
      ? `Eres el asistente de retención de FinanceAI. Tu objetivo es convencer al usuario de NO cancelar su suscripción. 
         Sé empático, persuasivo, personalizado y emocional. Usa los datos reales del usuario. 
         Máximo 3 oraciones. No uses markdown. Habla directamente al usuario.`
      : `You are FinanceAI's retention assistant. Your goal is to convince the user NOT to cancel their subscription.
         Be empathetic, persuasive, personalized and emotional. Use the user's real data.
         Maximum 3 sentences. No markdown. Speak directly to the user.`;

    const userContext = lang === 'es'
      ? `El usuario lleva ${daysActive} días con FinanceAI Pro (${planLabel}). 
         Ha realizado ${userStats?.transactions || 0} transacciones, tiene ${userStats?.activeGoals || 0} metas activas 
         con ${userStats?.goalsProgress || 0}% de progreso promedio, y ha hecho ${profile?.ai_usage_count || 0} consultas a la IA.
         Su razón para cancelar es: ${reason}. ${alreadyUsedOffer ? 'Ya usó una oferta antes.' : 'Es la primera vez que intenta cancelar.'}`
      : `The user has been with FinanceAI Pro (${planLabel}) for ${daysActive} days.
         They have ${userStats?.transactions || 0} transactions, ${userStats?.activeGoals || 0} active goals
         with ${userStats?.goalsProgress || 0}% average progress, and made ${profile?.ai_usage_count || 0} AI queries.
         Their reason to cancel: ${reason}. ${alreadyUsedOffer ? 'They already used an offer before.' : 'First time trying to cancel.'}`;

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContext }
      ],
      max_tokens: 150,
      temperature: 0.8
    });

    const aiMessage = aiResponse.choices[0]?.message?.content?.trim() || '';

      // 6) Save retention offer to DB
      let retentionRecord = null;
      const { data: profileCheck } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileCheck) {
        const { data: inserted, error: insertError } = await supabase
          .from('retention_offers')
          .insert({
            user_id: user.id,
            reason,
            offer_type: offerType,
            offer_accepted: false,
            discount_coupon: couponId,
            ai_message: aiMessage,
            expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
          })
          .select()
          .single();
        if (insertError) console.error('Retention insert error:', insertError.message);
        else retentionRecord = inserted;
      } else {
        console.warn('Profile not found for user:', user.id);
      }

    return res.status(200).json({
      success: true,
      offerType,
      couponId,
      discountedPrice,
      originalPrice: planPrice,
      planLabel,
      daysActive,
      expiryDate,
      aiMessage,
      alreadyUsedOffer,
      retentionId: retentionRecord?.id,
      stats: {
        transactions: userStats?.transactions || 0,
        activeGoals: userStats?.activeGoals || 0,
        goalsProgress: userStats?.goalsProgress || 0,
        aiUsage: profile?.ai_usage_count || 0
      }
    });

  } catch (e) {
    console.error('retention-offer error:', e);
    return res.status(500).json({ error: e.message });
  }
}
