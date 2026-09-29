"use client";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
}: InputProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "bold", color: "#1a1a2e" }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "6px",
          border: error ? "2px solid #e74c3c" : "1px solid #ecf0f1",
          fontSize: "14px",
          boxSizing: "border-box",
          backgroundColor: disabled ? "#ecf0f1" : "#fff",
          color: "#1a1a2e",
          transition: "border 0.2s",
        }}
        onFocus={(e) => {
          if (!error && !disabled) {
            e.currentTarget.style.borderColor = "#3498db";
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#e74c3c" : "#ecf0f1";
        }}
      />
      {error && (
        <p style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
