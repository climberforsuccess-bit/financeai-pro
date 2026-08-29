# FinanceAI Pro V2.0 - Deployment Guide

## Environment Setup

### 1. Supabase Setup

Create a new Supabase project:
1. Go to https://supabase.com
2. Create new project
3. Note your URL and ANON_KEY
4. Create SERVICE_ROLE_KEY from settings

### 2. OpenAI API Key

1. Go to https://platform.openai.com
2. Create API key
3. Ensure GPT-4 Vision access is enabled

### 3. Environment Variables

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
OPENAI_API_KEY=sk-xxxxx
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000

For production:
NEXTAUTH_URL=https://yourdomain.com

## Local Development

1. Install dependencies:
npm install

2. Run development server:
npm run dev

3. Open http://localhost:3000

4. Test API:
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/transactions

## Vercel Deployment

### Step 1: Push to GitHub

git add .
git commit -m "Ready for deployment"
git push origin main

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo: climberforsuccess-bit/financeai-pro
4. Configure environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - OPENAI_API_KEY
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL=https://yourdomain.vercel.app

### Step 3: Deploy

Click "Deploy" - Vercel will build and deploy automatically

### Step 4: Custom Domain

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Update DNS records as shown

## Database Migration

### Create Supabase Tables

Run this SQL in Supabase SQL Editor:

-- Users (handled by auth)

-- Transactions
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  amount decimal(12,2) NOT NULL,
  type varchar(20) NOT NULL,
  category varchar(50) NOT NULL,
  description text,
  date date NOT NULL,
  notes text,
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, date, amount, category)
);

-- Cards
CREATE TABLE cards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name varchar(100) NOT NULL,
  issuer varchar(50) NOT NULL,
  limit decimal(12,2) NOT NULL,
  used decimal(12,2) DEFAULT 0,
  interest_rate decimal(5,2) DEFAULT 0,
  created_at timestamp DEFAULT now()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name varchar(100) NOT NULL,
  amount decimal(12,2) NOT NULL,
  frequency varchar(20) NOT NULL,
  status varchar(20) DEFAULT 'active',
  next_billing_date date,
  created_at timestamp DEFAULT now()
);

-- Debts
CREATE TABLE debts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name varchar(100) NOT NULL,
  amount decimal(12,2) NOT NULL,
  remaining decimal(12,2) NOT NULL,
  interest_rate decimal(5,2) DEFAULT 0,
  due_date date,
  creditor varchar(100),
  status varchar(20) DEFAULT 'active',
  created_at timestamp DEFAULT now()
);

-- Goals
CREATE TABLE goals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name varchar(100) NOT NULL,
  target_amount decimal(12,2) NOT NULL,
  current_amount decimal(12,2) DEFAULT 0,
  deadline date NOT NULL,
  category varchar(50),
  status varchar(20) DEFAULT 'active',
  created_at timestamp DEFAULT now()
);

-- Budgets
CREATE TABLE budgets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  category varchar(50) NOT NULL,
  limit decimal(12,2) NOT NULL,
  spent decimal(12,2) DEFAULT 0,
  month varchar(7) NOT NULL,
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, category, month)
);

-- Receipts
CREATE TABLE receipts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  vendor varchar(100) NOT NULL,
  amount decimal(12,2) NOT NULL,
  date date NOT NULL,
  category varchar(50),
  items jsonb,
  tax decimal(12,2) DEFAULT 0,
  total decimal(12,2) NOT NULL,
  created_at timestamp DEFAULT now()
);

### Enable Row Level Security

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

### Create RLS Policies

CREATE POLICY "Users can see their own transactions"
ON transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
ON transactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
ON transactions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
ON transactions FOR DELETE
USING (auth.uid() = user_id);

-- Repeat similar policies for cards, subscriptions, debts, goals, budgets, receipts

## Testing

### API Testing

Test transactions endpoint:
curl -X GET http://localhost:3000/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN"

Test create transaction:
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 25.50,
    "type": "expense",
    "category": "Food",
    "description": "Lunch",
    "date": "2024-08-28"
  }'

### Frontend Testing

1. Sign up at http://localhost:3000
2. Go to dashboard
3. Add a transaction
4. Add a card
5. Create a budget
6. Test receipt scanner

## Monitoring

### Error Tracking (Optional)

1. Go to https://sentry.io
2. Create new project
3. Add to .env.local:
NEXT_PUBLIC_SENTRY_DSN=xxxxx

4. Install Sentry:
npm install @sentry/nextjs

5. Create sentry.client.config.js and sentry.server.config.js

### Logs

View Vercel logs:
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Select latest deployment
5. Click "Logs"

## Performance Optimization

- Images optimized with Next.js Image
- Code splitting enabled
- CSS minification
- JavaScript minification
- API route caching where possible

## Security Checklist

- RLS enabled on all tables
- Environment variables secured
- CORS configured
- Input validation on all endpoints
- SQL injection prevention (Supabase handles)
- XSS protection (React handles)

## Troubleshooting

### 401 Unauthorized

Check:
1. Supabase URL correct
2. ANON_KEY correct
3. User is logged in
4. RLS policies allow access

### 500 Error on API

Check:
1. Supabase connection working
2. OpenAI API key valid
3. Database tables exist
4. Check server logs in Vercel

### Duplicate Receipt Error

This is expected - system detects duplicate receipts within 24 hours

### Images Not Loading

Check:
1. Images in public/ folder
2. Path correct in code
3. Build completed successfully

## Rollback

If deployment fails:

git revert HEAD
git push origin main

Vercel will automatically redeploy previous version

## Support

For issues:
1. Check GitHub issues
2. Review API_GUIDE.md
3. Check Vercel logs
4. Review Supabase logs

