"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Unknown error";

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>❌ Authentication Error</h1>
      <p>Error: <strong>{error}</strong></p>
      <p>Invalid email or password.</p>
      <Link href="/auth/login">
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          Back to Login
        </button>
      </Link>
    </div>
  );
}
