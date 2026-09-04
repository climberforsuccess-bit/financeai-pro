import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

interface Card {
  id: string
  user_id: string
  name: string
  issuer: string
  limit: number
  used: number
  interest_rate: number
  created_at: string
}

export function useCards() {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { authenticated } = useAuth()

  useEffect(() => {
    if (authenticated) {
      fetchCards()
    } else if (!loading) {
      setLoading(false)
    }
  }, [authenticated])

  const fetchCards = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('No access token')

      const response = await fetch('/api/cards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const { data } = await response.json()
      setCards(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards')
      setCards([])
    } finally {
      setLoading(false)
    }
  }

  return { cards, loading, error }
}
