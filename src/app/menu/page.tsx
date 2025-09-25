"use client";

import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/use-product";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { Input } from "@/components/ui/input";

export default function MenuPage() {
    const { products } = useProducts();
    const [filter, setFilter] = useState<"all" | string>("all");
    const [search, setSearch] = useState("");

    // gabungin search + filter
    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchCategory = filter === "all" || p.category === filter;
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [filter, search, products]);

    return (
        <div className="p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                {/* search bar */}
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xs"
                />

                {/* category filter */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={filter === "all" ? "default" : "outline"}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </Button>
                    {Object.values(Category).map((key) => (
                        <Button
                            key={key}
                            variant={filter === key ? "default" : "outline"}
                            onClick={() => setFilter(key)}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Button>
                    ))}
                </div>
            </div>

            {/* products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.length > 0 ? (
                    filtered.map((p) => <ProductCard key={p.id} product={p} />)
                ) : (
                    <p className="col-span-full text-center text-muted-foreground">
                        No products found.
                    </p>
                )}
            </div>
        </div>
    );
}
