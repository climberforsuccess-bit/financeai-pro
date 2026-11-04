const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://rqrpazkkwolxtpiqtdfu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q'
)

async function checkDebts() {
  const { data, error } = await supabase
    .from('debts')
    .select('id, name, total_amount, current_balance, amount_paid')
    .limit(10)

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('\n📊 DEBTS DATA:\n')
  data.forEach(debt => {
    console.log(`ID: ${debt.id}`)
    console.log(`  Name: ${debt.name}`)
    console.log(`  total_amount: ${debt.total_amount}`)
    console.log(`  amount_paid: ${debt.amount_paid}`)
    console.log(`  current_balance: ${debt.current_balance}`)
    console.log('---')
  })
}

checkDebts()
