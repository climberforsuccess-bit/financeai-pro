'use client'

import { BaseService } from './base.service'
import { Debt } from '@/lib/types'

export class DebtsService extends BaseService {
  protected tableName = 'debts'

  async getDebts(): Promise<Debt[]> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('userId', user.id)
        .in('status', ['active', 'paid'])
        .order('priority', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createDebt(debt: Omit<Debt, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Debt> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([{ ...debt, userId: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateDebt(id: string, updates: Partial<Debt>): Promise<Debt> {
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

  async deleteDebt(id: string): Promise<boolean> {
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

export const debtsService = new DebtsService()
