import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const { data, error } = await supabase
  .from('subscriptions')
  .select('*')
  .limit(1)

if (error) {
  console.error('Error:', error)
} else {
  console.log('Columnas:', Object.keys(data[0] || {}))
  console.log('Primer registro:', JSON.stringify(data[0], null, 2))
}
