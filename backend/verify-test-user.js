import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function verify() {
  console.log('🔍 Buscando test@prueba.com en Supabase...\n')
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'test@prueba.com')
    .single()

  if (error) {
    console.log('❌ Error:', error.message)
  } else if (data) {
    console.log('✅ Usuario encontrado:')
    console.log(JSON.stringify(data, null, 2))
  } else {
    console.log('❌ Usuario no existe')
  }
}

verify()
