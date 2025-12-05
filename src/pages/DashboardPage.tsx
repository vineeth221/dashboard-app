import { useEffect, useMemo } from "react";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/order/thunks/orderThunks";
import type { RootState } from "@/redux/store";
import type { Order } from "@/redux/order/types/orderTypes";

import SalesLineChart from "@/components/charts/SalesLineChart";
import OrdersPieChart from "@/components/charts/OrdersPieChart";
import RevenueCandleChart from "@/components/charts/RevenueCandleChart";

import { Row, Col } from "antd";

export default function DashboardPage() {
  const dispatch = useDispatch();

  const { data: orders, loading } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum: number, o: Order) => sum + (o.amount || 0),
      0
    );
    return { totalOrders, totalRevenue };
  }, [orders]);

  return (
    <DashboardLayout>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={20}>
          <SalesLineChart />
        </Col>

        <Col xs={24} lg={4}>
          <div className="chart-card">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>

            <div className="space-y-5">
              <div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
                <div className="text-2xl font-bold">
                  {loading ? "…" : stats.totalOrders}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Revenue</div>
                <div className="text-2xl font-bold">
                  {loading ? "…" : `₹${stats.totalRevenue.toLocaleString()}`}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} lg={12}>
          <RevenueCandleChart />
        </Col>
        <Col xs={24} lg={12}>
          <OrdersPieChart />
        </Col>
      </Row>
    </DashboardLayout>
  );
}
