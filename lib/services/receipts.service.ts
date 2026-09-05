'use client'

import { BaseService } from './base.service'
import { Receipt } from '@/lib/types'
import crypto from 'crypto'

export class ReceiptsService extends BaseService {
  protected tableName = 'receipts'

  async getReceipts(): Promise<Receipt[]> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createReceipt(receipt: Omit<Receipt, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'hash'>): Promise<Receipt> {
    try {
      const user = await this.getAuthUser()
      
      // Generar hash para detección de duplicados basado en image_url y extracted_data
      const hashInput = receipt.image_url + JSON.stringify(receipt.extracted_data || {})
      const hash = this.generateHash(hashInput)
      
      // Verificar duplicado
      const { data: existing } = await this.supabase
        .from(this.tableName)
        .select('id')
        .eq('user_id', user.id)
        .eq('hash', hash)
        .single()

      if (existing) {
        throw new Error('Duplicate receipt detected')
      }

      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([{ 
          ...receipt, 
          user_id: user.id, 
          hash 
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateReceipt(id: string, updates: Partial<Receipt>): Promise<Receipt> {
    try {
      const user = await this.getAuthUser()
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async deleteReceipt(id: string): Promise<boolean> {
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

  private generateHash(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex')
  }
}

export const receiptsService = new ReceiptsService()
