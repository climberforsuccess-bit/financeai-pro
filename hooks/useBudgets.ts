import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

interface Budget {
  id: string
  user_id: string
  category: string
  limit: number
  spent: number
  period: 'monthly' | 'yearly'
  created_at: string
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { authenticated } = useAuth()

  useEffect(() => {
    if (authenticated) {
      fetchBudgets()
    } else if (!loading) {
      setLoading(false)
    }
  }, [authenticated])

  const fetchBudgets = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      const response = await fetch('/api/budgets', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch budgets')
      const { data } = await response.json()
      setBudgets(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setBudgets([])
    } finally {
      setLoading(false)
    }
  }

  const addBudget = async (budget: Omit<Budget, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budget),
      })
      if (!response.ok) throw new Error('Failed to add budget')
      await fetchBudgets()
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    }
  }

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch(`/api/budgets?id=${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update budget')
      await fetchBudgets()
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    }
  }

  const deleteBudget = async (id: string) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch(`/api/budgets?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to delete budget')
      setBudgets(budgets.filter(b => b.id !== id))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    }
  }

  return {
    budgets,
    loading,
    error,
    authenticated,
    refetch: fetchBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
  }
}
