import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

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
  const { authenticated, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && authenticated) {
      fetchSummary()
    } else if (!authLoading && !authenticated) {
      setLoading(false)
    }
  }, [authenticated, authLoading])

  const fetchSummary = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      const response = await fetch('/api/dashboard/summary', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Failed to fetch summary')
      const data = await response.json()
      setSummary(data)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching summary:', err.message)
      setError(err.message)
      setSummary(null)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchSummary()
  }

  return {
    summary,
    loading,
    error,
    refetch,
    authenticated,
    isAuthenticated: authenticated,
  }
}
