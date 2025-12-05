import { useEffect } from "react";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import OrdersTable from "@/components/tables/OrdersTable";
import { useDispatch } from "react-redux";
import { fetchOrders } from "@/redux/order/thunks/orderThunks";

export default function OrdersPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-neutral-800 p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <OrdersTable />
      </div>
    </DashboardLayout>
  );
}
