import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Carga .env.local
dotenv.config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local')
  process.exit(1)
}

console.log('✅ Conectando a Supabase...')
const supabase = createClient(url, key)

// Intenta obtener esquema
const { data, error } = await supabase
  .from('users')
  .select('*')
  .limit(1)

if (error && error.code === 'PGRST116') {
  console.error('❌ Tabla "users" no existe')
} else if (error) {
  console.error('❌ Error:', error.message)
} else {
  console.log('✅ Tabla "users" existe')
}

console.log('\n📋 Intentando detectar tablas...')
// Lista tablas comunes
const commonTables = ['users', 'debts', 'transactions', 'cards', 'goals', 'subscriptions', 'profiles']
const existing = []

for (const table of commonTables) {
  const { error } = await supabase.from(table).select('*').limit(1)
  if (!error || error.code !== 'PGRST116') {
    existing.push(table)
  }
}

if (existing.length > 0) {
  console.log('✅ Tablas detectadas:')
  existing.forEach(t => console.log(`   - ${t}`))
} else {
  console.log('⚠️  No se detectaron tablas comunes')
}
