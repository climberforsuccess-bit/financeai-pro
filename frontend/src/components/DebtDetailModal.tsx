import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import apiClient from '../services/apiClient'

interface Debt {
  id: string
  name: string
  total_amount?: number
  current_balance?: number
  amount_paid?: number
  interest_rate?: number
  debt_type: string
  status?: string
  bank?: string
  due_date?: string
  minimum_payment?: number
  interest_accrued?: number
  payment_frequency?: string
  currency?: string
}

interface Payment {
  id: string
  amount: number
  created_at: string
  notes?: string
}

interface DebtDetailModalProps {
  debt: Debt
  onClose: () => void
  onPaymentSuccess?: () => void
}

export default function DebtDetailModal({ debt, onClose, onPaymentSuccess }: DebtDetailModalProps) {
  const { t } = useLanguage()
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [loadingPayments, setLoadingPayments] = useState(false)
  
  // Para hacer el modal movible
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  if (!debt) {
    console.error('❌ Debt is null/undefined')
    return null
  }

  // Cargar historial de pagos
  useEffect(() => {
    loadPayments()
  }, [debt.id])

  const loadPayments = async () => {
    try {
      setLoadingPayments(true)
      console.log('📥 Fetching payment history for debt:', debt.id)
      const response = await apiClient.get(`/api/debt/${debt.id}/payments`)
      console.log('✅ Payments:', response.data)
      setPayments(response.data.data || [])
    } catch (err: any) {
      console.error('❌ Error loading payments:', err)
      // Si no existe la ruta, es normal
    } finally {
      setLoadingPayments(false)
    }
  }

  // Lógica de drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!titleRef.current?.contains(e.target as Node)) return
    
    setIsDragging(true)
    const rect = modalRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modalRef.current) return
      
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      setPosition({ x: newX, y: newY })
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

  // Valores por defecto seguros
  const total = Number(debt.total_amount) || 0
  let paid = Number(debt.amount_paid) || 0
  const balance = Number(debt.current_balance) || 0
  const interest = Number(debt.interest_rate) || 0

  

  const progress = total > 0 ? (paid / total) * 100 : 0
  const progressColor = progress < 25 ? 'bg-red-500' : progress < 50 ? 'bg-yellow-500' : progress < 75 ? 'bg-blue-500' : 'bg-green-500'

  console.log('✅ Modal opened:', { id: debt.id, name: debt.name, total, paid, balance, progress })

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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const amount = parseFloat(paymentAmount)
      
      if (isNaN(amount) || amount <= 0) {
        setMessage({ type: 'error', text: 'El monto debe ser mayor a 0' })
        setSubmitting(false)
        return
      }

      if (amount > balance) {
        setMessage({ type: 'error', text: `El monto no puede ser mayor a $${balance.toFixed(2)}` })
        setSubmitting(false)
        return
      }

      console.log('📤 Enviando pago:', { debtId: debt.id, amount, newBalance: balance - amount, newPaid: paid + amount })

      const response = await apiClient.post(`/api/debt/${debt.id}/payments`, {
        amount,
      })

      console.log('✅ Pago registrado:', response.data)

      setMessage({ type: 'success', text: `✅ Pago de $${amount.toFixed(2)} registrado correctamente` })
      setPaymentAmount('')
      setShowPaymentForm(false)

      // Recargar historial
      await loadPayments()

      if (onPaymentSuccess) {
        setTimeout(() => {
          onPaymentSuccess()
        }, 1000)
      }
    } catch (err: any) {
      console.error('❌ Error al registrar pago:', err)
      const errorMsg = err.response?.data?.error || err.message || 'Error al registrar el pago'
      setMessage({ type: 'error', text: `❌ ${errorMsg}` })
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-auto">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl"
        style={{
          transform: position.x !== 0 || position.y !== 0 ? `translate(${position.x}px, ${position.y}px)` : 'none',
          cursor: isDragging ? 'grabbing' : 'auto',
        }}
      >
        {/* Header movible */}
        <div 
          ref={titleRef}
          onMouseDown={handleMouseDown}
          className="flex justify-between items-center mb-6 cursor-grab active:cursor-grabbing select-none"
        >
          <h2 className="text-3xl font-bold text-gray-900">{debt.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Mensajes */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tipo y Estado */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">{t('debts.type')}</p>
            <p className="text-lg font-semibold text-gray-900">{getDebtTypeLabel(debt.debt_type)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">{t('debts.status')}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              debt.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : debt.status === 'paid'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {debt.status || 'active'}
            </span>
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Progreso de Pago</h3>
            <span className="text-2xl font-bold text-gray-900">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-500`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Detalles Financieros */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Total Deuda</p>
            <p className="text-2xl font-bold text-blue-900">${total.toFixed(2)}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-600 mb-1">Ya Pagado</p>
            <p className="text-2xl font-bold text-green-900">${paid.toFixed(2)}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-sm text-red-600 mb-1">Falta Pagar</p>
            <p className="text-2xl font-bold text-red-900">${balance.toFixed(2)}</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-yellow-600 mb-1">Tasa de Interés</p>
            <p className="text-2xl font-bold text-yellow-900">{interest.toFixed(2)}%</p>
          </div>
        </div>

        {/* Historial de Pagos */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📋 Historial de Pagos
            {loadingPayments && <span className="text-xs text-gray-500">(cargando...)</span>}
          </h4>
          
          {payments.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {payments.map((payment) => (
                <div key={payment.id} className="bg-white rounded p-3 border-l-4 border-green-500 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-green-700">${payment.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">{formatDate(payment.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              {loadingPayments ? 'Cargando historial...' : 'No hay pagos registrados aún'}
            </p>
          )}
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            disabled={submitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            + Registrar Pago
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
          >
            Cerrar
          </button>
        </div>

        {/* Formulario de Pago */}
        {showPaymentForm && (
          <form onSubmit={handlePayment} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-4">Registrar Nuevo Pago</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto a Pagar *
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  max={balance}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                  disabled={submitting}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Máximo disponible: ${balance.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  {submitting ? 'Guardando...' : 'Guardar Pago'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  disabled={submitting}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
