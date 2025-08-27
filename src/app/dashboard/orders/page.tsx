"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatIDR, type OrdersType } from "@/data/products";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrdersType[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">No orders yet</p>
        ) : (
          <ul className="divide-y divide-border">
            {orders.map((order, idx) => (
              <li key={idx} className="py-3">
                <p className="font-medium">Order #{idx + 1}</p>
                <p className="text-sm text-muted-foreground">
                  Total: {formatIDR(order.total)} — {order.items.length} items
                </p>
                <ul className="ml-4 mt-1 space-y-1 text-sm">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.product.name} × {item.qty}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
