// Currencies & locales
export const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  MXN: { symbol: '$', name: 'Mexican Peso' },
  COP: { symbol: '$', name: 'Colombian Peso' },
  ARS: { symbol: '$', name: 'Argentine Peso' },
  BRL: { symbol: 'R$', name: 'Brazilian Real' },
  CLP: { symbol: '$', name: 'Chilean Peso' },
  PEN: { symbol: 'S/', name: 'Peruvian Sol' },
}

export const SUPPORTED_COUNTRIES = ['MX', 'CO', 'AR', 'BR', 'CL', 'PE', 'US', 'CA']

// Debt types
export const DEBT_TYPES = ['credit_card', 'loan', 'mortgage', 'personal', 'other'] as const

// Transaction categories
export const TRANSACTION_CATEGORIES = [
  'food',
  'transport',
  'utilities',
  'entertainment',
  'shopping',
  'health',
  'education',
  'salary',
  'freelance',
  'investment',
  'other',
] as const

// Debt strategies
export const DEBT_STRATEGIES = {
  avalanche: 'Highest interest rate first',
  snowball: 'Smallest balance first',
  balanced: 'Mix of both',
} as const

// API endpoints (will be populated per environment)
export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001'

// Auth
export const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes

// Pagination
export const DEFAULT_PAGE_SIZE = 20

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
