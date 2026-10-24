import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const email = req.query.email as string

    if (!email) {
      return res.status(400).json({ error: 'Email required' })
    }

    const supabase = getSupabase()

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (profileError || !profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    // Get debts WITH ERROR HANDLING
    const { data: debts = [], error: debtsError } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profile.id)

    if (debtsError) {
      console.error('Debts error:', debtsError)
    }

    // Get last 10 transactions
    const { data: transactions = [], error: transError } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profile.id)
      .order('date', { ascending: false })
      .limit(10)

    if (transError) {
      console.error('Transactions error:', transError)
    }

    // Get subscriptions
    const { data: subscriptions = [], error: subsError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', profile.id)

    if (subsError) {
      console.error('Subscriptions error:', subsError)
    }

    // Calculate summary
    const totalDebt = debts.reduce((sum: number, d: any) => sum + (d.current_balance || 0), 0)
    const debtCount = debts.length
    const totalSaved = transactions
      .filter((t: any) => t.type === 'income')
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    const monthlySubscriptionCost = subscriptions.reduce((sum: number, s: any) => sum + (s.monthly_cost || 0), 0)

    res.json({
      success: true,
      data: {
        profile: {
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          currency: profile.currency,
          country: profile.country,
          financial_score: profile.financial_score || 0,
        },
        summary: {
          totalDebt,
          debtCount,
          totalSaved,
          monthlySubscriptionCost,
        },
        debts,
        lastTransactions: transactions,
        subscriptions,
      },
    })
  } catch (error: any) {
    console.error('Dashboard error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
