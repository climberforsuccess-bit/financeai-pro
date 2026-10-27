"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

export default function ConfiguracionPage() {
  const [settings, setSettings] = useState({
    email: "usuario@example.com",
    currency: "ARS",
    language: "es",
    notifications: true,
    twoFactor: false,
  });

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div>
      <h1 style={{ fontSize: "32px", margin: "0 0 24px 0", color: "#1a1a2e" }}>
        ⚙️ Configuración
      </h1>

      <div style={{ maxWidth: "600px" }}>
        {/* Perfil */}
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#1a1a2e" }}>
            📧 Perfil
          </h2>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ecf0f1",
                fontSize: "14px",
              }}
            />
          </div>

          <Button fullWidth>Guardar Cambios</Button>
        </div>

        {/* Preferencias */}
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#1a1a2e" }}>
            🎨 Preferencias
          </h2>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
              Moneda
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ecf0f1",
                fontSize: "14px",
              }}
            >
              <option>ARS - Peso Argentino</option>
              <option>USD - Dólar Americano</option>
              <option>MXN - Peso Mexicano</option>
              <option>CLP - Peso Chileno</option>
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
              Idioma
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleChange("language", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ecf0f1",
                fontSize: "14px",
              }}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>

        {/* Seguridad */}
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#1a1a2e" }}>
            🔒 Seguridad
          </h2>

          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "14px", fontWeight: "600" }}>
              Autenticación de Dos Factores
            </label>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={(e) => handleChange("twoFactor", e.target.checked)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <Button fullWidth variant="secondary">
            Cambiar Contraseña
          </Button>
        </div>
      </div>
    </div>
  );
}
