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

  const stats: DashboardStats = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        balance: '$0.00',
        monthlyIncome: '$0.00',
        monthlyExpenses: '$0.00',
        totalDebt: '$0.00',
        savings: '$0.00',
      }
    }

    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthlyTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.date)
      return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    })

    const income = monthlyTransactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + (tx.amount || 0), 0)

    const expenses = monthlyTransactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + (tx.amount || 0), 0)

    const balance = income - expenses
    const totalDebt = 0
    const savings = balance > 0 ? balance * 0.2 : 0

    return {
      balance: `$${balance.toFixed(2)}`,
      monthlyIncome: `$${income.toFixed(2)}`,
      monthlyExpenses: `$${expenses.toFixed(2)}`,
      totalDebt: `$${totalDebt.toFixed(2)}`,
      savings: `$${savings.toFixed(2)}`,
    }
  }, [transactions])

  const statCards: StatCard[] = [
    {
      title: t('balance'),
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
      icon: '💳',
    },
    {
      title: t('savings'),
      value: stats.savings,
      icon: '🏦',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">{t('dashboard')}</h1>

        {loading && (
          <div className="mb-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
            {t('loading')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card, idx) => (
            <Card
              key={idx}
              title={card.title}
              value={card.value}
              icon={card.icon}
              bgColor="#1e293b"
              textColor="#06b6d4"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              {t('financial_overview')}
            </h2>
            <IncomeExpenseChart transactions={transactions} />
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {t('recent_transactions')}
            </h2>
            <div className="space-y-3">
              {transactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {tx.type === 'income' ? '📥' : '📤'}
                      </span>
                      <div>
                        <p className="text-white font-medium">{tx.description}</p>
                        <p className="text-slate-400 text-sm">
                          {new Date(tx.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className={`font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
