import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config({ path: '.env.local' })

async function testEndpoint() {
  const debtId = 'fc7777f8-910a-4aba-b4a3-ffac017f5f60'
  const token = process.env.TEST_TOKEN || 'test-token'
  
  try {
    const response = await fetch(`http://localhost:3001/api/debt/${debtId}/payments`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testEndpoint()
