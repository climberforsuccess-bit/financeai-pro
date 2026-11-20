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
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', req.user.id)

    if (error) throw error

    res.json({ success: true, data: data || [] })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
