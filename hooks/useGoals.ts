import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

interface Goal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  deadline: string
  category: string
  created_at: string
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { authenticated } = useAuth()

  useEffect(() => {
    if (authenticated) {
      fetchGoals()
    } else if (!loading) {
      setLoading(false)
    }
  }, [authenticated])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      const response = await fetch('/api/goals', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch goals')
      const { data } = await response.json()
      setGoals(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setGoals([])
    } finally {
      setLoading(false)
    }
  }

  const addGoal = async (goal: Omit<Goal, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      })
      if (!response.ok) throw new Error('Failed to add goal')
      const newGoal = await response.json()
      setGoals([newGoal, ...goals])
      return newGoal
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch(`/api/goals?id=${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update goal')
      const updated = await response.json()
      setGoals(goals.map(g => g.id === id ? updated : g))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Not authenticated')

      const response = await fetch(`/api/goals?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to delete goal')
      setGoals(goals.filter(g => g.id !== id))
      return true
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return {
    goals,
    loading,
    error,
    authenticated,
    refetch: fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
  }
}
