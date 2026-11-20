import { Router, Response } from 'express'
import { supabase } from '../lib/supabase.js'
import { AuthRequest } from '../middleware/auth.js'

const router = Router()

console.log('🔄 Loading transaction routes')

// GET - Obtener transacciones del usuario
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    console.log('📥 GET /transaction - User:', req.user?.id)
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', req.user.profile_id)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Transaction GET error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST - Crear transacción
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    console.log('📤 POST /transaction - User:', req.user?.id)
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { amount, category, description, date } = req.body

    if (!amount || !category) {
      return res.status(400).json({ error: 'Amount and category required' })
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        profile_id: req.user.profile_id,
        amount,
        category,
        description,
        date: date || new Date().toISOString(),
        created_at: new Date().toISOString(),
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
