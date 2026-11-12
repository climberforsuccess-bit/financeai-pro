import OpenAI from 'openai'

let openaiInstance: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiInstance
}

export interface DashboardData {
  totalDebt: number
  totalIncome: number
  totalExpenses: number
  totalSaved: number
  debts: Array<{
    id: string
    name: string
    current_balance: number
    interest_rate: number
    debt_type: string
  }>
  lastTransactions: Array<{
    description: string
    type: 'income' | 'expense'
    amount: number
    date: string
  }>
}

export interface AIInsight {
  title: string
  message: string
  priority: 'high' | 'medium' | 'low'
}

export async function generateDashboardInsights(
  data: DashboardData,
  language: 'en' | 'es' = 'es'
): Promise<AIInsight[]> {
  const openai = getOpenAI()
  
  const debtsList = data.debts.map(d => `${d.name} ($${d.current_balance}, ${d.interest_rate}% anual)`).join(', ')
  const transactionsList = data.lastTransactions.slice(0, 3).map(t => `${t.description}: $${t.amount} (${t.type})`).join(', ')
  
  const prompt = language === 'es' 
    ? `Eres un asesor financiero experto. Analiza estos datos financieros y proporciona exactamente 3 insights breves y accionables:

Deuda Total: $${data.totalDebt}
Ingresos Totales: $${data.totalIncome}
Gastos Totales: $${data.totalExpenses}
Ahorros Netos: $${data.totalSaved}

Deudas principales: ${debtsList}

Últimas transacciones: ${transactionsList}

Devuelve un JSON válido (y SOLO JSON, sin markdown) con esta estructura exacta:
[
  {
    "title": "Título del insight",
    "message": "Mensaje breve y accionable (máximo 2 líneas)",
    "priority": "high" | "medium" | "low"
  }
]

Prioridades:
- high: si la deuda es muy alta o hay gastos descontrolados
- medium: si hay oportunidades de optimización
- low: si hay aspectos positivos o sugerencias secundarias`
    : `You are an expert financial advisor. Analyze this financial data and provide exactly 3 brief, actionable insights:

Total Debt: $${data.totalDebt}
Total Income: $${data.totalIncome}
Total Expenses: $${data.totalExpenses}
Net Savings: $${data.totalSaved}

Main debts: ${debtsList}

Recent transactions: ${transactionsList}

Return a valid JSON (ONLY JSON, no markdown) with this exact structure:
[
  {
    "title": "Insight Title",
    "message": "Brief and actionable message (max 2 lines)",
    "priority": "high" | "medium" | "low"
  }
]

Priorities:
- high: if debt is very high or expenses are out of control
- medium: if there are optimization opportunities
- low: if there are positive aspects or secondary suggestions`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 800,
  })

  const textContent = response.choices[0]?.message?.content
  if (!textContent) {
    throw new Error('No text content in response')
  }

  const jsonMatch = textContent.match(/\[[\s\S]*\]/)
  if (!jsonMatch) {
    console.error('Failed to extract JSON from response:', textContent)
    throw new Error('Invalid JSON format in AI response')
  }

  const insights: AIInsight[] = JSON.parse(jsonMatch[0])
  
  if (!Array.isArray(insights) || insights.length === 0) {
    throw new Error('Invalid insights format')
  }

  return insights.slice(0, 3)
}
