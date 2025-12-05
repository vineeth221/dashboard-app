import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function SalesLineChart() {
  const orders = useSelector((state: RootState) => state.order.data);

  const chartData = useMemo(() => {
    const totals: Record<string, number> = {};

    for (const o of orders) {
      const d = new Date(o.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      totals[key] = (totals[key] || 0) + (o.amount || 0);
    }

    return Object.keys(totals)
      .map((key) => ({
        month: key,
        revenue: totals[key],
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [orders]);

  return (
    <div className="chart-card">
      <h3 className="text-xl font-semibold mb-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text">
        Revenue (By Month)
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        Month-over-month revenue trend showing growth patterns and seasonal performance.
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1890ff"
            strokeWidth={2}
          />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v: number) => `₹${v}`} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
