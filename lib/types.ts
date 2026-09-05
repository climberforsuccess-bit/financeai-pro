// Canonical types are in @/types
export type {
  Transaction,
  TransactionType,
  TransactionCategory,
  Card,
  User,
  Budget,
  Goal,
  Debt,
  DebtType,
  Subscription,
  Receipt,
} from '@/types'

// Local utilities
export interface TransactionFilters {
  search?: string
  type?: 'income' | 'expense' | 'transfer' | 'all'
  category?: string
  startDate?: Date
  endDate?: Date
  cardId?: string
  minAmount?: number
  maxAmount?: number
}

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
  pageSize: number
}
