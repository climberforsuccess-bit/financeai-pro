import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Mock data - reemplaza esto con datos reales de la BD después
    const mockSummary = {
      month: 'August 2024',
      income: 5000,
      expenses: 2500,
      balance: 2500,
      cards: {
        total: 3,
        limit: 15000,
        used: 5500,
        utilization: 36.67,
      },
      subscriptions: {
        active: 5,
        monthlyTotal: 85.5,
      },
      debts: {
        total: 2,
        amount: 8500,
      },
      transactions: 24,
    }

    return NextResponse.json(mockSummary)
  } catch (error: any) {
    console.error('Dashboard summary error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
