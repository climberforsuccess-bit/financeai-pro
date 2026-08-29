import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas públicas
  const publicRoutes = ['/', '/auth/login', '/auth/signup', '/legal/terms', '/legal/privacy', '/landing']
  
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Para rutas protegidas, verificar autenticación
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si no hay sesión y trata de acceder ruta protegida, redirigir a login
  if (!session && !publicRoutes.includes(pathname)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
