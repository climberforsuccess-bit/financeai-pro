import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkPayments() {
  try {
    const { data: payments, error } = await supabase
      .from('debt_payments')
      .select('*')

    if (error) throw error

    console.log('✅ ALL Payments in DB (completo):')
    console.table(payments)

    console.log('\n✅ Prestamo ID: 8ac8f408-d2f6-4161-b7d0-c2af9c186c5a')
    console.log('Payments for Prestamo?', payments?.filter(p => p.debt_id === '8ac8f408-d2f6-4161-b7d0-c2af9c186c5a'))
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkPayments()
