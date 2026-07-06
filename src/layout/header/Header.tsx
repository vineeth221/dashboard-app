import {
  SearchOutlined,
  BellOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Header() {
  return (
    <header className="topbar">
      <div className="search-box">
        <SearchOutlined />
        <input placeholder="Search anything..." />
      </div>

      <div className="topbar-actions">
        <button className="date-btn">
          <CalendarOutlined /> May 27 - Jun 27, 2025
        </button>
        <button className="round-btn"><SettingOutlined /></button>
        <button className="round-btn"><BellOutlined /></button>
        <div className="user-photo">CV</div>
      </div>
    </header>
  );
}