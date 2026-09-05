'use client'

import { useState, useEffect } from 'react'
import { Debt } from '@/lib/types'
import { debtsService } from '@/lib/services/debts.service'

interface UseDebtsReturn {
  debts: Debt[]
  loading: boolean
  error: string | null
  createDebt: (debt: Omit<Debt, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateDebt: (id: string, updates: Partial<Debt>) => Promise<void>
  deleteDebt: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

export function useDebts(): UseDebtsReturn {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await debtsService.getDebts()
      setDebts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading debts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const createDebt = async (debt: Omit<Debt, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      await debtsService.createDebt(debt)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating debt')
      throw err
    }
  }

  const updateDebt = async (id: string, updates: Partial<Debt>) => {
    try {
      setError(null)
      await debtsService.updateDebt(id, updates)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating debt')
      throw err
    }
  }

  const deleteDebt = async (id: string) => {
    try {
      setError(null)
      await debtsService.deleteDebt(id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting debt')
      throw err
    }
  }

  return { debts, loading, error, createDebt, updateDebt, deleteDebt, refresh }
}
