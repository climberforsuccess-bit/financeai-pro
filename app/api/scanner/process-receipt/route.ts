import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
                text: `Extract receipt information from this image and return JSON only, no markdown:
{
  "vendor": "store name",
  "amount": total amount as number,
  "date": "YYYY-MM-DD",
  "category": "category from list",
  "items": ["item1", "item2"],
  "tax": tax amount as number or 0,
  "total": total as number
}

Categories: Food & Dining, Groceries, Gas & Fuel, Shopping, Utilities, Entertainment, Travel, Healthcare, Other`,
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
    const receiptData = JSON.parse(content)

    // Check for duplicates in last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: duplicates } = await supabase
      .from('receipts')
      .select('id')
      .eq('user_id', user.id)
      .eq('vendor', receiptData.vendor)
      .eq('amount', receiptData.amount)
      .gte('created_at', yesterday)
      .limit(1)

    if (duplicates && duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Duplicate receipt detected', isDuplicate: true },
        { status: 409 }
      )
    }

    // Save to database
    const { data: saved, error } = await supabase
      .from('receipts')
      .insert([
        {
          user_id: user.id,
          vendor: receiptData.vendor,
          amount: receiptData.amount,
          date: receiptData.date,
          category: receiptData.category,
          items: receiptData.items,
          tax: receiptData.tax,
          total: receiptData.total,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(
      {
        success: true,
        receipt: saved[0],
        data: receiptData,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Scanner error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
