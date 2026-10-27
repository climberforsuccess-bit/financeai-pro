import { useState, useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../lib/supabase'
import { Trash2, Edit2, Plus } from 'lucide-react'

interface Debt {
  id: string
  name: string
  total_amount: number
  current_balance: number
  interest_rate: number
  due_date: string
  debt_type: string
  created_at: string
  profile_id: string
  currency?: string
}

interface DebtPayment {
  id: string
  debt_id: string
  amount: number
  payment_date: string
  payment_method: string
  notes?: string
}

export default function Debts() {
  const { user } = useAuthStore()
  const { language, t } = useLanguage()
  const [debts, setDebts] = useState<Debt[]>([])
  const [debtPayments, setDebtPayments] = useState<DebtPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState<string | null>(null)
  const [showHistoryModal, setShowHistoryModal] = useState<string | null>(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    total_amount: '',
    interest_rate: '',
    due_date: '',
    debt_type: 'credit_card',
    currency: 'USD',
  })

  useEffect(() => {
    if (user?.id) {
      fetchDebts()
      fetchDebtPayments()
    }
  }, [user?.id])

  const fetchDebts = async () => {
    if (!user?.id) return
    try {
      const { data, error } = await supabase
        .from('debts')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDebts(data || [])
    } catch (error) {
      console.error('Error fetching debts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDebtPayments = async () => {
    if (!user?.id) return
    try {
      const { data, error } = await supabase
        .from('debt_payments')
        .select('*')
        .eq('profile_id', user.id)
        .order('payment_date', { ascending: false })

      if (error) throw error
      setDebtPayments(data || [])
    } catch (error) {
      console.error('Error fetching debt payments:', error)
    }
  }

  const getLocalISOString = () => {
    const now = new Date()
    const offset = now.getTimezoneOffset() * 60000
    const localTime = new Date(now.getTime() - offset)
    return localTime.toISOString()
  }

  const handleAddDebt = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    try {
      if (editingId) {
        const { error } = await supabase
          .from('debts')
          .update({
            name: formData.name,
            total_amount: parseFloat(formData.total_amount),
            interest_rate: parseFloat(formData.interest_rate),
            due_date: formData.due_date,
            debt_type: formData.debt_type,
            currency: formData.currency,
          })
          .eq('id', editingId)

        if (error) throw error
        setEditingId(null)
      } else {
        const { error } = await supabase.from('debts').insert([
          {
            profile_id: user.id,
            name: formData.name,
            total_amount: parseFloat(formData.total_amount),
            current_balance: parseFloat(formData.total_amount),
            interest_rate: parseFloat(formData.interest_rate),
            due_date: formData.due_date,
            debt_type: formData.debt_type,
            currency: formData.currency,
            created_at: new Date().toISOString(),
          },
        ])

        if (error) throw error
      }

      setFormData({
        name: '',
        total_amount: '',
        interest_rate: '',
        due_date: '',
        debt_type: 'credit_card',
        currency: 'USD',
      })
      setShowForm(false)
      fetchDebts()
    } catch (error) {
      console.error('Error saving debt:', error)
    }
  }

  const handleEditDebt = (debt: Debt) => {
    setFormData({
      name: debt.name,
      total_amount: debt.total_amount.toString(),
      interest_rate: debt.interest_rate.toString(),
      due_date: debt.due_date,
      debt_type: debt.debt_type,
      currency: debt.currency || 'USD',
    })
    setEditingId(debt.id)
    setShowForm(true)
  }

  const handleDeleteDebt = async (debtId: string) => {
    if (!confirm(language === 'es' ? '¿Estás seguro de que quieres eliminar esta deuda?' : 'Are you sure you want to delete this debt?')) return

    try {
      const { error } = await supabase.from('debts').delete().eq('id', debtId)
      if (error) throw error
      fetchDebts()
    } catch (error) {
      console.error('Error deleting debt:', error)
    }
  }

  const handleRecordPayment = async (debtId: string) => {
    if (!user?.id || !paymentAmount) return

    try {
      const debt = debts.find((d) => d.id === debtId)
      if (!debt) return

      const amount = parseFloat(paymentAmount)
      const newBalance = Math.max(0, debt.current_balance - amount)
      const paymentDateTime = getLocalISOString()

      const { error: updateError } = await supabase
        .from('debts')
        .update({ current_balance: newBalance })
        .eq('id', debtId)

      if (updateError) throw updateError

      const { error: paymentError } = await supabase.from('debt_payments').insert([
        {
          profile_id: user.id,
          debt_id: debtId,
          amount: amount,
          payment_method: 'manual',
          payment_date: paymentDateTime,
        },
      ])

      if (paymentError) throw paymentError

      setPaymentAmount('')
      setShowPaymentModal(null)
      fetchDebts()
      fetchDebtPayments()
    } catch (error) {
      console.error('Error recording payment:', error)
      alert(language === 'es' ? 'Error al registrar el pago' : 'Error recording payment')
    }
  }

  const getDebtColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      credit_card: 'bg-blue-600',
      personal_loan: 'bg-green-600',
      student_loan: 'bg-purple-600',
      mortgage: 'bg-red-600',
      auto_loan: 'bg-yellow-600',
      medical: 'bg-pink-600',
    }
    return colorMap[type] || 'bg-gray-600'
  }

  const getDebtIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      credit_card: '💳',
      personal_loan: '💰',
      student_loan: '🎓',
      mortgage: '🏠',
      auto_loan: '🚗',
      medical: '⚕️',
    }
    return iconMap[type] || '📊'
  }

  const getDebtTypeLabel = (type: string): string => {
    return t(`debtType.${type}`) || type
  }

  const getProgress = (debt: Debt) => {
    return debt.total_amount > 0
      ? ((debt.total_amount - debt.current_balance) / debt.total_amount) * 100
      : 0
  }

  const getDueDay = (dateString: string) => {
    if (!dateString) return null
    if (!isNaN(Number(dateString))) {
      return dateString
    }
    try {
      const date = new Date(dateString)
      return date.getDate().toString()
    } catch {
      return null
    }
  }

  const getDebtPaymentHistory = (debtId: string) => {
    return debtPayments.filter((p) => p.debt_id === debtId)
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">{t('common.loading')}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">📊 {t('debts.title')}</h1>
          <p className="text-gray-500 mt-2">
            {language === 'es' ? 'Total' : 'Total'}: ${debts.reduce((sum, d) => sum + d.total_amount, 0).toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setFormData({
              name: '',
              total_amount: '',
              interest_rate: '',
              due_date: '',
              debt_type: 'credit_card',
              currency: 'USD',
            })
            setShowForm(!showForm)
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
        >
          <Plus size={20} /> {showForm ? t('common.cancel') : t('debts.addNew')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddDebt} className="bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-600">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            {editingId ? language === 'es' ? 'Editar Deuda' : 'Edit Debt' : language === 'es' ? 'Nueva Deuda' : 'New Debt'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder={language === 'es' ? 'Nombre de la deuda' : 'Debt name'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <select
              value={formData.debt_type}
              onChange={(e) => setFormData({ ...formData, debt_type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="credit_card">{t('debtType.credit_card')}</option>
              <option value="personal_loan">{t('debtType.personal_loan')}</option>
              <option value="student_loan">{t('debtType.student_loan')}</option>
              <option value="mortgage">{t('debtType.mortgage')}</option>
              <option value="auto_loan">{t('debtType.auto_loan')}</option>
              <option value="medical">{t('debtType.medical')}</option>
            </select>
            <input
              type="number"
              placeholder={language === 'es' ? 'Monto total' : 'Total amount'}
              value={formData.total_amount}
              onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              step="0.01"
              required
            />
            <input
              type="number"
              placeholder={language === 'es' ? 'Tasa de interés (%)' : 'Interest rate (%)'}
              value={formData.interest_rate}
              onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              step="0.01"
            />
            <input
              type="number"
              placeholder={language === 'es' ? 'Día de vencimiento (1-31)' : 'Due day (1-31)'}
              value={formData.due_date}
              onChange={(e) => {
                const value = Math.min(Math.max(parseInt(e.target.value) || 0, 1), 31)
                setFormData({ ...formData, due_date: value.toString() })
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              min="1"
              max="31"
            />
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="MXN">MXN</option>
              <option value="COP">COP</option>
              <option value="ARS">ARS</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {editingId ? t('common.save') : t('debts.addNew')}
          </button>
        </form>
      )}

      {debts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">{language === 'es' ? 'No tienes deudas registradas aún' : 'No debts registered yet'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {debts.map((debt) => {
            const progress = getProgress(debt)
            const dueDay = getDueDay(debt.due_date)
            const paymentHistory = getDebtPaymentHistory(debt.id)

            return (
              <div key={debt.id} className={`${getDebtColor(debt.debt_type)} rounded-lg shadow-lg p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {getDebtIcon(debt.debt_type)} {debt.name}
                    </h2>
                    <p className="text-sm opacity-90">{getDebtTypeLabel(debt.debt_type)}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-white/20 rounded-full">
                    {debt.currency}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs opacity-75">{language === 'es' ? 'Total Original' : 'Original Amount'}</p>
                    <p className="text-lg font-bold">${debt.total_amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">{language === 'es' ? 'Tasa' : 'Rate'}</p>
                    <p className="text-lg font-bold">{debt.interest_rate}%</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">{language === 'es' ? 'Saldo' : 'Balance'}</p>
                    <p className="text-lg font-bold">${debt.current_balance.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">{language === 'es' ? 'Vence' : 'Due'}</p>
                    <p className="text-lg font-bold">{language === 'es' ? 'Día' : 'Day'} {dueDay || '—'}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm">{language === 'es' ? 'Progreso pagado' : 'Progress paid'}</p>
                    <p className="text-sm font-bold">{Math.round(progress)}%</p>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-white/90 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setShowPaymentModal(debt.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-400 transition text-sm"
                  >
                    {language === 'es' ? 'Pagar' : 'Pay'}
                  </button>
                  <button
                    onClick={() => setShowHistoryModal(debt.id)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-400 transition text-sm relative"
                  >
                    {language === 'es' ? 'Historial' : 'History'}{' '}
                    {paymentHistory.length > 0 && (
                      <span className="ml-1 bg-white text-purple-500 px-2 rounded-full text-xs font-bold inline">
                        {paymentHistory.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => handleEditDebt(debt)}
                    className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-400 transition text-sm flex items-center gap-2"
                  >
                    <Edit2 size={16} /> {t('common.edit')}
                  </button>
                  <button
                    onClick={() => handleDeleteDebt(debt.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-400 transition text-sm flex items-center gap-2"
                  >
                    <Trash2 size={16} /> {t('common.delete')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {language === 'es' ? 'Registrar Pago' : 'Record Payment'}
            </h3>
            <input
              type="number"
              placeholder={language === 'es' ? 'Cantidad a pagar' : 'Payment amount'}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
              step="0.01"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleRecordPayment(showPaymentModal)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                {t('common.save')}
              </button>
              <button
                onClick={() => {
                  setShowPaymentModal(null)
                  setPaymentAmount('')
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {language === 'es' ? 'Historial de Pagos' : 'Payment History'}
            </h3>
            <div className="space-y-2">
              {getDebtPaymentHistory(showHistoryModal).length === 0 ? (
                <p className="text-gray-500">{language === 'es' ? 'No hay pagos registrados' : 'No payments recorded'}</p>
              ) : (
                getDebtPaymentHistory(showHistoryModal).map((payment) => (
                  <div key={payment.id} className="flex justify-between p-3 bg-gray-100 rounded">
                    <div>
                      <p className="text-sm text-gray-700">{payment.payment_method}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.payment_date).toLocaleDateString(
                          language === 'es' ? 'es-ES' : 'en-US'
                        )}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-green-600">+${payment.amount.toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => setShowHistoryModal(null)}
              className="w-full mt-4 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
