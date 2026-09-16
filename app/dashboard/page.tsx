"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [user] = useState({ id: "1", email: "test@example.com", name: "Test User" });

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/auth/login";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ backgroundColor: "#e8f5e9", padding: "20px", borderRadius: "8px" }}>
          <h3>💰 Total Balance</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>$0.00</p>
        </div>

        <div style={{ backgroundColor: "#fff3e0", padding: "20px", borderRadius: "8px" }}>
          <h3>📊 Total Debts</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>$0.00</p>
        </div>

        <div style={{ backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "8px" }}>
          <h3>🎯 Goals</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>0</p>
        </div>

        <div style={{ backgroundColor: "#f3e5f5", padding: "20px", borderRadius: "8px" }}>
          <h3>💳 Cards</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>0</p>
        </div>
      </div>
    </div>
  );
}
