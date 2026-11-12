import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import { useAuthStore } from '../stores/authStore'

interface Subscription {
  id: string
  profile_id: string
  card_id: string | null
  name: string
  amount: number
  billing_cycle: string
  category: string
  next_billing_date: string
  status: string
  created_at: string
  notify_days_before: number
  last_auto_charged: string | null
  currency: string
  payment_method: string | null
  notes: string | null
  auto_charge: boolean
  auto_charge_retry_count: number
  cancellation_reason: string | null
  billing_day: number | null
  updated_at: string
}

interface FormData {
  name: string
  amount: string
  billing_cycle: string
  category: string
  next_billing_date: string
  status: string
  currency: string
  notify_days_before: string
  auto_charge: boolean
  payment_method: string
  notes: string
}

const initialForm: FormData = {
  name: '',
  amount: '',
  billing_cycle: 'monthly',
  category: 'other',
  next_billing_date: '',
  status: 'active',
  currency: 'USD',
  notify_days_before: '3',
  auto_charge: false,
  payment_method: 'credit_card',
  notes: '',
}

export default function Subscriptions() {
  const { language } = useLanguage()
  const { user } = useAuthStore()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(initialForm)

  useEffect(() => {
    if (user?.id) {
      fetchSubscriptions()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchSubscriptions = async () => {
    if (!user?.id) return
    setLoading(true)
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', user.id)
      .order('next_billing_date', { ascending: true })
    if (!error && data) {
      setSubscriptions(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    const payload = {
      profile_id: user.id,
      name: formData.name,
      amount: parseFloat(formData.amount),
      billing_cycle: formData.billing_cycle,
      category: formData.category,
      next_billing_date: formData.next_billing_date,
      status: formData.status,
      currency: formData.currency,
      notify_days_before: parseInt(formData.notify_days_before),
      auto_charge: formData.auto_charge,
      payment_method: formData.payment_method,
      notes: formData.notes || null,
    }

    if (editingId) {
      const { error } = await supabase
        .from('subscriptions')
        .update(payload)
        .eq('id', editingId)
      if (!error) {
        fetchSubscriptions()
        setEditingId(null)
        setFormData(initialForm)
        setShowForm(false)
      }
    } else {
      const { error } = await supabase
        .from('subscriptions')
        .insert([payload])
      if (!error) {
        fetchSubscriptions()
        setFormData(initialForm)
        setShowForm(false)
      }
    }
  }

  const handleEdit = (subscription: Subscription) => {
    setFormData({
      name: subscription.name,
      amount: subscription.amount.toString(),
      billing_cycle: subscription.billing_cycle,
      category: subscription.category,
      next_billing_date: subscription.next_billing_date,
      status: subscription.status,
      currency: subscription.currency,
      notify_days_before: subscription.notify_days_before.toString(),
      auto_charge: subscription.auto_charge,
      payment_method: subscription.payment_method || 'credit_card',
      notes: subscription.notes || '',
    })
    setEditingId(subscription.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm(language === 'es' ? '¿Eliminar suscripción?' : 'Delete subscription?')) {
      await supabase.from('subscriptions').delete().eq('id', id)
      fetchSubscriptions()
    }
  }

  const categoryLabels: Record<string, string> = {
    streaming: language === 'es' ? 'Streaming' : 'Streaming',
    software: language === 'es' ? 'Software' : 'Software',
    entertainment: language === 'es' ? 'Entretenimiento' : 'Entertainment',
    fitness: language === 'es' ? 'Fitness' : 'Fitness',
    education: language === 'es' ? 'Educación' : 'Education',
    cloud: language === 'es' ? 'Nube' : 'Cloud',
    insurance: language === 'es' ? 'Seguros' : 'Insurance',
    utilities: language === 'es' ? 'Servicios' : 'Utilities',
    other: language === 'es' ? 'Otro' : 'Other',
  }

  const billingCycleLabels: Record<string, string> = {
    weekly: language === 'es' ? 'Semanal' : 'Weekly',
    monthly: language === 'es' ? 'Mensual' : 'Monthly',
    quarterly: language === 'es' ? 'Trimestral' : 'Quarterly',
    yearly: language === 'es' ? 'Anual' : 'Yearly',
  }

  const getDaysUntilBilling = (date: string) => {
    const today = new Date()
    const billing = new Date(date)
    const diff = Math.ceil((billing.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const getTotalMonthlyCost = () => {
    return subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => {
        let monthlyAmount = s.amount
        if (s.billing_cycle === 'weekly') monthlyAmount = s.amount * 4.33
        if (s.billing_cycle === 'quarterly') monthlyAmount = s.amount / 3
        if (s.billing_cycle === 'yearly') monthlyAmount = s.amount / 12
        return sum + monthlyAmount
      }, 0)
  }

  if (loading) {
    return <div className="p-8">{language === 'es' ? 'Cargando...' : 'Loading...'}</div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {language === 'es' ? '📅 Suscripciones' : '📅 Subscriptions'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'es' ? 'Costo mensual promedio: ' : 'Average monthly cost: '}
            <span className="font-bold text-blue-600">${getTotalMonthlyCost().toFixed(2)}</span>
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData(initialForm)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {language === 'es' ? '+ Nueva Suscripción' : '+ New Subscription'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingId
              ? language === 'es' ? 'Editar Suscripción' : 'Edit Subscription'
              : language === 'es' ? 'Nueva Suscripción' : 'New Subscription'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={language === 'es' ? 'Nombre' : 'Name'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder={language === 'es' ? 'Monto' : 'Amount'}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <select
              value={formData.billing_cycle}
              onChange={(e) => setFormData({ ...formData, billing_cycle: e.target.value })}
              className="border rounded px-3 py-2"
            >
              {Object.entries(billingCycleLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border rounded px-3 py-2"
            >
              <option value="">{language === 'es' ? 'Categoría' : 'Category'}</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <input
              type="date"
              value={formData.next_billing_date}
              onChange={(e) => setFormData({ ...formData, next_billing_date: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="border rounded px-3 py-2"
            >
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
              <option value="COP">COP</option>
              <option value="ARS">ARS</option>
              <option value="CLP">CLP</option>
            </select>
            <input
              type="number"
              placeholder={language === 'es' ? 'Notificar días antes' : 'Notify days before'}
              value={formData.notify_days_before}
              onChange={(e) => setFormData({ ...formData, notify_days_before: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <textarea
              placeholder={language === 'es' ? 'Notas' : 'Notes'}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="border rounded px-3 py-2 md:col-span-2"
              rows={2}
            />
            <label className="flex items-center gap-2 col-span-1 md:col-span-2">
              <input
                type="checkbox"
                checked={formData.auto_charge}
                onChange={(e) => setFormData({ ...formData, auto_charge: e.target.checked })}
              />
              {language === 'es' ? 'Cobro automático' : 'Auto charge'}
            </label>
            <div className="md:col-span-2 flex gap-4">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                {language === 'es' ? 'Guardar' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData(initialForm)
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {subscriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          {language === 'es' ? 'Sin suscripciones todavía' : 'No subscriptions yet'}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{language === 'es' ? 'Nombre' : 'Name'}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{language === 'es' ? 'Categoría' : 'Category'}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{language === 'es' ? 'Monto' : 'Amount'}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{language === 'es' ? 'Ciclo' : 'Cycle'}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{language === 'es' ? 'Próxima Fecha' : 'Next Date'}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{language === 'es' ? 'Estado' : 'Status'}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{language === 'es' ? 'Acciones' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {subscriptions.map((sub) => {
                const daysLeft = getDaysUntilBilling(sub.next_billing_date)
                return (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{categoryLabels[sub.category] || sub.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {sub.currency} {sub.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{billingCycleLabels[sub.billing_cycle]}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{new Date(sub.next_billing_date).toLocaleDateString()}</span>
                        <span className={`text-xs ${daysLeft <= 0 ? 'text-red-600' : daysLeft <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {daysLeft <= 0
                            ? language === 'es' ? 'Vencido' : 'Overdue'
                            : `${daysLeft} ${language === 'es' ? 'días' : 'days'}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        sub.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : sub.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-3">
                      <button
                        onClick={() => handleEdit(sub)}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
