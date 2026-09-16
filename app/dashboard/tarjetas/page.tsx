"use client";

import Button from "@/app/components/ui/Button";

export default function TarjetasPage() {
  const cards = [
    {
      name: "Visa Crédito",
      last4: "4242",
      balance: "$5,200.00",
      limit: "$15,000.00",
      type: "credit",
    },
    {
      name: "Mastercard Débito",
      last4: "5555",
      balance: "$8,450.00",
      limit: "N/A",
      type: "debit",
    },
    {
      name: "American Express",
      last4: "3782",
      balance: "$3,500.00",
      limit: "$20,000.00",
      type: "credit",
    },
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
          💰 Mis Tarjetas
        </h1>
        <Button>+ Agregar Tarjeta</Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: card.type === "credit" 
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", zIndex: 2 }}>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>
                {card.type === "credit" ? "TARJETA DE CRÉDITO" : "TARJETA DE DÉBITO"}
              </p>
              <h3 style={{ margin: "12px 0 0 0", fontSize: "18px", fontWeight: "bold" }}>
                {card.name}
              </h3>
              <p style={{ margin: "16px 0 0 0", fontSize: "24px", letterSpacing: "2px" }}>
                •••• {card.last4}
              </p>
              <div style={{ marginTop: "24px" }}>
                <p style={{ margin: 0, fontSize: "11px", opacity: 0.8 }}>SALDO</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "20px", fontWeight: "bold" }}>
                  {card.balance}
                </p>
              </div>
              {card.type === "credit" && (
                <div style={{ marginTop: "12px" }}>
                  <p style={{ margin: 0, fontSize: "11px", opacity: 0.8 }}>LÍMITE</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                    {card.limit}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
