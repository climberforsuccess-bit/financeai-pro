import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const supabase = getSupabase()
    const profileId = req.user.id

    const { data: debts } = await supabase
      .from('debts')
      .select('id, name, debt_type, current_balance')
      .eq('profile_id', profileId)

    const { data: transactions } = await supabase
      .from('transactions')
      .select('id, description, amount, type, date')
      .eq('profile_id', profileId)
      .order('date', { ascending: false })
      .limit(10)

    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', profileId)
      .eq('status', 'active')

    const { data: goals } = await supabase
      .from('goals')
      .select('*')
      .eq('profile_id', profileId)

    const totalDebt = (debts || []).reduce((sum: number, d: any) => sum + (d.current_balance || 0), 0)
    const monthlySubscriptionCost = (subscriptions || []).reduce((sum: number, s: any) => sum + (s.cost || s.monthly_cost || s.amount || 0), 0)
    const totalSaved = (goals || []).reduce((sum: number, g: any) => sum + (g.current_amount || g.saved || 0), 0)

    res.json({
      success: true,
      data: {
        summary: {
          totalDebt,
          totalSaved,
          monthlySubscriptionCost,
        },
        debts: debts || [],
        lastTransactions: transactions || [],
        subscriptions: subscriptions || [],
        goals: goals || [],
      }
    })
  } catch (error: any) {
    console.error('Dashboard error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
