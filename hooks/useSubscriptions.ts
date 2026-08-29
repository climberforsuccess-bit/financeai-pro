import { useState, useEffect } from 'react'

interface Subscription {
  id: string
  user_id: string
  name: string
  amount: number
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  category: string
  next_billing_date: string
  status: 'active' | 'paused' | 'cancelled'
  created_at: string
}

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/subscriptions')
      if (!response.ok) throw new Error('Failed to fetch subscriptions')
      const { data } = await response.json()
      setSubscriptions(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addSubscription = async (subscription: Omit<Subscription, 'id' | 'user_id' | 'status' | 'created_at'>) => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      })
      if (!response.ok) throw new Error('Failed to add subscription')
      const newSubscription = await response.json()
      setSubscriptions([newSubscription, ...subscriptions])
      return newSubscription
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return { subscriptions, loading, error, fetchSubscriptions, addSubscription }
}
