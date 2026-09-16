import { supabase } from './supabase'
import type { Transaction } from '@/types'

export async function getTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch transactions: ${error.message}`)
  return data || []
}

export async function createTransaction(tx: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert([tx])
    .select()
    .single()

  if (error) throw new Error(`Failed to create transaction: ${error.message}`)
  return data
}

export async function deleteTransaction(id: string): Promise<void> {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Failed to delete transaction: ${error.message}`)
}
