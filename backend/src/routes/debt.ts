import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

// GET all debts + credit card balances
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found in token' })
    }

    // Get debts
    const { data: debts, error: debtsError } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })

    if (debtsError) throw debtsError

    // Get credit cards as debts
    const { data: cards, error: cardsError } = await supabase
      .from('cards')
      .select('id, name, bank, balance, limit_amount, apr')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })

    if (cardsError) throw cardsError

    // Transform cards into debt format
    const cardDebts = (cards || []).map((card: any) => ({
      id: `card_${card.id}`,
      name: card.bank || card.name || 'Credit Card', // Prioriza bank, luego name
      balance: card.balance || 0,
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

    // Combine and sort by balance (desc)
    const allDebts = [...(debts || []), ...cardDebts].sort(
      (a, b) => b.current_balance - a.current_balance
    )

    res.json({ success: true, data: allDebts })
  } catch (error: any) {
    console.error('Debt GET error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST new debt (only for manual debts, not cards)
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const { name, current_balance, interest_rate, debt_type, status } = req.body

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    if (!name || current_balance === undefined) {
      return res.status(400).json({ error: 'Name and current_balance required' })
    }

    const { data, error } = await supabase
      .from('debts')
      .insert([{
        profile_id: profileId,
        name,
        current_balance,
        interest_rate: interest_rate || 0,
        debt_type: debt_type || 'other',
        status: status || 'active',
      }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ success: true, data })
  } catch (error: any) {
    console.error('Debt POST error:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT update debt
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const debtId = req.params.id
    const { name, current_balance, interest_rate, debt_type, status } = req.body

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    // Check if it's a card debt
    if (debtId.startsWith('card_')) {
      const cardId = debtId.replace('card_', '')
      const { data: card } = await supabase
        .from('cards')
        .select('id')
        .eq('id', cardId)
        .eq('profile_id', profileId)
        .single()

      if (!card) {
        return res.status(404).json({ error: 'Card not found or unauthorized' })
      }

      const { data, error } = await supabase
        .from('cards')
        .update({
          ...(name && { name }),
          ...(current_balance !== undefined && { balance: current_balance }),
          ...(interest_rate !== undefined && { apr: interest_rate }),
        })
        .eq('id', cardId)
        .select()
        .single()

      if (error) throw error

      return res.json({ success: true, data: { ...data, is_card: true } })
    }

    // Regular debt update
    const { data: existing } = await supabase
      .from('debts')
      .select('id')
      .eq('id', debtId)
      .eq('profile_id', profileId)
      .single()

    if (!existing) {
      return res.status(404).json({ error: 'Debt not found or unauthorized' })
    }

    const { data, error } = await supabase
      .from('debts')
      .update({
        ...(name && { name }),
        ...(current_balance !== undefined && { current_balance }),
        ...(interest_rate !== undefined && { interest_rate }),
        ...(debt_type && { debt_type }),
        ...(status && { status }),
      })
      .eq('id', debtId)
      .select()
      .single()

    if (error) throw error

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Debt PUT error:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE debt
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const debtId = req.params.id

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    // Check if it's a card debt
    if (debtId.startsWith('card_')) {
      const cardId = debtId.replace('card_', '')
      const { data: card } = await supabase
        .from('cards')
        .select('id')
        .eq('id', cardId)
        .eq('profile_id', profileId)
        .single()

      if (!card) {
        return res.status(404).json({ error: 'Card not found or unauthorized' })
      }

      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', cardId)

      if (error) throw error

      return res.json({ success: true, message: 'Card deleted' })
    }

    // Regular debt delete
    const { data: existing } = await supabase
      .from('debts')
      .select('id')
      .eq('id', debtId)
      .eq('profile_id', profileId)
      .single()

    if (!existing) {
      return res.status(404).json({ error: 'Debt not found or unauthorized' })
    }

    const { error } = await supabase
      .from('debts')
      .delete()
      .eq('id', debtId)

    if (error) throw error

    res.json({ success: true, message: 'Debt deleted' })
  } catch (error: any) {
    console.error('Debt DELETE error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
