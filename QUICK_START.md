# FinanceAI Pro V2.0 - Quick Start (5 minutes)

## Step 1: Clone & Install (1 min)

git clone https://github.com/climberforsuccess-bit/financeai-pro.git
cd FinanceAI
npm install

## Step 2: Get API Keys (2 min)

1. Supabase: https://supabase.com
   - Create project
   - Copy URL & ANON_KEY

2. OpenAI: https://platform.openai.com
   - Create API key
   - Enable GPT-4 Vision

## Step 3: Configure .env.local (1 min)

cat > .env.local << 'ENV'
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
ENV

## Step 4: Run Locally (1 min)

npm run dev

Open: http://localhost:3000

## Step 5: Deploy to Vercel (Optional)

1. Push to GitHub:
git add .
git commit -m "Deploy v2.0"
git push origin main

2. Go to https://vercel.com
3. Import your repo
4. Add same environment variables
5. Click Deploy

Done! ✅

For full documentation see:
- README.md (Overview)
- API_GUIDE.md (API docs)
- DEPLOYMENT.md (Production setup)

