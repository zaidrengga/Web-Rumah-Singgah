"use client";

import { CartItem, OrderType } from "@/lib/types";
import { OrderStatus } from "@prisma/client";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useOrders() {
    const { data, error, isLoading, mutate } = useSWR<OrderType[]>("/api/orders", fetcher);

    const addOrder = async (order: { customerName: string; userId?: string; items: CartItem[] }) => {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (!res.ok) throw new Error("Failed to create order");
        await mutate();
    };

    const updateOrderStatus = async (id: string, status: OrderStatus) => {
        const res = await fetch(`/api/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error("Failed to update order");
        await mutate();
    };

    const deleteOrder = async (id: string) => {
        const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete order");
        await mutate();
    };

    return {
        orders: data || [],
        isLoading,
        isError: error,
        addOrder,
        updateOrderStatus,
        deleteOrder,
    };
}
