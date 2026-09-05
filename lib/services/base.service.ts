'use client'

import { getSupabaseClient } from '@/lib/supabase'
import { ApiResponse } from '@/lib/types'

export class BaseService {
  protected supabase = getSupabaseClient()
  protected tableName: string = ''

  protected async handleError(error: any): Promise<never> {
    console.error(`[${this.tableName}] Error:`, error)
    throw new Error(error?.message || 'Database error')
  }

  protected async getAuthUser() {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    return user
  }

  protected buildResponse<T>(success: boolean, data?: T, error?: string): ApiResponse<T> {
    return {
      success,
      data,
      error,
      message: success ? 'Success' : error,
    }
  }
}
