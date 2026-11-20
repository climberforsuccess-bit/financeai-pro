import { Router, Response, Request } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// GET all reports for user (WITH AUTH)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const supabase = getSupabase()
    const profileId = req.user.id

    const { data: reports, error } = await supabase
      .from('reports')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
      .limit(12)

    if (error) {
      console.error('Reports fetch error:', error)
      return res.status(500).json({ error: error.message })
    }

    res.json({
      success: true,
      data: reports || []
    })
  } catch (error: any) {
    console.error('Reports error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST generate new report (NO AUTH - for testing)
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const supabase = getSupabase()
    
    const profileId = req.body.profileId
    
    if (!profileId) {
      return res.status(400).json({ error: 'profileId required' })
    }

    console.log('📊 Generating report for profile:', profileId)

    const { report_type = 'monthly' } = req.body

    // Calculate period dates
    const today = new Date()
    const periodStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const periodEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const periodStartStr = periodStart.toISOString().split('T')[0]
    const periodEndStr = periodEnd.toISOString().split('T')[0]

    console.log(`📅 Period: ${periodStartStr} to ${periodEndStr}`)

    // Fetch debts
    const { data: debts, error: debtsError } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profileId)

    if (debtsError) throw debtsError

    // Fetch transactions for period
    const { data: transactions, error: transError } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .gte('date', periodStartStr)
      .lte('date', periodEndStr)

    if (transError) throw transError

    console.log(`   Found ${debts?.length || 0} debts and ${transactions?.length || 0} transactions in period`)

    // Calculate metrics using correct column names
    const totalDebt = (debts || []).reduce((sum: number, d: any) => sum + (d.current_balance || 0), 0)
    const totalExpenses = (transactions || []).filter((t: any) => t.type === 'expense').reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    const totalIncome = (transactions || []).filter((t: any) => t.type === 'income').reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    const netWorth = totalIncome - totalExpenses - totalDebt

    // Group expenses by category
    const expenseByCategory: Record<string, number> = {}
    const incomeByCategory: Record<string, number> = {}
    
    ;(transactions || []).forEach((t: any) => {
      if (t.type === 'expense') {
        const cat = t.category || 'Uncategorized'
        expenseByCategory[cat] = (expenseByCategory[cat] || 0) + (t.amount || 0)
      } else if (t.type === 'income') {
        const cat = t.category || 'Uncategorized'
        incomeByCategory[cat] = (incomeByCategory[cat] || 0) + (t.amount || 0)
      }
    })

    // Calculate debt metrics
    const totalPaid = (debts || []).reduce((sum: number, d: any) => sum + (d.amount_paid || 0), 0)
    const avgDebtAmount = debts && debts.length > 0 ? totalDebt / debts.length : 0

    // Create report using actual columns
    const report = {
      id: uuidv4(),
      profile_id: profileId,
      report_type,
      period_start: periodStartStr,
      period_end: periodEndStr,
      total_income: totalIncome,
      total_expenses: totalExpenses,
      total_debt: totalDebt,
      total_savings: totalIncome - totalExpenses,
      net_worth: netWorth,
      debt_count: debts?.length || 0,
      debt_paid_off: 0,
      debt_paid_amount: totalPaid,
      average_debt_amount: avgDebtAmount,
      transaction_count: transactions?.length || 0,
      expense_by_category: expenseByCategory,
      income_by_category: incomeByCategory,
      currency: 'USD',
      created_at: new Date().toISOString()
    }

    const { data: savedReport, error: saveError } = await supabase
      .from('reports')
      .insert([report])
      .select()

    if (saveError) throw saveError

    console.log('✅ Report saved:', report.id)

    res.json({
      success: true,
      report: savedReport[0] || report
    })
  } catch (error: any) {
    console.error('❌ Generate report error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
