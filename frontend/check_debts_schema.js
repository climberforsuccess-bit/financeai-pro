import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function checkSchema() {
  try {
    // Query directa para obtener columnas y tipos
    const { data, error } = await supabase.rpc('get_table_info', { table_name: 'debts' }).catch(() => ({ data: null }))
    
    if (data) {
      console.log('Columnas detalladas:')
      console.log(JSON.stringify(data, null, 2))
    } else {
      // Alternativa: insertar un registro vacío para ver el error
      console.log('Intentando verificar tipos de columna...')
      const { error: testError } = await supabase
        .from('debts')
        .insert([{
          profile_id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
        }])
      
      console.log('Test error:', testError?.message)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkSchema()
