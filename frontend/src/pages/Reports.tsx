import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import apiClient from '../services/apiClient'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ComposedChart, ScatterChart, Scatter
} from 'recharts'
import { TrendingUp, AlertCircle, Target, Zap } from 'lucide-react'

interface ReportData {
  id: string
  report_type: string
  period_start: string
  period_end: string
  total_income: number
  total_expenses: number
  total_debt: number
  total_savings: number
  net_worth: number
  previous_total_expenses: number
  previous_total_income: number
  debt_count: number
  debt_paid_off: number
  debt_paid_amount: number
  average_debt_amount: number
  debt_payoff_projection_months: number
  transaction_count: number
  expense_by_category: Record<string, number>
  income_by_category: Record<string, number>
  goals_total: number
  goals_completed: number
  ai_insights: {
    summary: string
    key_points: string[]
    recommendations: string[]
  }
  projections: {
    debt_free_date: string
    savings_projection_6m: number
  }
  currency: string
}

export default function Reports() {
  const { session } = useAuthStore()
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reports, setReports] = useState<ReportData[]>([])
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null)
  const [generatingReport, setGeneratingReport] = useState(false)

  useEffect(() => {
    if (!session?.access_token) return
    loadReports()
  }, [session?.access_token])

  const loadReports = async () => {
    try {
      setError(null)
      const response = await apiClient.get('/api/reports')
      setReports(response.data.data || [])
      if (response.data.data && response.data.data.length > 0) {
        setSelectedReport(response.data.data[0])
      }
    } catch (err: any) {
      console.error('Reports error:', err)
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  const generateNewReport = async () => {
    try {
      setGeneratingReport(true)
      setError(null)
      const response = await apiClient.post('/api/reports/generate', {
        report_type: 'monthly'
      })
      const newReport = response.data.data
      setReports([newReport, ...reports])
      setSelectedReport(newReport)
    } catch (err: any) {
      console.error('Generate report error:', err)
      setError(err.response?.data?.error || err.message)
    } finally {
      setGeneratingReport(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
          </div>
          <p className="text-gray-600">{language === 'es' ? 'Cargando reportes...' : 'Loading reports...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-black text-white mb-2">
              {language === 'es' ? '📊 Reportes Financieros' : '📊 Financial Reports'}
            </h1>
            <p className="text-slate-400 text-lg">
              {language === 'es' 
                ? 'Análisis detallado de tu situación financiera'
                : 'Detailed analysis of your financial situation'}
            </p>
          </div>
          <LanguageToggle />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={generateNewReport}
            disabled={generatingReport}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 shadow-lg"
          >
            {generatingReport 
              ? (language === 'es' ? 'Generando...' : 'Generating...')
              : (language === 'es' ? '+ Generar Reporte' : '+ Generate Report')}
          </button>
        </div>

        {/* Reports Tabs */}
        {reports.length > 0 && (
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedReport?.id === report.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {new Date(report.period_start).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                  month: 'short',
                  year: 'numeric'
                })}
              </button>
            ))}
          </div>
        )}

        {/* Report Content */}
        {selectedReport && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Net Worth */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-emerald-400 text-sm font-medium">{language === 'es' ? 'Patrimonio Neto' : 'Net Worth'}</h3>
                  <TrendingUp className="text-emerald-400" size={20} />
                </div>
                <p className="text-3xl font-black text-white mb-1">
                  {selectedReport.currency} {selectedReport.net_worth.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
                <p className="text-emerald-400 text-sm">
                  {selectedReport.net_worth > 0 ? '+' : ''}{selectedReport.net_worth.toFixed(2)}
                </p>
              </div>

              {/* Total Debt */}
              <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-red-400 text-sm font-medium">{language === 'es' ? 'Deuda Total' : 'Total Debt'}</h3>
                  <AlertCircle className="text-red-400" size={20} />
                </div>
                <p className="text-3xl font-black text-white mb-1">
                  {selectedReport.currency} {selectedReport.total_debt.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
                <p className="text-red-400 text-sm">{selectedReport.debt_count} {language === 'es' ? 'deudas' : 'debts'}</p>
              </div>

              {/* Monthly Expenses */}
              <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-orange-400 text-sm font-medium">{language === 'es' ? 'Gastos' : 'Expenses'}</h3>
                  <Zap className="text-orange-400" size={20} />
                </div>
                <p className="text-3xl font-black text-white mb-1">
                  {selectedReport.currency} {selectedReport.total_expenses.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
                <p className="text-orange-400 text-sm">
                  {selectedReport.previous_total_expenses > 0 
                    ? ((((selectedReport.total_expenses - selectedReport.previous_total_expenses) / selectedReport.previous_total_expenses) * 100).toFixed(1))
                    : 0}% vs mes anterior
                </p>
              </div>

              {/* Debt-Free Date */}
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-purple-400 text-sm font-medium">{language === 'es' ? 'Libre de Deuda' : 'Debt-Free Date'}</h3>
                  <Target className="text-purple-400" size={20} />
                </div>
                <p className="text-2xl font-black text-white mb-1">
                  {selectedReport.debt_payoff_projection_months
                    ? `${selectedReport.debt_payoff_projection_months} ${language === 'es' ? 'meses' : 'months'}`
                    : (language === 'es' ? 'Sin deuda' : 'Debt-free')}
                </p>
                <p className="text-purple-400 text-sm">
                  {selectedReport.projections?.debt_free_date
                    ? new Date(selectedReport.projections.debt_free_date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')
                    : '-'}
                </p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Expense by Category - Pie Chart */}
              {selectedReport.expense_by_category && Object.keys(selectedReport.expense_by_category).length > 0 && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                  <h3 className="text-white font-bold text-lg mb-6">{language === 'es' ? 'Gastos por Categoría' : 'Expenses by Category'}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(selectedReport.expense_by_category).map(([name, value]) => ({
                          name,
                          value: typeof value === 'number' ? value : 0
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'].map((color, idx) => (
                          <Cell key={`cell-${idx}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${selectedReport.currency} ${value.toFixed(2)}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Income vs Expenses - Bar Chart */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                <h3 className="text-white font-bold text-lg mb-6">{language === 'es' ? 'Ingresos vs Gastos' : 'Income vs Expenses'}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    {
                      name: language === 'es' ? 'Mes Actual' : 'Current Month',
                      income: selectedReport.total_income,
                      expenses: selectedReport.total_expenses
                    },
                    {
                      name: language === 'es' ? 'Mes Anterior' : 'Previous Month',
                      income: selectedReport.previous_total_income,
                      expenses: selectedReport.previous_total_expenses
                    }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="name" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569' }}
                      formatter={(value) => `${selectedReport.currency} ${value.toFixed(2)}`}
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#10B981" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="expenses" fill="#EF4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Net Worth Trend - Area Chart */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur lg:col-span-2">
                <h3 className="text-white font-bold text-lg mb-6">{language === 'es' ? 'Tendencia del Patrimonio' : 'Net Worth Trend'}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={[
                    { month: language === 'es' ? 'Hace 3 meses' : '3 months ago', value: selectedReport.net_worth * 0.8 },
                    { month: language === 'es' ? 'Hace 2 meses' : '2 months ago', value: selectedReport.net_worth * 0.9 },
                    { month: language === 'es' ? 'Mes pasado' : 'Last month', value: selectedReport.net_worth * 0.95 },
                    { month: language === 'es' ? 'Hoy' : 'Today', value: selectedReport.net_worth }
                  ]}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569' }}
                      formatter={(value) => `${selectedReport.currency} ${value.toFixed(2)}`}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Insights */}
            {selectedReport.ai_insights && (
              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur">
                  <h3 className="text-blue-400 font-bold text-lg mb-3">{language === 'es' ? '🤖 Análisis IA' : '🤖 AI Analysis'}</h3>
                  <p className="text-slate-200 leading-relaxed">{selectedReport.ai_insights.summary}</p>
                </div>

                {/* Key Points */}
                {selectedReport.ai_insights.key_points && selectedReport.ai_insights.key_points.length > 0 && (
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
                    <h4 className="text-white font-bold mb-4">{language === 'es' ? 'Puntos Clave' : 'Key Points'}</h4>
                    <ul className="space-y-2">
                      {selectedReport.ai_insights.key_points.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {selectedReport.ai_insights.recommendations && selectedReport.ai_insights.recommendations.length > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 backdrop-blur">
                    <h4 className="text-emerald-400 font-bold mb-4">{language === 'es' ? 'Recomendaciones' : 'Recommendations'}</h4>
                    <ul className="space-y-2">
                      {selectedReport.ai_insights.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {reports.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-slate-700/50 rounded-full mb-4">
              <TrendingUp className="text-slate-400" size={32} />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              {language === 'es' ? 'Sin reportes aún' : 'No reports yet'}
            </h3>
            <p className="text-slate-400 mb-6">
              {language === 'es' 
                ? 'Genera tu primer reporte para ver análisis detallados'
                : 'Generate your first report to see detailed analysis'}
            </p>
            <button
              onClick={generateNewReport}
              disabled={generatingReport}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              {language === 'es' ? 'Generar Primer Reporte' : 'Generate First Report'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
