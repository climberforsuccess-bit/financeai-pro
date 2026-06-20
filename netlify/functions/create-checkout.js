const Stripe = require('stripe');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { plan, billing, userId, email } = JSON.parse(event.body);

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
      return { statusCode: 400, body: JSON.stringify({ error: 'Plan inválido' }) };
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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url })
    };

  } catch (err) {
    console.error('Checkout error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
