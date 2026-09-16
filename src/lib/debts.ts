import { supabase } from './supabase'
import type { Debt } from '@/types'

export async function getDebts(userId: string): Promise<Debt[]> {
  const { data, error } = await supabase
    .from('debts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch debts: ${error.message}`)
  return data || []
}

export async function createDebt(debt: Omit<Debt, 'id' | 'created_at' | 'updated_at'>): Promise<Debt> {
  const { data, error } = await supabase
    .from('debts')
    .insert([debt])
    .select()
    .single()

  if (error) throw new Error(`Failed to create debt: ${error.message}`)
  return data
}

export async function updateDebt(id: string, updates: Partial<Debt>): Promise<Debt> {
  const { data, error } = await supabase
    .from('debts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(`Failed to update debt: ${error.message}`)
  return data
}

export async function deleteDebt(id: string): Promise<void> {
  const { error } = await supabase
    .from('debts')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Failed to delete debt: ${error.message}`)
}
