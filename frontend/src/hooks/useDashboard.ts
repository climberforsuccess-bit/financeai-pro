import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { dashboardService } from '../services/dashboardService'

export function useDashboard() {
  const { user } = useAuthStore()
  const userId = user?.id || ''

  const totalDebtQuery = useQuery({
    queryKey: ['totalDebt', userId],
    queryFn: () => dashboardService.getTotalDebt(userId),
    enabled: !!userId,
  })

  const debtCountQuery = useQuery({
    queryKey: ['debtCount', userId],
    queryFn: () => dashboardService.getDebtCount(userId),
    enabled: !!userId,
  })

  const totalSubscriptionsQuery = useQuery({
    queryKey: ['totalSubscriptions', userId],
    queryFn: () => dashboardService.getTotalSubscriptions(userId),
    enabled: !!userId,
  })

  const recentTransactionsQuery = useQuery({
    queryKey: ['recentTransactions', userId],
    queryFn: () => dashboardService.getRecentTransactions(userId, 5),
    enabled: !!userId,
  })

  const debtsByTypeQuery = useQuery({
    queryKey: ['debtsByType', userId],
    queryFn: () => dashboardService.getDebtsByType(userId),
    enabled: !!userId,
  })

  return {
    totalDebt: totalDebtQuery.data || 0,
    debtCount: debtCountQuery.data || 0,
    totalSubscriptions: totalSubscriptionsQuery.data || 0,
    recentTransactions: recentTransactionsQuery.data || [],
    debtsByType: debtsByTypeQuery.data || [],
    isLoading: totalDebtQuery.isLoading || debtCountQuery.isLoading || totalSubscriptionsQuery.isLoading || recentTransactionsQuery.isLoading,
    error: totalDebtQuery.error || debtCountQuery.error || totalSubscriptionsQuery.error || recentTransactionsQuery.error,
  }
}
