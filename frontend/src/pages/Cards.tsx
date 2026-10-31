import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import CardModal from '../components/CardModal'
import apiClient from '../services/apiClient'

interface Card {
  id: string
  name: string
  bank: string
  balance: number
  limit_amount: number
  apr: number
  color?: string
  last_four?: string
  card_type?: 'credit' | 'debit'
}

const CARD_COLORS = {
  blue: '#0066FF',
  purple: '#9D00FF',
  green: '#00D084',
  cyan: '#00D9FF',
  indigo: '#5B4FFF',
  pink: '#FF1B9C',
  teal: '#00C9A7',
  black: '#1A1A1A',
  gold: '#FFC300',
  yellow: '#FFEB3B',
  silver: '#E8E8E8',
  lime: '#00FF41',
}

const colorList = Object.values(CARD_COLORS)

const getTextColor = (hexColor: string): string => {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

const getUtilizationColor = (utilization: number) => {
  if (utilization < 30) return '#FFFFFF'
  if (utilization < 50) return '#FF9500'
  return '#FF2D2D'
}

export default function Cards() {
  const { session } = useAuthStore()
  const { t } = useLanguage()
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingCard, setEditingCard] = useState<Card | null>(null)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'credit' | 'debit'>('all')

  useEffect(() => {
    if (!session?.access_token) return
    loadCards()
  }, [session?.access_token])

  const loadCards = async () => {
    try {
      setError(null)
      const response = await apiClient.get('/api/cards')
      const cardsData = response.data.data || []
      const cardsWithColors = cardsData.map((card: Card, idx: number) => ({
        ...card,
        color: card.color || colorList[idx % colorList.length],
        
        card_type: card.card_type || 'credit',
      }))
      setCards(cardsWithColors)
    } catch (err: any) {
      console.error('Cards error:', err)
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCard = async (cardData: any) => {
    setSaving(true)
    console.log('🔵 Guardando tarjeta con datos:', cardData)
    try {
      if (editingCard?.id) {
        console.log(`🔵 PUT /api/cards/${editingCard.id}`, cardData)
        const response = await apiClient.put(`/api/cards/${editingCard.id}`, cardData)
        console.log('🟢 Respuesta del PUT:', response.data)
      } else {
        console.log('🔵 POST /api/cards', cardData)
        const response = await apiClient.post('/api/cards', cardData)
        console.log('🟢 Respuesta del POST:', response.data)
      }
      await loadCards()
      setEditingCard(null)
      setShowModal(false)
    } catch (err: any) {
      console.error('❌ Save error:', err)
      setError(err.response?.data?.error || err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCard = async (id: string) => {
    if (!confirm(t('cards.confirmDelete'))) return
    try {
      await apiClient.delete(`/api/cards/${id}`)
      await loadCards()
    } catch (err: any) {
      console.error('Delete error:', err)
      setError(err.response?.data?.error || err.message)
    }
  }

  const handleEditCard = (card: Card) => {
    setEditingCard(card)
    setShowModal(true)
  }

  const handleAddCard = () => {
    setEditingCard(null)
    setShowModal(true)
  }

  const filteredCards = cards.filter((card) => {
    if (activeTab === 'all') return true
    return card.card_type === activeTab
  })

  if (loading)
    return (
      <div className="p-8 text-center text-gray-400">
        {t('cards.loading')}
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">💳 {t('cards.title')}</h1>
            <p className="text-gray-400 text-sm">
              {t('cards.subtitle')}
            </p>
          </div>
          <div className="flex gap-4">
            <LanguageToggle />
            <button
              onClick={handleAddCard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              + {t('cards.addCard')}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6 text-red-200 text-sm">
            {error}
          </div>
        )}

        {showModal && (
          <CardModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveCard}
            isLoading={saving}
            initialData={editingCard}
            availableColors={CARD_COLORS}
          />
        )}

        <div className="flex gap-6 mb-8 border-b border-gray-700">
          {(['all', 'credit', 'debit'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm transition ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'all' && 'All Cards'}
              {tab === 'credit' && 'Credit'}
              {tab === 'debit' && 'Debit'}
            </button>
          ))}
        </div>

        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => {
              const isCredit = card.card_type === 'credit'
              const utilization = isCredit ? Math.min((card.balance / card.limit_amount) * 100, 100) : 0
              const utilizationColor = getUtilizationColor(utilization)
              const textColor = getTextColor(card.color || '#3B82F6')
              
              return (
                <div
                  key={card.id}
                  className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg transition hover:shadow-xl relative overflow-hidden group ${
                    isCredit ? 'h-72' : 'h-56'
                  }`}
                  style={{ backgroundColor: card.color }}
                >
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-black" />

                  <div className="relative z-10" style={{ color: textColor }}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs opacity-75 uppercase font-bold tracking-wide">
                          {card.bank}
                        </p>
                        <p className="text-xs opacity-60 mt-1">
                          {isCredit ? 'Credit' : 'Debit'} Card
                        </p>
                      </div>
                    </div>

                    <p className="text-2xl font-bold mb-1">{card.name}</p>
                    <p className="text-lg font-light tracking-widest opacity-90">
                      •••• {card.last_four}
                    </p>
                  </div>

                  {isCredit ? (
                    <>
                      <div className="relative z-10 grid grid-cols-3 gap-2 text-sm mb-6" style={{ color: textColor }}>
                        <div className="flex flex-col">
                          <p className="text-xs opacity-75 uppercase font-bold">Balance</p>
                          <p className="font-semibold">${card.balance?.toFixed(0) || '0'}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-xs opacity-75 uppercase font-bold">Limit</p>
                          <p className="font-semibold">${card.limit_amount?.toFixed(0) || '0'}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-xs opacity-75 uppercase font-bold">APR</p>
                          <p className="font-semibold">{card.apr?.toFixed(2) || '0'}%</p>
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24">
                          <svg
                            className="w-full h-full transform -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={textColor}
                              strokeWidth="3"
                              opacity="0.2"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={utilizationColor}
                              strokeWidth="3"
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              strokeDashoffset={`${
                                2 * Math.PI * 40 * (1 - Math.min(utilization, 100) / 100)
                              }`}
                              strokeLinecap="round"
                              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className="text-xl font-bold"
                              style={{ color: utilizationColor }}
                            >
                              {utilization.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="relative z-10 flex flex-col text-center" style={{ color: textColor }}>
                      <p className="text-xs opacity-75 uppercase font-bold mb-2">Balance</p>
                      <p className="text-3xl font-bold">${card.balance?.toFixed(0) || '0'}</p>
                    </div>
                  )}

                  <div className="flex gap-2 absolute bottom-6 left-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditCard(card)}
                      className="flex-1 bg-white/30 hover:bg-white/40 backdrop-blur text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="flex-1 bg-red-600/70 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">{t('cards.noCards')}</p>
            <button
              onClick={handleAddCard}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              + {t('cards.addCard')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
