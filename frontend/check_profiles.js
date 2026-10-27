import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkProfiles() {
  try {
    // Obtener todos los profiles
    console.log('=== TODOS LOS PROFILES ===\n')
    const { data: allProfiles, error: allError } = await supabase
      .from('profiles')
      .select('*')

    if (allError) {
      console.error('Error al obtener profiles:', allError)
      return
    }

    console.log(`Total de profiles: ${allProfiles?.length || 0}\n`)
    
    if (allProfiles && allProfiles.length > 0) {
      console.log('Primeros 3 profiles:\n')
      allProfiles.slice(0, 3).forEach((p, i) => {
        console.log(`--- Profile ${i + 1} ---`)
        console.log(JSON.stringify(p, null, 2))
        console.log('')
      })
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

checkProfiles()
