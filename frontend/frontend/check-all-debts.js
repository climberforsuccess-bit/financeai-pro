import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkAllDebts() {
  try {
    const { data: debts, error } = await supabase
      .from('debts')
      .select('id, name, debt_type, current_balance')

    if (error) throw error

    console.log('✅ All Debts in DB:')
    debts?.forEach(d => {
      console.log(`- ${d.name} (${d.debt_type}): ${d.id}`)
    })

    const { data: payments } = await supabase
      .from('debt_payments')
      .select('id, debt_id, amount')

    console.log('\n✅ All Payments in DB:')
    payments?.forEach(p => {
      console.log(`- Payment: ${p.amount} for debt_id: ${p.debt_id}`)
    })
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkAllDebts()
