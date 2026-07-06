import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", total: 6.5, paid: 5.2, pending: 2.1 },
  { month: "Feb", total: 8.4, paid: 6.8, pending: 4.5 },
  { month: "Mar", total: 7.9, paid: 4.2, pending: 2.8 },
  { month: "Apr", total: 8.5, paid: 5.1, pending: 3.7 },
  { month: "May", total: 6.4, paid: 4.9, pending: 3.8 },
  { month: "Jun", total: 10.4, paid: 6.9, pending: 4.1 },
  { month: "Jul", total: 6.6, paid: 3.9, pending: 2.9 },
  { month: "Aug", total: 8.5, paid: 4.0, pending: 3.1 },
  { month: "Sep", total: 8.6, paid: 7.1, pending: 4.2 },
  { month: "Oct", total: 10.4, paid: 7.0, pending: 5.8 },
  { month: "Nov", total: 10.8, paid: 6.5, pending: 4.7 },
  { month: "Dec", total: 8.5, paid: 6.8, pending: 4.1 },
];

export default function SalesLineChart() {
  return (
    <ResponsiveContainer width="100%" height={255}>
      <BarChart data={data}>
        <CartesianGrid stroke="#1f2a44" vertical={false} />
        <XAxis dataKey="month" stroke="#8b95aa" tickLine={false} axisLine={false} />
        <YAxis stroke="#8b95aa" tickLine={false} axisLine={false} tickFormatter={(v) => `${v} Cr`} />
        <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #273452", color: "#fff" }} />
        <Legend />
        <Bar dataKey="total" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
        <Bar dataKey="paid" fill="#10b981" radius={[8, 8, 0, 0]} />
        <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}