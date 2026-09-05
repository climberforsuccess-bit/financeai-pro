'use client'

import { useState, useEffect } from 'react'
import { Receipt } from '@/lib/types'
import { receiptsService } from '@/lib/services/receipts.service'

interface UseReceiptsReturn {
  receipts: Receipt[]
  loading: boolean
  error: string | null
  createReceipt: (receipt: Omit<Receipt, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'hash'>) => Promise<void>
  updateReceipt: (id: string, updates: Partial<Receipt>) => Promise<void>
  deleteReceipt: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

export function useReceipts(): UseReceiptsReturn {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await receiptsService.getReceipts()
      setReceipts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading receipts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const createReceipt = async (receipt: Omit<Receipt, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'hash'>) => {
    try {
      setError(null)
      await receiptsService.createReceipt(receipt)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating receipt')
      throw err
    }
  }

  const updateReceipt = async (id: string, updates: Partial<Receipt>) => {
    try {
      setError(null)
      await receiptsService.updateReceipt(id, updates)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating receipt')
      throw err
    }
  }

  const deleteReceipt = async (id: string) => {
    try {
      setError(null)
      await receiptsService.deleteReceipt(id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting receipt')
      throw err
    }
  }

  return { receipts, loading, error, createReceipt, updateReceipt, deleteReceipt, refresh }
}
