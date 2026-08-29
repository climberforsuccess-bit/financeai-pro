import { useState, useEffect } from 'react'

interface Debt {
  id: string
  user_id: string
  name: string
  amount: number
  interest_rate: number
  due_date: string
  created_at: string
}

export function useDebts() {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDebts()
  }, [])

  const fetchDebts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/debts')
      if (!response.ok) throw new Error('Failed to fetch debts')
      const { data } = await response.json()
      setDebts(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addDebt = async (debt: Omit<Debt, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const response = await fetch('/api/debts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  return { debts, loading, error, fetchDebts, addDebt }
}
