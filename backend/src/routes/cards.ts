import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

// GET all cards
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found in token' })
    }

    const { data: cards, error } = await supabase
      .from('cards')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ success: true, data: cards || [] })
  } catch (error: any) {
    console.error('Cards GET error:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST new card
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const { name, bank, balance, limit_amount, apr, color, card_type } = req.body

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    if (!name || limit_amount === undefined) {
      return res.status(400).json({ error: 'Name and limit_amount required' })
    }

    console.log('📤 POST /cards recibió card_type:', card_type)

    const { data, error } = await supabase
      .from('cards')
      .insert([{
        profile_id: profileId,
        name,
        bank: bank || '',
        balance: balance || 0,
        limit_amount,
        apr: apr || 0,
        color: color || '#3B82F6',
        card_type: card_type || 'credit',
      }])
      .select()
      .single()

    if (error) throw error

    console.log('✅ Card creada en BD:', data)
    res.status(201).json({ success: true, data })
  } catch (error: any) {
    console.error('Cards POST error:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT update card
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const cardId = req.params.id
    const { name, bank, balance, limit_amount, apr, color, card_type } = req.body

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    console.log('📤 PUT /cards/:id recibió card_type:', card_type)

    const { data: existing } = await supabase
      .from('cards')
      .select('id')
      .eq('id', cardId)
      .eq('profile_id', profileId)
      .single()

    if (!existing) {
      return res.status(404).json({ error: 'Card not found or unauthorized' })
    }

    const updatePayload: any = {}
    if (name) updatePayload.name = name
    if (bank) updatePayload.bank = bank
    if (balance !== undefined) updatePayload.balance = balance
    if (limit_amount !== undefined) updatePayload.limit_amount = limit_amount
    if (apr !== undefined) updatePayload.apr = apr
    if (color) updatePayload.color = color
    if (card_type) updatePayload.card_type = card_type

    console.log('🔵 Payload para actualizar:', updatePayload)

    const { data, error } = await supabase
      .from('cards')
      .update(updatePayload)
      .eq('id', cardId)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Card actualizada en BD:', data)
    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Cards PUT error:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE card
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const profileId = req.user?.profile_id
    const cardId = req.params.id

    if (!profileId) {
      return res.status(401).json({ error: 'Profile ID not found' })
    }

    const { data: existing } = await supabase
      .from('cards')
      .select('id')
      .eq('id', cardId)
      .eq('profile_id', profileId)
      .single()

    if (!existing) {
      return res.status(404).json({ error: 'Card not found or unauthorized' })
    }

    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', cardId)

    if (error) throw error

    res.json({ success: true, message: 'Card deleted' })
  } catch (error: any) {
    console.error('Cards DELETE error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
