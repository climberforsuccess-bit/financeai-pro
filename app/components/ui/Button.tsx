"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    width: fullWidth ? "100%" : "auto",
  };

  const variants = {
    primary: {
      backgroundColor: "#3498db",
      color: "white",
      ...baseStyles,
    },
    secondary: {
      backgroundColor: "#ecf0f1",
      color: "#1a1a2e",
      ...baseStyles,
    },
    danger: {
      backgroundColor: "#e74c3c",
      color: "white",
      ...baseStyles,
    },
  };

  const style = variants[variant];

  return (
    <button
      style={style}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#2980b9";
        } else if (variant === "secondary") {
          e.currentTarget.style.backgroundColor = "#bdc3c7";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#3498db";
        } else if (variant === "secondary") {
          e.currentTarget.style.backgroundColor = "#ecf0f1";
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
