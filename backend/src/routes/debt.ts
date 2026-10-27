import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

// GET all debts
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found in token' })
    }

    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Debt GET error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST new debt
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

export default router
