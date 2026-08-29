import { useState, useEffect } from 'react'

interface DashboardSummary {
  month: string
  income: number
  expenses: number
  balance: number
  cards: {
    total: number
    limit: number
    used: number
    utilization: number
  }
  subscriptions: {
    active: number
    monthlyTotal: number
  }
  debts: {
    total: number
    amount: number
  }
  transactions: number
}

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/summary')
      if (!response.ok) throw new Error('Failed to fetch summary')
      const data = await response.json()
      setSummary(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { summary, loading, error, refetch: fetchSummary }
}
