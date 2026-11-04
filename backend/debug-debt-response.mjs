import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://rqrpazkkwolxtpiqtdfu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q'
)

async function checkDebts() {
  const { data, error } = await supabase
    .from('debts')
    .select('*')
    .eq('name', 'Carro')
    .single()

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('\n📊 CARRO DEBT - ALL FIELDS:\n')
  console.log(JSON.stringify(data, null, 2))
}

checkDebts()
