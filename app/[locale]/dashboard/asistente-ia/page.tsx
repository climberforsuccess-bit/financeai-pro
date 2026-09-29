"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AsistenteIAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hola 👋 Soy tu asistente financiero IA. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simular respuesta de IA
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Entendido. Basado en tu información, te recomiendo: 1) Enfocarte en pagar la deuda con mayor tasa de interés (20% Mastercard). 2) Crear un fondo de emergencia con 3 meses de gastos. ¿Te gustaría un plan específico?",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h1 style={{ fontSize: "32px", margin: "0 0 24px 0", color: "#1a1a2e" }}>
        🤖 Asistente Financiero IA
      </h1>

      {/* Chat Container */}
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "60%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor:
                    msg.role === "user" ? "#3498db" : "#ecf0f1",
                  color: msg.role === "user" ? "white" : "#1a1a2e",
                  fontSize: "14px",
                  wordWrap: "break-word",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #ecf0f1",
            display: "flex",
            gap: "12px",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe tu pregunta..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "6px",
              border: "1px solid #ecf0f1",
              fontSize: "14px",
            }}
          />
          <Button onClick={handleSend}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
