import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import apiClient from '../services/apiClient'

interface Debt {
  id: string
  name: string
  current_balance: number
  interest_rate: number
  debt_type: string
  status: string
  is_card?: boolean
  bank?: string
}

export default function Debts() {
  const { session } = useAuthStore()
  const { t } = useLanguage()
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    current_balance: '',
    interest_rate: '',
    debt_type: 'personal_loan',
  })

  useEffect(() => {
    if (!session?.access_token) return
    loadDebts()
  }, [session?.access_token, t])

  const loadDebts = async () => {
    try {
      setError(null)
      const response = await apiClient.get('/api/debt')
      setDebts(response.data.data || [])
    } catch (err: any) {
      console.error('Debts error:', err)
      setError(err.response?.data?.error || err.message || t('debts.error'))
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
        current_balance: parseFloat(formData.current_balance),
        interest_rate: parseFloat(formData.interest_rate) || 0,
        debt_type: formData.debt_type,
      })

      setFormData({ name: '', current_balance: '', interest_rate: '', debt_type: 'personal_loan' })
      setShowForm(false)
      await loadDebts()
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
    return statusMap[status] || 'Active'
  }

  const getDebtNameLabel = (name: string, debtType?: string, bank?: string): string => {
    if (debtType === 'credit_card' && bank) {
      return bank
    }

    const nameLower = name.toLowerCase().trim()
    
    const nameMap: { [key: string]: string } = {
      'carro': t('debtNames.carro'),
      'auto': t('debtNames.carro'),
      'prestamo': t('debtNames.prestamo'),
      'loan': t('debtNames.prestamo'),
      'casa': t('debtNames.casa'),
      'home': t('debtNames.casa'),
      'tarjeta': t('debtNames.tarjeta'),
      'card': t('debtNames.tarjeta'),
    }
    
    return nameMap[nameLower] || name
  }

  if (loading) return <div className="p-8">{t('debts.loading')}</div>
  if (error) return <div className="p-8 text-red-600">{t('debts.error')}: {error}</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{t('debts.title')}</h1>
          <p className="text-gray-600 mt-2">Total: ${debts.reduce((sum, d) => sum + d.current_balance, 0).toFixed(2)}</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('debts.balance')} *</label>
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
        {debts.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">{t('debts.name')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">{t('debts.type')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">{t('debts.balance')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">{t('debts.interestRate')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">{t('debts.status')}</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt: Debt) => (
                <tr key={debt.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium">
                    {getDebtNameLabel(debt.name, debt.debt_type, debt.bank)}
                  </td>
                  <td className="py-3 px-4">{getDebtTypeLabel(debt.debt_type)}</td>
                  <td className="text-right py-3 px-4 font-semibold text-red-600">${debt.current_balance?.toFixed(2) || '0.00'}</td>
                  <td className="text-right py-3 px-4">{debt.interest_rate?.toFixed(2) || '0.00'}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      debt.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusLabel(debt.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {t('debts.noDebts')}
          </div>
        )}
      </div>
    </div>
  )
}
