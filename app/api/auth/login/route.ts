import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({
    message: "Login successful",
    user: { id: "1", email: body.email }
  })
}
