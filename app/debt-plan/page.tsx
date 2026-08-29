'use client'

import { useDebts } from '@/hooks/useDebts'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function DebtPlanPage() {
  const { debts, loading, error, addDebt } = useDebts()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    interest_rate: '',
    due_date: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDebt({
        name: formData.name,
        amount: parseFloat(formData.amount),
        interest_rate: parseFloat(formData.interest_rate) || 0,
        due_date: formData.due_date,
      })
      setFormData({ name: '', amount: '', interest_rate: '', due_date: '' })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-6 text-center">{t('loading')}</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0)
  const avgInterestRate = debts.length > 0 ? (debts.reduce((sum, d) => sum + d.interest_rate, 0) / debts.length).toFixed(2) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('debt_plan')}</h1>
          <p className="text-slate-400">{t('manage_your_debts')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-6">
            <p className="text-red-400 text-sm font-medium mb-2">{t('total_debt')}</p>
            <p className="text-3xl font-bold text-white">${totalDebt.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-6">
            <p className="text-yellow-400 text-sm font-medium mb-2">{t('avg_interest_rate')}</p>
            <p className="text-3xl font-bold text-white">{avgInterestRate}%</p>
          </div>
        </div>

        {/* Add Debt Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">{t('add_debt')}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder={t('debt_name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder={t('amount')}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder={t('interest_rate')}
              value={formData.interest_rate}
              onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded px-6 py-2 transition-all"
            >
              {t('add')}
            </button>
          </form>
        </div>

        {/* Debts List */}
        <div className="space-y-4">
          {debts.map((debt) => (
            <div key={debt.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{debt.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-400">${debt.amount.toFixed(2)}</p>
                  <p className="text-xs text-slate-400">{debt.interest_rate}% APR</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>📅 {t('due_date')}: {debt.due_date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
