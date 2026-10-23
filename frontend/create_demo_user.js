import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function createDemoUser() {
  try {
    // 1. Obtener el user ID de auth.users
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()
    
    if (usersError) throw usersError

    const demoUser = users.find(u => u.email === 'demo@prueba.com')
    
    if (!demoUser) {
      console.error('❌ No existe usuario demo@prueba.com en auth.users')
      console.log('\nUsuarios encontrados:')
      users.forEach(u => console.log(`  - ${u.email} (${u.id})`))
      return
    }

    console.log(`✅ Usuario encontrado en auth: ${demoUser.id}\n`)

    // 2. Crear el perfil
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: demoUser.id,
          email: 'demo@prueba.com',
          full_name: 'Demo User',
          currency: 'USD',
          country: 'CO',
        },
      ])
      .select()

    if (profileError) throw profileError

    console.log('✅ Perfil creado exitosamente')
    console.log(JSON.stringify(profile, null, 2))
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

createDemoUser()
