import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const { data, error } = await supabase
  .from('profiles')
  .select('id, email, plan, subscription_status')

if (error) {
  console.error('Error:', error)
} else {
  console.log('Todos los emails en profiles:')
  data.forEach(p => console.log(`  ID: ${p.id}, Email: ${p.email}, Plan: ${p.plan}, Status: ${p.subscription_status}`))
}
