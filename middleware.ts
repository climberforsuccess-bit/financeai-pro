import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas protegidas
  const protectedRoutes = ["/dashboard"];

  // Si es una ruta protegida
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authToken = request.cookies.get("auth_token");

    // Si no hay token, redirigir a login
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
