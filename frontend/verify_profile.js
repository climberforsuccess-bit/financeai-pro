import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q'

const supabase = createClient(supabaseUrl, supabaseKey)

async function verify() {
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')

  console.log(`Total de profiles: ${profiles?.length || 0}`)
  if (profiles && profiles.length > 0) {
    console.log('\nPrimeros 3 profiles:')
    profiles.slice(0, 3).forEach((p, i) => {
      console.log(`\n--- Profile ${i + 1} ---`)
      console.log(`ID: ${p.id}`)
      console.log(`Email: ${p.email}`)
      console.log(`Full Name: ${p.full_name}`)
    })
  }
}

verify()
