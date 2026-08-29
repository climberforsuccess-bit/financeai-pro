import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  user_id: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  category: string
  description?: string
  date: string
  created_at: string
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/transactions?limit=50&offset=0')
      if (!response.ok) throw new Error('Failed to fetch transactions')
      const { data } = await response.json()
      setTransactions(data)
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

  return { transactions, loading, error, fetchTransactions, addTransaction }
}
