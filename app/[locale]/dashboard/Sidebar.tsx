"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { nombre: "Dashboard", icon: "📊", ruta: "/dashboard" },
  { nombre: "Transacciones", icon: "💳", ruta: "/dashboard/transacciones" },
  { nombre: "Deudas", icon: "📉", ruta: "/dashboard/deudas" },
  { nombre: "Metas", icon: "🎯", ruta: "/dashboard/metas" },
  { nombre: "Tarjetas", icon: "💰", ruta: "/dashboard/tarjetas" },
  { nombre: "Escáner", icon: "📸", ruta: "/dashboard/escaner" },
  { nombre: "Asistente IA", icon: "🤖", ruta: "/dashboard/asistente-ia" },
  { nombre: "Reportes", icon: "📈", ruta: "/dashboard/reportes" },
  { nombre: "Suscripciones", icon: "📅", ruta: "/dashboard/suscripciones" },
  { nombre: "Configuración", icon: "⚙️", ruta: "/dashboard/configuracion" },
];

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <aside
      style={{
        width: isOpen ? "260px" : "80px",
        backgroundColor: "#1a1a2e",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        borderRight: "1px solid #16213e",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        {isOpen && <h2 style={{ fontSize: "18px", margin: 0 }}>FinanceAI Pro</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <div
            key={item.ruta}
            onClick={() => router.push(item.ruta)}
            style={{
              padding: "12px 16px",
              marginBottom: "8px",
              cursor: "pointer",
              borderRadius: "6px",
              backgroundColor: "#16213e",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f3460")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16213e")}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            {isOpen && <span style={{ fontSize: "14px" }}>{item.nombre}</span>}
          </div>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        style={{
          padding: "12px 16px",
          backgroundColor: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
      >
        {isOpen ? "Cerrar Sesión" : "Salir"}
      </button>
    </aside>
  );
}
