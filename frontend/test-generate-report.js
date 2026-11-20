import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const backendEnvPath = '../backend/.env'
const envContent = fs.readFileSync(backendEnvPath, 'utf-8')
const envLines = envContent.split('\n')
const env = {}

envLines.forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    env[key.trim()] = value.trim()
  }
})

const supabaseUrl = env.SUPABASE_URL
const supabaseKey = env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testGenerateReport() {
  try {
    // Fetch a profile to get a profile_id
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    if (profileError || !profiles || profiles.length === 0) {
      console.error('❌ No profiles found')
      return
    }

    const profileId = profiles[0].id
    console.log('📍 Using profile:', profileId)

    // Call the generate endpoint via fetch (simulating the backend API)
    const response = await fetch('http://localhost:3001/api/reports/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ profileId })
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('❌ API Error:', result)
      return
    }

    console.log('\n✅ Report generated successfully!')
    console.log('\n📊 Report Data:')
    console.log(JSON.stringify(result, null, 2))

    // Verify the report was saved
    const { data: savedReports, error: fetchError } = await supabase
      .from('reports')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
      .limit(1)

    if (fetchError) {
      console.error('❌ Error fetching saved report:', fetchError)
      return
    }

    console.log('\n✅ Report saved in database!')
    console.log('Saved report ID:', savedReports[0].id)
    console.log('AI Insights:', savedReports[0].ai_insights)
    console.log('Projections:', savedReports[0].projections)

  } catch (err) {
    console.error('Error:', err.message)
  }
}

testGenerateReport()
