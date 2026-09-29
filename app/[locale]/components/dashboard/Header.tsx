"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #ecf0f1",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a2e" }}>
        Bienvenido a FinanceAI Pro
      </div>

      <div style={{ position: "relative" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          👤 Perfil
        </button>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "45px",
              right: 0,
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              minWidth: "200px",
              zIndex: 1000,
            }}
          >
            <button
              style={{
                display: "block",
                width: "100%",
                padding: "12px 16px",
                border: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                color: "#1a1a2e",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              ⚙️ Perfil
            </button>
            <button
              style={{
                display: "block",
                width: "100%",
                padding: "12px 16px",
                border: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                color: "#e74c3c",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
