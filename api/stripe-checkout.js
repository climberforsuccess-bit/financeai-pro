const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  monthly: {
    personal: 'price_1Tk7TDHXX8AdE0MTbQMaTXVj',
    pro:      'price_1Tk7TDHXX8AdE0MTDzFZhpVy',
    business: 'price_1Tk7TDHXX8AdE0MTCRlxfaDS'
  },
  annual: {
    personal: 'price_1Tk7WqHXX8AdE0MTYIRJTppV',
    pro:      'price_1Tk7WqHXX8AdE0MTnyH3Q8fG',
    business: 'price_1Tk7WrHXX8AdE0MTdLQalYJt'
  },
  yearly: {
    personal: 'price_1Tk7WqHXX8AdE0MTYIRJTppV',
    pro:      'price_1Tk7WqHXX8AdE0MTnyH3Q8fG',
    business: 'price_1Tk7WrHXX8AdE0MTdLQalYJt'
  }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { plan, billing = 'monthly', userId, email, priceId: directPriceId } = req.body;

    console.log('Checkout request:', { plan, billing, userId, email });

    const priceId = directPriceId || PRICE_IDS[billing]?.[plan];

    if (!priceId) {
      console.error('Plan no válido:', { plan, billing });
      return res.status(400).json({ error: `Plan no válido: ${plan}/${billing}` });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'https://www.climberforsuccess.online/?success=true',
      cancel_url:  'https://www.climberforsuccess.online/?canceled=true',
      metadata: { userId, plan, billing }
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
