import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rqrpazkkwolxtpiqtdfu.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function seedData() {
  try {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'demo@prueba.com')
      .single()

    if (!profiles) {
      console.error('❌ Usuario demo@prueba.com no encontrado')
      return
    }

    const userId = profiles.id
    console.log(`✅ Usuario encontrado: ${userId}\n`)

    const today = Math.floor(Date.now() / 1000)

    // Deudas
    console.log('📊 Creando deudas...')
    const debtsData = [
      {
        profile_id: userId,
        name: 'Tarjeta de Crédito VISA',
        debt_type: 'credit_card',
        total_amount: 5000,
        current_balance: 3200,
        interest_rate: 2.5,
        minimum_payment: 150,
        due_date: today + (15 * 24 * 60 * 60),
        currency: 'USD',
        payment_frequency: 'monthly',
      },
      {
        profile_id: userId,
        name: 'Préstamo Personal',
        debt_type: 'personal_loan',
        total_amount: 10000,
        current_balance: 7500,
        interest_rate: 1.8,
        minimum_payment: 300,
        due_date: today + (20 * 24 * 60 * 60),
        currency: 'USD',
        payment_frequency: 'monthly',
      },
    ]
    
    const { data: debtsInserted, error: debtsError } = await supabase
      .from('debts')
      .insert(debtsData)
      .select()
    
    if (debtsError) {
      console.error('❌ Error insertando deudas:', debtsError.message)
    } else {
      console.log(`✅ ${debtsInserted.length} deuda(s) creada(s)`)
    }

    // Transacciones
    console.log('\n💳 Creando transacciones...')
    const transData = [
      {
        profile_id: userId,
        description: 'Supermercado D1',
        amount: 85.50,
        category: 'groceries',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        payment_method: 'credit_card',
      },
      {
        profile_id: userId,
        description: 'Salario mensual',
        amount: 2500,
        category: 'salary',
        type: 'income',
        date: new Date().toISOString().split('T')[0],
        payment_method: 'bank_transfer',
      },
      {
        profile_id: userId,
        description: 'Pago de servicios',
        amount: 120,
        category: 'utilities',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        payment_method: 'bank_transfer',
      },
    ]
    
    const { data: transInserted, error: transError } = await supabase
      .from('transactions')
      .insert(transData)
      .select()
    
    if (transError) {
      console.error('❌ Error insertando transacciones:', transError.message)
    } else {
      console.log(`✅ ${transInserted.length} transacción(es) creada(s)`)
    }

    // Metas
    console.log('\n🎯 Creando metas...')
    const goalsData = [
      {
        profile_id: userId,
        name: 'Fondo de Emergencia',
        target_amount: 5000,
        current_amount: 2100,
        deadline: '2025-12-31',
        category: 'emergency_fund',
        status: 'active',
        currency: 'USD',
        is_recurring: false,
      },
      {
        profile_id: userId,
        name: 'Vacaciones',
        target_amount: 2000,
        current_amount: 450,
        deadline: '2025-07-31',
        category: 'vacation',
        status: 'active',
        currency: 'USD',
        is_recurring: false,
      },
    ]
    
    const { data: goalsInserted, error: goalsError } = await supabase
      .from('goals')
      .insert(goalsData)
      .select()
    
    if (goalsError) {
      console.error('❌ Error insertando metas:', goalsError.message)
    } else {
      console.log(`✅ ${goalsInserted.length} meta(s) creada(s)`)
    }

    console.log('\n✅ ¡Datos de prueba creados exitosamente!')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

seedData()
