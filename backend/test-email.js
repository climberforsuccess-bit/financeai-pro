import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
)

const { data, error } = await supabase
  .from('profiles')
  .select('id, email')
  .ilike('email', '%orledis.oliveros%')

console.log('Data:', data)
console.log('Error:', error)
