"use client";
import DashboardCard from "@/components/DashboardCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from "@/hooks/use-order";
import { useProducts } from "@/hooks/use-product";
import { formatIDR } from "@/lib/utils";

export default function AnalyticsPage() {
  const { orders } = useOrders();
  const { products } = useProducts();

  const totalOrders = orders.length;
  const totalOrderRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // Hitung sales per product
  const productSales = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      acc[item.productId] = (acc[item.productId] || 0) + item.qty;
    });
    return acc;
  }, {} as Record<string, number>);

  // Cari best seller
  const bestSellerId =
    Object.entries(productSales).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
  const bestSellerName =
    products.find((p) => p.id === bestSellerId)?.name || "-";

  // Hitung daily revenue (tanggal unik)
  const dailyRevenueData = orders.reduce((acc, order) => {
    const date = new Date(order.timestamp).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(dailyRevenueData).map(([day, revenue]) => ({
    day,
    revenue,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard title="Total Sales" value={totalOrders} subtitle="orders" />
        <DashboardCard title="Revenue" value={formatIDR(totalOrderRevenue)} />
        <DashboardCard title="Best Seller" value={bestSellerName} />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#6b7280" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    stroke="#6b7280"
                  />
                  <Tooltip formatter={(v: number) => formatIDR(Number(v))} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
