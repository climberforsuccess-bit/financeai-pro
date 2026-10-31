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

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .single()

    if (profileError || !profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    // Get debts
    const { data: debts = [], error: debtsError } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profileId)

    if (debtsError) console.error('Debts error:', debtsError)

    // Get credit cards as debts
    const { data: cards = [], error: cardsError } = await supabase
      .from('cards')
      .select('id, name, bank, balance, limit_amount, apr')
      .eq('profile_id', profileId)

    if (cardsError) console.error('Cards error:', cardsError)

    // Transform cards into debt format
    const cardDebts = (cards || []).map((card: any) => ({
      id: `card_${card.id}`,
      name: card.bank || card.name || 'Credit Card',
      current_balance: card.balance || 0,
      interest_rate: card.apr || 0,
      debt_type: 'credit_card',
      status: 'active',
      is_card: true,
      limit_amount: card.limit_amount,
      original_id: card.id,
      card_name: card.name,
      bank: card.bank,
    }))

    // Combine debts + cards
    const allDebts = [...debts, ...cardDebts].sort(
      (a, b) => b.current_balance - a.current_balance
    )

    // Get last 10 transactions
    const { data: transactions = [], error: transError } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .order('date', { ascending: false })
      .limit(10)

    if (transError) console.error('Transactions error:', transError)

    // Get subscriptions
    const { data: subscriptions = [], error: subsError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', profileId)

    if (subsError) console.error('Subscriptions error:', subsError)

    // Calculate summary
    const totalDebt = allDebts.reduce((sum: number, d: any) => sum + (d.current_balance || 0), 0)
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
        },
        summary: {
          totalDebt,
          debtCount: allDebts.length,
          totalSaved,
          monthlySubscriptionCost,
        },
        debts: allDebts,
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
