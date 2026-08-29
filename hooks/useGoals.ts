import { useState, useEffect } from 'react'

interface Goal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  category: string
  deadline: string
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

  return { goals, loading, error, fetchGoals, addGoal }
}
