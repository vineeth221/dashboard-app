import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import OrdersPage from "@/pages/OrdersPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
