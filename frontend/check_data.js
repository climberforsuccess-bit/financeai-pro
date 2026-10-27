import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
  console.log('=== VERIFICANDO DATOS ===\n')

  // Profiles
  const { data: profiles } = await supabase.from('profiles').select('*')
  console.log(`Profiles: ${profiles?.length || 0}`)
  if (profiles?.length) {
    profiles.forEach(p => console.log(`  - ${p.email} (${p.id})`))
  }

  // Transactions
  const { data: transactions } = await supabase.from('transactions').select('*')
  console.log(`\nTransactions: ${transactions?.length || 0}`)

  // Debts
  const { data: debts } = await supabase.from('debts').select('*')
  console.log(`Debts: ${debts?.length || 0}`)

  // Goals
  const { data: goals } = await supabase.from('goals').select('*')
  console.log(`Goals: ${goals?.length || 0}`)

  // Cards
  const { data: cards } = await supabase.from('cards').select('*')
  console.log(`Cards: ${cards?.length || 0}`)
}

checkData()
