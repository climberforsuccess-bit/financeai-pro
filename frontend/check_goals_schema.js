import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function checkSchema() {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .limit(1)

    if (error) {
      console.log('Error:', error.message)
      return
    }

    console.log('📋 Columnas de goals:')
    console.log(Object.keys(data && data[0] ? data[0] : {}))
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkSchema()
