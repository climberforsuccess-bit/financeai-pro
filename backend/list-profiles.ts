import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function check() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email, full_name')

  console.log('Profiles:', profiles)
  console.log('Error:', error)
}

check()
