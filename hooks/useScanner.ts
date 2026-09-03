import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

interface ReceiptData {
  vendor: string
  amount: number
  date: string
  category: string
  items?: string[]
  tax?: number
}

export function useScanner() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { authenticated } = useAuth()

  const processReceipt = async (file: File): Promise<ReceiptData | null> => {
    if (!authenticated) {
      setError('Not authenticated')
      return null
    }

    try {
      setLoading(true)
      setError(null)

      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      // CREATE FormData (no JSON)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/scanner/process-receipt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API error: ${response.status}`)
      }

      const data = await response.json()
      return data.data
    } catch (err: any) {
      const message = err.message || 'Failed to process receipt'
      setError(message)
      console.error('Scanner error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    processReceipt,
    loading,
    error,
    authenticated,
  }
}
