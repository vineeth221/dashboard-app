import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueCandleChart() {
  const orders = useSelector((state: RootState) => state.order.data);

  const data = useMemo(() => {
    const totals: Record<string, number> = {};

    for (const o of orders) {
      const d = new Date(o.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      totals[key] = (totals[key] || 0) + (o.amount || 0);
    }

    return Object.keys(totals)
      .map((m) => {
        const base = totals[m];
        return {
          month: m,
          open: base * 0.92,
          close: base,
          high: base * 1.12,
          low: base * 0.88,
        };
      })
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [orders]);

  return (
    <div className="chart-card">
      <h3 className="text-xl font-semibold mb-1 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Revenue Candle Chart
      </h3>

      <p className="text-gray-500 text-sm mb-4">
        Monthly revenue performance showing high-low visualization.
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="close" fill="#1890ff" />
          <Line dataKey="high" stroke="#52c41a" strokeWidth={2} />
          <Line dataKey="low" stroke="#ff4d4f" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
