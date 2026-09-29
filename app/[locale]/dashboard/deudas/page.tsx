"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";

export default function DeudasPage() {
  const [debts] = useState([
    ["Tarjeta Crédito Visa", "$5,200.00", "18%", "$156.00", "Activa"],
    ["Préstamo Personal", "$8,000.00", "12%", "$240.00", "Activa"],
    ["Tarjeta Mastercard", "$3,500.00", "20%", "$175.00", "Activa"],
    ["Crédito Automotriz", "$12,300.00", "8%", "$328.00", "Activa"],
  ]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "32px", margin: 0, color: "#1a1a2e" }}>
          📈 Gesión de Deudas
        </h1>
        <Button>+ Nueva Deuda</Button>
      </div>

      <div
        style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <p style={{ margin: 0, color: "#856404", fontSize: "14px" }}>
          ⚠️ <strong>Deuda Total:</strong> $29,000.00 | <strong>Interés Mensual:</strong> $899.00
        </p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Table
          headers={["Acreedor", "Deuda", "Tasa", "Pago Mín.", "Estado"]}
          rows={debts}
        />
      </div>
    </div>
  );
}
