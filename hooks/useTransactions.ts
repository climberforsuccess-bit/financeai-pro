import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'
import type { Transaction } from '@/types'

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

      if (!token) {
        setError('No authentication token')
        setLoading(false)
        return
      }

      const response = await fetch('/api/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }

      const json = await response.json()
      // El endpoint retorna { data, count }, extraer el array
      const transactionsArray = json.data || []
      setTransactions(Array.isArray(transactionsArray) ? transactionsArray : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
  }
}
