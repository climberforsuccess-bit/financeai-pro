'use client'

import { useTransactions } from '@/hooks/useTransactions'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function TransactionsPage() {
  const { transactions, loading, error, addTransaction } = useTransactions()
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: 'food',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addTransaction({
        amount: parseFloat(formData.amount),
        type: formData.type as 'income' | 'expense' | 'transfer',
        category: formData.category,
        description: formData.description,
        date: new Date().toISOString(),
      })
      setFormData({ amount: '', type: 'expense', category: 'food', description: '' })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-6 text-center">{t('loading')}</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('transactions')}</h1>
          <p className="text-slate-400">{t('manage_your_finances')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-lg p-6">
            <p className="text-emerald-400 text-sm font-medium mb-2">{t('income')}</p>
            <p className="text-3xl font-bold text-white">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-6">
            <p className="text-red-400 text-sm font-medium mb-2">{t('expenses')}</p>
            <p className="text-3xl font-bold text-white">${totalExpense.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-6">
            <p className="text-blue-400 text-sm font-medium mb-2">{t('balance')}</p>
            <p className="text-3xl font-bold text-white">${(totalIncome - totalExpense).toFixed(2)}</p>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">{t('add_transaction')}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white"
            >
              <option value="expense">{t('expense')}</option>
              <option value="income">{t('income')}</option>
              <option value="transfer">{t('transfer')}</option>
            </select>
            <input
              type="text"
              placeholder={t('category')}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

        {/* Transactions List */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">{t('date')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">{t('description')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">{t('category')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">{t('type')}</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">{t('amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-3 text-sm text-slate-300">
                      {new Date(tx.date).toLocaleDateString(language)}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-300">{tx.description || '-'}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-200 text-xs">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' :
                        tx.type === 'expense' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {t(tx.type)}
                      </span>
                    </td>
                    <td className={`px-6 py-3 text-sm font-semibold text-right ${
                      tx.type === 'income' ? 'text-emerald-400' :
                      tx.type === 'expense' ? 'text-red-400' :
                      'text-blue-400'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
