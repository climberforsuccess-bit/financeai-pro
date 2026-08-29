import { useState, useEffect } from 'react'

interface Goal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  deadline: string
  category?: string
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/goals')
      if (!response.ok) throw new Error('Failed to fetch goals')
      const { data } = await response.json()
      setGoals(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addGoal = async (goal: Omit<Goal, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch(`/api/goals?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch(`/api/goals?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete goal')
      setGoals(goals.filter(g => g.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return { 
    goals, 
    loading, 
    error, 
    fetchGoals, 
    addGoal,
    updateGoal,
    deleteGoal
  }
}
