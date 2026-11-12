import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

export interface DashboardData {
  totalDebt: number
  totalIncome: number
  totalExpenses: number
  totalSaved: number
  debts: Array<{
    id: string
    name: string
    current_balance: number
    interest_rate: number
    debt_type: string
  }>
  lastTransactions: Array<{
    description: string
    type: 'income' | 'expense'
    amount: number
    date: string
  }>
}

export function useAIInsights() {
  const [insights, setInsights] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateInsights = useCallback(async (data: DashboardData, language: 'en' | 'es' = 'es') => {
    setLoading(true)
    setError(null)

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token

      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/ai/insights?lang=${language}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to generate insights')
      }

      const result = await response.json()
      setInsights(result.insights)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      console.error('AI Insights Error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { insights, loading, error, generateInsights }
}
