# FinanceAI Pro V2.0

Smart Personal Finance Management with AI-Powered Insights

## Status
- MVP: 85% Complete
- API Routes: 8
- Custom Hooks: 8
- Pages: 10
- Languages: English + Spanish

## Tech Stack

Frontend:
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- i18n (EN/ES)

Backend:
- Supabase Auth + PostgreSQL
- NextAuth.js
- OpenAI Vision API

Database:
- PostgreSQL
- Row Level Security (RLS)
- 10+ tables

## Project Structure

app/
  api/                    # 8 API routes (CRUD)
    transactions/
    cards/
    subscriptions/
    debts/
    goals/
    budgets/
    dashboard/summary/
    scanner/process-receipt/

  pages/
    dashboard/
    transactions/
    cards/
    subscriptions/
    debt-plan/
    goals/
    recommendations/
    reports/
    settings/
    scanner/

hooks/                    # 8 custom React hooks
  useTransactions.ts
  useCards.ts
  useSubscriptions.ts
  useDebts.ts
  useGoals.ts
  useBudgets.ts
  useDashboardSummary.ts
  useScanner.ts

context/
  LanguageContext.tsx

lib/
  supabase.ts
  auth.ts

public/
  locales/               # i18n translations

## API Endpoints

All endpoints require Supabase authentication.

Transactions:
- GET /api/transactions?limit=50&offset=0
- POST /api/transactions
- PUT /api/transactions?id=uuid
- DELETE /api/transactions?id=uuid

Cards:
- GET /api/cards
- POST /api/cards
- PUT /api/cards?id=uuid
- DELETE /api/cards?id=uuid

Subscriptions:
- GET /api/subscriptions?status=active
- POST /api/subscriptions
- PUT /api/subscriptions?id=uuid
- DELETE /api/subscriptions?id=uuid

Debts:
- GET /api/debts
- POST /api/debts
- PUT /api/debts?id=uuid
- DELETE /api/debts?id=uuid

Goals:
- GET /api/goals
- POST /api/goals
- PUT /api/goals?id=uuid
- DELETE /api/goals?id=uuid

Budgets:
- GET /api/budgets?month=2024-08
- POST /api/budgets
- PUT /api/budgets?id=uuid
- DELETE /api/budgets?id=uuid

Dashboard:
- GET /api/dashboard/summary

Scanner:
- POST /api/scanner/process-receipt

## Custom Hooks

const { transactions, loading, addTransaction, updateTransaction, deleteTransaction } = useTransactions(limit, offset)
const { cards, loading, addCard, updateCard, deleteCard } = useCards()
const { subscriptions, loading, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions(status)
const { debts, loading, addDebt, updateDebt, deleteDebt } = useDebts()
const { goals, loading, addGoal, updateGoal, deleteGoal } = useGoals()
const { budgets, loading, addBudget, updateBudget, deleteBudget } = useBudgets(month)
const { summary, loading, error, refetch } = useDashboardSummary()

## Getting Started

Prerequisites:
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key

Installation:

1. Clone repository:
git clone https://github.com/climberforsuccess-bit/financeai-pro.git
cd FinanceAI

2. Install dependencies:
npm install

3. Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_secret

4. Run development:
npm run dev

5. Open http://localhost:3000

## Features

Completed:
- Dashboard with real-time data
- 8 full CRUD API routes
- 8 custom React hooks
- 10 frontend pages
- Supabase authentication
- Receipt scanner with OCR
- i18n (English + Spanish)
- Premium UI design

In Progress:
- Advanced analytics
- PDF export
- Email notifications

Future:
- Stripe integration
- Mobile app
- Advanced AI recommendations
- Multiple currencies

## Documentation

API Guide: See API_GUIDE.md
Build Status: See BUILD_STATUS.md

## Security

- Supabase Authentication
- Row Level Security (RLS)
- NextAuth.js session management
- Environment variables
- Input validation
- CORS protection

## Author

climberforsuccess
GitHub: https://github.com/climberforsuccess-bit
Project: FinanceAI Pro V2.0

Made with care for better personal finance management
