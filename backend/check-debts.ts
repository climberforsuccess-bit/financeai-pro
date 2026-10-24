import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

async function check() {
  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('email', 'demo@prueba.com')
    .single()

  console.log('Profile:', profile)

  if (profile) {
    // Get debts
    const { data: debts, error } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profile.id)

    console.log('Debts error:', error)
    console.log('Debts data:', debts)
    console.log('Debts count:', debts?.length || 0)
  }
}

check()
