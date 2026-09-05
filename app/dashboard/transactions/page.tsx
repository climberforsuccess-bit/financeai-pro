'use client'

import { useState, useMemo } from 'react'
import { useTransactions } from '@/hooks/useTransactions'
import { useLanguage } from '@/context/LanguageContext'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Download,
  TrendingUp,
  Calendar,
} from 'lucide-react'

interface FilterState {
  search: string
  type: string
  category: string
  dateRange: string
}

export default function TransactionsPage() {
  const { t } = useLanguage()
  const { transactions, loading, error } = useTransactions()
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: '',
    category: '',
    dateRange: 'all',
  })

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      if (filters.search && !tx.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.type && tx.type !== filters.type) return false
      if (filters.category && tx.category !== filters.category) return false
      return true
    })
  }, [transactions, filters])

  const stats = {
    totalIncome: filtered
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0),
    totalExpense: filtered
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0),
    count: filtered.length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {t('transactions.title') || 'Transacciones'}
          </h1>
          <p className="text-slate-400">
            {t('transactions.subtitle') || 'Gestiona y analiza todas tus transacciones'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-medium">Ingresos</span>
              <ArrowDownLeft className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">
              ${stats.totalIncome.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-medium">Gastos</span>
              <ArrowUpRight className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">
              ${stats.totalExpense.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-medium">Balance</span>
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-cyan-400">
              ${(stats.totalIncome - stats.totalExpense).toLocaleString('es-ES', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
            >
              <option value="">Todos los tipos</option>
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
            >
              <option value="">Todas las categorías</option>
              <option value="food">Comida</option>
              <option value="transport">Transporte</option>
              <option value="entertainment">Entretenimiento</option>
              <option value="utilities">Utilidades</option>
              <option value="healthcare">Salud</option>
              <option value="other">Otro</option>
            </select>

            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition">
              Exportar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Cargando...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No hay transacciones</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((tx) => (
              <div
                key={tx.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-cyan-500/50 rounded-lg p-4 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      tx.type === 'income'
                        ? 'bg-green-500/20'
                        : 'bg-red-500/20'
                    }`}
                  >
                    {tx.type === 'income' ? (
                      <ArrowDownLeft className="w-6 h-6 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 text-red-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-white font-medium">{tx.description}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="inline-block bg-slate-700 px-2 py-1 rounded">
                        {tx.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(tx.date), 'd MMM yyyy', { locale: es })}
                      </span>
                      {tx.is_recurring && (
                        <span className="inline-block bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs">
                          Recurrente
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
