"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";

export default function TransaccionesPage() {
  const [transactions] = useState([
    ["2024-01-15", "Supermercado Carrefour", "Alimentación", "-$145.50", "Completada"],
    ["2024-01-14", "Transferencia Recibida", "Ingreso", "+$2,500.00", "Completada"],
    ["2024-01-13", "Netflix", "Entretenimiento", "-$15.99", "Completada"],
    ["2024-01-12", "Gasolina YPF", "Transporte", "-$65.00", "Completada"],
    ["2024-01-11", "Farmacia Farmacity", "Salud", "-$32.50", "Completada"],
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
          💳 Transacciones
        </h1>
        <Button>+ Nueva Transacción</Button>
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
          headers={["Fecha", "Descripción", "Categoría", "Monto", "Estado"]}
          rows={transactions}
        />
      </div>
    </div>
  );
}
