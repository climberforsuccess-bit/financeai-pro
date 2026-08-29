'use client'

import { useCards } from '@/hooks/useCards'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CardsPage() {
  const { cards, loading, error, addCard } = useCards()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    limit: '',
    interest_rate: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addCard({
        name: formData.name,
        issuer: formData.issuer,
        limit: parseFloat(formData.limit),
        interest_rate: parseFloat(formData.interest_rate) || 0,
      })
      setFormData({ name: '', issuer: '', limit: '', interest_rate: '' })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-6 text-center">{t('loading')}</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  const totalLimit = cards.reduce((sum, c) => sum + c.limit, 0)
  const totalUsed = cards.reduce((sum, c) => sum + c.used, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('credit_cards')}</h1>
          <p className="text-slate-400">{t('manage_your_cards')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-6">
            <p className="text-purple-400 text-sm font-medium mb-2">{t('total_limit')}</p>
            <p className="text-3xl font-bold text-white">${totalLimit.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-6">
            <p className="text-orange-400 text-sm font-medium mb-2">{t('total_used')}</p>
            <p className="text-3xl font-bold text-white">${totalUsed.toFixed(2)}</p>
          </div>
        </div>

        {/* Add Card Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">{t('add_card')}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder={t('card_name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
              required
            />
            <input
              type="text"
              placeholder={t('issuer')}
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder={t('limit')}
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const utilization = (card.used / card.limit) * 100
            return (
              <div key={card.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{card.name}</h3>
                    <p className="text-sm text-slate-400">{card.issuer}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-700/50 text-slate-200">
                    {card.interest_rate}%
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">{t('utilization')}</span>
                    <span className="text-white font-semibold">${card.used.toFixed(2)} / ${card.limit.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        utilization > 80 ? 'bg-red-500' :
                        utilization > 50 ? 'bg-orange-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(utilization, 100)}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-400">{utilization.toFixed(1)}% {t('used')}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
