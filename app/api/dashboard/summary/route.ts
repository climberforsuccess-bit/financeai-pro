import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const currentMonth = new Date()
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    // Get monthly transactions
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startOfMonth.toISOString())
      .lte('date', endOfMonth.toISOString())

    // Get subscriptions
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')

    // Get cards
    const { data: cards } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)

    // Get debts
    const { data: debts } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', user.id)

    // Calculate totals
    const totalIncome = (transactions || [])
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = (transactions || [])
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalCardLimit = (cards || []).reduce((sum, c) => sum + c.limit, 0)
    const totalCardUsed = (cards || []).reduce((sum, c) => sum + c.used, 0)
    const totalDebt = (debts || []).reduce((sum, d) => sum + d.amount, 0)
    const monthlySubscriptions = (subscriptions || [])
      .filter(s => s.frequency === 'monthly')
      .reduce((sum, s) => sum + s.amount, 0)

    return NextResponse.json(
      {
        month: startOfMonth.toISOString().slice(0, 7),
        income: totalIncome,
        expenses: totalExpense,
        balance: totalIncome - totalExpense,
        cards: {
          total: cards?.length || 0,
          limit: totalCardLimit,
          used: totalCardUsed,
          utilization: totalCardLimit > 0 ? (totalCardUsed / totalCardLimit) * 100 : 0,
        },
        subscriptions: {
          active: subscriptions?.length || 0,
          monthlyTotal: monthlySubscriptions,
        },
        debts: {
          total: debts?.length || 0,
          amount: totalDebt,
        },
        transactions: transactions?.length || 0,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
