const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rqrpazkkwolxtpiqtdfu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4'
);

const userId = 'fcb43592-79fd-45c7-8be3-011ea4395cd8';

// Due dates como timestamps (unix epoch en milisegundos)
const cards = [
  { name: 'Visa Personal', last_four: '4242', card_type: 'Visa', balance: 1500, limit_amount: 5000, due_date: 1766227200, color: '#1E90FF', apr: 18.99, owner_type: 'personal', bank: 'Chase', profile_id: null },
  { name: 'Mastercard Business', last_four: '5555', card_type: 'Mastercard', balance: 3200, limit_amount: 8000, due_date: 1787059200, color: '#FF6B35', apr: 16.5, owner_type: 'business', bank: 'Bank of America', profile_id: null },
  { name: 'American Express', last_four: '3782', card_type: 'American Express', balance: 5100, limit_amount: 10000, due_date: 1744348800, color: '#006FCF', apr: 21.99, owner_type: 'personal', bank: 'American Express', profile_id: null },
  { name: 'Discover Card', last_four: '6011', card_type: 'Discover', balance: 800, limit_amount: 4500, due_date: 1806739200, color: '#FF6000', apr: 17.99, owner_type: 'personal', bank: 'Discover', profile_id: null },
  { name: 'JCB Card', last_four: '3530', card_type: 'JCB', balance: 2200, limit_amount: 3000, due_date: 1793443200, color: '#0066B2', apr: 19.99, owner_type: 'personal', bank: 'JCB International', profile_id: null },
];

async function insert() {
  const payload = cards.map(c => ({ ...c, user_id: userId }));
  const { data, error } = await supabase.from('cards').insert(payload).select();
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Inserted:', data.length, 'cards');
  }
  process.exit(0);
}

insert();
