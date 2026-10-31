import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface CardModalProps {
  onClose: () => void
  onSave: (data: any) => void
  isLoading?: boolean
  initialData?: any
  availableColors?: Record<string, string>
}

const DEFAULT_COLORS = {
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

export default function CardModal({
  onClose,
  onSave,
  isLoading = false,
  initialData = null,
  availableColors = DEFAULT_COLORS,
}: CardModalProps) {
  const { t } = useLanguage()
  const modalRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: '',
    bank: '',
    balance: 0,
    limit_amount: 0,
    apr: 0,
    color: '#0066FF',
    card_type: 'credit',
    last_four: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        bank: initialData.bank || '',
        balance: initialData.balance || 0,
        limit_amount: initialData.limit_amount || 0,
        apr: initialData.apr || 0,
        color: initialData.color || '#0066FF',
        card_type: initialData.card_type || 'credit',
        last_four: initialData.last_four || '',
      })
    }
  }, [initialData])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, input, select, [data-no-drag]')) {
      return
    }
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'balance' || name === 'limit_amount' || name === 'apr' 
        ? parseFloat(value) || 0 
        : value,
    })
  }

  const handleColorChange = (color: string) => {
    setFormData({ ...formData, color })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('📤 Enviando card_type:', formData.card_type)
    onSave(formData)
  }

  const colorsToDisplay = { ...availableColors }
  if (formData.color && !Object.values(availableColors).includes(formData.color)) {
    colorsToDisplay['current'] = formData.color
  }

  const isCredit = formData.card_type === 'credit'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          className="flex justify-between items-center mb-6 cursor-grab active:cursor-grabbing select-none"
        >
          <h2 className="text-2xl font-bold text-white">
            {initialData ? t('cards.editCard') : t('cards.addCard')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            data-no-drag="true"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('cards.cardName')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="American Express"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
              data-no-drag="true"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('cards.bank')}
            </label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              placeholder="Chase, Capital One..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
              data-no-drag="true"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Last 4 Digits
            </label>
            <input
              type="text"
              name="last_four"
              value={formData.last_four}
              onChange={handleChange}
              placeholder="1234"
              maxLength="4"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              data-no-drag="true"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('cards.type') || 'Card Type'}
            </label>
            <select
              name="card_type"
              value={formData.card_type}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              data-no-drag="true"
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {isCredit ? t('cards.balance') : 'Account Balance'}
            </label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
              data-no-drag="true"
            />
          </div>

          {isCredit && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('cards.limit')}
                </label>
                <input
                  type="number"
                  name="limit_amount"
                  value={formData.limit_amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  required
                  data-no-drag="true"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('cards.apr')}
                </label>
                <input
                  type="number"
                  name="apr"
                  value={formData.apr}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  required
                  data-no-drag="true"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('cards.color')}
            </label>
            <div className="grid grid-cols-5 gap-2" data-no-drag="true">
              {Object.entries(colorsToDisplay).map(([name, color]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded-lg transition border-2 ${
                    formData.color === color 
                      ? 'border-white shadow-lg scale-110' 
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={name}
                  data-no-drag="true"
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-6" data-no-drag="true">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition"
              disabled={isLoading}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? t('common.saving') : t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
