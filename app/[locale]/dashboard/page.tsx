"use client";

import { useState } from "react";
import Card from "@/app/components/ui/Card";

interface DashboardStats {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export default function DashboardPage() {
  const [stats] = useState<DashboardStats[]>([
    {
      label: "Ingresos Este Mes",
      value: "$5,250.00",
      change: "+12%",
      trend: "up",
      icon: "📈",
    },
    {
      label: "Gastos Este Mes",
      value: "$2,180.50",
      change: "-5%",
      trend: "down",
      icon: "💸",
    },
    {
      label: "Deuda Total",
      value: "$18,500.00",
      change: "-8%",
      trend: "down",
      icon: "📊",
    },
    {
      label: "Ahorros",
      value: "$12,750.00",
      change: "+3%",
      trend: "up",
      icon: "🏦",
    },
  ]);

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", margin: 0, marginBottom: "8px", color: "#1a1a2e" }}>
          👋 Bienvenido a FinanceAI Pro
        </h1>
        <p style={{ margin: 0, color: "#95a5a6", fontSize: "16px" }}>
          Aquí está un resumen de tu situación financiera
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <p style={{ margin: 0, color: "#95a5a6", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                  {stat.label}
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: "bold", color: "#1a1a2e" }}>
                  {stat.value}
                </p>
              </div>
              <span style={{ fontSize: "32px" }}>{stat.icon}</span>
            </div>
            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: "12px",
                color: stat.trend === "up" ? "#27ae60" : "#e74c3c",
              }}
            >
              {stat.trend === "up" ? "↑" : "↓"} {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px", color: "#1a1a2e" }}>
          Acciones Rápidas
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            { label: "Agregar Transacción", icon: "💳", href: "/dashboard/transacciones" },
            { label: "Escanear Recibo", icon: "📸", href: "/dashboard/scanner" },
            { label: "Ver Deudas", icon: "📈", href: "/dashboard/deudas" },
            { label: "Hablar con IA", icon: "🤖", href: "/dashboard/asistente-ia" },
          ].map((action, idx) => (
            <a
              key={idx}
              href={action.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.3s",
                textDecoration: "none",
                color: "#1a1a2e",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <span style={{ fontSize: "32px", marginBottom: "12px" }}>
                {action.icon}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px", color: "#1a1a2e", margin: 0 }}>
          Transacciones Recientes
        </h2>
        <div style={{ marginTop: "20px" }}>
          {[
            { desc: "Supermercado Carrefour", amount: "-$145.50", date: "Hoy" },
            { desc: "Transferencia Recibida", amount: "+$2,500.00", date: "Ayer" },
            { desc: "Netflix Suscripción", amount: "-$15.99", date: "Hace 2 días" },
          ].map((tx, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: idx < 2 ? "1px solid #ecf0f1" : "none",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#1a1a2e" }}>
                  {tx.desc}
                </p>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#95a5a6" }}>
                  {tx.date}
                </p>
              </div>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: tx.amount.startsWith("+") ? "#27ae60" : "#e74c3c" }}>
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
