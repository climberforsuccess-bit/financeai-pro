// Currencies
export const SUPPORTED_CURRENCIES = ['USD', 'MXN', 'ARS', 'COP', 'PEN', 'CLP', 'BRL', 'UYU'] as const
export type Currency = (typeof SUPPORTED_CURRENCIES)[number]

// Countries
export const SUPPORTED_COUNTRIES = ['US', 'MX', 'AR', 'CO', 'PE', 'CL', 'BR', 'UY'] as const
export type Country = (typeof SUPPORTED_COUNTRIES)[number]

// Debt types
export const DEBT_TYPES = ['credit_card', 'personal_loan', 'mortgage', 'auto_loan', 'student_loan', 'other'] as const
export type DebtType = (typeof DEBT_TYPES)[number]

// Transaction categories
export const TRANSACTION_CATEGORIES = [
  'food',
  'transport',
  'utilities',
  'entertainment',
  'health',
  'shopping',
  'education',
  'salary',
  'investment',
  'transfer',
  'other',
] as const
export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number]

// Transaction types
export const TRANSACTION_TYPES = ['expense', 'income', 'transfer'] as const
export type TransactionType = (typeof TRANSACTION_TYPES)[number]

// API
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const DEFAULT_MAX_ITEMS = 100

// Time
export const MILLISECONDS_PER_MINUTE = 60000
export const MILLISECONDS_PER_HOUR = 3600000
export const MILLISECONDS_PER_DAY = 86400000
