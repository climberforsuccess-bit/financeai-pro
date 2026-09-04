// ============================================
// CORE TYPES - FinanceAI Pro V2
// ============================================

// ============================================
// USER & AUTHENTICATION
// ============================================

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  country: string // AR, MX, CO, etc
  currency: 'ARS' | 'MXN' | 'COP' | 'USD' | 'BRL'
  language: 'es' | 'en'
  monthly_income?: number
  financial_goal?: string
  created_at: string
  updated_at: string
}

// ============================================
// CARDS
// ============================================

export type CardType = 'credit' | 'debit' | 'prepaid'
export type CardCategory = 'personal' | 'business'

export interface Card {
  id: string
  user_id: string
  name: string
  issuer: string
  card_type: CardType
  category: CardCategory
  limit: number
  used: number
  interest_rate: number
  color: string
  last_four_digits: string
  payment_date: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================
// TRANSACTIONS
// ============================================

export type TransactionType = 'income' | 'expense'
export type TransactionCategory =
  | 'groceries'
  | 'restaurants'
  | 'utilities'
  | 'entertainment'
  | 'transportation'
  | 'healthcare'
  | 'shopping'
  | 'subscriptions'
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'other'

export interface Transaction {
  id: string
  user_id: string
  card_id?: string
  description: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  date: string
  notes?: string
  receipt_url?: string
  is_recurring: boolean
  created_at: string
  updated_at: string
}

// ============================================
// DEBTS
// ============================================

export type DebtType = 'credit_card' | 'personal_loan' | 'mortgage' | 'student_loan' | 'car_loan'
export type DebtStatus = 'active' | 'paid' | 'defaulted'

export interface Debt {
  id: string
  user_id: string
  name: string
  type: DebtType
  amount: number
  interest_rate: number
  monthly_payment: number
  due_date: string
  status: DebtStatus
  min_payment?: number
  created_at: string
  updated_at: string
}

// ============================================
// SUBSCRIPTIONS
// ============================================

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled'

export interface Subscription {
  id: string
  user_id: string
  name: string
  amount: number
  billing_date: number
  status: SubscriptionStatus
  category?: string
  next_charge_date: string
  ai_suggestion?: string
  created_at: string
  updated_at: string
}

// ============================================
// BUDGETS
// ============================================

export interface Budget {
  id: string
  user_id: string
  category: TransactionCategory
  limit: number
  spent: number
  alert_threshold: number
  created_at: string
  updated_at: string
}

// ============================================
// GOALS
// ============================================

export type GoalStatus = 'active' | 'completed' | 'abandoned'

export interface Goal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  target_date: string
  status: GoalStatus
  category?: string
  created_at: string
  updated_at: string
}

// ============================================
// SCANNER RESULTS
// ============================================

export interface ScannerResult {
  store: string
  amount: number
  category: TransactionCategory
  date: string
  items?: string[]
  raw_text?: string
}

// ============================================
// GIFT CODES & RETENTION OFFERS
// ============================================

export interface GiftCode {
  id: string
  code: string
  discount_percentage: number
  expiry_date: string
  is_used: boolean
  used_by_user_id?: string
  created_at: string
}

export interface RetentionOffer {
  id: string
  user_id: string
  offer_type: 'discount' | 'free_trial' | 'feature_unlock'
  discount_percentage?: number
  free_days?: number
  feature?: string
  expiry_date: string
  is_claimed: boolean
  claimed_at?: string
  created_at: string
}

// ============================================
// SCHEDULED EMAILS
// ============================================

export type EmailType =
  | 'subscription_alert'
  | 'payment_reminder'
  | 'weekly_report'
  | 'monthly_report'
  | 'goal_progress'
  | 'debt_progress'
  | 'ai_insight'

export interface ScheduledEmail {
  id: string
  user_id: string
  email_type: EmailType
  scheduled_date: string
  sent_at?: string
  status: 'pending' | 'sent' | 'failed'
  created_at: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

// ============================================
// DASHBOARD SUMMARY
// ============================================

export interface DashboardSummary {
  total_balance: number
  monthly_income: number
  monthly_expenses: number
  total_debt: number
  total_saved: number
  savings_rate: number
  active_subscriptions: number
  active_goals: number
  debt_payoff_months: number
}

// ============================================
// DEBT STRATEGY RESULTS
// ============================================

export interface DebtPayment {
  debt_id: string
  debt_name: string
  payment_amount: number
  principal: number
  interest: number
  remaining_balance: number
}

export interface DebtPaymentMonth {
  month: number
  date: string
  payments: DebtPayment[]
  total_paid: number
}

export interface DebtPayoffStrategy {
  strategy_name: 'Avalanche' | 'Snowball' | 'Hybrid'
  total_interest_paid: number
  months_to_payoff: number
  timeline: DebtPaymentMonth[]
}

// ============================================
// IA INSIGHTS
// ============================================

export interface AIInsight {
  id: string
  user_id: string
  title: string
  description: string
  recommendation: string
  potential_savings?: number
  insight_type: 'spending' | 'saving' | 'debt' | 'subscription' | 'budget'
  created_at: string
}

// ============================================
// CONTEXT TYPES
// ============================================

export interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  authenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export interface LanguageContextType {
  language: 'es' | 'en'
  setLanguage: (lang: 'es' | 'en') => void
  t: (key: string) => string
}
