"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "📊 Dashboard", href: "/dashboard" },
    { label: "💳 Tarjetas", href: "/dashboard/tarjetas" },
    { label: "💰 Transacciones", href: "/dashboard/transacciones" },
    { label: "📈 Deudas", href: "/dashboard/deudas" },
    { label: "🎯 Metas", href: "/dashboard/metas" },
    { label: "📅 Suscripciones", href: "/dashboard/suscripciones" },
    { label: "📊 Reportes", href: "/dashboard/reportes" },
    { label: "⚙️ Configuración", href: "/dashboard/configuracion" },
  ];

  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
      }}
    >
      <h1 style={{ fontSize: "20px", marginBottom: "30px", fontWeight: "bold" }}>
        💎 FinanceAI Pro
      </h1>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.href} style={{ marginBottom: "10px" }}>
              <Link
                href={item.href}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: pathname === item.href ? "#3498db" : "white",
                  backgroundColor: pathname === item.href ? "rgba(52, 152, 219, 0.2)" : "transparent",
                  transition: "all 0.2s",
                  fontSize: "14px",
                  fontWeight: pathname === item.href ? "bold" : "normal",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
