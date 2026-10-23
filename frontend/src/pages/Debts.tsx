import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

interface Debt {
  id: string
  name: string
  total_amount: number
  current_balance: number
  interest_rate: number
  minimum_payment: number
  due_date: number
  debt_type: string
  created_at: string
}

interface Payment {
  id: string
  amount: number
  payment_date: string
  notes?: string
}

const debtTypeLabels: { [key: string]: string } = {
  credit_card: 'Tarjeta de Crédito',
  personal_loan: 'Préstamo Personal',
  student_loan: 'Préstamo Estudiantil',
  mortgage: 'Hipoteca',
  car_loan: 'Préstamo Auto',
  other: 'Otro'
}

const debtTypeIcons: { [key: string]: string } = {
  credit_card: '💳',
  personal_loan: '📋',
  student_loan: '🎓',
  mortgage: '🏠',
  car_loan: '🚗',
  other: '💰'
}

export default function Debts() {
  const { user } = useAuth()
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentNotes, setPaymentNotes] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    total_amount: '',
    current_balance: '',
    interest_rate: '',
    minimum_payment: '',
    due_date: '',
    debt_type: 'credit_card'
  })

  useEffect(() => {
    if (user?.id) {
      fetchDebts()
    }
  }, [user?.id])

  const fetchDebts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('debts')
        .select('*')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDebts(data || [])
    } catch (error) {
      console.error('Error fetching debts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPaymentHistory = async (debtId: string) => {
    try {
      const { data, error } = await supabase
        .from('debt_payments')
        .select('*')
        .eq('debt_id', debtId)
        .order('payment_date', { ascending: false })

      if (error) throw error
      setPaymentHistory(data || [])
    } catch (error) {
      console.error('Error fetching payment history:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('debts')
        .insert([
          {
            profile_id: user?.id,
            name: formData.name,
            total_amount: parseFloat(formData.total_amount),
            current_balance: parseFloat(formData.current_balance),
            interest_rate: parseFloat(formData.interest_rate),
            minimum_payment: parseFloat(formData.minimum_payment),
            due_date: parseInt(formData.due_date),
            debt_type: formData.debt_type
          }
        ])

      if (error) throw error

      setFormData({
        name: '',
        total_amount: '',
        current_balance: '',
        interest_rate: '',
        minimum_payment: '',
        due_date: '',
        debt_type: 'credit_card'
      })
      setShowForm(false)
      fetchDebts()
    } catch (error) {
      console.error('Error adding debt:', error)
    }
  }

  const handleEdit = (debt: Debt) => {
    setSelectedDebt(debt)
    setFormData({
      name: debt.name,
      total_amount: debt.total_amount.toString(),
      current_balance: debt.current_balance.toString(),
      interest_rate: debt.interest_rate.toString(),
      minimum_payment: debt.minimum_payment.toString(),
      due_date: debt.due_date.toString(),
      debt_type: debt.debt_type
    })
    setShowEditModal(true)
  }

  const handleUpdateDebt = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDebt) return

    try {
      const { error } = await supabase
        .from('debts')
        .update({
          name: formData.name,
          total_amount: parseFloat(formData.total_amount),
          current_balance: parseFloat(formData.current_balance),
          interest_rate: parseFloat(formData.interest_rate),
          minimum_payment: parseFloat(formData.minimum_payment),
          due_date: parseInt(formData.due_date),
          debt_type: formData.debt_type
        })
        .eq('id', selectedDebt.id)

      if (error) throw error

      setShowEditModal(false)
      setSelectedDebt(null)
      setFormData({
        name: '',
        total_amount: '',
        current_balance: '',
        interest_rate: '',
        minimum_payment: '',
        due_date: '',
        debt_type: 'credit_card'
      })
      fetchDebts()
    } catch (error) {
      console.error('Error updating debt:', error)
    }
  }

  const handlePaymentClick = (debt: Debt) => {
    setSelectedDebt(debt)
    setPaymentAmount('')
    setPaymentNotes('')
    setShowPaymentModal(true)
  }

  const handleHistoryClick = async (debt: Debt) => {
    setSelectedDebt(debt)
    await fetchPaymentHistory(debt.id)
    setShowHistoryModal(true)
  }

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDebt || !paymentAmount) return

    const amount = parseFloat(paymentAmount)
    if (amount <= 0 || amount > selectedDebt.current_balance) {
      alert('Monto inválido')
      return
    }

    try {
      const newBalance = selectedDebt.current_balance - amount

      const { error: updateError } = await supabase
        .from('debts')
        .update({
          current_balance: newBalance
        })
        .eq('id', selectedDebt.id)

      if (updateError) throw updateError

      const { error: paymentError } = await supabase
        .from('debt_payments')
        .insert([
          {
            debt_id: selectedDebt.id,
            profile_id: user?.id,
            amount: amount,
            notes: paymentNotes || null
          }
        ])

      if (paymentError) throw paymentError

      setShowPaymentModal(false)
      setSelectedDebt(null)
      setPaymentAmount('')
      setPaymentNotes('')
      fetchDebts()
    } catch (error) {
      console.error('Error recording payment:', error)
    }
  }

  const handleDeletePayment = async (paymentId: string) => {
    if (!confirm('¿Eliminar este pago?')) return
    try {
      const payment = paymentHistory.find(p => p.id === paymentId)
      if (!payment || !selectedDebt) return

      const { error: deleteError } = await supabase
        .from('debt_payments')
        .delete()
        .eq('id', paymentId)

      if (deleteError) throw deleteError

      const restoredBalance = selectedDebt.current_balance + payment.amount
      const { error: updateError } = await supabase
        .from('debts')
        .update({
          current_balance: restoredBalance
        })
        .eq('id', selectedDebt.id)

      if (updateError) throw updateError

      const updatedHistory = paymentHistory.filter(p => p.id !== paymentId)
      setPaymentHistory(updatedHistory)
      
      setSelectedDebt({
        ...selectedDebt,
        current_balance: restoredBalance
      })
      
      fetchDebts()
    } catch (error) {
      console.error('Error deleting payment:', error)
      alert('Error al eliminar el pago')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta deuda?')) return
    try {
      const { error } = await supabase
        .from('debts')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchDebts()
    } catch (error) {
      console.error('Error deleting debt:', error)
    }
  }

  const calculatePaymentStats = (debt: Debt) => {
    const totalPaid = debt.total_amount - debt.current_balance
    const percentagePaid = (totalPaid / debt.total_amount) * 100
    return { totalPaid, percentagePaid }
  }

  const calculateHistoryTotal = () => {
    return paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) return <div className="text-center py-12 text-gray-600">Cargando deudas...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Deudas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {showForm ? 'Cancelar' : '+ Agregar Deuda'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 border-l-4 border-blue-600">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <select
              value={formData.debt_type}
              onChange={(e) => setFormData({ ...formData, debt_type: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="credit_card">Tarjeta de Crédito</option>
              <option value="personal_loan">Préstamo Personal</option>
              <option value="student_loan">Préstamo Estudiantil</option>
              <option value="mortgage">Hipoteca</option>
              <option value="car_loan">Préstamo Auto</option>
              <option value="other">Otro</option>
            </select>
            <input
              type="number"
              placeholder="Monto Total"
              value={formData.total_amount}
              onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
              step="0.01"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="number"
              placeholder="Saldo Actual"
              value={formData.current_balance}
              onChange={(e) => setFormData({ ...formData, current_balance: e.target.value })}
              step="0.01"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="number"
              placeholder="Tasa de Interés (%)"
              value={formData.interest_rate}
              onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
              step="0.01"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="number"
              placeholder="Pago Mínimo"
              value={formData.minimum_payment}
              onChange={(e) => setFormData({ ...formData, minimum_payment: e.target.value })}
              step="0.01"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="number"
              placeholder="Día de Vencimiento"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Guardar Deuda
          </button>
        </form>
      )}

      {debts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
          No hay deudas registradas
        </div>
      ) : (
        <div className="space-y-3">
          {debts.map((debt) => {
            const { totalPaid, percentagePaid } = calculatePaymentStats(debt)
            return (
              <div key={debt.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-blue-600">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    {/* Icono y nombre */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-4xl">{debtTypeIcons[debt.debt_type]}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{debt.name}</h3>
                        <p className="text-xs text-gray-500">{debtTypeLabels[debt.debt_type]}</p>
                      </div>
                    </div>

                    {/* Información financiera */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        ${debt.current_balance.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Saldo actual</p>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Progreso pagado</span>
                      <span className="text-xs font-semibold text-gray-700">{percentagePaid.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentagePaid}%` }}
                      />
                    </div>
                  </div>

                  {/* Detalles adicionales */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-500">Total Original</p>
                      <p className="font-semibold text-gray-900">${debt.total_amount.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-500">Tasa</p>
                      <p className="font-semibold text-gray-900">{debt.interest_rate}%</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-500">Pago Mín.</p>
                      <p className="font-semibold text-gray-900">${debt.minimum_payment.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handlePaymentClick(debt)}
                      className="text-xs bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors font-medium"
                    >
                      Pagar
                    </button>
                    <button
                      onClick={() => handleHistoryClick(debt)}
                      className="text-xs bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition-colors font-medium"
                    >
                      Historial
                    </button>
                    <button
                      onClick={() => handleEdit(debt)}
                      className="text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(debt.id)}
                      className="text-xs bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showEditModal && selectedDebt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-96 overflow-y-auto border-t-4 border-blue-600">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Editar Deuda</h2>
            <form onSubmit={handleUpdateDebt} className="space-y-4">
              
              <div className="border-b pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Información Básica</p>
                <input
                  type="text"
                  placeholder="Nombre de la deuda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <select
                  value={formData.debt_type}
                  onChange={(e) => setFormData({ ...formData, debt_type: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  <option value="credit_card">Tarjeta de Crédito</option>
                  <option value="personal_loan">Préstamo Personal</option>
                  <option value="student_loan">Préstamo Estudiantil</option>
                  <option value="mortgage">Hipoteca</option>
                  <option value="car_loan">Préstamo Auto</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="border-b pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Montos</p>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">Monto Total Original</label>
                    <input
                      type="number"
                      value={formData.total_amount}
                      onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                      step="0.01"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Saldo Actual</label>
                    <input
                      type="number"
                      value={formData.current_balance}
                      onChange={(e) => setFormData({ ...formData, current_balance: e.target.value })}
                      step="0.01"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Tasas y Pagos</p>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">Tasa de Interés (%)</label>
                    <input
                      type="number"
                      value={formData.interest_rate}
                      onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                      step="0.01"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Pago Mínimo Mensual</label>
                    <input
                      type="number"
                      value={formData.minimum_payment}
                      onChange={(e) => setFormData({ ...formData, minimum_payment: e.target.value })}
                      step="0.01"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Vencimiento</p>
                <div>
                  <label className="text-xs text-gray-600">Día del mes (1-31)</label>
                  <input
                    type="number"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    min="1"
                    max="31"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end mt-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPaymentModal && selectedDebt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 border-t-4 border-green-500">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Registrar Pago</h2>
            <div className="mb-4 p-4 bg-green-50 rounded border border-green-200">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Deuda:</span> {selectedDebt.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Saldo Actual:</span> ${selectedDebt.current_balance.toFixed(2)}
              </p>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Monto a Pagar</label>
                <input
                  type="number"
                  placeholder="Ingresa el monto"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  step="0.01"
                  min="0"
                  max={selectedDebt.current_balance}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Notas (opcional)</label>
                <input
                  type="text"
                  placeholder="Ej: Pago parcial"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-medium"
                >
                  Registrar Pago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showHistoryModal && selectedDebt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-96 overflow-y-auto border-t-4 border-purple-600">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Historial de Pagos</h2>
            <div className="mb-4 p-4 bg-purple-50 rounded border border-purple-200">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Deuda:</span> {selectedDebt.name}
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Total Pagado</p>
                  <p className="font-bold text-green-500">${calculateHistoryTotal().toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Cantidad de Pagos</p>
                  <p className="font-bold text-blue-600">{paymentHistory.length}</p>
                </div>
              </div>
            </div>

            {paymentHistory.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No hay pagos registrados
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="border border-gray-200 rounded p-3 bg-gray-50 flex justify-between items-start hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">${payment.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-600">
                        {formatDate(payment.payment_date)}
                      </p>
                      {payment.notes && (
                        <p className="text-xs text-gray-600 mt-1">Nota: {payment.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeletePayment(payment.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium ml-2 px-2 py-1 hover:bg-red-50 rounded transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
