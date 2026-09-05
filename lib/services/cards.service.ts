'use client'

import { BaseService } from './base.service'
import { Card } from '@/types'

export class CardsService extends BaseService {
  protected tableName = 'cards'

  async getCards(): Promise<Card[]> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Mapear campos de Supabase a interfaz Card
      return (data || []).map(card => ({
        id: card.id,
        user_id: card.user_id,
        name: card.name,
        issuer: card.bank || 'Unknown',
        card_type: card.card_type,
        category: 'personal' as const,
        limit: card.limit_amount || 0,
        used: card.balance || 0,
        interest_rate: card.apr || 0,
        color: card.color || '#06b6d4',
        last_four_digits: card.last_four,
        payment_date: card.due_date ? new Date(card.due_date).getDate() : 1,
        is_active: true,
        created_at: card.created_at,
        updated_at: card.updated_at
      }))
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createCard(cardData: any): Promise<Card> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([{
          user_id: user.id,
          name: cardData.name,
          card_type: cardData.card_type,
          bank: cardData.issuer,
          limit_amount: cardData.limit,
          balance: 0,
          last_four: cardData.last_four_digits,
          color: cardData.color,
          apr: cardData.interest_rate,
          due_date: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      
      return {
        id: data.id,
        user_id: data.user_id,
        name: data.name,
        issuer: data.bank || 'Unknown',
        card_type: data.card_type,
        category: 'personal' as const,
        limit: data.limit_amount || 0,
        used: data.balance || 0,
        interest_rate: data.apr || 0,
        color: data.color || '#06b6d4',
        last_four_digits: data.last_four,
        payment_date: new Date(data.due_date).getDate(),
        is_active: true,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateCard(id: string, updates: any): Promise<Card> {
    try {
      const user = await this.getAuthUser()
      
      const dbUpdates: any = {}
      if (updates.name) dbUpdates.name = updates.name
      if (updates.limit) dbUpdates.limit_amount = updates.limit
      if (updates.used) dbUpdates.balance = updates.used
      if (updates.interest_rate) dbUpdates.apr = updates.interest_rate
      if (updates.color) dbUpdates.color = updates.color
      if (updates.issuer) dbUpdates.bank = updates.issuer

      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(dbUpdates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      
      return {
        id: data.id,
        user_id: data.user_id,
        name: data.name,
        issuer: data.bank || 'Unknown',
        card_type: data.card_type,
        category: 'personal' as const,
        limit: data.limit_amount || 0,
        used: data.balance || 0,
        interest_rate: data.apr || 0,
        color: data.color || '#06b6d4',
        last_four_digits: data.last_four,
        payment_date: new Date(data.due_date).getDate(),
        is_active: true,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async deleteCard(id: string): Promise<boolean> {
    try {
      const user = await this.getAuthUser()
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error
      return true
    } catch (error) {
      return this.handleError(error)
    }
  }
}

export const cardsService = new CardsService()
