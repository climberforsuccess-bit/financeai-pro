'use client'

import { useSubscriptions } from '@/hooks/useSubscriptions'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function SubscriptionsPage() {
  const { subscriptions, loading, error, addSubscription } = useSubscriptions()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    frequency: 'monthly',
    category: 'entertainment',
    next_billing_date: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addSubscription({
        name: formData.name,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency as 'daily' | 'weekly' | 'monthly' | 'yearly',
        category: formData.category,
        next_billing_date: formData.next_billing_date,
      })
      setFormData({ name: '', amount: '', frequency: 'monthly', category: 'entertainment', next_billing_date: '' })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-6 text-center">{t('loading')}</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  const monthlyTotal = subscriptions
    .filter(s => s.frequency === 'monthly')
    .reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('subscriptions')}</h1>
          <p className="text-slate-400">{t('manage_recurring_payments')}</p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 rounded-lg p-6 mb-8">
          <p className="text-cyan-400 text-sm font-medium mb-2">{t('monthly_total')}</p>
          <p className="text-3xl font-bold text-white">${monthlyTotal.toFixed(2)}</p>
        </div>

        {/* Add Subscription Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">{t('add_subscription')}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder={t('service_name')}
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
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white"
            >
              <option value="daily">{t('daily')}</option>
              <option value="weekly">{t('weekly')}</option>
              <option value="monthly">{t('monthly')}</option>
              <option value="yearly">{t('yearly')}</option>
            </select>
            <input
              type="date"
              value={formData.next_billing_date}
              onChange={(e) => setFormData({ ...formData, next_billing_date: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded px-6 py-2 transition-all"
            >
              {t('add')}
            </button>
          </form>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm hover:border-slate-600 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{sub.name}</h3>
                  <p className="text-sm text-slate-400">{t(sub.frequency)}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${sub.amount.toFixed(2)}</p>
                  <p className="text-xs text-slate-400">{t('next_billing')}: {new Date(sub.next_billing_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-700/50 text-slate-200">
                  {sub.category}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                  {t('active')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
