'use client'

import { BaseService } from './base.service'
import { Transaction, TransactionFilters, ApiResponse } from '@/lib/types'

export class TransactionsService extends BaseService {
  protected tableName = 'transactions'

  async getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    try {
      const user = await this.getAuthUser()
      let query = this.supabase
        .from(this.tableName)
        .select('*')
        .eq('userId', user.id)
        .order('date', { ascending: false })

      if (filters?.startDate) {
        query = query.gte('date', filters.startDate.toISOString())
      }
      if (filters?.endDate) {
        query = query.lte('date', filters.endDate.toISOString())
      }
      if (filters?.type && filters.type !== 'all') {
        query = query.eq('type', filters.type)
      }
      if (filters?.category) {
        query = query.eq('category', filters.category)
      }
      if (filters?.cardId) {
        query = query.eq('cardId', filters.cardId)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([
          {
            ...transaction,
            userId: user.id,
            date: new Date(transaction.date).toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updates)
        .eq('id', id)
        .eq('userId', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async deleteTransaction(id: string): Promise<boolean> {
    try {
      const user = await this.getAuthUser()
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id)
        .eq('userId', user.id)

      if (error) throw error
      return true
    } catch (error) {
      return this.handleError(error)
    }
  }
}

export const transactionsService = new TransactionsService()
