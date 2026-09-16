"use client";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>💰 FinanceAI Pro V2.0</h1>
      <p style={{ fontSize: "18px", marginBottom: "40px", textAlign: "center", maxWidth: "600px" }}>
        La plataforma premium de finanzas personales con IA contextual para LATAM
      </p>
      
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <a href="/auth/login" style={{
          padding: "12px 32px",
          background: "white",
          color: "#667eea",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "600",
          transition: "transform 0.3s"
        }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          Iniciar Sesión
        </a>
        <a href="/dashboard" style={{
          padding: "12px 32px",
          background: "rgba(255,255,255,0.2)",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "600",
          border: "2px solid white",
          transition: "transform 0.3s"
        }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          Dashboard
        </a>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        maxWidth: "800px",
        marginTop: "40px"
      }}>
        <div style={{ background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3>🤖 IA Contextual</h3>
          <p>Recomendaciones inteligentes basadas en tu perfil</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3>📸 Scanner OCR</h3>
          <p>Escanea recibos y extrae datos automáticamente</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3>💳 Gestión de Deudas</h3>
          <p>Planificación inteligente de pagos</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h3>🌍 LATAM Local</h3>
          <p>Inflación, tasas y realidad regional</p>
        </div>
      </div>
    </div>
  );
}
