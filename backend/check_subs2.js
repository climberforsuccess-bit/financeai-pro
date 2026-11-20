import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Primero obtén el profile_id del usuario actual
const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('id')
  .limit(1)

console.log('Profile:', profile?.[0]?.id)

// Ahora obtén las suscripciones de ese profile
if (profile?.[0]) {
  const { data: subs, error: subsError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('profile_id', profile[0].id)

  console.log('Suscripciones:', subs)
  console.log('Error:', subsError)
}
