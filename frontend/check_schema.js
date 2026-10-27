import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function checkSchema() {
  try {
    // Obtener un registro de debts para ver sus columnas
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .limit(1)

    if (error) throw error

    console.log('📋 Columnas de la tabla debts:')
    if (data && data.length > 0) {
      console.log(Object.keys(data[0]))
    } else {
      console.log('(tabla vacía, verificando con información de la tabla)')
      
      // Intenta con una query directa
      const { data: info } = await supabase
        .rpc('get_table_columns', { table_name: 'debts' })
        .catch(() => ({ data: null }))
      
      console.log(info)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkSchema()
