"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Transacciones", href: "/dashboard/transacciones", icon: "💳" },
    { label: "Deudas", href: "/dashboard/deudas", icon: "📈" },
    { label: "Metas", href: "/dashboard/metas", icon: "🎯" },
    { label: "Tarjetas", href: "/dashboard/tarjetas", icon: "💰" },
    { label: "Suscripciones", href: "/dashboard/suscripciones", icon: "📅" },
    { label: "Reportes", href: "/dashboard/reportes", icon: "📊" },
    { label: "Asistente IA", href: "/dashboard/asistente-ia", icon: "🤖" },
    { label: "Configuración", href: "/dashboard/configuracion", icon: "⚙️" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "280px" : "80px",
          backgroundColor: "#1a1a2e",
          color: "white",
          padding: "20px",
          transition: "width 0.3s",
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          {sidebarOpen && (
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
              💰 FinanceAI
            </h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "6px",
                color: "white",
                textDecoration: "none",
                transition: "background-color 0.3s",
                fontSize: "14px",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ fontSize: "18px", minWidth: "24px" }}>
                {item.icon}
              </span>
              {sidebarOpen && item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: sidebarOpen ? "280px" : "80px",
          flex: 1,
          padding: "40px",
          transition: "margin-left 0.3s",
          overflowY: "auto",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
            paddingBottom: "20px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "14px", color: "#95a5a6" }}>
              Hola, Usuario
            </p>
            <p style={{ margin: "4px 0 0 0", fontSize: "16px", fontWeight: "600", color: "#1a1a2e" }}>
              Juan Pérez
            </p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#3498db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            JP
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
