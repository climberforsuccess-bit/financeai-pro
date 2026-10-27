import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(url, serviceKey)

async function getSchema() {
  console.log('📋 Schema de todas las tablas:\n')

  const tables = [
    'profiles', 'debts', 'transactions', 'debt_payments',
    'subscriptions', 'ai_insights', 'categories', 'budget_goals', 'expense_alerts'
  ]

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1)

    if (error) {
      console.log(`❌ ${table}: ${error.message}`)
    } else if (data && data.length > 0) {
      const columns = Object.keys(data[0])
      console.log(`✅ ${table}:`)
      console.log(`   Columnas: ${columns.join(', ')}`)
      console.log(`   Ejemplo: ${JSON.stringify(data[0], null, 2).split('\n').join('\n   ')}`)
    } else {
      console.log(`⚠️  ${table}: vacía (no puedo ver estructura)`)
    }
    console.log('')
  }
}

getSchema()
