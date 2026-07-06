import { useEffect, useMemo } from "react";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/order/thunks/orderThunks";
import type { RootState } from "@/redux/store";
import SalesLineChart from "@/components/charts/SalesLineChart";
import OrdersPieChart from "@/components/charts/OrdersPieChart";
import RevenueCandleChart from "@/components/charts/RevenueCandleChart";
import "../styles/dashboard.css";

import {
  FileTextOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  AlertOutlined,
} from "@ant-design/icons";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data: invoices } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = invoices.length || 1248;
    const totalAmount = invoices.reduce((s, i) => s + (i.amount || 0), 0) || 84200000;
    const paid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0) || 62100000;
    const pending = invoices.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0) || 22100000;
    const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0) || 4800000;

    return { total, totalAmount, paid, pending, overdue };
  }, [invoices]);

  const cards = [
    { label: "Total Invoices", value: stats.total.toLocaleString(), change: "12.5% vs last month", icon: <FileTextOutlined />, cls: "purple", up: true },
    { label: "Total Amount", value: "₹8.42 Cr", change: "18.3% vs last month", icon: <DollarOutlined />, cls: "blue", up: true },
    { label: "Paid Amount", value: "₹6.21 Cr", change: "20.7% vs last month", icon: <CheckCircleOutlined />, cls: "green", up: true },
    { label: "Pending Amount", value: "₹2.21 Cr", change: "5.2% vs last month", icon: <ClockCircleOutlined />, cls: "orange", up: false },
    { label: "Overdue Amount", value: "₹0.48 Cr", change: "3.1% vs last month", icon: <AlertOutlined />, cls: "purple", up: false },
  ];

  return (
    <DashboardLayout>
      <div className="premium-dashboard">
        <div className="dash-head">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Vineeth! Here's what's happening with your business.</p>
          </div>
          <button className="customize-btn">Customize</button>
        </div>

        <div className="kpi-grid">
  {cards.map((c) => (
    <div className={`kpi-card-exact ${c.cls}`} key={c.label}>
      <div className="kpi-top-row">
        <div className={`kpi-icon-exact ${c.cls}`}>{c.icon}</div>

        <div className="kpi-text">
          <p>{c.label}</p>
          <h2>{c.value}</h2>
          <span className={c.up ? "positive" : "negative"}>
            {c.up ? "↑" : "↓"} {c.change}
          </span>
        </div>
      </div>

      <svg className="kpi-line" viewBox="0 0 240 45" preserveAspectRatio="none">
        <path
          d="M0 28 L12 25 L24 31 L36 20 L48 32 L60 24 L72 27 L84 36 L96 33 L108 29 L120 39 L132 35 L144 18 L156 26 L168 31 L180 28 L192 34 L204 22 L216 25 L228 31 L240 29"
        />
      </svg>
    </div>
  ))}
</div>

        <div className="main-grid">
          <div className="glass-card chart-large">
            <div className="card-title-row">
              <h3>Invoice Amount Trend</h3>
              <div className="chart-actions">
                <button>Candle</button>
                <button>Daily</button>
              </div>
            </div>
            <RevenueCandleChart />
          </div>

          <div className="glass-card">
            <div className="card-title-row">
              <h3>Invoice Status Distribution</h3>
              <button className="view-btn">View Details</button>
            </div>
            <OrdersPieChart />
          </div>
        </div>

        <div className="bottom-grid">
          <div className="glass-card">
            <h3>Top Vendors</h3>
            <div className="vendor-list">
              {[
                ["Infosys Limited", "142", "₹1.92 Cr"],
                ["Tata Consultancy", "98", "₹1.45 Cr"],
                ["Wipro Limited", "76", "₹0.98 Cr"],
                ["HCL Technologies", "64", "₹0.76 Cr"],
                ["Tech Mahindra", "48", "₹0.53 Cr"],
              ].map((v, i) => (
                <div className="vendor-row" key={v[0]}>
                  <span className="avatar">{v[0][0]}</span>
                  <span>{v[0]}</span>
                  <b>{v[1]}</b>
                  <strong>{v[2]}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3>Monthly Overview</h3>
            <SalesLineChart />
          </div>

          <div className="glass-card">
            <div className="card-title-row">
              <h3>Recent Invoices</h3>
              <a>View All</a>
            </div>

            <div className="invoice-list">
              {[
                ["INV-2025-1248", "Infosys Limited", "₹12,45,000", "Paid"],
                ["INV-2025-1247", "Tata Consultancy", "₹8,75,000", "Pending"],
                ["INV-2025-1246", "Wipro Limited", "₹5,60,000", "Paid"],
                ["INV-2025-1245", "HCL Technologies", "₹3,20,000", "Overdue"],
                ["INV-2025-1244", "Tech Mahindra", "₹2,15,000", "Pending"],
              ].map((i) => (
                <div className="invoice-row" key={i[0]}>
                  <div>
                    <p>{i[0]}</p>
                    <span>{i[1]}</span>
                  </div>
                  <strong>{i[2]}</strong>
                  <em className={i[3].toLowerCase()}>{i[3]}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}