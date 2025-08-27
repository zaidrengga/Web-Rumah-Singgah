"use client";
import { useMemo, useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { products, type ProductType, categorys } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MenuPage() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [filter, setFilter] = useState<ProductType["category"]>("all");

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("menuCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  function handleAdd(product: ProductType) {
    const newCart = { ...cart, [product.id]: (cart[product.id] ?? 0) + 1 };
    setCart(newCart);
    // Save to localStorage so order page can access it
    localStorage.setItem("menuCart", JSON.stringify(newCart));
  }

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground">
            Discover our carefully crafted selection of coffee and beverages
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {["all"].concat(categorys).map((key) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key as ProductType["category"])}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </div>
          <Badge variant="secondary" className="text-sm">
            {totalItems} items in cart
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}


