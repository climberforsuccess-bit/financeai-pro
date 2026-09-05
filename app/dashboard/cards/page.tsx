'use client'

export const dynamic = 'force-dynamic'

import { useLanguage } from '@/context/LanguageContext'
import { useCards } from '@/hooks/useCards'
import { Card } from '@/components/ui/Card'
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function CardsPage() {
  const { t } = useLanguage()
  const { cards, loading } = useCards()
  const [showBalances, setShowBalances] = useState<{ [key: string]: boolean }>({})

  const toggleBalance = (cardId: string) => {
    setShowBalances(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(balance)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-cyan-400">Cargando tarjetas...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Mis Tarjetas</h1>
          <p className="text-slate-400">Gestiona todas tus tarjetas de crédito</p>
        </div>

        {/* Cards Grid */}
        {cards.length === 0 ? (
          <Card className="p-12 text-center border border-slate-800">
            <Plus className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-4">No tienes tarjetas agregadas</p>
            <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition">
              Agregar Tarjeta
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Card
                key={card.id}
                className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-cyan-500/50 transition"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                      {card.card_type}
                    </p>
                    <p className="text-slate-300">{card.name}</p>
                  </div>
                  <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: card.color + '20' }}>
                    <span style={{ color: card.color }} className="font-bold text-lg">●</span>
                  </div>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-700">
                  <p className="text-xs text-slate-500 mb-2">Número</p>
                  <p className="text-xl font-mono font-bold">•••• •••• •••• {card.last_four}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Vencimiento</p>
                    <p className="font-mono text-sm">{card.due_date || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Límite</p>
                    <p className="text-sm font-semibold text-cyan-400">
                      {formatBalance(card.limit_amount || 0)}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Saldo Actual</span>
                    <button
                      onClick={() => toggleBalance(card.id)}
                      className="text-slate-400 hover:text-slate-300 transition"
                    >
                      {showBalances[card.id] ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-lg font-bold text-red-400 mt-2">
                    {showBalances[card.id]
                      ? formatBalance(card.balance || 0)
                      : '••••••'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-red-900/50 text-red-400 rounded-lg transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
