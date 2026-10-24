import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

async function check() {
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
  console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY?.substring(0, 20) + '...')

  // Try without .single()
  const { data: profiles, error: listError } = await supabase
    .from('profiles')
    .select('*')

  console.log('\n=== ALL PROFILES ===')
  console.log('List error:', listError)
  console.log('Total profiles:', profiles?.length)

  // Now filter
  const { data: demoProfile, error: filterError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'demo@prueba.com')

  console.log('\n=== DEMO PROFILE ===')
  console.log('Filter error:', filterError)
  console.log('Demo profile:', demoProfile)
}

check()
