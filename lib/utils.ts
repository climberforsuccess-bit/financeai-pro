// ============================================
// UTILITY FUNCTIONS - Formatting & Helpers
// ============================================

import type { TransactionCategory, Card, Debt } from '@/types/index'

// ============================================
// CURRENCY FORMATTING
// ============================================

export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'es-AR'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `$${amount.toFixed(2)}`
  }
}

export const formatCurrencyShort = (amount: number, currency: string = 'USD'): string => {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M ${currency}`
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K ${currency}`
  return `${amount.toFixed(0)} ${currency}`
}

// ============================================
// DATE FORMATTING
// ============================================

export const formatDate = (date: string | Date, locale: string = 'es-AR'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateShort = (date: string | Date, locale: string = 'es-AR'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    month: '2-digit',
    day: '2-digit',
  })
}

export const formatTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const calculateDaysUntil = (date: string | Date): number => {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  const diffTime = d.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export const calculateDaysAgo = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  const diffTime = today.getTime() - d.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  return `Hace ${Math.floor(diffDays / 30)} meses`
}

export const getMonthName = (monthIndex: number, locale: string = 'es-AR'): string => {
  const date = new Date(2024, monthIndex, 1)
  return date.toLocaleDateString(locale, { month: 'long' })
}

// ============================================
// ARRAY OPERATIONS
// ============================================

export const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key])
      if (!result[groupKey]) {
        result[groupKey] = []
      }
      result[groupKey].push(item)
      return result
    },
    {} as Record<string, T[]>
  )
}

export const groupByDate = <T extends Record<string, any>>(
  array: T[],
  dateKey: keyof T
): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const date = new Date(item[dateKey] as string).toISOString().split('T')[0]
      if (!result[date]) {
        result[date] = []
      }
      result[date].push(item)
      return result
    },
    {} as Record<string, T[]>
  )
}

export const sumByField = <T extends Record<string, any>>(array: T[], field: keyof T): number => {
  return array.reduce((sum, item) => sum + (Number(item[field]) || 0), 0)
}

export const sortByField = <T extends Record<string, any>>(
  array: T[],
  field: keyof T,
  ascending: boolean = true
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[field]
    const bVal = b[field]
    if (aVal < bVal) return ascending ? -1 : 1
    if (aVal > bVal) return ascending ? 1 : -1
    return 0
  })
}

// ============================================
// VALIDATION
// ============================================

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8
}

export const isValidCurrency = (currency: string): boolean => {
  const validCurrencies = ['ARS', 'MXN', 'COP', 'BRL', 'USD']
  return validCurrencies.includes(currency.toUpperCase())
}

export const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

// ============================================
// CARD UTILITIES
// ============================================

export const calculateCardUsagePercentage = (card: Card): number => {
  if (card.limit === 0) return 0
  return Math.round((card.used / card.limit) * 100)
}

export const getCardColor = (card: Card): string => {
  return card.color || '#00CED1'
}

export const getCardStatusColor = (percentage: number): string => {
  if (percentage < 50) return 'text-green-400'
  if (percentage < 75) return 'text-yellow-400'
  return 'text-red-400'
}

export const maskCardNumber = (lastFourDigits: string): string => {
  return `•••• •••• •••• ${lastFourDigits}`
}

// ============================================
// TRANSACTION UTILITIES
// ============================================

export const getCategoryLabel = (category: TransactionCategory): string => {
  const labels: Record<TransactionCategory, string> = {
    groceries: 'Supermercado',
    restaurants: 'Restaurantes',
    utilities: 'Servicios',
    entertainment: 'Entretenimiento',
    transportation: 'Transporte',
    healthcare: 'Salud',
    shopping: 'Compras',
    subscriptions: 'Suscripciones',
    salary: 'Salario',
    freelance: 'Ingresos',
    investment: 'Inversiones',
    other: 'Otros',
  }
  return labels[category] || category
}

export const getCategoryIcon = (category: TransactionCategory): string => {
  const icons: Record<TransactionCategory, string> = {
    groceries: '🛒',
    restaurants: '🍽️',
    utilities: '⚡',
    entertainment: '🎬',
    transportation: '🚗',
    healthcare: '⚕️',
    shopping: '🛍️',
    subscriptions: '📦',
    salary: '💼',
    freelance: '💻',
    investment: '📈',
    other: '❓',
  }
  return icons[category] || '❓'
}

export const groupTransactionsByCategory = (transactions: any[]): Record<string, any> => {
  return transactions.reduce(
    (result, transaction) => {
      const category = transaction.category || 'other'
      if (!result[category]) {
        result[category] = []
      }
      result[category].push(transaction)
      return result
    },
    {} as Record<string, any>
  )
}

export const calculateCategoryTotal = (transactions: any[], category: TransactionCategory): number => {
  return transactions
    .filter((t) => t.category === category)
    .reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : -t.amount), 0)
}

// ============================================
// DEBT UTILITIES
// ============================================

export const calculateDebtPercentage = (debt: Debt): number => {
  return Math.round((debt.amount / (debt.amount * 1.5)) * 100)
}

export const calculateMonthlyInterest = (debt: Debt): number => {
  return (debt.amount * debt.interest_rate) / 12 / 100
}

export const calculateTotalInterestPaid = (debt: Debt, months: number): number => {
  let totalInterest = 0
  let remainingBalance = debt.amount

  for (let i = 0; i < months; i++) {
    const monthlyInterest = (remainingBalance * debt.interest_rate) / 12 / 100
    totalInterest += monthlyInterest
    remainingBalance -= debt.monthly_payment - monthlyInterest
    if (remainingBalance <= 0) break
  }

  return Math.max(0, totalInterest)
}

// ============================================
// NUMBER OPERATIONS
// ============================================

export const roundTo = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export const percentageOf = (value: number, total: number): number => {
  if (total === 0) return 0
  return roundTo((value / total) * 100)
}

export const calculatePercentageIncrease = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return 0
  return roundTo(((newValue - oldValue) / Math.abs(oldValue)) * 100)
}

// ============================================
// STRING OPERATIONS
// ============================================

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncateString = (str: string, length: number = 50): string => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ============================================
// STORAGE OPERATIONS
// ============================================

export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getLocalStorage = (key: string, defaultValue: any = null): any => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

// ============================================
// API HELPERS
// ============================================

export const fetchAPI = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}

export const createQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}

