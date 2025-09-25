"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category, Product } from "@prisma/client";
import { useProducts } from "@/hooks/use-product";

export default function AddProductPage() {
    const router = useRouter();
    const { addProduct } = useProducts();

    const [newProduct, setNewProduct] = useState<Product>({
        id: "",
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "coffee",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const handleAdd = async () => {
        if (!newProduct.name || newProduct.price <= 0) return;
        // Simpan ke database atau global state (sementara kita redirect saja)
        await addProduct(newProduct);

        router.push("/products"); // balik ke daftar produk
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Input
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Product name"
                />
                <Input
                    value={newProduct.description}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    placeholder="Description"
                />
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(Category).map((category) => (
                                <SelectItem
                                    key={category}
                                    value={category}
                                    onClick={() =>
                                        setNewProduct({ ...newProduct, category: category as Product["category"] })
                                    }
                                >
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Price"
                />
                <Input
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="Image URL"
                />
                <Button className="w-fit" onClick={handleAdd}>
                    Save Product
                </Button>
            </CardContent>
        </Card>
    );
}
