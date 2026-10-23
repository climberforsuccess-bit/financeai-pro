import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTrigger() {
  try {
    // Obtener todos los triggers
    const { data, error } = await supabase
      .from('information_schema.triggers')
      .select('trigger_name, event_object_table, action_statement')
      .ilike('trigger_name', '%profile%')

    if (error) {
      console.error('Error:', error)
      return
    }

    console.log('Triggers encontrados:')
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error:', err)
  }
}

checkTrigger()
