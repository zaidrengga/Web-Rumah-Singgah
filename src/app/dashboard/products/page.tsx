"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@prisma/client";
import { useProducts } from "@/hooks/use-product";
import { formatIDR, imageLoader } from "@/lib/utils";

export default function ProductsPage() {
    const [filter, setFilter] = useState<Product["category"] | "all">("all");
    const [contain, setContain] = useState<"grid" | "list">("grid");

    const { products, deleteProduct } = useProducts();

    const categories = useMemo(() => {
        const cats = Array.from(new Set(products.map((p) => p.category)));
        return cats;
    }, [products]);

    const filtered = useMemo(() => {
        if (filter === "all") return products;
        return products.filter((p) => p.category === filter);
    }, [filter, products]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(id);
        } catch (err) {
            console.error(err);
            alert("Failed to delete product");
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Products</h2>
                <Button size="sm" asChild>
                    <Link href="/dashboard/products/add">
                        <Plus className="w-4 h-4 mr-2" /> New Product
                    </Link>
                </Button>
            </div>
            <hr className="mb-4" />

            {/* Filter */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-2">
                    {["all", ...categories].map((key) => (
                        <Button
                            key={key}
                            variant={filter === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter(key as Product["category"] | "all")}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-2 ml-auto">
                    <Button
                        variant={contain === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setContain("grid")}
                    >
                        Grid
                    </Button>
                    <Button
                        variant={contain === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setContain("list")}
                    >
                        List
                    </Button>
                </div>
            </div>

            {products.length === 0 ? (
                <p className="text-muted-foreground">No products available</p>
            ) : contain === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((product) => (
                        <Card key={product.id} className="p-0 overflow-hidden gap-0">
                            <CardHeader className="p-0">
                                <Image
                                    loader={imageLoader}
                                    src={product.image}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    className="aspect-square object-cover rounded-lg w-full"
                                />
                                <CardTitle className="text-lg font-semibold px-2 flex items-center justify-between">
                                    {product.name}
                                    <Badge variant={product.category === "coffee" ? "default" : "secondary"}>
                                        {product.category}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-2">
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                                <p className="text-lg font-semibold">{formatIDR(product.price)}</p>
                            </CardContent>
                            <CardFooter className="p-2 h-full flex items-end justify-between">
                                <Link href={`/dashboard/products/${product.id}`}>
                                    <Button size="sm">
                                        <Pencil className="w-4 h-4 mr-2" /> Edit
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">
                                    <Image
                                        loader={imageLoader}
                                        src={product.image}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        className="aspect-square object-cover rounded-lg"
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{formatIDR(product.price)}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="space-x-2">
                                    <Link href={`/dashboard/products/${product.id}`}>
                                        <Button size="sm">
                                            <Pencil className="w-4 h-4 mr-2" /> Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </section>
    );
}
