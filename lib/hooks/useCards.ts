'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/types'
import { cardsService } from '@/lib/services/cards.service'

export function useCards() {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCards()
  }, [])

  const loadCards = async () => {
    try {
      setLoading(true)
      const data = await cardsService.getCards()
      setCards(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading cards')
    } finally {
      setLoading(false)
    }
  }

  const createCard = async (card: Omit<Card, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const newCard = await cardsService.createCard(card)
      setCards([...cards, newCard])
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error creating card')
    }
  }

  const updateCard = async (id: string, updates: Partial<Card>) => {
    try {
      const updated = await cardsService.updateCard(id, updates)
      setCards(cards.map((c) => (c.id === id ? updated : c)))
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error updating card')
    }
  }

  const deleteCard = async (id: string) => {
    try {
      await cardsService.deleteCard(id)
      setCards(cards.filter((c) => c.id !== id))
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error deleting card')
    }
  }

  return { cards, loading, error, createCard, updateCard, deleteCard }
}
