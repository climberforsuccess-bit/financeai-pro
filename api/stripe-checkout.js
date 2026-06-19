const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Price IDs de Stripe (sincronizados con payment.js)
const PRICE_IDS = {
  monthly: {
    personal: 'price_1Tf0b8HXX8AdE0MTRi1RMAsq',
    pro:      'price_1Tf0eJHXX8AdE0MTP87khCpZ',
    business: 'price_1TfM6MHXX8AdE0MTX7PsMhBB'
  },
  yearly: {
    personal: 'price_1TfM9ZHXX8AdE0MTluR7y3i5',
    pro:      'price_1TfMBCHXX8AdE0MTSLvsF8PC',
    business: 'price_1TfMBfHXX8AdE0MTF9Wghval'
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { plan, billing = 'monthly', userId, email, priceId: directPriceId } = req.body;

    // Acepta priceId directo O plan+billing
    const priceId = directPriceId || PRICE_IDS[billing]?.[plan];

    if (!priceId) {
      return res.status(400).json({ error: `Plan no válido: ${plan}/${billing}` });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'https://climberforsuccess.online/?success=true',
      cancel_url:  'https://climberforsuccess.online/?canceled=true',
      metadata: { userId, plan, billing }
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: err.message });
  }
}
