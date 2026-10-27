import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  currency: string
  country: string
}

interface AuthStore {
  user: User | null
  session: any
  loading: boolean
  setUser: (user: User) => void
  setSession: (session: any) => void
  logout: () => void
  initAuth: () => Promise<void>
  signup: (email: string, password: string, fullName?: string) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: true,

  setUser: (user: User) => set({ user }),

  setSession: (session: any) => set({ session }),

  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },

  signup: async (email: string, password: string, fullName?: string) => {
    // Registrar en Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '',
        },
      },
    })

    if (signUpError) throw signUpError
    if (!authData.user) throw new Error('No user returned from signup')

    // Crear perfil manualmente
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: email,
          full_name: fullName || '',
          currency: 'USD',
          country: '',
        },
      ])

    if (profileError) throw profileError
  },

  initAuth: async () => {
    try {
      set({ loading: true })
      
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error

      if (data.session) {
        set({ session: data.session })
        
        // Obtener perfil del usuario
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        if (profileError) {
          // Si el perfil no existe, crearlo
          if (profileError.code === 'PGRST116') {
            const newProfile = {
              id: data.session.user.id,
              email: data.session.user.email,
              full_name: data.session.user.user_metadata?.full_name || '',
              currency: 'USD',
              country: '',
            }
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([newProfile])
            
            if (insertError) throw insertError
            
            set({
              user: newProfile,
              loading: false,
            })
          } else {
            throw profileError
          }
        } else {
          set({
            user: {
              id: profile.id,
              email: profile.email,
              full_name: profile.full_name,
              avatar_url: profile.avatar_url,
              currency: profile.currency || 'USD',
              country: profile.country || '',
            },
            loading: false,
          })
        }
      } else {
        set({ user: null, session: null, loading: false })
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ user: null, session: null, loading: false })
    }
  },
}))
