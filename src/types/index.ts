export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
}

export interface Debt {
  id: string
  user_id: string
  name: string
  amount: number
  interest_rate: number
  minimum_payment: number
  due_date?: string
  category: 'credit_card' | 'personal_loan' | 'mortgage' | 'auto_loan' | 'student_loan' | 'other'
  status: 'active' | 'paid_off' | 'defaulted'
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  category: string
  description: string
  date: string
  type: 'income' | 'expense'
  payment_method?: string
  created_at: string
}

export interface Card {
  id: string
  user_id: string
  name: string
  last_four: string
  brand: string
  expiry_month: number
  expiry_year: number
  is_primary: boolean
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'pro' | 'premium'
  status: 'active' | 'canceled' | 'expired'
  current_period_start: string
  current_period_end: string
  created_at: string
}
