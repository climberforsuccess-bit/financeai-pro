// ===========================
// FINANCEAI PRO — PAYMENT.JS
// Stripe + PayPal Integration
// Climberforsuccess LLC
// ===========================

// ===========================
// CONFIGURATION
// ===========================
const STRIPE_KEY = 'pk_live_51TexEgHXX8AdE0MTtugamR8bQzamJ2vTtvcOwJbTd1i6fcKSNKByNlckNpSuZ45Um9AxRbtj2VIqkoar9SBcQTvP00lW0ThQU2';

const PAYPAL_CLIENT_ID = 'AUjS9cRqaCpHKaR8J-B_rpJprevENStW_F-ngANjg7kvDmkvSiNbdgAUOu8Xed8A7JvWO9fzJos4_i13';

const PLANS = {
  personal: {
    name: 'Personal',
    monthly: {
      price: '$9.99/month',
      stripe: 'price_1Tf0b8HXX8AdE0MTRi1RMAsq',
      paypal: 'P-1C613827BN132741TNISJZOQ'
    },
    annual: {
      price: '$99.99/year',
      stripe: 'price_1TfM9ZHXX8AdE0MTluR7y3i5',
      paypal: 'P-1NG58532HG865132NNISJ6IA'
    }
  },
  pro: {
    name: 'Pro',
    monthly: {
      price: '$19.99/month',
      stripe: 'price_1Tf0eJHXX8AdE0MTP87khCpZ',
      paypal: 'P-9KA89434V85402529NISVZDA'
    },
    annual: {
      price: '$199.99/year',
      stripe: 'price_1TfMBCHXX8AdE0MTSLvsF8PC',
      paypal: 'P-0XK45981823310153NISWCTY'
    }
  },
  business: {
    name: 'Business',
    monthly: {
      price: '$49.99/month',
      stripe: 'price_1TfM6MHXX8AdE0MTX7PsMhBB',
      paypal: 'P-2L135544HD103830JNISV5QI'
    },
    annual: {
      price: '$499.99/year',
      stripe: 'price_1TfMBfHXX8AdE0MTF9Wghval',
      paypal: 'P-3A6621777T500123XNISV7OA'
    }
  }
};

// ===========================
// STATE
// ===========================
let currentPlan = null;
let stripeInstance = null;
let paypalLoaded = false;

// ===========================
// OPEN PAYMENT MODAL
// ===========================
function openPaymentModal(planKey, billing = 'monthly') {
  currentPlan = planKey;
  currentBilling = billing;

  const plan = PLANS[planKey];
  const details = plan[billing];

  // Set modal info
  const modalPlanName = document.getElementById('modalPlanName');
  if (modalPlanName) {
    modalPlanName.textContent = `${plan.name} — ${details.price}`;
  }

  // Show modal
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.add('active');
  }

  // Load Stripe
  loadStripeButton(details.stripe, plan.name, details.price);

  // Load PayPal
  loadPayPalButton(details.paypal);
}

// ===========================
// CLOSE MODAL
// ===========================
function closeModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.remove('active');
  }

  // Clear containers
  const stripeContainer = document.getElementById('stripe-button-container');
  const paypalContainer = document.getElementById('paypal-button-container');

  if (stripeContainer) stripeContainer.innerHTML = '';
  if (paypalContainer) paypalContainer.innerHTML = '';

  paypalLoaded = false;
}

// Close modal clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('paymentModal');
  if (modal && e.target === modal) {
    closeModal();
  }
});

// ===========================
// TAB SWITCHING
// ===========================
function showTab(tab) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  const tabContent = document.getElementById(tab + 'Tab');
  if (tabContent) {
    tabContent.classList.add('active');
  }
}

// ===========================
// STRIPE INTEGRATION
// ===========================
function loadStripeButton(priceId, planName, price) {
  const container = document.getElementById('stripe-button-container');
  if (!container) return;

  container.innerHTML = `
    <div style="margin-bottom: 16px;">
      <div style="
        background: rgba(0,238,255,0.05);
        border: 1px solid rgba(0,238,255,0.15);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
        font-size: 0.9rem;
        color: #A0B0C0;
      ">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span>Plan:</span>
          <strong style="color:#fff">${planName}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>Amount:</span>
          <strong style="color:#00EEFF">${price}</strong>
        </div>
      </div>
      <button 
        onclick="redirectToStripeCheckout('${priceId}')"
        style="
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #00EEFF, #0088FF);
          color: #000;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
        "
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 0 20px rgba(0,238,255,0.4)'"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
      >
        💳 Pay with Card (Stripe)
      </button>
      <p style="
        text-align: center;
        font-size: 0.75rem;
        color: #A0B0C0;
        margin-top: 10px;
      ">
        🔒 Secure payment powered by Stripe
      </p>
    </div>
  `;
}

// ===========================
// STRIPE CHECKOUT REDIRECT
// ===========================
async function redirectToStripeCheckout(priceId) {
  try {
    showLoadingState('stripe-button-container');

    // Get user info
    const user = window.STATE ? window.STATE.user : null;
    const planName = currentPlan || 'personal';

    // Call Netlify Function to create checkout session
    const response = await fetch('/api/stripe-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        planName,
        userId: user ? user.id : '',
        userEmail: user ? user.email : ''
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Could not create checkout session');
    }

    // Save intended plan before redirect
    localStorage.setItem('financeai_intended_plan', planName);

    // Redirect to Stripe Checkout
    window.location.href = data.url;

  } catch (err) {
    console.error('Stripe error:', err);
    showPaymentError('stripe-button-container', err.message || 'Payment failed. Please try again.');
  }
}

// Load Stripe.js dynamically
function loadStripeScript() {
  return new Promise((resolve, reject) => {
    if (window.Stripe) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ===========================
// PAYPAL INTEGRATION
// ===========================
function loadPayPalButton(planId) {
  if (paypalLoaded) return;
  paypalLoaded = true;

  const container = document.getElementById('paypal-button-container');
  if (!container) return;

  container.innerHTML = '<div style="text-align:center; padding:20px; color:#A0B0C0;">Loading PayPal...</div>';

  // Load PayPal SDK
  loadPayPalScript().then(() => {
    container.innerHTML = '';

    try {
      paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: planId
          });
        },
        onApprove: function(data, actions) {
          handlePayPalSuccess(data.subscriptionID);
        },
        onError: function(err) {
          console.error('PayPal error:', err);
          showPaymentError('paypal-button-container', 'PayPal payment failed. Please try again.');
        },
        onCancel: function(data) {
          console.log('PayPal cancelled:', data);
          container.innerHTML = `
            <div style="
              text-align: center;
              padding: 20px;
              color: #A0B0C0;
              font-size: 0.9rem;
            ">
              Payment cancelled. 
              <button onclick="loadPayPalButton('${planId}')" style="
                background: none;
                border: none;
                color: #00EEFF;
                cursor: pointer;
                font-size: 0.9rem;
                text-decoration: underline;
              ">Try again</button>
            </div>
          `;
          paypalLoaded = false;
        }
      }).render('#paypal-button-container');
    } catch (err) {
      console.error('PayPal render error:', err);
      showPaymentError('paypal-button-container', 'Could not load PayPal. Please use card payment.');
    }
  }).catch(err => {
    console.error('PayPal SDK load error:', err);
    showPaymentError('paypal-button-container', 'Could not load PayPal SDK.');
  });
}

// Load PayPal SDK dynamically
function loadPayPalScript() {
  return new Promise((resolve, reject) => {
    if (window.paypal) {
      resolve();
      return;
    }
    // Remove existing PayPal scripts
    const existing = document.querySelector('script[src*="paypal"]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ===========================
// SUCCESS HANDLERS
// ===========================
function handlePayPalSuccess(subscriptionId) {
  closeModal();

  // Save subscription to localStorage
  const subscription = {
    id: subscriptionId,
    plan: currentPlan,
    billing: currentBilling,
    provider: 'paypal',
    date: new Date().toISOString()
  };

  localStorage.setItem('financeai_subscription', JSON.stringify(subscription));
  localStorage.setItem('financeai_plan', currentPlan);

  // Show success
  showSuccessMessage(subscriptionId);

  // Redirect after 3 seconds
  setTimeout(() => {
    window.location.href = 'app.html';
  }, 3000);
}

function showSuccessMessage(subscriptionId) {
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    background: linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,238,255,0.1));
    border: 1px solid rgba(0,255,136,0.4);
    border-radius: 16px;
    padding: 20px 24px;
    color: #fff;
    font-family: 'Inter', sans-serif;
    z-index: 99999;
    max-width: 360px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: slideIn 0.3s ease;
  `;
  successDiv.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="font-size:1.5rem;">✅</span>
      <div>
        <div style="font-weight:700; margin-bottom:4px;">Payment Successful!</div>
        <div style="font-size:0.8rem; color:#A0B0C0;">
          Welcome to FinanceAI Pro ${currentPlan}!<br>
          Redirecting to dashboard...
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function showLoadingState(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div style="
        text-align: center;
        padding: 30px;
        color: #A0B0C0;
      ">
        <div style="
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0,238,255,0.2);
          border-top-color: #00EEFF;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 12px;
        "></div>
        <p style="font-size:0.9rem;">Processing...</p>
      </div>
    `;
  }
}

function showPaymentError(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div style="
        background: rgba(255,68,102,0.1);
        border: 1px solid rgba(255,68,102,0.3);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        color: #FF4466;
        font-size: 0.9rem;
      ">
        ⚠️ ${message}
      </div>
    `;
  }
}

// ===========================
// CHECK SUBSCRIPTION STATUS
// ===========================
function checkSubscription() {
  const sub = localStorage.getItem('financeai_subscription');
  const plan = localStorage.getItem('financeai_plan');

  if (sub && plan) {
    return {
      active: true,
      plan: plan,
      details: JSON.parse(sub)
    };
  }

  return { active: false, plan: 'free' };
}

function getCurrentPlan() {
  return localStorage.getItem('financeai_plan') || 'free';
}

function isPlanActive(requiredPlan) {
  const planHierarchy = { free: 0, personal: 1, pro: 2, business: 3 };
  const current = getCurrentPlan();
  return (planHierarchy[current] || 0) >= (planHierarchy[requiredPlan] || 0);
}

// ===========================
// CSS ANIMATIONS
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { 
      transform: translateX(100px); 
      opacity: 0; 
    }
    to { 
      transform: translateX(0); 
      opacity: 1; 
    }
  }
`;
document.head.appendChild(style);

// ===========================
// PLAN UPGRADE PROMPT
// ===========================
function requirePlan(requiredPlan, featureName) {
  if (!isPlanActive(requiredPlan)) {
    const planNames = {
      personal: 'Personal ($9.99/mo)',
      pro: 'Pro ($19.99/mo)',
      business: 'Business ($49.99/mo)'
    };

    const upgradeDiv = document.createElement('div');
    upgradeDiv.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    `;
    upgradeDiv.innerHTML = `
      <div style="
        background: #0A1628;
        border: 1px solid rgba(0,238,255,0.2);
        border-radius: 20px;
        padding: 40px;
        max-width: 420px;
        width: 100%;
        text-align: center;
        font-family: 'Inter', sans-serif;
      ">
        <div style="font-size:2.5rem; margin-bottom:16px;">🔒</div>
        <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:8px; color:#fff;">
          Upgrade Required
        </h3>
        <p style="color:#A0B0C0; font-size:0.9rem; margin-bottom:24px; line-height:1.6;">
          <strong style="color:#00EEFF">${featureName}</strong> requires the 
          <strong style="color:#fff">${planNames[requiredPlan]}</strong> plan or higher.
        </p>
        <div style="display:flex; gap:12px; justify-content:center;">
          <button 
            onclick="this.closest('div[style]').remove()"
            style="
              padding: 10px 24px;
              background: transparent;
              border: 1px solid rgba(0,238,255,0.2);
              border-radius: 50px;
              color: #A0B0C0;
              font-size: 0.9rem;
              cursor: pointer;
              font-family: 'Inter', sans-serif;
            "
          >Maybe Later</button>
          <button 
            onclick="this.closest('div[style]').remove(); openPaymentModal('${requiredPlan}', 'monthly')"
            style="
              padding: 10px 24px;
              background: linear-gradient(135deg, #00EEFF, #0088FF);
              border: none;
              border-radius: 50px;
              color: #000;
              font-size: 0.9rem;
              font-weight: 700;
              cursor: pointer;
              font-family: 'Inter', sans-serif;
            "
          >Upgrade Now</button>
        </div>
      </div>
    `;
    document.body.appendChild(upgradeDiv);
    return false;
  }
  return true;
}



// ===========================
// HANDLE PLAN CLICK
// ===========================
function handlePlanClick(planKey) {
  // Check if user is logged in
  const session = window.supabase ? window.supabase.auth.getSession() : null;
  const user = window.STATE ? window.STATE.user : null;

  if (!user) {
    // Not logged in — save intended plan and go to auth
    localStorage.setItem('financeai_intended_plan', planKey);
    if (typeof showPage === 'function') showPage('auth');
    return;
  }

  // Logged in — open payment modal
  openPaymentModal(planKey, 'monthly');
}

// ===========================
// SWITCH BILLING CYCLE
// ===========================
function switchBilling(cycle) {
  currentBilling = cycle;

  // Update buttons
  const monthly = document.getElementById('btn-monthly');
  const annual = document.getElementById('btn-annual');

  if (cycle === 'monthly') {
    if (monthly) {
      monthly.style.background = 'linear-gradient(135deg,#00EEFF,#0088FF)';
      monthly.style.color = '#000';
    }
    if (annual) {
      annual.style.background = 'transparent';
      annual.style.color = '#A0B0C0';
    }
  } else {
    if (annual) {
      annual.style.background = 'linear-gradient(135deg,#00EEFF,#0088FF)';
      annual.style.color = '#000';
    }
    if (monthly) {
      monthly.style.background = 'transparent';
      monthly.style.color = '#A0B0C0';
    }
  }

  // Reload payment buttons with new billing
  if (currentPlan) {
    const plan = PLANS[currentPlan];
    const details = plan[cycle];
    const modalPlanName = document.getElementById('modalPlanName');
    if (modalPlanName) modalPlanName.textContent = `${plan.name} — ${details.price}`;
    loadStripeButton(details.stripe, plan.name, details.price);
    const paypalContainer = document.getElementById('paypal-button-container');
    if (paypalContainer) paypalContainer.innerHTML = '';
    paypalLoaded = false;
    loadPayPalButton(details.paypal);
  }
}

// Export for use in other files
window.FinanceAIPay = {
  openPaymentModal,
  closeModal,
  checkSubscription,
  getCurrentPlan,
  isPlanActive,
  requirePlan,
  PLANS
};
