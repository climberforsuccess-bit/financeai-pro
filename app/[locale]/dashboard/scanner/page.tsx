"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Table from "@/app/components/ui/Table";

interface ScannedReceipt {
  id: string;
  date: string;
  store: string;
  total: string;
  items: number;
  status: "processed" | "pending" | "error";
}

export default function ScannerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedReceipts, setScannedReceipts] = useState<ScannedReceipt[]>([
    {
      id: "1",
      date: "2024-01-15",
      store: "Supermercado Carrefour",
      total: "$145.50",
      items: 12,
      status: "processed",
    },
    {
      id: "2",
      date: "2024-01-14",
      store: "Farmacia Farmacity",
      total: "$32.99",
      items: 3,
      status: "processed",
    },
    {
      id: "3",
      date: "2024-01-13",
      store: "Restaurant La Trattoria",
      total: "$85.00",
      items: 1,
      status: "pending",
    },
  ]);

  const receiptHeaders = ["Fecha", "Comercio", "Monto", "Items", "Estado"];
  const receiptRows = scannedReceipts.map((receipt) => [
    receipt.date,
    receipt.store,
    receipt.total,
    receipt.items.toString(),
    receipt.status === "processed"
      ? "✓ Procesado"
      : receipt.status === "pending"
      ? "⏳ Procesando"
      : "✗ Error",
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simular carga
      console.log("Archivos cargados:", files);
    }
  };

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
          📸 Scanner de Recibos
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>
          + Escanear Recibo
        </Button>
      </div>

      <div
        style={{
          backgroundColor: "#e8f4f8",
          border: "1px solid #3498db",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <p style={{ margin: 0, color: "#1a5a7a", fontSize: "14px" }}>
          💡 <strong>Tip:</strong> Carga fotos de tus recibos y nuestra IA extraerá automáticamente los datos (comercio, monto, items) para clasificar tus transacciones.
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
        <h2 style={{ fontSize: "20px", marginBottom: "16px", color: "#1a1a2e" }}>
          Recibos Escaneados
        </h2>
        <Table headers={receiptHeaders} rows={receiptRows} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Escanear Nuevo Recibo"
      >
        <div
          style={{
            border: "2px dashed #3498db",
            borderRadius: "8px",
            padding: "40px 20px",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            marginBottom: "16px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = "#e8f4f8";
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f8f9fa";
          }}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            style={{
              display: "none",
            }}
            id="file-input"
          />
          <label htmlFor="file-input" style={{ cursor: "pointer" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold", color: "#3498db" }}>
              📷 Arrastra fotos aquí o haz clic
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#95a5a6" }}>
              Soporta JPG, PNG (máx 5MB por archivo)
            </p>
          </label>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#555", marginBottom: "8px" }}>
            O selecciona manualmente:
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ecf0f1",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Button variant="primary" fullWidth>
            Escanear
          </Button>
          <Button variant="secondary" fullWidth onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
