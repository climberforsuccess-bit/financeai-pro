import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAuth() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    console.log('Usuario logueado:', user?.id)
    console.log('Email:', user?.email)
  } catch (err) {
    console.error('Error:', err)
  }
}

checkAuth()
