const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://rqrpazkkwolxtpiqtdfu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'
)

async function createUser() {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'test@financeai.com',
      password: 'TestPassword123!',
      email_confirm: true,
    })

    if (error) {
      console.error('❌ Error:', error.message)
    } else {
      console.log('✅ Usuario creado:', data.user.email)
      console.log('ID:', data.user.id)
    }
  } catch (err) {
    console.error('❌ Error:', err)
  }
}

createUser()
