import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { fetchOrders } from "@/redux/order/thunks/orderThunks";
import { toggleMockMode, USE_MOCK } from "@/config/env";
import { Switch } from "antd";
import { useState, useEffect } from "react";
import "../sidebar/Sidebar";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [mockMode, setMockMode] = useState(USE_MOCK);

  useEffect(() => {
    setMockMode(USE_MOCK);
  }, []);

  const onToggle = () => {
    const newValue = !mockMode;
    toggleMockMode(newValue); 
    setMockMode(newValue);
    dispatch(fetchOrders());
  };

  return (
    <header className="topbar">
      <div className="topbar-title">My Dashboard</div>

      <div className="topbar-actions">
        <span className="toggle-label">
          {mockMode ? "Mock" : "API"} Mode
        </span>

        <Switch
          checked={mockMode}
          onChange={onToggle}
          className="toggle-switch"
        />
      </div>
    </header>
  );
}
