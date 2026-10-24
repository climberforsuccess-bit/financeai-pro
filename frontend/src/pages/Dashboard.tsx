import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import apiClient from '../services/apiClient'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.email) return

    const loadDashboard = async () => {
      try {
        setError(null)
        const response = await apiClient.get('/api/dashboard', {
          params: { email: user.email }
        })
        setData(response.data.data)
      } catch (err: any) {
        console.error('Dashboard error:', err)
        setError(err.response?.data?.error || err.message || 'Error al cargar el dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [user?.email])

  // Función para traducir tipos de deuda
  const getDebtTypeLabel = (type: string): string => {
    const debtTypeMap: { [key: string]: string } = {
      credit_card: 'Tarjeta de Crédito',
      personal_loan: 'Préstamo Personal',
      student_loan: 'Préstamo de Estudiante',
      mortgage: 'Hipoteca',
      auto_loan: 'Préstamo de Auto',
      medical: 'Deuda Médica',
    }
    return debtTypeMap[type] || type
  }

  if (loading) return <div className="p-8">Cargando...</div>
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>
  if (!data) return <div className="p-8">No hay datos</div>

  const { debts = [], lastTransactions = [], subscriptions = [], summary = {} } = data
  const { totalDebt = 0, totalSaved = 0, monthlySubscriptionCost = 0 } = summary

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Deuda Total</h3>
          <p className="text-3xl font-bold text-red-600">${totalDebt.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">{debts.length} deudas</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Suscripciones Activas</h3>
          <p className="text-3xl font-bold text-blue-600">${monthlySubscriptionCost.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">{subscriptions.length} suscripciones</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Ahorros</h3>
          <p className="text-3xl font-bold text-green-600">${totalSaved.toFixed(2)}</p>
          <p className="text-gray-500 text-xs mt-2">Total ingreso</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Deudas</h2>
        {debts.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 font-medium">Nombre</th>
                <th className="text-left py-2 font-medium">Tipo</th>
                <th className="text-right py-2 font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt: any) => (
                <tr key={debt.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{debt.name}</td>
                  <td className="py-2">{getDebtTypeLabel(debt.debt_type)}</td>
                  <td className="text-right py-2 font-semibold">${debt.current_balance?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay deudas registradas</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Transacciones Recientes</h2>
        {lastTransactions.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 font-medium">Descripción</th>
                <th className="text-left py-2 font-medium">Tipo</th>
                <th className="text-right py-2 font-medium">Monto</th>
                <th className="text-left py-2 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {lastTransactions.map((tx: any) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{tx.description}</td>
                  <td className="py-2">{tx.type}</td>
                  <td className={`text-right py-2 font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount?.toFixed(2) || '0.00'}
                  </td>
                  <td className="py-2 text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay transacciones</p>
        )}
      </div>
    </div>
  )
}
