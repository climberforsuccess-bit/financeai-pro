'use client'

export const dynamic = 'force-dynamic'

import { useLanguage } from '@/context/LanguageContext'
import { Card } from '@/components/ui/Card'
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'

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
  textColor: string
  bgColor: string
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

  const statCards = useMemo((): StatCard[] => {
    return [
      {
        title: t('total_balance'),
        value: stats.balance,
        icon: '💰',
        textColor: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
      {
        title: t('monthly_income'),
        value: stats.monthlyIncome,
        icon: '📈',
        textColor: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        title: t('monthly_expenses'),
        value: stats.monthlyExpenses,
        icon: '📉',
        textColor: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)',
      },
      {
        title: t('total_debt'),
        value: stats.totalDebt,
        icon: '📊',
        textColor: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.1)',
      },
      {
        title: t('savings'),
        value: stats.savings,
        icon: '🎯',
        textColor: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.1)',
      },
    ]
  }, [t])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
              className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
              </div>
              <p className="text-slate-400 text-sm mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">
                {t('financial_overview')}
              </h2>
              <IncomeExpenseChart />
            </Card>
          </div>

          <Card className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              {t('recent_transactions')}
            </h2>
            <p className="text-slate-400 text-sm">
              {t('no_transactions')}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
