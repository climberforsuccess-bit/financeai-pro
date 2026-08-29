const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 FinanceAI Pro V2.0 - Service Verification\n');
console.log('=' .repeat(60));

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const check = (service, envVar, status) => {
  const icon = status ? '✅' : '❌';
  const color = status ? colors.green : colors.red;
  console.log(`${icon} ${color}${service}${colors.reset}: ${status ? 'Connected' : 'Missing'}`);
  if (!status) {
    console.log(`   └─ Missing: ${envVar}`);
  }
};

// 1. SUPABASE
console.log('\n📦 SUPABASE');
console.log('-' .repeat(60));
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

check('Supabase URL', 'NEXT_PUBLIC_SUPABASE_URL', !!supabaseUrl);
check('Supabase ANON Key', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', !!supabaseKey);
check('Supabase Service Key', 'SUPABASE_SERVICE_ROLE_KEY', !!supabaseServiceKey);

if (supabaseUrl && supabaseKey) {
  console.log(`   └─ Project: ${supabaseUrl.split('.').shift()}`);
}

// 2. OPENAI
console.log('\n🤖 OPENAI');
console.log('-' .repeat(60));
const openaiKey = process.env.OPENAI_API_KEY;
check('OpenAI API Key', 'OPENAI_API_KEY', !!openaiKey);
if (openaiKey) {
  console.log(`   └─ Key found (${openaiKey.length} chars)`);
}

// 3. STRIPE
console.log('\n💳 STRIPE');
console.log('-' .repeat(60));
const stripePublishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripeWebhook = process.env.STRIPE_WEBHOOK_SECRET;

check('Stripe Publishable Key', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', !!stripePublishable);
check('Stripe Secret Key', 'STRIPE_SECRET_KEY', !!stripeSecret);
check('Stripe Webhook Secret', 'STRIPE_WEBHOOK_SECRET', !!stripeWebhook);

if (stripePublishable) {
  console.log(`   └─ Key starts with: ${stripePublishable.substring(0, 15)}...`);
}

// 4. VERCEL
console.log('\n🚀 VERCEL');
console.log('-' .repeat(60));
const vercelUrl = process.env.VERCEL_URL;
const nextAuthUrl = process.env.NEXTAUTH_URL;

check('Vercel URL', 'VERCEL_URL', !!vercelUrl);
check('NextAuth URL', 'NEXTAUTH_URL', !!nextAuthUrl);

if (vercelUrl) {
  console.log(`   └─ Deployment URL: https://${vercelUrl}`);
}

// 5. NEXTAUTH
console.log('\n🔐 NEXTAUTH');
console.log('-' .repeat(60));
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
check('NextAuth Secret', 'NEXTAUTH_SECRET', !!nextAuthSecret);

// 6. GOOGLE OAUTH (NEW)
console.log('\n🔵 GOOGLE OAUTH');
console.log('-' .repeat(60));
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

check('Google Client ID', 'NEXT_PUBLIC_GOOGLE_CLIENT_ID', !!googleClientId);
check('Google Client Secret', 'GOOGLE_CLIENT_SECRET', !!googleClientSecret);

if (!googleClientId || !googleClientSecret) {
  console.log('\n   ⚠️  Google OAuth not yet configured');
  console.log('   → Follow: DEPLOYMENT_CHECKLIST.md step 1\n');
}

// SUMMARY
console.log('\n' + '='.repeat(60));
console.log('\n📊 VERIFICATION SUMMARY\n');

const allServices = [
  { name: 'Supabase', status: !!supabaseUrl && !!supabaseKey },
  { name: 'OpenAI', status: !!openaiKey },
  { name: 'Stripe', status: !!stripePublishable && !!stripeSecret },
  { name: 'Vercel', status: !!vercelUrl },
  { name: 'NextAuth', status: !!nextAuthSecret },
  { name: 'Google OAuth', status: !!googleClientId && !!googleClientSecret },
];

const completed = allServices.filter(s => s.status).length;
const total = allServices.length;

console.log(`Services Ready: ${colors.green}${completed}/${total}${colors.reset}\n`);

allServices.forEach(service => {
  const icon = service.status ? '✅' : '⏳';
  const status = service.status ? 'Ready' : 'Pending';
  console.log(`${icon} ${service.name.padEnd(20)} ${status}`);
});

console.log('\n' + '='.repeat(60) + '\n');

if (completed === total) {
  console.log(`${colors.green}🎉 ALL SERVICES READY FOR DEPLOYMENT!${colors.reset}\n`);
} else {
  console.log(`${colors.yellow}⚠️  ${total - completed} service(s) pending configuration${colors.reset}\n`);
  console.log('Next: Create Google OAuth credentials\n');
}
