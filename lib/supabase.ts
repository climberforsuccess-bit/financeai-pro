import { createClient } from '@supabase/supabase-js'

let supabaseInstance: any = null

const createSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('🔧 Creating Supabase client with:', {
    url: url ? `${url.substring(0, 20)}...` : '❌ MISSING',
    key: key ? `${key.substring(0, 20)}...` : '❌ MISSING',
  })

  if (!url || !key) {
    console.error('❌ SUPABASE CONFIG ERROR:', { url, key })
    throw new Error('Supabase URL and Key are required')
  }

  // Custom storage adapter for browser
  const storage = typeof window !== 'undefined' 
    ? {
        getItem: (key: string) => {
          const value = localStorage.getItem(key)
          console.log(`📖 Storage.getItem(${key}):`, value ? '✅ found' : '❌ not found')
          return value
        },
        setItem: (key: string, value: string) => {
          console.log(`💾 Storage.setItem(${key})`)
          localStorage.setItem(key, value)
        },
        removeItem: (key: string) => {
          console.log(`🗑️ Storage.removeItem(${key})`)
          localStorage.removeItem(key)
        },
      }
    : undefined

  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: storage,
    },
  })
}

export const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    return createSupabaseClient()
  }

  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient()
    ;(window as any).__supabaseClient = supabaseInstance
    console.log('✅ Supabase client initialized')
  }

  return supabaseInstance
}
