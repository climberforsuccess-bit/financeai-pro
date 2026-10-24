import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function disableRLS() {
  const { error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)

  console.log('Test query error:', error)
  console.log('If error mentions RLS, we need to disable it in dashboard')
}

disableRLS()
