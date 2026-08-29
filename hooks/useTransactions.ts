import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  user_id: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  category: string
  description: string
  date: string
  notes?: string
  created_at: string
}

export function useTransactions(limit = 50, offset = 0) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchTransactions()
  }, [limit, offset])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/transactions?limit=${limit}&offset=${offset}`)
      if (!response.ok) throw new Error('Failed to fetch transactions')
      const { data, count: total } = await response.json()
      setTransactions(data)
      setCount(total)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      })
      if (!response.ok) throw new Error('Failed to add transaction')
      const newTransaction = await response.json()
      setTransactions([newTransaction, ...transactions])
      return newTransaction
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update transaction')
      const updated = await response.json()
      setTransactions(transactions.map(t => t.id === id ? updated : t))
      return updated
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete transaction')
      setTransactions(transactions.filter(t => t.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return { 
    transactions, 
    loading, 
    error, 
    count,
    fetchTransactions, 
    addTransaction,
    updateTransaction,
    deleteTransaction
  }
}
