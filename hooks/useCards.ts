import { useState, useEffect } from 'react'

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

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cards')
      if (!response.ok) throw new Error('Failed to fetch cards')
      const { data } = await response.json()
      setCards(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addCard = async (card: Omit<Card, 'id' | 'user_id' | 'used' | 'created_at'>) => {
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card),
      })
      if (!response.ok) throw new Error('Failed to add card')
      const newCard = await response.json()
      setCards([newCard, ...cards])
      return newCard
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return { cards, loading, error, fetchCards, addCard }
}
