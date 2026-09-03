'use client'

export const dynamic = 'force-dynamic'

import { useLanguage } from '@/context/LanguageContext'
import { Card } from '@/components/ui/Card'
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const router = useRouter()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  const stats: DashboardStats = {
    balance: '$12,450.50',
    monthlyIncome: '$4,200.00',
    monthlyExpenses: '$2,800.00',
    totalDebt: '$8,500.00',
    savings: '$3,150.50',
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
              <IncomeExpenseChart />
            </Card>
          </div>

          <Card className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              {t('recent_transactions')}
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🍕</span>
                    <div>
                      <p className="text-sm font-medium text-white">Pizza Hut</p>
                      <p className="text-xs text-slate-500">Today</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-red-400">-$25.50</p>
                </div>
              </div>

              <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    <div>
                      <p className="text-sm font-medium text-white">Salary</p>
                      <p className="text-xs text-slate-500">Yesterday</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-green-400">+$4,200</p>
                </div>
              </div>

              <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="text-sm font-medium text-white">Electricity</p>
                      <p className="text-xs text-slate-500">3 days ago</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-yellow-400">-$120</p>
                </div>
              </div>
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
