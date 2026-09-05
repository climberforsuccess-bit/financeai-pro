'use client'

import { BaseService } from './base.service'
import { Subscription } from '@/lib/types'

export class SubscriptionsService extends BaseService {
  protected tableName = 'subscriptions'

  async getSubscriptions(): Promise<Subscription[]> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('userId', user.id)
        .in('status', ['active', 'paused'])
        .order('nextBillingDate', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createSubscription(subscription: Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([{ ...subscription, userId: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription> {
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

  async deleteSubscription(id: string): Promise<boolean> {
    try {
      const user = await this.getAuthUser()
      const { error } = await this.supabase
        .from(this.tableName)
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('userId', user.id)

      if (error) throw error
      return true
    } catch (error) {
      return this.handleError(error)
    }
  }
}

export const subscriptionsService = new SubscriptionsService()
