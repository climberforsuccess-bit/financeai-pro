import { createClient } from '@supabase/supabase-js'

let supabase: any

export async function initializeSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials')
  }

  supabase = createClient(supabaseUrl, supabaseKey)
  console.log('✅ Supabase initialized')
  return supabase
}

export function getSupabase() {
  if (!supabase) {
    throw new Error('Supabase not initialized')
  }
  return supabase
}
