// ============================================
// SUPABASE HELPERS - Query Functions
// ============================================

import { createClient } from '@supabase/supabase-js'
import type {
  Card,
  Transaction,
  Debt,
  Subscription,
  Budget,
  Goal,
  User,
  UserProfile,
  DashboardSummary,
  DebtPayoffStrategy,
} from '@/types/index'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================
// TYPE GUARDS
// ============================================

export const isCard = (obj: any): obj is Card => {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'user_id' in obj &&
    'name' in obj &&
    'limit' in obj
  )
}

export const isTransaction = (obj: any): obj is Transaction => {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'user_id' in obj &&
    'amount' in obj &&
    'type' in obj
  )
}

export const isDebt = (obj: any): obj is Debt => {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'user_id' in obj &&
    'amount' in obj &&
    'interest_rate' in obj
  )
}

// ============================================
// ERROR HANDLING
// ============================================

export class SupabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'SupabaseError'
  }
}

export const handleSupabaseError = (error: any): SupabaseError => {
  const message = error?.message || 'An error occurred'
  const code = error?.code
  console.error('[Supabase Error]', { message, code })
  return new SupabaseError(message, code)
}

// ============================================
// CARDS QUERIES
// ============================================

export const getCards = async (userId: string): Promise<Card[]> => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as Card[]) || []
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const getCardById = async (cardId: string): Promise<Card | null> => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', cardId)
      .single()

    if (error) throw error
    return (data as Card) || null
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const createCard = async (userId: string, card: Omit<Card, 'id' | 'created_at' | 'updated_at'>): Promise<Card> => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .insert({ ...card, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data as Card
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const updateCard = async (cardId: string, updates: Partial<Card>): Promise<Card> => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .update(updates)
      .eq('id', cardId)
      .select()
      .single()

    if (error) throw error
    return data as Card
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const deleteCard = async (cardId: string): Promise<void> => {
  try {
    const { error } = await supabase.from('cards').delete().eq('id', cardId)
    if (error) throw error
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

// ============================================
// TRANSACTIONS QUERIES
// ============================================

export const getTransactions = async (
  userId: string,
  limit: number = 50,
  offset: number = 0
): Promise<Transaction[]> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return (data as Transaction[]) || []
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const getTransactionsByCard = async (cardId: string): Promise<Transaction[]> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('card_id', cardId)
      .order('date', { ascending: false })

    if (error) throw error
    return (data as Transaction[]) || []
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const createTransaction = async (
  userId: string,
  transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>
): Promise<Transaction> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({ ...transaction, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data as Transaction
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

// ============================================
// DEBTS QUERIES
// ============================================

export const getDebts = async (userId: string): Promise<Debt[]> => {
  try {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('due_date', { ascending: true })

    if (error) throw error
    return (data as Debt[]) || []
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const createDebt = async (
  userId: string,
  debt: Omit<Debt, 'id' | 'created_at' | 'updated_at'>
): Promise<Debt> => {
  try {
    const { data, error } = await supabase
      .from('debts')
      .insert({ ...debt, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data as Debt
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

// ============================================
// SUBSCRIPTIONS QUERIES
// ============================================

export const getSubscriptions = async (userId: string): Promise<Subscription[]> => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('next_charge_date', { ascending: true })

    if (error) throw error
    return (data as Subscription[]) || []
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const createSubscription = async (
  userId: string,
  subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>
): Promise<Subscription> => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({ ...subscription, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data as Subscription
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

// ============================================
// BUDGETS QUERIES
// ============================================

export const getBudgets = async (userId: string): Promise<Budget[]> => {
  try {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return (data as Budget[]) || []
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const createBudget = async (
  userId: string,
  budget: Omit<Budget, 'id' | 'created_at' | 'updated_at'>
): Promise<Budget> => {
  try {
    const { data, error } = await supabase
      .from('budgets')
      .insert({ ...budget, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data as Budget
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

// ============================================
// GOALS QUERIES
// ============================================

export const getGoals = async (userId: string): Promise<Goal[]> => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')

    if (error) throw error
    return (data as Goal[]) || []
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const createGoal = async (
  userId: string,
  goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>
): Promise<Goal> => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .insert({ ...goal, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data as Goal
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

// ============================================
// USER PROFILE QUERIES
// ============================================

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return (data as UserProfile) || null
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data as UserProfile
  } catch (error) {
    throw handleSupabaseError(error)
  }
}

