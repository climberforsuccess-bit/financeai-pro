'use client'

export const dynamic = 'force-dynamic'

import { useLanguage } from '@/context/LanguageContext'
import { useTransactions } from '@/hooks/useTransactions'
import { Card } from '@/components/ui/Card'
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart'
import { useMemo } from 'react'

interface DashboardStats {
  balance: string
  monthlyIncome: string
  monthlyExpenses: string
  totalDebt: string
  savings: string
}

interface StatCard {
  title: string
  value: string
  icon: string
}

export default function DashboardPage() {
  const { t } = useLanguage()
  const { transactions, loading } = useTransactions()

  // Calcular stats en tiempo real
  const stats: DashboardStats = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date)
      return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    })

    const monthlyIncome = monthTransactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0)

    const monthlyExpenses = monthTransactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0)

    const balance = transactions.reduce((sum, tx) => {
      return sum + (tx.type === 'income' ? tx.amount : -tx.amount)
    }, 0)

    const savings = balance - monthlyExpenses

    return {
      balance: `$${balance.toFixed(2)}`,
      monthlyIncome: `$${monthlyIncome.toFixed(2)}`,
      monthlyExpenses: `$${monthlyExpenses.toFixed(2)}`,
      totalDebt: '$0.00',
      savings: `$${savings.toFixed(2)}`,
    }
  }, [transactions])

  const statCards: StatCard[] = [
    {
      title: t('total_balance'),
      value: stats.balance,
      icon: '💰',
    },
    {
      title: t('monthly_income'),
      value: stats.monthlyIncome,
      icon: '📈',
    },
    {
      title: t('monthly_expenses'),
      value: stats.monthlyExpenses,
      icon: '📉',
    },
    {
      title: t('total_debt'),
      value: stats.totalDebt,
      icon: '📊',
    },
    {
      title: t('savings'),
      value: stats.savings,
      icon: '🎯',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t('dashboard')}
          </h1>
          <p className="text-slate-400">{t('today')}</p>
        </div>

        {loading && (
          <div className="mb-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
            Cargando datos...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card, idx) => (
            <Card
              key={idx}
              className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-500/30 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{card.icon}</span>
              </div>
              <p className="text-slate-400 text-sm mb-2">{card.title}</p>
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-6">
                {t('financial_overview')}
              </h2>
              <IncomeExpenseChart transactions={transactions} />
            </Card>
          </div>

          <Card className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              {t('recent_transactions')}
            </h2>
            <div className="space-y-3">
              {transactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tx.type === 'income' ? '💼' : '🛒'}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{tx.description}</p>
                        <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-sm text-slate-400">No hay transacciones</p>
              )}
            </div>
            <button className="w-full mt-4 py-2 px-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium rounded-lg transition border border-cyan-500/30">
              {t('view_all')}
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
