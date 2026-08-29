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

export function useBudgets(month?: string) {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBudgets()
  }, [month])

  const fetchBudgets = async () => {
    try {
      setLoading(true)
      const query = month ? `?month=${month}` : ''
      const response = await fetch(`/api/budgets${query}`)
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

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    try {
      const response = await fetch(`/api/budgets?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update budget')
      const updated = await response.json()
      setBudgets(budgets.map(b => b.id === id ? updated : b))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteBudget = async (id: string) => {
    try {
      const response = await fetch(`/api/budgets?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete budget')
      setBudgets(budgets.filter(b => b.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return { 
    budgets, 
    loading, 
    error, 
    fetchBudgets, 
    addBudget,
    updateBudget,
    deleteBudget
  }
}
