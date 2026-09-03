import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get FormData (not JSON)
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    // Determine media type
    const mimeType = file.type || 'image/jpeg'

    // Call OpenAI Vision API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64}`,
                },
              },
              {
                type: 'text',
                text: `Extract receipt information from this image and return ONLY valid JSON, no markdown, no extra text:
{
  "vendor": "store name",
  "amount": total amount as number,
  "date": "YYYY-MM-DD",
  "category": "one of: Food & Dining, Groceries, Gas & Fuel, Shopping, Utilities, Entertainment, Travel, Healthcare, Other",
  "items": ["item1", "item2"],
  "tax": tax amount as number or 0
}`,
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON from response
    let receiptData
    try {
      receiptData = JSON.parse(content)
    } catch (e) {
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Validate required fields
    if (!receiptData.vendor || !receiptData.amount || !receiptData.date) {
      throw new Error('Missing required fields: vendor, amount, date')
    }

    // Check for duplicates in last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: duplicates } = await supabase
      .from('transactions')
      .select('id')
      .eq('user_id', user.id)
      .eq('description', receiptData.vendor)
      .eq('amount', receiptData.amount)
      .gte('created_at', yesterday)
      .limit(1)

    if (duplicates && duplicates.length > 0) {
      return NextResponse.json(
        { 
          error: 'Duplicate receipt detected',
          isDuplicate: true,
          data: receiptData 
        },
        { status: 409 }
      )
    }

    // Map category to transaction category
    const categoryMap: { [key: string]: string } = {
      'Food & Dining': 'food',
      'Groceries': 'groceries',
      'Gas & Fuel': 'transport',
      'Shopping': 'shopping',
      'Utilities': 'utilities',
      'Entertainment': 'entertainment',
      'Travel': 'travel',
      'Healthcare': 'health',
      'Other': 'other',
    }

    const mappedCategory = categoryMap[receiptData.category] || 'other'

    // Save to transactions table (not receipts)
    const { data: saved, error: insertError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: user.id,
          description: receiptData.vendor,
          amount: receiptData.amount,
          date: receiptData.date,
          category: mappedCategory,
          type: 'expense',
          expense_type: 'personal',
          merchant: receiptData.vendor,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (insertError) throw insertError

    return NextResponse.json(
      {
        success: true,
        message: 'Receipt processed successfully',
        transaction: saved[0],
        data: receiptData,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Scanner error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
