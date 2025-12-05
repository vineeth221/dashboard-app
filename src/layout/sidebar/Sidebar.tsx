import { Menu } from "antd";
import {
  AppstoreOutlined,
  TableOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      <div className="sidebar-header">
        {!collapsed && <span className="sidebar-title">Dashboard</span>}

        <button className="collapse-btn" onClick={onToggle}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname.slice(1) || "dashboard"]}
        className="sidebar-menu"
      >
        <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item key="orders" icon={<TableOutlined />}>
          <Link to="/orders">Orders</Link>
        </Menu.Item>
      </Menu>
    </aside>
  );
}
