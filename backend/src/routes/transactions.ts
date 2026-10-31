import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

// GET all transactions
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found in token' })
    }

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .order('date', { ascending: false })

    if (error) throw error

    res.json({ success: true, data: transactions || [] })
  } catch (error: any) {
    console.error('Transactions GET error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST new transaction
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const { description, type, amount, date, category } = req.body

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    if (!description || type === undefined || amount === undefined) {
      return res.status(400).json({ error: 'Description, type, and amount required' })
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        profile_id: profileId,
        description,
        type,
        amount,
        date: date || new Date().toISOString(),
        category: category || 'other',
      }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ success: true, data })
  } catch (error: any) {
    console.error('Transactions POST error:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT update transaction
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const txId = req.params.id
    const { description, type, amount, date, category } = req.body

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    const { data: existing } = await supabase
      .from('transactions')
      .select('id')
      .eq('id', txId)
      .eq('profile_id', profileId)
      .single()

    if (!existing) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' })
    }

    const { data, error } = await supabase
      .from('transactions')
      .update({
        ...(description && { description }),
        ...(type && { type }),
        ...(amount !== undefined && { amount }),
        ...(date && { date }),
        ...(category && { category }),
      })
      .eq('id', txId)
      .select()
      .single()

    if (error) throw error

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Transactions PUT error:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE transaction
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const txId = req.params.id

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    const { data: existing } = await supabase
      .from('transactions')
      .select('id')
      .eq('id', txId)
      .eq('profile_id', profileId)
      .single()

    if (!existing) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' })
    }

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', txId)

    if (error) throw error

    res.json({ success: true, message: 'Transaction deleted' })
  } catch (error: any) {
    console.error('Transactions DELETE error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
