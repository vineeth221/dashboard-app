import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Paid", value: 850, color: "#10b981" },
  { name: "Pending", value: 263, color: "#f59e0b" },
  { name: "Overdue", value: 84, color: "#ef477a" },
  { name: "Draft", value: 51, color: "#8b5cf6" },
];

export default function OrdersPieChart() {
  return (
    <div className="donut-wrap">
      <ResponsiveContainer width="55%" height={260}>
        <PieChart>
          <Pie data={data} innerRadius={68} outerRadius={96} dataKey="value" paddingAngle={1}>
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #273452", color: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-center">
        <h2>1,248</h2>
        <p>Total</p>
      </div>

      <div className="legend-list">
        {data.map((d) => (
          <div key={d.name}>
            <span style={{ background: d.color }} />
            <b>{d.name}</b>
            <p>{Math.round((d.value / 1248) * 100)}% ({d.value})</p>
          </div>
        ))}
      </div>
    </div>
  );
}