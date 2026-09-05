import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Mapear campos reales a campos esperados por el frontend
function mapCardData(dbCard: any) {
  return {
    id: dbCard.id,
    user_id: dbCard.user_id,
    last_four: dbCard.last_four,
    brand: dbCard.card_type || 'VISA', // card_type -> brand
    holder_name: dbCard.bank || 'Mi Tarjeta', // bank como fallback
    expiry_month: dbCard.due_date ? new Date(dbCard.due_date).getMonth() + 1 : 12,
    expiry_year: dbCard.due_date ? new Date(dbCard.due_date).getFullYear() : 2025,
    limit: dbCard.limit_amount || 0,
    balance: dbCard.balance || 0,
    created_at: dbCard.created_at,
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Mapear cada tarjeta
    const mappedCards = (data || []).map(mapCardData)

    return NextResponse.json({ data: mappedCards }, { status: 200 })
  } catch (error: any) {
    console.error('[/api/cards GET]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 })
    }

    const body = await request.json()

    const { data, error } = await supabase
      .from('cards')
      .insert([{ ...body, user_id: user.id }])
      .select()

    if (error) throw error

    const mappedCards = (data || []).map(mapCardData)

    return NextResponse.json({ data: mappedCards }, { status: 201 })
  } catch (error: any) {
    console.error('[/api/cards POST]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
