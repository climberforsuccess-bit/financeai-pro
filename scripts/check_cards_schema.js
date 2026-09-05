const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rqrpazkkwolxtpiqtdfu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'
);

async function check() {
  const { data, error } = await supabase.from('cards').select().limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Cards table structure:');
    if (data && data.length > 0) {
      console.log('Columns:', Object.keys(data[0]));
    } else {
      console.log('Table is empty, checking info_schema...');
      // Intenta obtener info del schema
    }
  }
  process.exit(0);
}

check();
