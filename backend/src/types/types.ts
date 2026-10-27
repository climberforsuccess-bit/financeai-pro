// Profile
export interface Profile {
  id: string
  email: string
  full_name: string | null
  currency: string // USD, MXN, COP, etc.
  country: string // us, mx, co, etc.
  financial_score: number
  plan: string
  subscription_status: string
  created_at: string
  updated_at: string
}

// Debts
export interface Debt {
  id: string
  profile_id: string
  name: string
  current_balance: number
  interest_rate: number
  debt_type: string // 'credit_card' | 'loan' | 'mortgage' | 'personal' | 'other'
  status: string // 'active' | 'paid_off' | 'paused'
  created_at: string
  updated_at: string
}

// Transactions
export interface Transaction {
  id: string
  profile_id: string
  amount: number
  category: string
  description: string
  date: string
  type: string // 'income' | 'expense'
  status: string // 'pending' | 'completed'
  created_at: string
  updated_at: string
}

// Subscriptions
export interface Subscription {
  id: string
  profile_id: string
  name: string
  monthly_cost: number
  status: string
  created_at: string
  updated_at: string
}

// Receipt (OCR)
export interface Receipt {
  id: string
  profile_id: string
  transaction_id?: string
  image_url: string
  file_name: string
  extracted_data?: {
    merchant?: string
    total?: number
    items?: Array<{ name: string; price: number }>
    date?: string
  }
  hash: string
  created_at: string
  updated_at: string
}

// API Response
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
