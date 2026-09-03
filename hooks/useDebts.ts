import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

interface Debt {
  id: string
  user_id: string
  name: string
  amount: number
  interest_rate: number
  minimum_payment: number
  due_date: string
  created_at: string
}

export function useDebts() {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { authenticated } = useAuth()

  useEffect(() => {
    if (authenticated) {
      fetchDebts()
    } else if (!loading) {
      setLoading(false)
    }
  }, [authenticated])

  const fetchDebts = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      const response = await fetch('/api/debts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch debts')
      const { data } = await response.json()
      setDebts(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setDebts([])
    } finally {
      setLoading(false)
    }
  }

  const addDebt = async (debt: Omit<Debt, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch('/api/debts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(debt),
      })
      if (!response.ok) throw new Error('Failed to add debt')
      const newDebt = await response.json()
      setDebts([newDebt, ...debts])
      return newDebt
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateDebt = async (id: string, updates: Partial<Debt>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch(`/api/debts?id=${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update debt')
      const updated = await response.json()
      setDebts(debts.map(d => d.id === id ? updated : d))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteDebt = async (id: string) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch(`/api/debts?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to delete debt')
      setDebts(debts.filter(d => d.id !== id))
      return true
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return {
    debts,
    loading,
    error,
    authenticated,
    refetch: fetchDebts,
    addDebt,
    updateDebt,
    deleteDebt,
  }
}
