import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'

export interface User {
  id: string
  email: string
  full_name: string
  currency: string
  country: string
}

export interface Session {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
  }
}

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  initAuth: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,
      error: null,

      initAuth: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()

          if (session?.user?.id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            set({
              session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token || '',
                user: {
                  id: session.user.id,
                  email: session.user.email || '',
                },
              },
              user: profile || null,
              loading: false,
            })
          } else {
            set({ loading: false })
          }
        } catch (error) {
          console.error('Auth init error:', error)
          set({ loading: false })
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ error: null })

          const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) throw error

          if (session?.user?.id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            set({
              session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token || '',
                user: {
                  id: session.user.id,
                  email: session.user.email || '',
                },
              },
              user: profile || null,
            })
          }
        } catch (error: any) {
          set({ error: error.message })
          throw error
        }
      },

      signup: async (email: string, password: string, fullName: string) => {
        try {
          set({ error: null })

          const { data: { user }, error } = await supabase.auth.signUp({
            email,
            password,
          })

          if (error) throw error
          if (!user?.id) throw new Error('No user created')

          const { data: newProfile, error: profileError } = await supabase
            .from('profiles')
            .insert([{
              id: user.id,
              email: email || '',
              full_name: fullName,
              currency: 'USD',
              country: 'US',
            }])
            .select()
            .single()

          if (profileError) throw profileError

          const { data: { session } } = await supabase.auth.getSession()

          if (session) {
            set({
              session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token || '',
                user: {
                  id: session.user.id,
                  email: session.user.email || '',
                },
              },
              user: newProfile,
            })
          }
        } catch (error: any) {
          set({ error: error.message })
          throw error
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut()
          set({ user: null, session: null })
        } catch (error: any) {
          set({ error: error.message })
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        session: state.session,
        user: state.user,
      }),
    }
  )
)
