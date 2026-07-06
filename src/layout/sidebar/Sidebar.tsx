import { Menu } from "antd";
import {
  AppstoreOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <div className="brand-mark">◇</div>
        {!collapsed && <h2>Zugar</h2>}
        <button className="collapse-btn" onClick={onToggle}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {!collapsed && <p className="nav-label">MANAGEMENT</p>}
      <Menu mode="inline" selectedKeys={[location.pathname.slice(1) || "dashboard"]} className="sidebar-menu">
        <Menu.Item key="dashboard" icon={<AppstoreOutlined />}><Link to="/dashboard">Dashboard</Link></Menu.Item>
        <Menu.Item key="vendors" icon={<UserOutlined />}>Vendors</Menu.Item>
        <Menu.Item key="orders" icon={<FileTextOutlined />}><Link to="/orders">Invoices</Link></Menu.Item>
        <Menu.Item key="approvals" icon={<CheckSquareOutlined />}>Approvals</Menu.Item>
        <Menu.Item key="payments" icon={<CreditCardOutlined />}>Payments</Menu.Item>
      </Menu>

      {!collapsed && <p className="nav-label">ANALYTICS</p>}
      <Menu mode="inline" className="sidebar-menu">
        <Menu.Item key="reports" icon={<BarChartOutlined />}>Reports</Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>
      </Menu>

      {!collapsed && (
        <div className="profile-box">
          <div className="profile-avatar">CV</div>
          <div>
            <b>Vineeth</b>
            <p>Super Admin</p>
          </div>
        </div>
      )}
    </aside>
  );
}