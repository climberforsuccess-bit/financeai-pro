"use client";

import Button from "@/app/components/ui/Button";

export default function ReportesPage() {
  const reports = [
    {
      title: "Reporte Mensual",
      description: "Resumen completo de ingresos, gastos y deudas",
      icon: "📊",
      actionLabel: "Generar",
    },
    {
      title: "Análisis de Gastos",
      description: "Desglose por categoría y tendencias",
      icon: "📈",
      actionLabel: "Ver",
    },
    {
      title: "Plan de Pagos de Deuda",
      description: "Estrategia optimizada para reducir deudas",
      icon: "📉",
      actionLabel: "Consultar",
    },
    {
      title: "Pronóstico Financiero",
      description: "Proyección basada en IA de tu situación en 6 meses",
      icon: "🔮",
      actionLabel: "Analizar",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "32px", margin: 0, marginBottom: "8px", color: "#1a1a2e" }}>
          📊 Reportes
        </h1>
        <p style={{ margin: 0, color: "#95a5a6", fontSize: "16px" }}>
          Análisis detallados de tu situación financiera
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {reports.map((report, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ fontSize: "32px" }}>{report.icon}</span>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#1a1a2e" }}>
                {report.title}
              </h3>
            </div>
            <p style={{ margin: 0, color: "#95a5a6", fontSize: "14px", marginBottom: "20px", flex: 1 }}>
              {report.description}
            </p>
            <Button fullWidth>{report.actionLabel}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
