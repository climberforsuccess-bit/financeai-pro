import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function verifySuperbase() {
  try {
    console.log('🔗 Conectando a Supabase...')
    console.log(`   URL: ${process.env.SUPABASE_URL}`)

    const tables = [
      'profiles',
      'debts',
      'transactions',
      'debt_payments',
      'subscriptions',
      'ai_insights'
    ]

    console.log('')
    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.log(`❌ ${table}: ${error.code || error.message}`)
      } else {
        console.log(`✅ ${table}: ${count} registros`)
      }
    }

    console.log('')
    console.log('✅ Conexión exitosa a Supabase')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

verifySuperbase()
