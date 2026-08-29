import { useState, useEffect } from 'react'

interface Subscription {
  id: string
  user_id: string
  name: string
  amount: number
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  status: 'active' | 'paused' | 'cancelled'
  next_billing_date: string
  created_at: string
}

export function useSubscriptions(status?: string) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscriptions()
  }, [status])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const query = status ? `?status=${status}` : ''
      const response = await fetch(`/api/subscriptions${query}`)
      if (!response.ok) throw new Error('Failed to fetch subscriptions')
      const { data } = await response.json()
      setSubscriptions(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addSubscription = async (sub: Omit<Subscription, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      })
      if (!response.ok) throw new Error('Failed to add subscription')
      const newSub = await response.json()
      setSubscriptions([newSub, ...subscriptions])
      return newSub
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    try {
      const response = await fetch(`/api/subscriptions?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update subscription')
      const updated = await response.json()
      setSubscriptions(subscriptions.map(s => s.id === id ? updated : s))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteSubscription = async (id: string) => {
    try {
      const response = await fetch(`/api/subscriptions?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete subscription')
      setSubscriptions(subscriptions.filter(s => s.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return { 
    subscriptions, 
    loading, 
    error, 
    fetchSubscriptions, 
    addSubscription,
    updateSubscription,
    deleteSubscription
  }
}
