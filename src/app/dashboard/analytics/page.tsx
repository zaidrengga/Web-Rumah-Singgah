"use client";
import DashboardCard from "@/components/DashboardCard";
import { salesSummary } from "@/data/sales";
import { formatIDR, type OrdersType, CartItem } from "@/data/products";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<OrdersType[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  const totalOrders = orders.length;
  const totalOrderRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const productSales = orders.reduce((acc, order) => {
    order.items.forEach((item: CartItem) => {
      acc[item.product.name] = (acc[item.product.name] || 0) + item.qty;
    });
    return acc;
  }, {} as Record<string, number>);

  const bestSeller = Object.keys(productSales).length > 0
    ? Object.entries(productSales).sort(([, a], [, b]) => (b as number) - (a as number))[0][0]
    : "No sales yet";

  const dailyRevenueData = orders.reduce((acc, order) => {
    const date = new Date(order.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const dailyRevenue = Object.entries(dailyRevenueData).map(([day, revenue]) => ({ day, revenue }));
  const chartData = dailyRevenue.length > 0 ? dailyRevenue : salesSummary.dailyRevenue;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard title="Total Sales" value={totalOrders} subtitle="orders" />
        <DashboardCard title="Revenue" value={formatIDR(totalOrderRevenue)} />
        <DashboardCard title="Best Seller" value={bestSeller} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#6b7280" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} stroke="#6b7280" />
                <Tooltip formatter={(v: number) => formatIDR(Number(v))} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
