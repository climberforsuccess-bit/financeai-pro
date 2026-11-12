import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import { useAuthStore } from '../stores/authStore'

interface Goal {
  id: string
  profile_id: string
  name: string
  target_amount: number
  current_amount: number
  deadline: string
  category: string
  status: string
  currency: string
  is_recurring: boolean
  recurrence_frequency: string | null
  created_at: string
  updated_at: string
}

interface FormData {
  name: string
  target_amount: string
  current_amount: string
  deadline: string
  category: string
  status: string
  currency: string
  is_recurring: boolean
  recurrence_frequency: string
}

const initialForm: FormData = {
  name: '',
  target_amount: '',
  current_amount: '',
  deadline: '',
  category: '',
  status: 'active',
  currency: 'USD',
  is_recurring: false,
  recurrence_frequency: '',
}

export default function Goals() {
  const { language } = useLanguage()
  const { user, session } = useAuthStore()
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(initialForm)

  useEffect(() => {
    if (user?.id) {
      fetchGoals()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchGoals = async () => {
    if (!user?.id) return
    setLoading(true)
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false })
    if (!error && data) {
      setGoals(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    const payload = {
      profile_id: user.id,
      name: formData.name,
      target_amount: parseFloat(formData.target_amount),
      current_amount: parseFloat(formData.current_amount),
      deadline: formData.deadline,
      category: formData.category,
      status: formData.status,
      currency: formData.currency,
      is_recurring: formData.is_recurring,
      recurrence_frequency: formData.is_recurring ? formData.recurrence_frequency : null,
    }

    if (editingId) {
      const { error } = await supabase
        .from('goals')
        .update(payload)
        .eq('id', editingId)
      if (!error) {
        fetchGoals()
        setEditingId(null)
        setFormData(initialForm)
        setShowForm(false)
      }
    } else {
      const { error } = await supabase
        .from('goals')
        .insert([payload])
      if (!error) {
        fetchGoals()
        setFormData(initialForm)
        setShowForm(false)
      }
    }
  }

  const handleEdit = (goal: Goal) => {
    setFormData({
      name: goal.name,
      target_amount: goal.target_amount.toString(),
      current_amount: goal.current_amount.toString(),
      deadline: goal.deadline,
      category: goal.category,
      status: goal.status,
      currency: goal.currency,
      is_recurring: goal.is_recurring,
      recurrence_frequency: goal.recurrence_frequency || '',
    })
    setEditingId(goal.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm(language === 'es' ? '¿Eliminar meta?' : 'Delete goal?')) {
      await supabase.from('goals').delete().eq('id', id)
      fetchGoals()
    }
  }

  const getProgressPercent = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getProgressColor = (percent: number) => {
    if (percent >= 100) return 'bg-green-500'
    if (percent >= 75) return 'bg-blue-500'
    if (percent >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const categoryLabels: Record<string, string> = {
    emergency_fund: language === 'es' ? 'Fondo de Emergencia' : 'Emergency Fund',
    vacation: language === 'es' ? 'Vacaciones' : 'Vacation',
    education: language === 'es' ? 'Educación' : 'Education',
    home: language === 'es' ? 'Casa' : 'Home',
    car: language === 'es' ? 'Auto' : 'Car',
    investment: language === 'es' ? 'Inversión' : 'Investment',
    other: language === 'es' ? 'Otro' : 'Other',
  }

  if (loading) {
    return <div className="p-8">{language === 'es' ? 'Cargando...' : 'Loading...'}</div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {language === 'es' ? '🎯 Metas' : '🎯 Goals'}
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData(initialForm)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {language === 'es' ? '+ Nueva Meta' : '+ New Goal'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? (language === 'es' ? 'Editar Meta' : 'Edit Goal') : (language === 'es' ? 'Nueva Meta' : 'New Goal')}
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
              placeholder={language === 'es' ? 'Monto Meta' : 'Target Amount'}
              value={formData.target_amount}
              onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder={language === 'es' ? 'Monto Actual' : 'Current Amount'}
              value={formData.current_amount}
              onChange={(e) => setFormData({ ...formData, current_amount: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">{language === 'es' ? 'Categoría' : 'Category'}</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
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
            <label className="flex items-center gap-2 col-span-1 md:col-span-2">
              <input
                type="checkbox"
                checked={formData.is_recurring}
                onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
              />
              {language === 'es' ? 'Recurrente' : 'Recurring'}
            </label>
            {formData.is_recurring && (
              <select
                value={formData.recurrence_frequency}
                onChange={(e) => setFormData({ ...formData, recurrence_frequency: e.target.value })}
                className="border rounded px-3 py-2"
              >
                <option value="">{language === 'es' ? 'Frecuencia' : 'Frequency'}</option>
                <option value="weekly">{language === 'es' ? 'Semanal' : 'Weekly'}</option>
                <option value="monthly">{language === 'es' ? 'Mensual' : 'Monthly'}</option>
                <option value="yearly">{language === 'es' ? 'Anual' : 'Yearly'}</option>
              </select>
            )}
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

      {goals.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          {language === 'es' ? 'Sin metas todavía' : 'No goals yet'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progressPercent = getProgressPercent(goal.current_amount, goal.target_amount)
            const progressColor = getProgressColor(progressPercent)
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            )

            return (
              <div key={goal.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-500">{categoryLabels[goal.category] || goal.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      {goal.currency} {goal.current_amount.toFixed(2)} / {goal.target_amount.toFixed(2)}
                    </span>
                    <span className="font-bold text-gray-900">{progressPercent.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${progressColor} h-3 rounded-full transition-all`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  {daysLeft > 0
                    ? `${daysLeft} ${language === 'es' ? 'días restantes' : 'days left'}`
                    : language === 'es' ? 'Plazo vencido' : 'Deadline passed'}
                </div>

                <div className="flex gap-2 text-xs">
                  <span className={`px-2 py-1 rounded-full ${goal.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {goal.status}
                  </span>
                  {goal.is_recurring && (
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {goal.recurrence_frequency}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
