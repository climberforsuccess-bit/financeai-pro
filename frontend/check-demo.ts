import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

async function check() {
  // Check exact email
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'demo@prueba.com')
    .single()

  console.log('Profile found:', profile)
  console.log('Error:', error)

  if (profile) {
    // Get debts for this profile
    const { data: debts } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profile.id)

    console.log('Debts count:', debts?.length)
    console.log('Debts:', debts)
  }
}

check()
