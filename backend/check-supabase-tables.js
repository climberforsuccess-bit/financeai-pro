import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkTables() {
  try {
    const tables = [
      'profiles',
      'debts',
      'transactions',
      'debt_payments',
      'subscriptions',
      'ai_insights'
    ]

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.log(`❌ ${table}: ${error.message}`)
      } else {
        console.log(`✅ ${table}: existe`)
      }
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkTables()
