"use client";
import { useMemo, useState, useEffect } from "react";
import { products, ProductType, formatIDR, type OrdersType, type CartItem } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function OrderPage() {
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<Record<number, number>>({});
    const [customerName, setCustomerName] = useState("");
    const [orderId, setOrderId] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orders, setOrders] = useState<OrdersType[]>([]);
    const [activeTab, setActiveTab] = useState("new-order");

    // Load cart and orders from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem("menuCart");
        const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setOrders(savedOrders);
    }, []);

    const filtered = useMemo(() => {
        if (!search) return products;
        return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const cartItems: CartItem[] = useMemo(() => {
        return Object.entries(cart)
            .filter(([, qty]) => qty > 0)
            .map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id))!, qty }));
    }, [cart]);

    const total = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    function add(p: ProductType) {
        setOrderComplete(false);
        const newCart = { ...cart, [p.id]: (cart[p.id] ?? 0) + 1 };
        setCart(newCart);
        localStorage.setItem("menuCart", JSON.stringify(newCart));
    }

    function remove(p: ProductType) {
        setOrderComplete(false);
        const newCart = { ...cart, [p.id]: Math.max(0, (cart[p.id] ?? 0) - 1) };
        setCart(newCart);
        localStorage.setItem("menuCart", JSON.stringify(newCart));
    }

    function generateOrderId(): string {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substr(2, 3).toUpperCase();
        return `ORD-${timestamp}-${random}`;
    }

    async function processOrder() {
        if (!customerName.trim() || total === 0) return;

        setIsProcessing(true);

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        setOrderComplete(true);
        setIsProcessing(false);

        // Store order in localStorage
        const order = {
            id: newOrderId,
            customerName: customerName.trim(),
            items: cartItems,
            total,
            timestamp: new Date().toISOString(),
            status: "completed"
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const updatedOrders = [...existingOrders, order];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        setOrders(updatedOrders);

        // Clear cart and customer name after a delay
        setTimeout(() => {
            setCart({});
            setCustomerName("");
            setOrderComplete(false);
            setOrderId("");
            // Also clear the shared cart in localStorage
            localStorage.removeItem("menuCart");
        }, 5000);
    }

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Cashier POS</h1>
                <p className="text-muted-foreground">Process orders and manage transactions</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="new-order">New Order</TabsTrigger>
                    <TabsTrigger value="history">Order History ({orders.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="new-order" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Menu</h2>
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search menu..."
                                    className="w-56"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filtered.map((p) => (
                                    <Card key={p.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-3">
                                            <div className="aspect-video rounded-md bg-muted mb-2" />
                                            <div className="text-sm font-medium">{p.name}</div>
                                            <div className="text-xs text-muted-foreground">{formatIDR(p.price)}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => remove(p)}
                                                >
                                                    -
                                                </Button>
                                                <span className="min-w-6 text-center font-medium">
                                                    {cart[p.id] ?? 0}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => add(p)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Customer Name *
                                        </label>
                                        <Input
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Enter customer name"
                                        />
                                    </div>

                                    <div className="border-t pt-4">
                                        <h3 className="text-sm font-medium mb-2">Items</h3>
                                        {cartItems.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">No items selected</p>
                                        ) : (
                                            <ul className="space-y-2">
                                                {cartItems.map((i) => (
                                                    <li key={i.product.id} className="flex items-center justify-between text-sm">
                                                        <span>
                                                            {i.product.name} × {i.qty}
                                                        </span>
                                                        <span className="font-medium">
                                                            {formatIDR(i.product.price * i.qty)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex items-center justify-between font-semibold text-lg">
                                            <span>Total</span>
                                            <span>{formatIDR(total)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={processOrder}
                                        disabled={total === 0 || !customerName.trim() || isProcessing}
                                        className="w-full"
                                    >
                                        {isProcessing ? "Processing..." : "Process Order"}
                                    </Button>

                                    {orderComplete && (
                                        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                                            <CardContent className="p-4 text-center">
                                                <div className="text-2xl mb-2">✅</div>
                                                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                                                    Order Complete!
                                                </h3>
                                                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                                                    Order ID: <span className="font-mono font-bold">{orderId}</span>
                                                </p>
                                                <p className="text-xs text-green-600 dark:text-green-400">
                                                    Customer: {customerName}
                                                </p>
                                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                                    Total: {formatIDR(total)}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No orders found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {orders.slice().reverse().map((order) => (
                                <Card key={order.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">{order.customerName}</CardTitle>
                                            <Badge variant="secondary">Completed</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="text-sm text-muted-foreground">
                                            <p>Order ID: <span className="font-mono">{order.id}</span></p>
                                            <p>Date: {new Date(order.timestamp).toLocaleString('id-ID')}</p>
                                            <p>Total: <span className="font-semibold">{formatIDR(order.total)}</span></p>
                                        </div>
                                        <div className="border-t pt-3">
                                            <h4 className="text-sm font-medium mb-2">Items:</h4>
                                            <ul className="space-y-1">
                                                {order.items.map((item: CartItem, index: number) => (
                                                    <li key={index} className="text-xs text-muted-foreground flex justify-between">
                                                        <span>{item.product.name} × {item.qty}</span>
                                                        <span>{formatIDR(item.product.price * item.qty)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
