import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#ff4d4f", "#722ed1"];

export default function OrdersPieChart() {
  const orders = useSelector((state: RootState) => state.order.data);

  const statusCount: Record<string, number> = {};
  for (const o of orders) {
    statusCount[o.status] = (statusCount[o.status] || 0) + 1;
  }

  const chartData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  return (
    <div className="chart-card">
      <h3 className="text-xl font-semibold mb-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
        Orders by Status
      </h3>

      <p className="text-gray-500 text-sm mb-4">
        Distribution of all orders based on their current fulfillment stage.
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={110} label>
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
