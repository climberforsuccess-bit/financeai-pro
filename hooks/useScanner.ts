import { useState } from 'react'

interface ScannedReceipt {
  vendor: string
  amount: number
  category: string
  date: string
  items: string[]
  tax: number
  total: number
}

export function useScanner() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const processReceipt = async (file: File) => {
    try {
      setLoading(true)
      setError(null)
      
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/scanner/process-receipt', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process receipt')
      }

      const data = await response.json()
      setResult(data)
      return data
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { processReceipt, loading, error, result }
}
