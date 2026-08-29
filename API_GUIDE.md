# FinanceAI Pro V2.0 - API & Hooks Guide

## API Base URL
/api

---

## Authentication
Todas las rutas requieren sesión de Supabase Auth.

---

## Transactions API

### GET
GET /api/transactions?limit=50&offset=0&type=expense&category=Food

### POST
POST /api/transactions
{
  "amount": 25.50,
  "type": "expense",
  "category": "Food",
  "description": "Lunch",
  "date": "2024-08-28"
}

### PUT
PUT /api/transactions?id=uuid
{"amount": 30.00}

### DELETE
DELETE /api/transactions?id=uuid

---

## Cards API

### GET
GET /api/cards

### POST
POST /api/cards
{
  "name": "Chase Sapphire",
  "issuer": "Chase",
  "limit": 5000,
  "interest_rate": 18.5
}

### PUT
PUT /api/cards?id=uuid
{"used": 2500}

### DELETE
DELETE /api/cards?id=uuid

---

## Subscriptions API

### GET
GET /api/subscriptions?status=active

### POST
POST /api/subscriptions
{
  "name": "Netflix",
  "amount": 15.99,
  "frequency": "monthly",
  "next_billing_date": "2024-09-28"
}

### PUT
PUT /api/subscriptions?id=uuid
{"status": "paused"}

### DELETE
DELETE /api/subscriptions?id=uuid

---

## Debts API

### GET
GET /api/debts

### POST
POST /api/debts
{
  "name": "Student Loan",
  "amount": 25000,
  "interest_rate": 5.5,
  "due_date": "2030-06-15"
}

### PUT
PUT /api/debts?id=uuid
{"remaining": 20000}

### DELETE
DELETE /api/debts?id=uuid

---

## Goals API

### GET
GET /api/goals

### POST
POST /api/goals
{
  "name": "Emergency Fund",
  "target_amount": 5000,
  "deadline": "2024-12-31"
}

### PUT
PUT /api/goals?id=uuid
{"current_amount": 2500}

### DELETE
DELETE /api/goals?id=uuid

---

## Budgets API

### GET
GET /api/budgets?month=2024-08

### POST
POST /api/budgets
{
  "category": "Food",
  "limit": 500,
  "month": "2024-08"
}

### PUT
PUT /api/budgets?id=uuid
{"limit": 600}

### DELETE
DELETE /api/budgets?id=uuid

---

## Dashboard Summary API

### GET
GET /api/dashboard/summary

Response:
{
  "month": "2024-08",
  "income": 5000,
  "expenses": 2500,
  "balance": 2500,
  "cards": {"total": 3, "limit": 15000, "used": 5200},
  "subscriptions": {"active": 5, "monthlyTotal": 87.50},
  "debts": {"total": 2, "amount": 45000},
  "transactions": 47
}

---

## Scanner API

### POST
POST /api/scanner/process-receipt
Content-Type: multipart/form-data
file: <image>

Response:
{
  "vendor": "Starbucks",
  "amount": 25.50,
  "date": "2024-08-28",
  "category": "Food",
  "items": ["Latte", "Croissant"]
}

---

## Hooks Usage

### useTransactions
const { transactions, loading, addTransaction, updateTransaction, deleteTransaction } = useTransactions(50, 0)

### useCards
const { cards, loading, addCard, updateCard, deleteCard } = useCards()

### useSubscriptions
const { subscriptions, loading, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions('active')

### useDebts
const { debts, loading, addDebt, updateDebt, deleteDebt } = useDebts()

### useGoals
const { goals, loading, addGoal, updateGoal, deleteGoal } = useGoals()

### useBudgets
const { budgets, loading, addBudget, updateBudget, deleteBudget } = useBudgets('2024-08')

### useDashboardSummary
const { summary, loading, error, refetch } = useDashboardSummary()

---

## Status

- 6 API routes: Full CRUD
- 8 Custom hooks: Complete
- Auth: Supabase
- Database: Supabase PostgreSQL
