import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import apiClient from '../services/apiClient'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { t } = useLanguage()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.email) return

    const loadDashboard = async () => {
      try {
        setError(null)
        const response = await apiClient.get('/api/dashboard', {
          params: { email: user.email }
        })
        setData(response.data.data)
      } catch (err: any) {
        console.error('Dashboard error:', err)
        setError(err.response?.data?.error || err.message || t('dashboard.error'))
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [user?.email])

  const getDebtTypeLabel = (type: string): string => {
    return t(`debtType.${type}`) || type
  }

  if (loading) return <div className="p-8">{t('dashboard.loading')}</div>
  if (error) return <div className="p-8 text-red-600">{t('dashboard.error')}: {error}</div>
  if (!data) return <div className="p-8">{t('dashboard.noData')}</div>

  const { debts = [], lastTransactions = [], subscriptions = [], summary = {} } = data
  const { totalDebt = 0, totalSaved = 0, monthlySubscriptionCost = 0 } = summary

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <LanguageToggle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">{t('dashboard.totalDebt')}</h3>
          <p className="text-3xl font-bold text-red-600">${totalDebt.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">{debts.length} {t('dashboard.debts')}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">{t('dashboard.activeSubscriptions')}</h3>
          <p className="text-3xl font-bold text-blue-600">${monthlySubscriptionCost.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">{subscriptions.length} {t('dashboard.subscriptions')}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">{t('dashboard.savings')}</h3>
          <p className="text-3xl font-bold text-green-600">${totalSaved.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">{t('dashboard.totalIncome')}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{t('dashboard.debtsSection')}</h2>
        {debts.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 font-medium">{t('dashboard.name')}</th>
                <th className="text-left py-2 font-medium">{t('dashboard.type')}</th>
                <th className="text-right py-2 font-medium">{t('dashboard.balance')}</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt: any) => (
                <tr key={debt.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{debt.name}</td>
                  <td className="py-2">{getDebtTypeLabel(debt.debt_type)}</td>
                  <td className="text-right py-2 font-semibold">${debt.current_balance?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">{t('dashboard.noDebts')}</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">{t('dashboard.recentTransactions')}</h2>
        {lastTransactions.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 font-medium">{t('dashboard.description')}</th>
                <th className="text-left py-2 font-medium">{t('dashboard.type')}</th>
                <th className="text-right py-2 font-medium">{t('dashboard.amount')}</th>
                <th className="text-left py-2 font-medium">{t('dashboard.date')}</th>
              </tr>
            </thead>
            <tbody>
              {lastTransactions.map((tx: any) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{tx.description}</td>
                  <td className="py-2">{tx.type === 'income' ? t('transactions.income') : t('transactions.expense')}</td>
                  <td className={`text-right py-2 font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount?.toFixed(2) || '0.00'}
                  </td>
                  <td className="py-2 text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">{t('dashboard.noTransactions')}</p>
        )}
      </div>
    </div>
  )
}
