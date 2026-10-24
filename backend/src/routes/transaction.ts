import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

// Función auxiliar para obtener profile_id por email
const getProfileIdByEmail = async (email: string) => {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

  if (error) throw error
  return data?.id
}

// GET all transactions
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const { email } = req.query

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const profileId = await getProfileIdByEmail(email as string)

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
    const { email, amount, category, description, date, type, merchant, payment_method, notes } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    if (!amount || !category || !type) {
      return res.status(400).json({ error: 'amount, category, type required' })
    }

    const profileId = await getProfileIdByEmail(email)

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        profile_id: profileId,
        amount: parseFloat(amount),
        category,
        description: description || '',
        date: date || new Date().toISOString().split('T')[0],
        type,
        merchant: merchant || null,
        payment_method: payment_method || 'credit_card',
        notes: notes || null,
        status: 'completed',
        currency: 'USD',
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

// PUT update transaction
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const { id } = req.params
    const { email, amount, category, description, date, type, merchant, payment_method, notes } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const profileId = await getProfileIdByEmail(email)

    const { data, error } = await supabase
      .from('transactions')
      .update({
        amount: parseFloat(amount),
        category,
        description: description || '',
        date: date || new Date().toISOString().split('T')[0],
        type,
        merchant: merchant || null,
        payment_method: payment_method || 'credit_card',
        notes: notes || null,
      })
      .eq('id', id)
      .eq('profile_id', profileId)
      .select()
      .single()

    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Transaction PUT error:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE transaction
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getSupabase()
    const { id } = req.params
    const { email } = req.query

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const profileId = await getProfileIdByEmail(email as string)

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('profile_id', profileId)

    if (error) throw error

    res.json({ success: true, message: 'Transaction deleted' })
  } catch (error: any) {
    console.error('Transaction DELETE error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
