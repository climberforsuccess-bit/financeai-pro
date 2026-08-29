# FinanceAI Pro V2.0 - Deployment Checklist

## PRE-DEPLOYMENT

### 1. Google OAuth Setup (5 min)
- Go to https://console.cloud.google.com
- Create new project
- Enable Google+ API
- Create OAuth 2.0 credentials (Web application)
- Add authorized redirect URIs:
  - http://localhost:3000/auth/callback
  - https://yourdomain.vercel.app/auth/callback
- Copy Client ID and Secret to .env.local

### 2. Supabase Setup (10 min)
- Go to https://supabase.com
- Create new project
- Note Project URL and ANON_KEY
- Go to Authentication > Providers
- Enable Google provider
- Copy SERVICE_ROLE_KEY

### 3. OpenAI API Setup (5 min)
- Go to https://platform.openai.com
- Create API key
- Enable GPT-4 Vision access
- Copy key to OPENAI_API_KEY in .env.local

### 4. Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

### 5. Test Locally (10 min)
- npm install
- npm run dev
- Test signup with email/password
- Test login with email/password
- Test protected routes
- Test API endpoints

### 6. Build & Test
- npm run build
- npm start
- Verify no build errors

## DEPLOYMENT TO VERCEL

### Step 1: Push to GitHub
git add .
git commit -m "Production ready v2.0"
git push origin main

### Step 2: Connect Vercel
- Go to https://vercel.com
- Click "New Project"
- Import GitHub repo
- Select main branch

### Step 3: Configure Environment Variables
Add in Vercel Settings:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL=https://yourdomain.vercel.app

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete

### Step 5: Test Production
- Test signup
- Test login
- Test all API endpoints
- Check performance

## POST-DEPLOYMENT

### Monitoring
- Set up Sentry for errors
- Set up Google Analytics
- Monitor Vercel logs

### Marketing
- Update landing page
- Set up email notifications
- Create social accounts

## Timeline: ~45 minutes to production

DONE!
