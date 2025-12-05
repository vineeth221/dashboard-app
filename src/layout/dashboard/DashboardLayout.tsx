import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "../sidebar/sidebar.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="layout-content">
        <Header />

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
