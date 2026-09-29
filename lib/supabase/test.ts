import { createClient } from '@/lib/supabase/client'

export async function testSupabase() {
  const supabase = createClient()
  
  console.log('Testing Supabase connection...')
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  
  const { data, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Auth error:', error)
    return false
  }
  
  console.log('Connection successful!')
  return true
}
