import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function verify() {
  try {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'demo@prueba.com')
      .single()

    const userId = profiles.id

    const { data: debts } = await supabase
      .from('debts')
      .select('*')
      .eq('profile_id', userId)

    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('profile_id', userId)

    const { data: goals } = await supabase
      .from('goals')
      .select('*')
      .eq('profile_id', userId)

    console.log('📊 VERIFICACIÓN DE DATOS\n')
    console.log(`👤 Usuario: ${profiles.email}`)
    console.log(`\n💳 Deudas: ${debts?.length || 0}`)
    debts?.forEach(d => console.log(`   - ${d.name}: $${d.current_balance} (${d.debt_type})`))
    
    console.log(`\n💰 Transacciones: ${transactions?.length || 0}`)
    transactions?.forEach(t => console.log(`   - ${t.description}: $${t.amount} (${t.type})`))
    
    console.log(`\n🎯 Metas: ${goals?.length || 0}`)
    goals?.forEach(g => console.log(`   - ${g.name}: $${g.current_amount}/$${g.target_amount}`))
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

verify()
