"use client";

import Button from "@/app/components/ui/Button";

export default function MetasPage() {
  const goals = [
    { name: "Fondo de Emergencia", current: 3500, target: 10000, icon: "🏦" },
    { name: "Vacaciones 2024", current: 1200, target: 5000, icon: "✈️" },
    { name: "Nuevo Laptop", current: 800, target: 2000, icon: "💻" },
    { name: "Pago de Deuda", current: 5000, target: 15000, icon: "📉" },
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
          🎯 Mis Metas
        </h1>
        <Button>+ Nueva Meta</Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {goals.map((goal, idx) => {
          const percentage = (goal.current / goal.target) * 100;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "28px" }}>{goal.icon}</span>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#1a1a2e" }}>
                  {goal.name}
                </h3>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#ecf0f1",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      backgroundColor: "#3498db",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>

              <p style={{ margin: 0, fontSize: "12px", color: "#95a5a6" }}>
                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()} ({percentage.toFixed(0)}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
