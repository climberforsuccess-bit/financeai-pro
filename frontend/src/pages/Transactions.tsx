import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import apiClient from '../services/apiClient'
import { Trash2, Edit2, Plus } from 'lucide-react'

interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  merchant?: string
  payment_method?: string
  notes?: string
  status?: string
}

export default function Transactions() {
  const { user } = useAuthStore()
  const { language, t } = useLanguage()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    payment_method: 'credit_card',
    notes: '',
  })

  const categories = [
    'food', 'transport', 'utilities', 'entertainment', 'health',
    'shopping', 'education', 'subscriptions', 'salary', 'other'
  ]

  const paymentMethods = [
    { value: 'credit_card', label: t('paymentMethod.creditCard') },
    { value: 'debit_card', label: t('paymentMethod.debitCard') },
    { value: 'cash', label: t('paymentMethod.cash') },
    { value: 'transfer', label: t('paymentMethod.transfer') },
    { value: 'check', label: t('paymentMethod.check') },
    { value: 'other', label: t('paymentMethod.other') },
  ]

  const translatePaymentMethod = (method: string): string => {
    const found = paymentMethods.find(m => m.value === method)
    return found ? found.label : method
  }

  const translateCategory = (cat: string): string => {
    const key = `category.${cat}`
    const translated = t(key)
    return translated === key ? cat : translated
  }

  useEffect(() => {
    if (!user?.id) return
    loadTransactions()
  }, [user?.id])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get('/api/transaction')
      setTransactions(response.data.data || response.data || [])
    } catch (err: any) {
      console.error('Error loading transactions:', err)
      setError(err.response?.data?.error || err.message || 'Error al cargar transacciones')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    try {
      setError(null)
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
      }

      if (editingId) {
        await apiClient.put(`/api/transaction/${editingId}`, payload)
      } else {
        await apiClient.post('/api/transaction', payload)
      }

      await loadTransactions()
      resetForm()
      setShowForm(false)
    } catch (err: any) {
      console.error('Error saving transaction:', err)
      setError(err.response?.data?.error || err.message || 'Error al guardar transacción')
    }
  }

  const handleEdit = (transaction: Transaction) => {
    setFormData({
      description: transaction.description,
      amount: transaction.amount.toString(),
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
      merchant: transaction.merchant || '',
      payment_method: transaction.payment_method || 'credit_card',
      notes: transaction.notes || '',
    })
    setEditingId(transaction.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm(language === 'es' ? '¿Eliminar esta transacción?' : 'Delete this transaction?')) return

    try {
      setError(null)
      await apiClient.delete(`/api/transaction/${id}`)
      await loadTransactions()
    } catch (err: any) {
      console.error('Error deleting transaction:', err)
      setError(err.response?.data?.error || err.message || 'Error al eliminar transacción')
    }
  }

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
      merchant: '',
      payment_method: 'credit_card',
      notes: '',
    })
    setEditingId(null)
  }

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tx.merchant?.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || tx.type === filterType
    const matchesCategory = filterCategory === 'all' || tx.category === filterCategory
    const txDate = new Date(tx.date)
    const matchesDateFrom = !filterDateFrom || txDate >= new Date(filterDateFrom)
    const matchesDateTo = !filterDateTo || txDate <= new Date(filterDateTo)

    return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo
  })

  const totalIncome = filteredTransactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0)
  const totalExpense = filteredTransactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0)

  if (loading) return <div className="p-8">{t('common.loading')}</div>
  if (error) return <div className="p-8 text-red-600">{t('common.error')}: {error}</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{t('transactions.title')}</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> {t('transactions.addNew')}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-600 text-sm font-medium">{t('transactions.incomeTotal')}</p>
          <p className="text-2xl font-bold text-green-700">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm font-medium">{t('transactions.expenseTotal')}</p>
          <p className="text-2xl font-bold text-red-700">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">{editingId ? t('transactions.editTitle') : t('transactions.newTitle')}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">{t('transactions.description')}</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('transactions.amount')}</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('transactions.type')}</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="expense">{t('transactions.expense')}</option>
                <option value="income">{t('transactions.income')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('transactions.category')}</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{translateCategory(cat)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('transactions.date')}</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('transactions.merchant')}</label>
              <input
                type="text"
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('transactions.paymentMethod')}</label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">{t('transactions.notes')}</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>

            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? t('transactions.update') : t('common.save')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder={t('transactions.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="border rounded px-3 py-2"
          >
            <option value="all">{t('transactions.all')}</option>
            <option value="income">{t('transactions.income')}</option>
            <option value="expense">{t('transactions.expense')}</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">{t('transactions.allCategories')}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{translateCategory(cat)}</option>
            ))}
          </select>

          <input
            type="date"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-medium">{t('transactions.description')}</th>
              <th className="text-left py-3 px-4 font-medium">{t('transactions.category')}</th>
              <th className="text-left py-3 px-4 font-medium">{t('transactions.merchant')}</th>
              <th className="text-left py-3 px-4 font-medium">{t('transactions.paymentMethod')}</th>
              <th className="text-right py-3 px-4 font-medium">{t('transactions.amount')}</th>
              <th className="text-left py-3 px-4 font-medium">{t('transactions.date')}</th>
              <th className="text-center py-3 px-4 font-medium">{t('transactions.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{tx.description}</td>
                  <td className="py-3 px-4">{translateCategory(tx.category)}</td>
                  <td className="py-3 px-4">{tx.merchant || '-'}</td>
                  <td className="py-3 px-4"><span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{translatePaymentMethod(tx.payment_method || 'other')}</span></td>
                  <td className={`text-right py-3 px-4 font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{new Date(tx.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</td>
                  <td className="py-3 px-4 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  {t('dashboard.noTransactions')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
