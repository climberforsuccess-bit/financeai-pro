import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

interface Transaction {
  id: string
  user_id: string
  category: string
  amount: number
  date: string
  description: string
  type: 'income' | 'expense'
  created_at: string
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { authenticated } = useAuth()

  useEffect(() => {
    if (authenticated) {
      fetchTransactions()
    } else if (!loading) {
      setLoading(false)
    }
  }, [authenticated])

  const fetchTransactions = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      const response = await fetch('/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const { data } = await response.json()
      setTransactions(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  return { transactions, loading, error }
}
