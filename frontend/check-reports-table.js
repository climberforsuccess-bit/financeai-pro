import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Read backend .env
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

console.log('📍 Using Supabase credentials from backend/.env')
console.log('URL:', supabaseUrl.substring(0, 30) + '...')

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkReportsTable() {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .limit(1)

    if (error) {
      console.error('\n❌ Reports table does not exist or error:', error.message)
      console.log('\n📋 You need to create the reports table in Supabase.')
      console.log('Go to: https://app.supabase.com → SQL Editor → New Query')
      console.log('Paste and run this SQL:\n')
      console.log(MIGRATION_SQL)
    } else {
      console.log('\n✅ Reports table exists!')
      console.log('Records found:', data?.length || 0)
    }
  } catch (err) {
    console.error('Connection error:', err.message)
  }
}

const MIGRATION_SQL = `
-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  report_type VARCHAR(50) NOT NULL DEFAULT 'monthly',
  period_start TIMESTAMP NOT NULL,
  period_end TIMESTAMP NOT NULL,
  total_income DECIMAL(12, 2) DEFAULT 0,
  total_expenses DECIMAL(12, 2) DEFAULT 0,
  total_debt DECIMAL(12, 2) DEFAULT 0,
  total_savings DECIMAL(12, 2) DEFAULT 0,
  net_worth DECIMAL(12, 2) DEFAULT 0,
  previous_total_expenses DECIMAL(12, 2) DEFAULT 0,
  previous_total_income DECIMAL(12, 2) DEFAULT 0,
  debt_count INT DEFAULT 0,
  debt_paid_off INT DEFAULT 0,
  debt_paid_amount DECIMAL(12, 2) DEFAULT 0,
  average_debt_amount DECIMAL(12, 2) DEFAULT 0,
  debt_payoff_projection_months INT DEFAULT 0,
  transaction_count INT DEFAULT 0,
  expense_by_category JSONB DEFAULT '{}',
  income_by_category JSONB DEFAULT '{}',
  goals_total INT DEFAULT 0,
  goals_completed INT DEFAULT 0,
  ai_insights JSONB DEFAULT '{"summary":"","key_points":[],"recommendations":[]}',
  projections JSONB DEFAULT '{"debt_free_date":null,"savings_projection_6m":0}',
  currency VARCHAR(10) DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reports_profile_id ON reports(profile_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own reports
DROP POLICY IF EXISTS reports_user_isolation ON reports;
CREATE POLICY reports_user_isolation ON reports
  FOR SELECT
  USING (
    profile_id = (
      SELECT id FROM profiles WHERE id = auth.uid()
    )
  );

-- RLS Policy: Users can insert their own reports
DROP POLICY IF EXISTS reports_insert_policy ON reports;
CREATE POLICY reports_insert_policy ON reports
  FOR INSERT
  WITH CHECK (
    profile_id = (
      SELECT id FROM profiles WHERE id = auth.uid()
    )
  );

-- RLS Policy: Users can update their own reports
DROP POLICY IF EXISTS reports_update_policy ON reports;
CREATE POLICY reports_update_policy ON reports
  FOR UPDATE
  USING (
    profile_id = (
      SELECT id FROM profiles WHERE id = auth.uid()
    )
  );
`

checkReportsTable()
