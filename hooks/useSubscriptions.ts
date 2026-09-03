import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

interface Subscription {
  id: string
  user_id: string
  name: string
  category: string
  amount: number
  billing_cycle: 'daily' | 'weekly' | 'monthly' | 'yearly'
  next_billing_date: string
  status: 'active' | 'paused' | 'cancelled'
  notify_days_before?: number
  card_id?: string
  created_at: string
}

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { authenticated } = useAuth()

  useEffect(() => {
    if (authenticated) {
      fetchSubscriptions()
    } else if (!loading) {
      setLoading(false)
    }
  }, [authenticated])

  const fetchSubscriptions = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      const response = await fetch('/api/subscriptions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const { data } = await response.json()
      setSubscriptions(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscriptions')
      setSubscriptions([])
    } finally {
      setLoading(false)
    }
  }

  const refreshSubscriptions = async () => {
    await fetchSubscriptions()
  }

  return { 
    subscriptions, 
    loading, 
    error,
    refresh: refreshSubscriptions,
  }
}
