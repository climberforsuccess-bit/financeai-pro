import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import DebtDetailModal from '../components/DebtDetailModal'
import apiClient from '../services/apiClient'

interface Debt {
  id: string
  name: string
  total_amount: number
  current_balance: number
  amount_paid: number
  interest_rate: number
  debt_type: string
  status: string
  is_card?: boolean
  bank?: string
  due_date?: string
  minimum_payment?: number
  interest_accrued?: number
  payment_frequency?: string
  currency?: string
  card_id?: string | null
}

interface Card {
  id: string
  name: string
  card_type: 'credit' | 'debit'
  card_number: string
  bank: string
  balance: number
  limit_amount?: number
  apr?: number
  utilization_ratio?: number
}

export default function Debts() {
  const { session } = useAuthStore()
  const { t } = useLanguage()
  const [debts, setDebts] = useState<Debt[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    total_amount: '',
    current_balance: '',
    amount_paid: '',
    interest_rate: '',
    debt_type: 'personal_loan',
  })

  useEffect(() => {
    if (!session?.access_token) {
      console.log('No token yet, waiting...')
      return
    }
    console.log('Token found, loading data...')
    loadData()
  }, [session?.access_token])

  const loadData = async () => {
    try {
      setError(null)
      console.log('Fetching debts and cards...')
      
      const [debtsRes, cardsRes] = await Promise.all([
        apiClient.get('/api/debt'),
        apiClient.get('/api/cards')
      ])
      
      console.log('Debts response:', debtsRes.data)
      console.log('Cards response:', cardsRes.data)
      
      setDebts(debtsRes.data.data || [])
      setCards(cardsRes.data.data || [])
    } catch (err: any) {
      console.error('Load data error:', err)
      setError(err.response?.data?.error || err.message || 'Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await apiClient.post('/api/debt', {
        name: formData.name,
        total_amount: parseFloat(formData.total_amount),
        current_balance: parseFloat(formData.current_balance),
        amount_paid: parseFloat(formData.amount_paid) || 0,
        interest_rate: parseFloat(formData.interest_rate) || 0,
        debt_type: formData.debt_type,
      })

      setFormData({ 
        name: '', 
        total_amount: '', 
        current_balance: '', 
        amount_paid: '', 
        interest_rate: '', 
        debt_type: 'personal_loan' 
      })
      setShowForm(false)
      await loadData()
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.response?.data?.error || err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const getDebtTypeLabel = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      auto_loan: t('debtType.auto_loan'),
      student_loan: t('debtType.student_loan'),
      credit_card: t('debtType.credit_card'),
      mortgage: t('debtType.mortgage'),
      personal_loan: t('debtType.personal_loan'),
      other: t('debtType.other'),
    }
    return typeMap[type] || type
  }

  const getStatusLabel = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      active: t('debts.status.active'),
      inactive: t('debts.status.inactive'),
      paid: t('debts.status.paid'),
    }
    return statusMap[status] || t('debts.status.active')
  }

  const getPaymentProgress = (debt: any, isCard: boolean = false): number => {
    if (isCard) {
      const limit = Number(debt.limit_amount) || 1
      const balance = Number(debt.balance) || 0
      const available = limit - balance
      const progress = (available / limit) * 100
      
      return Math.min(progress, 100)
    }
    
    const total = Number(debt.total_amount) || 0
    let paid = Number(debt.amount_paid) || 0
    const balance = Number(debt.current_balance) || 0

    if (paid === 0 && balance > 0 && total > 0) {
      paid = total - balance
    }

    return total > 0 ? (paid / total) * 100 : 0
  }

  const getProgressColor = (progress: number): string => {
    if (progress < 25) return 'bg-red-500'
    if (progress < 50) return 'bg-yellow-500'
    if (progress < 75) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const manualDebts = debts.filter(debt => {
    const total = Number(debt.total_amount) || 0
    const hasNoCard = !debt.card_id || debt.card_id === null
    return total > 0 && hasNoCard
  })

  const creditCards = cards.filter(card => card.card_type === 'credit' && Number(card.balance) > 0)

  console.log('Manual debts:', manualDebts)
  console.log('Credit cards:', creditCards)

  const allDebts = [
    ...manualDebts.map(d => ({ ...d, isCard: false })),
    ...creditCards.map(c => ({
      id: c.id,
      name: c.bank,
      total_amount: c.limit_amount || 0,
      current_balance: c.balance,
      amount_paid: (c.limit_amount || 0) - c.balance,
      interest_rate: c.apr || 0,
      debt_type: 'credit_card',
      status: 'active',
      isCard: true,
      bank: c.bank,
      card_name: c.name,
      limit_amount: c.limit_amount,
      balance: c.balance,
    }))
  ]

  const totalDebt = allDebts.reduce((sum, d) => sum + Number(d.current_balance), 0)

  // 🔧 FIX: Actualizar selectedDebt cuando cambia la lista de deudas
  useEffect(() => {
    if (selectedDebt) {
      const updatedDebt = allDebts.find(d => d.id === selectedDebt.id)
      if (updatedDebt) {
        console.log('✅ Updating selectedDebt:', updatedDebt)
        setSelectedDebt(updatedDebt)
      }
    }
  }, [debts, cards])

  const handlePaymentSuccess = async () => {
    console.log('💰 Payment registered, reloading data...')
    await loadData()
  }

  if (!session?.access_token) return <div className="p-8">{t('debts.loading')}</div>
  if (loading) return <div className="p-8">{t('debts.loading')}</div>
  if (error) return <div className="p-8 text-red-600">{t('debts.error')}: {error}</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{t('debts.title')}</h1>
          <p className="text-gray-600 mt-2">Total: ${totalDebt.toFixed(2)}</p>
        </div>
        <div className="flex gap-4">
          <LanguageToggle />
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + {t('debts.addDebt')}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{t('debts.addDebt')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('debts.name')} *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., Auto Loan"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Deuda *</label>
                <input
                  type="number"
                  value={formData.total_amount}
                  onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Balance Actual *</label>
                <input
                  type="number"
                  value={formData.current_balance}
                  onChange={(e) => setFormData({ ...formData, current_balance: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ya Pagado</label>
                <input
                  type="number"
                  value={formData.amount_paid}
                  onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('debts.interestRate')} (%)</label>
                <input
                  type="number"
                  value={formData.interest_rate}
                  onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('debts.type')}</label>
              <select
                value={formData.debt_type}
                onChange={(e) => setFormData({ ...formData, debt_type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="personal_loan">{t('debtType.personal_loan')}</option>
                <option value="auto_loan">{t('debtType.auto_loan')}</option>
                <option value="student_loan">{t('debtType.student_loan')}</option>
                <option value="mortgage">{t('debtType.mortgage')}</option>
                <option value="credit_card">{t('debtType.credit_card')}</option>
                <option value="other">{t('debtType.other')}</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {submitting ? t('debts.adding') : t('debts.add')}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                {t('debts.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {allDebts.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">{t('debts.name')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">{t('debts.type')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Total / Límite</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Pagado / Disponible</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Falta / Balance</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Progreso</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">{t('debts.status')}</th>
              </tr>
            </thead>
            <tbody>
              {allDebts.map((debt: any) => {
                const progress = getPaymentProgress(debt, debt.isCard)
                const progressColor = getProgressColor(progress)
                const debtType = debt.isCard ? 'credit_card' : debt.debt_type
                const totalAmount = debt.amount_paid + debt.current_balance
                const paidAmount = debt.amount_paid
                
                return (
                  <tr 
                    key={debt.id} 
                    className="border-b hover:bg-blue-50 transition cursor-pointer"
                    onClick={() => !debt.isCard && setSelectedDebt(debt)}
                  >
                    <td className="py-3 px-4 font-medium">
                      {debt.name}
                    </td>
                    <td className="py-3 px-4">{getDebtTypeLabel(debtType)}</td>
                    <td className="text-right py-3 px-4 font-semibold">${totalAmount?.toFixed(2) || '0.00'}</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-600">${paidAmount?.toFixed(2) || '0.00'}</td>
                    <td className="text-right py-3 px-4 font-semibold text-red-600">${debt.current_balance?.toFixed(2) || '0.00'}</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full ${progressColor} rounded-full transition-all`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 w-8">{progress.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {getStatusLabel(debt.status)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {t('debts.noDebts')}
          </div>
        )}
      </div>

      {selectedDebt && !selectedDebt.is_card && (
        <DebtDetailModal 
          debt={selectedDebt} 
          onClose={() => setSelectedDebt(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
