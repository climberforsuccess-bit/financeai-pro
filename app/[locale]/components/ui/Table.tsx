"use client";

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f7fa", borderBottom: "2px solid #ecf0f1" }}>
            {headers.map((header, idx) => (
              <th
                key={idx}
                style={{
                  padding: "16px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#1a1a2e",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                borderBottom: "1px solid #ecf0f1",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9f9f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  style={{
                    padding: "16px",
                    color: "#1a1a2e",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
