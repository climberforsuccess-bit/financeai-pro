// User & Auth
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  full_name: string
  avatar_url?: string
  currency: string // USD, MXN, COP, etc.
  country: string // LATAM code
  created_at: string
  updated_at: string
}

// Debts
export interface Debt {
  id: string
  user_id: string
  name: string
  amount: number
  interest_rate: number
  min_payment: number
  due_date?: string
  type: 'credit_card' | 'loan' | 'mortgage' | 'personal' | 'other'
  status: 'active' | 'paid_off' | 'paused'
  created_at: string
  updated_at: string
}

export interface DebtPayment {
  id: string
  debt_id: string
  amount: number
  payment_date: string
  notes?: string
  created_at: string
}

// Transactions
export interface Transaction {
  id: string
  user_id: string
  amount: number
  category: string
  description: string
  date: string
  type: 'income' | 'expense'
  status: 'pending' | 'completed'
  created_at: string
  updated_at: string
}

// Receipt (OCR)
export interface Receipt {
  id: string
  user_id: string
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
  message?: string
}
