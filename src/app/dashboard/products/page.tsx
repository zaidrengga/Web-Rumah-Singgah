"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { categorys, formatIDR, products as initialProducts, type ProductType } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductType[]>(initialProducts);
    const [filter, setFilter] = useState<ProductType["category"]>("all");
    const [contain, setContain] = useState<"grid" | "list">("grid");

    const filtered = useMemo(() => {
        if (filter === "all") return products;
        return products.filter((p) => p.category === filter);
    }, [filter, products]);

    const handleDelete = (idx: number) => {
        setProducts(products.filter((_, i) => i !== idx));
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Products</h2>
                <Button size="sm" asChild>
                    <Link href="/dashboard/products/new">
                        <Plus className="w-4 h-4 mr-2" /> New Product
                    </Link>
                </Button>
            </div>
            <hr className="mb-4" />
            {/* filter */}
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-muted-foreground rounded-md px-2 py-1"
                />
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

                <div className="flex gap-2">
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
                    {filtered.map((product, idx) => (
                        <Card key={idx} className="p-0 overflow-hidden gap-0">
                            <CardHeader className="p-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={500}
                                    height={500}
                                    className="aspect-square object-cover rounded-lg"
                                />
                                <CardTitle className="text-lg font-semibold px-2 flex items-center justify-between">
                                    {product.name}
                                    <Badge variant={product.category === 'coffee' ? 'default' : 'secondary'}>
                                        {product.category}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-2">
                                <p className="text-sm text-muted-foreground">
                                    {product.description}
                                </p>
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
                                    onClick={() => handleDelete(idx)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : contain === "list" && (
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
                        {filtered.map((product, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="font-medium">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={500}
                                        height={500}
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
                                        onClick={() => handleDelete(idx)}
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
