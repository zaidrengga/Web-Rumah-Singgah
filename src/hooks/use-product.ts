"use client";

import { Product } from "@prisma/client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProducts() {
    const { data, error, isLoading, mutate } = useSWR<Product[]>("/api/products", fetcher);

    const addProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error("Failed to create product");
        await mutate(); // refresh list
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error("Failed to update product");
        await mutate();
    };

    const deleteProduct = async (id: string) => {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete product");
        await mutate();
    };

    return {
        products: data || [],
        isLoading,
        isError: error,
        addProduct,
        updateProduct,
        deleteProduct,
    };
}
