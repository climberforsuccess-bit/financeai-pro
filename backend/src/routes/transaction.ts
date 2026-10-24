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

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profileId)
      .order('date', { ascending: false })

    if (error) throw error

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Transaction GET error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST new transaction
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const { amount, category, description, date, type, status } = req.body

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    if (!amount || !category || !type) {
      return res.status(400).json({ error: 'amount, category, type required' })
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        profile_id: profileId,
        amount,
        category,
        description: description || '',
        date: date || new Date().toISOString(),
        type,
        status: status || 'completed',
      }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ success: true, data })
  } catch (error: any) {
    console.error('Transaction POST error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
