import { Router, Response } from 'express'
import { supabase } from '../lib/supabase'
import { AuthRequest } from '../types/auth'

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
      .eq('profile_id', req.user.id)
      .order('date', { ascending: false })

    if (error) throw error

    res.json({ data })
  } catch (error: any) {
    console.error('Error fetching transactions:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST - Crear transacción
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    console.log('📤 POST /transaction - User:', req.user?.id, 'Body:', req.body)
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { description, amount, type, category, date, merchant, payment_method, notes } = req.body

    if (!description || !amount || !type || !category || !date) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          profile_id: req.user.id,
          description,
          amount: parseFloat(amount),
          type,
          category,
          date,
          merchant: merchant || null,
          payment_method: payment_method || null,
          notes: notes || null,
        },
      ])
      .select()

    if (error) throw error

    res.status(201).json({ data: data?.[0] })
  } catch (error: any) {
    console.error('Error creating transaction:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT - Actualizar transacción
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    console.log('🔄 PUT /transaction/:id - User:', req.user?.id, 'ID:', req.params.id)
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id } = req.params
    const { description, amount, type, category, date, merchant, payment_method, notes } = req.body

    const { data, error } = await supabase
      .from('transactions')
      .update({
        description,
        amount: parseFloat(amount),
        type,
        category,
        date,
        merchant: merchant || null,
        payment_method: payment_method || null,
        notes: notes || null,
      })
      .eq('id', id)
      .eq('profile_id', req.user.id)
      .select()

    if (error) throw error
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json({ data: data[0] })
  } catch (error: any) {
    console.error('Error updating transaction:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE - Eliminar transacción
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    console.log('🗑️ DELETE /transaction/:id - User:', req.user?.id, 'ID:', req.params.id)
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id } = req.params

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('profile_id', req.user.id)

    if (error) throw error

    res.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting transaction:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
