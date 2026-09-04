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
        used: 0,
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
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-6">
            <p className="text-blue-400 text-sm font-medium mb-2">{t('total_used')}</p>
            <p className="text-3xl font-bold text-white">${totalUsed.toFixed(2)}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{t('add_card')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t('card_name')}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
                required
              />
              <input
                type="text"
                placeholder={t('issuer')}
                value={formData.issuer}
                onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
                required
              />
              <input
                type="number"
                placeholder={t('credit_limit')}
                value={formData.limit}
                onChange={(e) => setFormData({...formData, limit: e.target.value})}
                className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
                required
              />
              <input
                type="number"
                placeholder={t('interest_rate')}
                value={formData.interest_rate}
                onChange={(e) => setFormData({...formData, interest_rate: e.target.value})}
                className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              {t('add_card')}
            </button>
          </form>
        </div>

        {/* Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
              <h3 className="text-lg font-bold text-white mb-2">{card.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{card.issuer}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t('limit')}</span>
                  <span className="text-white font-semibold">${card.limit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t('used')}</span>
                  <span className="text-white font-semibold">${card.used.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t('available')}</span>
                  <span className="text-green-400 font-semibold">${(card.limit - card.used).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t('interest_rate')}</span>
                  <span className="text-white font-semibold">{card.interest_rate.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
