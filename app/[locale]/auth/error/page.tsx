"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") || "Unknown error";

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>❌ Error de Autenticación</h1>
      <p>{error}</p>
      <a href="/" style={{ color: "#3498db", textDecoration: "none" }}>
        Volver al inicio
      </a>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
