'use client'

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

// TYPE DEFINITIONS
export interface User {
  id: string
  email?: string
  user_metadata?: {
    name?: string
  }
}

export interface AuthContextType {
  user: User | null
  authenticated: boolean
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<{ error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ error?: string }>
  logout: () => Promise<void>
  clearError: () => void
}

// CREATE CONTEXT
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// PROVIDER COMPONENT
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true)
        const supabase = getSupabaseClient()
        
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
          })
          setAuthenticated(true)
          console.log('✅ Session restored:', session.user.email)
        } else {
          setUser(null)
          setAuthenticated(false)
          console.log('❌ No session found')
        }
      } catch (err) {
        console.error('❌ Session check failed:', err)
        setUser(null)
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Listen to auth changes
  useEffect(() => {
    const supabase = getSupabaseClient()
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      console.log('🔄 Auth state changed:', event)
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          user_metadata: session.user.user_metadata,
        })
        setAuthenticated(true)
      } else {
        setUser(null)
        setAuthenticated(false)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null)
        const supabase = getSupabaseClient()
        
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setError(error.message)
          return { error: error.message }
        }

        router.push('/dashboard')
        return {}
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed'
        setError(message)
        return { error: message }
      }
    },
    [router]
  )

  // SIGNUP
  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        setError(null)
        const supabase = getSupabaseClient()
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        })

        if (error) {
          setError(error.message)
          return { error: error.message }
        }

        // Redirect to confirmation or login
        router.push('/auth/login?registered=true')
        return {}
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Signup failed'
        setError(message)
        return { error: message }
      }
    },
    [router]
  )

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      setUser(null)
      setAuthenticated(false)
      router.push('/auth/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }, [router])

  // CLEAR ERROR
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value: AuthContextType = {
    user,
    authenticated,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// HOOK
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
