import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchOrders } from "@/redux/order/thunks/orderThunks";
import { toggleMockMode, USE_MOCK } from "@/config/env";
import { Switch } from "antd";
import "../sidebar/Sidebar"

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const onToggle = () => {
    const newValue = !USE_MOCK;
    toggleMockMode(newValue);
    dispatch(fetchOrders());
  };

  return (
    <header className="topbar">
      <div className="topbar-title">My Dashboard</div>

      <div className="topbar-actions">
        <span className="toggle-label">{USE_MOCK ? "Mock" : "API"} Mode</span>

        <Switch
          checked={USE_MOCK}
          onChange={onToggle}
          className="toggle-switch"
        />
      </div>
    </header>
  );
}
