"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", width: "calc(100% - 250px)", display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ padding: "24px", backgroundColor: "#f8f9fa", flexGrow: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
