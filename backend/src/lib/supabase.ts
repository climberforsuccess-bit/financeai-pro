import { config } from 'dotenv'
config()

import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('SUPABASE_URL:', url ? 'loaded' : 'MISSING')
console.log('SUPABASE_SERVICE_ROLE_KEY:', key ? 'loaded' : 'MISSING')

if (!url || !key) {
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(url, key)
