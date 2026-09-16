import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // TODO: Validar contra base de datos real
    if (email === "test@example.com" && password === "password123") {
      // Crear respuesta con cookie de sesión
      const response = NextResponse.json(
        { message: "Login successful", user: { id: "1", email } },
        { status: 200 }
      );

      // Agregar cookie de sesión (temporal, en producción usar JWT)
      response.cookies.set("auth_token", "dummy_token_123", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });

      return response;
    }

    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
