import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getSupabase } from '../utils/supabase.js'

const router = Router()

// POST login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const supabase = getSupabase()

    // Verify credentials using Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (profileError || !profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    // Generate JWT token with profile_id
    const secret = process.env.JWT_SECRET || 'secret'
    const token = jwt.sign(
      {
        id: data.user.id,
        email: data.user.email,
        profile_id: profile.id,
      },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
    )

    res.json({
      success: true,
      token,
      user: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        currency: profile.currency,
        country: profile.country,
      },
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
