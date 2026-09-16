"use client";

import Button from "@/app/components/ui/Button";
import Table from "@/app/components/ui/Table";

export default function SuscripcionesPage() {
  const subscriptions = [
    ["Netflix", "-$15.99", "Activa", "13/02/2024"],
    ["Spotify Premium", "-$10.99", "Activa", "15/02/2024"],
    ["Adobe Creative Cloud", "-$54.99", "Activa", "01/02/2024"],
    ["Microsoft 365", "-$10.00", "Cancelada", "N/A"],
  ];

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
          📅 Suscripciones
        </h1>
        <Button>+ Nueva Suscripción</Button>
      </div>

      <div
        style={{
          backgroundColor: "#e8f5e9",
          border: "1px solid #4caf50",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <p style={{ margin: 0, color: "#2e7d32", fontSize: "14px" }}>
          💡 <strong>Gasto Mensual en Suscripciones:</strong> $91.97
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
          headers={["Servicio", "Monto", "Estado", "Próxima Renovación"]}
          rows={subscriptions}
        />
      </div>
    </div>
  );
}
