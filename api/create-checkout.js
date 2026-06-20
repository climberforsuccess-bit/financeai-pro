const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { plan, billing, userId, email } = req.body;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const prices = {
      personal: {
        monthly: 'price_1Tf0b8HXX8AdE0MTRi1RMAsq',
        annual:  'price_1TfM9ZHXX8AdE0MTluR7y3i5'
      },
      pro: {
        monthly: 'price_1Tf0eJHXX8AdE0MTP87khCpZ',
        annual:  'price_1TfMBCHXX8AdE0MTSLvsF8PC'
      },
      business: {
        monthly: 'price_1TfM6MHXX8AdE0MTX7PsMhBB',
        annual:  'price_1TfMBfHXX8AdE0MTF9Wghval'
      }
    };

    const priceId = prices[plan]?.[billing || 'monthly'];
    if (!priceId) {
      return res.status(400).json({ error: 'Plan inválido' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId, plan, billing },
      success_url: 'https://www.climberforsuccess.online/?success=true',
      cancel_url:  'https://www.climberforsuccess.online/?canceled=true',
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: err.message });
  }
};
