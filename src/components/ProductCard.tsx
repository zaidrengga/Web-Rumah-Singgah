"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatIDR, imageLoader } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useCart } from "@/hooks/CartContext"; // pastikan path sesuai

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { cart, add, remove } = useCart();

  // cek apakah produk sudah ada di cart
  const qty = cart[product.id] ?? 0;

  return (
    <Card className={`${className} overflow-hidden hover:shadow-lg transition-shadow py-0 gap-2`}>
      <CardHeader className="p-0 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          loader={imageLoader}
          width={100}
          height={100}
          className="aspect-square bg-muted object-cover w-full"
        />
      </CardHeader>

      <CardContent>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <Badge variant={product.category === "coffee" ? "default" : "secondary"}>
          {product.category}
        </Badge>
        <p className="text-2xl font-bold text-primary">
          {formatIDR(product.price)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {qty === 0 ? (
          <Button onClick={() => add(product.id)} className="w-full" size="sm">
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full space-x-2">
            <Button size="sm" variant="outline" onClick={() => remove(product.id)}>
              -
            </Button>
            <span className="font-semibold">{qty}</span>
            <Button size="sm" variant="outline" onClick={() => add(product.id)}>
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
