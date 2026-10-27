const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function check() {
  try {
    const { data, error } = await supabase
      .from('debt_payments')
      .select('*')
      .limit(1)

    if (error && error.code === 'PGRST116') {
      console.log('❌ La tabla debt_payments NO existe')
    } else if (error) {
      console.log('Error:', error.message)
    } else {
      console.log('✅ La tabla debt_payments EXISTE')
    }
  } catch (err) {
    console.error(err)
  }
}

check()
