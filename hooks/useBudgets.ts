import { useState, useEffect } from 'react'

interface Budget {
  id: string
  user_id: string
  category: string
  limit: number
  spent: number
  month: string
  created_at: string
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBudgets()
  }, [])

  const fetchBudgets = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/budgets')
      if (!response.ok) throw new Error('Failed to fetch budgets')
      const { data } = await response.json()
      setBudgets(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addBudget = async (budget: Omit<Budget, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(budget),
      })
      if (!response.ok) throw new Error('Failed to add budget')
      const newBudget = await response.json()
      setBudgets([newBudget, ...budgets])
      return newBudget
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return { budgets, loading, error, fetchBudgets, addBudget }
}
