import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import apiClient from '../services/apiClient'

interface Debt {
  id: string
  name: string
  current_balance: number
  interest_rate: number
  debt_type: string
  status: string
  bank?: string
}

interface Transaction {
  id: string
  description: string
  type: 'income' | 'expense'
  amount: number
  date: string
}

export default function Dashboard() {
  const { session } = useAuthStore()
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!session?.access_token) return

    const loadDashboard = async () => {
      try {
        setError(null)
        const response = await apiClient.get('/api/dashboard')
        setData(response.data.data)
      } catch (err: any) {
        console.error('Dashboard error:', err)
        setError(err.response?.data?.error || err.message || t('dashboard.error'))
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [session?.access_token, t])

  if (loading) return <div className="p-8">{t('dashboard.loading')}</div>
  if (error) return <div className="p-8 text-red-600">{t('dashboard.error')}: {error}</div>
  if (!data) return <div className="p-8">{t('dashboard.noData')}</div>

  const { summary = {}, debts = [], lastTransactions = [], subscriptions = [] } = data
  const { totalDebt = 0, totalSaved = 0, monthlySubscriptionCost = 0 } = summary

  const getDebtTypeLabel = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      auto_loan: t('debtType.auto_loan'),
      student_loan: t('debtType.student_loan'),
      credit_card: t('debtType.credit_card'),
      mortgage: t('debtType.mortgage'),
      personal_loan: t('debtType.personal_loan'),
      other: t('debtType.other'),
    }
    return typeMap[type] || type
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        </div>
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
              {debts.slice(0, 5).map((debt: Debt) => (
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">{t('dashboard.description')}</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">{t('dashboard.type')}</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">{t('dashboard.amount')}</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">{t('dashboard.date')}</th>
                </tr>
              </thead>
              <tbody>
                {lastTransactions.map((tx: Transaction) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{tx.description}</td>
                    <td className="py-3 px-2 text-xs">
                      <span className={`px-2 py-1 rounded ${tx.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {tx.type === 'income' ? t('transactions.income') : t('transactions.expense')}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold">${tx.amount.toFixed(2)}</td>
                    <td className="py-3 px-2 text-gray-500 text-xs">{new Date(tx.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">{t('dashboard.noTransactions')}</p>
        )}
      </div>
    </div>
  )
}
