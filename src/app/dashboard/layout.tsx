"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.split("/")[2] || "analytics";

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 pt-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your coffee shop operations</p>
      </div>

      <Tabs value={activeTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics" asChild>
            <Link href="/dashboard/analytics">Analytics</Link>
          </TabsTrigger>
          <TabsTrigger value="orders" asChild>
            <Link href="/dashboard/orders">Orders</Link>
          </TabsTrigger>
          <TabsTrigger value="products" asChild>
            <Link href="/dashboard/products">Products</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6">{children}</div>
    </div>
  );
}
