import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function check() {
  console.log('🔍 Datos de test@example.com\n')
  
  // Profile
  const { data: profile, error: e1 } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'test@example.com')
    .single()

  if (!e1 && profile) {
    console.log('✅ Profile:')
    console.log(JSON.stringify(profile, null, 2))
  } else {
    console.log('❌ Profile error:', e1?.message)
  }

  // Debts
  if (profile) {
    const { data: debts, error: e2 } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', profile.id)

    console.log(`\n✅ Deudas (${debts?.length || 0}):`)
    console.log(JSON.stringify(debts, null, 2))

    // Transactions
    const { data: transactions, error: e3 } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', profile.id)
      .order('date', { ascending: false })
      .limit(5)

    console.log(`\n✅ Últimas 5 transacciones (${transactions?.length || 0}):`)
    console.log(JSON.stringify(transactions, null, 2))
  }
}

check()
