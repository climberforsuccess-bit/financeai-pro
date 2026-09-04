'use client'

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'

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
    } = supabase.auth.onAuthStateChange((event, session) => {
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
        setLoading(true)
        setError(null)
        const supabase = getSupabaseClient()

        const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (supabaseError) {
          const errorMsg = supabaseError.message || 'Login failed'
          setError(errorMsg)
          return { error: errorMsg }
        }

        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            user_metadata: data.user.user_metadata,
          })
          setAuthenticated(true)
          console.log('✅ Login successful:', email)
          router.push('/dashboard')
        }

        return {}
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Internal error'
        setError(errorMsg)
        console.error('❌ Login error:', err)
        return { error: errorMsg }
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  // SIGNUP
  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        setLoading(true)
        setError(null)
        const supabase = getSupabaseClient()

        const { data, error: supabaseError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        })

        if (supabaseError) {
          const errorMsg = supabaseError.message || 'Signup failed'
          setError(errorMsg)
          return { error: errorMsg }
        }

        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            user_metadata: data.user.user_metadata,
          })
          setAuthenticated(true)
          console.log('✅ Signup successful:', email)
          router.push('/dashboard')
        }

        return {}
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Internal error'
        setError(errorMsg)
        console.error('❌ Signup error:', err)
        return { error: errorMsg }
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('❌ Logout error:', error)
        throw error
      }

      setUser(null)
      setAuthenticated(false)
      setError(null)
      console.log('✅ Logged out')
      router.push('/auth/login')
    } catch (err) {
      console.error('❌ Logout failed:', err)
      throw err
    } finally {
      setLoading(false)
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

// CUSTOM HOOK
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe estar dentro de AuthProvider')
  }
  return context
}
