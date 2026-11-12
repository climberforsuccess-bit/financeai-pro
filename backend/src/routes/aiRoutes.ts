import { Router, Request, Response } from 'express'
import { generateDashboardInsights, DashboardData } from '../services/openaiService.js'

const router = Router()

router.post('/dashboard-insights', async (req: Request, res: Response) => {
  try {
    const { summary, debts } = req.body
    const language = (req.query.lang as 'en' | 'es') || 'es'

    // Validate required data
    if (!summary || !debts) {
      return res.status(400).json({ error: 'Missing summary or debts data' })
    }

    const dashboardData: DashboardData = {
      totalDebt: summary.totalDebt || 0,
      totalIncome: summary.totalIncome || 0,
      totalExpenses: summary.totalExpenses || 0,
      totalSaved: summary.totalSaved || 0,
      debts: debts || [],
      lastTransactions: summary.lastTransactions || [],
    }

    const insights = await generateDashboardInsights(dashboardData, language)

    res.json({ insights })
  } catch (error) {
    console.error('AI Insights Error:', error)
    res.status(500).json({ error: 'Failed to generate insights' })
  }
})

export default router
