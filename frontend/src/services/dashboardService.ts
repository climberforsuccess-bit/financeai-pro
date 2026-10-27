import { supabase } from '../lib/supabase'

export const dashboardService = {
  async getTotalDebt(profileId: string) {
    const { data, error } = await supabase
      .from('debts')
      .select('current_balance')
      .eq('profile_id', profileId)

    if (error) throw error
    return data?.reduce((sum, debt) => sum + (debt.current_balance || 0), 0) || 0
  },

  async getDebtCount(profileId: string) {
    const { count, error } = await supabase
      .from('debts')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', profileId)

    if (error) throw error
    return count || 0
  },

  async getTotalSubscriptions(profileId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('monthly_cost')
      .eq('profile_id', profileId)
      .eq('status', 'active')

    if (error) throw error
    return data?.reduce((sum, sub) => sum + (sub.monthly_cost || 0), 0) || 0
  },

  async getRecentTransactions(profileId: string, limit: number = 5) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  async getDebtsByType(profileId: string) {
    const { data, error } = await supabase
      .from('debts')
      .select('debt_type, current_balance')
      .eq('profile_id', profileId)

    if (error) throw error
    
    // Agrupar por tipo
    const grouped = data?.reduce((acc: Record<string, number>, debt) => {
      const type = debt.debt_type || 'Otro'
      acc[type] = (acc[type] || 0) + (debt.current_balance || 0)
      return acc
    }, {}) || {}

    return Object.entries(grouped).map(([type, balance]) => ({
      type,
      balance,
    }))
  },
}
