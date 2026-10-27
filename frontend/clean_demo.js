import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function clean() {
  try {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'demo@prueba.com')
      .single()

    if (!profiles) {
      console.error('❌ Usuario no encontrado')
      return
    }

    const userId = profiles.id

    console.log('🧹 Limpiando datos de prueba...\n')

    const { error: e1 } = await supabase
      .from('debts')
      .delete()
      .eq('profile_id', userId)
    if (e1) throw e1
    console.log('✅ Deudas eliminadas')

    const { error: e2 } = await supabase
      .from('transactions')
      .delete()
      .eq('profile_id', userId)
    if (e2) throw e2
    console.log('✅ Transacciones eliminadas')

    const { error: e3 } = await supabase
      .from('goals')
      .delete()
      .eq('profile_id', userId)
    if (e3) throw e3
    console.log('✅ Metas eliminadas')

    console.log('\n✅ ¡Base de datos limpia para este usuario!')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

clean()
