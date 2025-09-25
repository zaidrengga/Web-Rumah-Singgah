"use client";

import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/use-product";
import { useOrders } from "@/hooks/use-order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatIDR, imageLoader } from "@/lib/utils";
import { useCart } from "@/hooks/CartContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export default function OrderPage() {
    const { products } = useProducts();
    const { orders, addOrder } = useOrders();
    const { cart, add, remove, clear, totalItems } = useCart();
    const [customerName, setCustomerName] = useState("");
    const [activeTab, setActiveTab] = useState("new-order");
    const [isProcessing, setIsProcessing] = useState(false);

    const cartItems = useMemo(() => {
        return Object.entries(cart)
            .map(([id, qty]) => {
                const product = products.find((p) => p.id === id);
                if (!product) return null;
                return { productId: id, qty, price: product.price };
            })
            .filter(Boolean) as { productId: string; qty: number; price: number }[];
    }, [cart, products]);

    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    const processOrder = async () => {
        if (!customerName.trim() || total === 0) return;
        setIsProcessing(true);
        try {
            await addOrder({ customerName, items: cartItems });
            clear();
            setCustomerName("");
            setActiveTab("history");
        } catch (err) {
            console.error(err);
            alert("Failed to create order");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="p-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="new-order">New Order</TabsTrigger>
                    <TabsTrigger value="history">Order History ({orders.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="new-order" className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="h-fit md:sticky top-20">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Input placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

                            <div className="space-y-2">
                                {cartItems.length === 0 ? (
                                    <p className="text-sm text-gray-500">Cart is empty</p>
                                ) : (
                                    cartItems.map((item) => {
                                        const product = products.find((p) => p.id === item.productId);
                                        if (!product) return null;
                                        return (
                                            <div
                                                key={item.productId}
                                                className="flex justify-between text-sm"
                                            >
                                                <span>
                                                    {product.name} × {item.qty}
                                                </span>
                                                <span>{formatIDR(item.price * item.qty)}</span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            <div>Total: {formatIDR(total)}</div>
                            <Button onClick={processOrder} className="w-full" disabled={total === 0 || !customerName.trim() || isProcessing}>
                                {isProcessing ? "Processing..." : "Order"}
                            </Button>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 col-span-2">
                        {products.map((p) => (
                            <Card key={p.id} className="py-2">
                                <CardContent className="px-2">
                                    <Image loader={imageLoader} src={p.image} alt={p.name} width={200} height={200} className="aspect-square object-cover rounded-md" />
                                    <div>
                                        <p>{p.name}</p>
                                        <p>{formatIDR(p.price)}</p>
                                        <div className="flex gap-2 items-center">
                                            <Button variant="outline" onClick={() => remove(p.id)}><Minus /></Button>
                                            <p>{cart[p.id] || 0}</p>
                                            <Button variant="outline" onClick={() => add(p.id)}><Plus /></Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <CardTitle>{order.customerName} | {order.items.length} items | {formatIDR(order.total)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {order.items.map((i) => {
                                    const product = products.find((p) => p.id === i.productId);
                                    if (!product) return null;
                                    return (
                                        <div key={i.productId}>
                                            {product.name} × {i.qty} = {formatIDR(products.find((p) => p.id === i.productId)!.price * i.qty)}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
