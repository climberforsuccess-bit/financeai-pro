'use client'

import { useState, useEffect } from 'react'
import { Subscription } from '@/lib/types'
import { subscriptionsService } from '@/lib/services/subscriptions.service'

interface UseSubscriptionsReturn {
  subscriptions: Subscription[]
  loading: boolean
  error: string | null
  createSubscription: (subscription: Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateSubscription: (id: string, updates: Partial<Subscription>) => Promise<void>
  deleteSubscription: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

export function useSubscriptions(): UseSubscriptionsReturn {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await subscriptionsService.getSubscriptions()
      setSubscriptions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading subscriptions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const createSubscription = async (subscription: Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      await subscriptionsService.createSubscription(subscription)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating subscription')
      throw err
    }
  }

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    try {
      setError(null)
      await subscriptionsService.updateSubscription(id, updates)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating subscription')
      throw err
    }
  }

  const deleteSubscription = async (id: string) => {
    try {
      setError(null)
      await subscriptionsService.deleteSubscription(id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting subscription')
      throw err
    }
  }

  return { subscriptions, loading, error, createSubscription, updateSubscription, deleteSubscription, refresh }
}
