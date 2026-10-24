import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(url, serviceKey)

async function testAllTables() {
  console.log('🔍 Verificando todas las tablas...\n')

  const tables = [
    'profiles',
    'debts',
    'transactions',
    'debt_payments',
    'subscriptions',
    'ai_insights',
    'categories',
    'budget_goals',
    'expense_alerts'
  ]

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.log(`❌ ${table}: ${error.message}`)
    } else {
      console.log(`✅ ${table}: ${count} registros`)
    }
  }

  console.log('\n✅ Verificación completada')
}

testAllTables()
