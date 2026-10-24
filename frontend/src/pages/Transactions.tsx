import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
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
    category: 'groceries',
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    payment_method: 'credit_card',
    notes: '',
  })

  const categories = [
    'groceries', 'utilities', 'transportation', 'entertainment', 'healthcare',
    'education', 'dining', 'shopping', 'subscriptions', 'salary', 'other'
  ]

  const paymentMethods = [
    'credit_card', 'debit_card', 'bank_transfer', 'cash', 'paypal', 'other'
  ]

  useEffect(() => {
    if (!user?.email) return
    loadTransactions()
  }, [user?.email])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get('/api/transaction', {
        params: { email: user?.email }
      })
      setTransactions(response.data.data || [])
    } catch (err: any) {
      console.error('Error loading transactions:', err)
      setError(err.response?.data?.error || 'Error al cargar transacciones')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.email) return

    try {
      setError(null)
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        email: user.email,
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
      setError(err.response?.data?.error || 'Error al guardar transacción')
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
    if (!confirm('¿Eliminar esta transacción?')) return

    try {
      setError(null)
      await apiClient.delete(`/api/transaction/${id}`, {
        params: { email: user?.email }
      })
      await loadTransactions()
    } catch (err: any) {
      console.error('Error deleting transaction:', err)
      setError(err.response?.data?.error || 'Error al eliminar transacción')
    }
  }

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'groceries',
      date: new Date().toISOString().split('T')[0],
      merchant: '',
      payment_method: 'credit_card',
      notes: '',
    })
    setEditingId(null)
  }

  // Filtrar transacciones
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

  if (loading) return <div className="p-8">Cargando...</div>
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Transacciones</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Nueva Transacción
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-600 text-sm font-medium">Ingresos</p>
          <p className="text-2xl font-bold text-green-700">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm font-medium">Gastos</p>
          <p className="text-2xl font-bold text-red-700">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">{editingId ? 'Editar' : 'Nueva'} Transacción</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Monto</label>
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
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="expense">Gasto</option>
                <option value="income">Ingreso</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fecha</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Comerciante</label>
              <input
                type="text"
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Método de Pago</label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Notas</label>
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
                {editingId ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="border rounded px-3 py-2"
          >
            <option value="all">Todos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="date"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
            className="border rounded px-3 py-2"
            placeholder="Desde"
          />

          <input
            type="date"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            className="border rounded px-3 py-2"
            placeholder="Hasta"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-medium">Descripción</th>
              <th className="text-left py-3 px-4 font-medium">Categoría</th>
              <th className="text-left py-3 px-4 font-medium">Comerciante</th>
              <th className="text-left py-3 px-4 font-medium">Método</th>
              <th className="text-right py-3 px-4 font-medium">Monto</th>
              <th className="text-left py-3 px-4 font-medium">Fecha</th>
              <th className="text-center py-3 px-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{tx.description}</td>
                  <td className="py-3 px-4">{tx.category}</td>
                  <td className="py-3 px-4">{tx.merchant || '-'}</td>
                  <td className="py-3 px-4 text-xs bg-gray-100 px-2 py-1 rounded">{tx.payment_method || '-'}</td>
                  <td className={`text-right py-3 px-4 font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No hay transacciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
