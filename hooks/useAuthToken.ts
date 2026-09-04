import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getToken = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: { session } } = await supabase.auth.getSession()
        setToken(session?.access_token || null)
      } catch (err) {
        console.error('Error getting auth token:', err)
        setToken(null)
      } finally {
        setLoading(false)
      }
    }

    getToken()
  }, [])

  return { token, loading }
}
