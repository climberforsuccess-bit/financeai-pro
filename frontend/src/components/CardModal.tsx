import { useState, useEffect } from 'react'

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

interface CardModalProps {
  onClose: () => void
  onSave: (cardData: any) => Promise<void>
  isLoading: boolean
  initialData: Card | null
  availableColors: { [key: string]: string }
}

export default function CardModal({ onClose, onSave, isLoading, initialData, availableColors }: CardModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    bank: '',
    balance: 0,
    limit_amount: 0,
    apr: 0,
    color: '#0066FF',
    last_four: '',
    card_type: 'credit' as 'credit' | 'debit',
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        bank: initialData.bank || '',
        balance: initialData.balance || 0,
        limit_amount: initialData.limit_amount || 0,
        apr: initialData.apr || 0,
        color: initialData.color || '#0066FF',
        last_four: initialData.last_four || '',
        card_type: initialData.card_type || 'credit',
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await onSave(formData)
    } catch (err: any) {
      setError(err.message || 'Error saving card')
    }
  }

  const colorEntries = Object.entries(availableColors || {})

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit Card' : 'Add Card'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="My Visa"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank *
            </label>
            <input
              type="text"
              value={formData.bank}
              onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Chase"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last 4 Digits
            </label>
            <input
              type="text"
              value={formData.last_four}
              onChange={(e) => setFormData({ ...formData, last_four: e.target.value.slice(0, 4) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="1234"
              maxLength={4}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Type
            </label>
            <select
              value={formData.card_type}
              onChange={(e) => setFormData({ ...formData, card_type: e.target.value as 'credit' | 'debit' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              disabled={isLoading}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Balance *
              </label>
              <input
                type="number"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                step="0.01"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limit
              </label>
              <input
                type="number"
                value={formData.limit_amount}
                onChange={(e) => setFormData({ ...formData, limit_amount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                step="0.01"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              APR (%)
            </label>
            <input
              type="number"
              value={formData.apr}
              onChange={(e) => setFormData({ ...formData, apr: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.00"
              step="0.01"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colorEntries.map(([colorName, colorValue]) => (
                <button
                  key={colorName}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: colorValue })}
                  className={`w-8 h-8 rounded-lg border-2 transition ${
                    formData.color === colorValue ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: colorValue }}
                  title={colorName}
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
