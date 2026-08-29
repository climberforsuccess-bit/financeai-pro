'use client'

import { useDashboardSummary } from '@/hooks/useDashboardSummary'
import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { summary, loading, error, refetch } = useDashboardSummary()
  const { t, language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 mt-4">{t('loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-400">{t('error')}: {error}</p>
            <button
              onClick={refetch}
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
            >
              {t('reload')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('dashboard')}</h1>
          <p className="text-slate-400">{t('financial_overview')}</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-blue-500/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-400 text-sm font-medium">{t('balance')}</p>
              </div>
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white">${summary.balance.toFixed(2)}</p>
            <p className="text-xs text-blue-300 mt-2">{summary.month}</p>
          </div>

          {/* Income Card */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-emerald-500/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-emerald-400 text-sm font-medium">{t('income')}</p>
              </div>
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-emerald-400">${summary.income.toFixed(2)}</p>
            <p className="text-xs text-emerald-300 mt-2">+{((summary.income / (summary.income + summary.expenses)) * 100).toFixed(1)}%</p>
          </div>

          {/* Expenses Card */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-red-500/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-red-400 text-sm font-medium">{t('expenses')}</p>
              </div>
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-red-400">${summary.expenses.toFixed(2)}</p>
            <p className="text-xs text-red-300 mt-2">-{((summary.expenses / (summary.income + summary.expenses)) * 100).toFixed(1)}%</p>
          </div>

          {/* Subscriptions Card */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-purple-500/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-purple-400 text-sm font-medium">{t('subscriptions')}</p>
              </div>
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM15 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-purple-400">${summary.subscriptions.monthlyTotal.toFixed(2)}</p>
            <p className="text-xs text-purple-300 mt-2">{summary.subscriptions.active} {t('active')}</p>
          </div>
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cards Overview */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4">{t('credit_cards')}</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">{t('total_cards')}</span>
                  <span className="text-white font-semibold">{summary.cards.total}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">{t('utilization')}</span>
                  <span className="text-white font-semibold">{summary.cards.utilization.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      summary.cards.utilization > 80 ? 'bg-red-500' :
                      summary.cards.utilization > 50 ? 'bg-orange-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(summary.cards.utilization, 100)}%` }}
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <p className="text-xs text-slate-400">
                  ${summary.cards.used.toFixed(2)} / ${summary.cards.limit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Debts Overview */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4">{t('debt_plan')}</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">{t('total_debt')}</span>
                  <span className="text-red-400 font-semibold">${summary.debts.amount.toFixed(2)}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">{t('debts_count')}</span>
                  <span className="text-white font-semibold">{summary.debts.total}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <button className="w-full text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  {t('view_plan')} →
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Overview */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4">{t('transactions')}</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">{t('this_month')}</span>
                  <span className="text-white font-semibold">{summary.transactions}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">{t('avg_daily')}</span>
                  <span className="text-white font-semibold">
                    ${(summary.expenses / 30).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <button className="w-full text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  {t('view_all')} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
