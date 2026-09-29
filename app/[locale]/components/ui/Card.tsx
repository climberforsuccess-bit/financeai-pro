import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card({ title, children, footer }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {title && (
        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", color: "#1a1a2e" }}>
          {title}
        </h3>
      )}
      <div>{children}</div>
      {footer && (
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid #ecf0f1",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
