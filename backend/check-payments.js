import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkPayments() {
  try {
    const { data, error } = await supabase
      .from('debt_payments')
      .select('*')

    if (error) {
      console.error('❌ Error:', error)
    } else {
      console.log('✅ Total payments:', data?.length || 0)
      console.log(JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkPayments()
