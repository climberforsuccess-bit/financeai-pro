import { Request, Response, NextFunction } from 'express'
import { supabase } from '../lib/supabase'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    profile_id?: string
  }
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      console.log('❌ No token provided')
      return res.status(401).json({ error: 'Missing token' })
    }

    console.log('🔍 Verifying Supabase token...')
    
    // Verificar token contra Supabase
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      console.log('❌ Invalid token:', error?.message)
      return res.status(401).json({ error: 'Invalid token' })
    }

    req.user = {
      id: data.user.id,
      email: data.user.email || '',
      profile_id: data.user.id,
    }

    console.log('✅ Token verified for user:', req.user.id)
    next()
  } catch (error: any) {
    console.error('❌ Auth middleware error:', error)
    return res.status(401).json({ error: 'Authentication failed' })
  }
}
