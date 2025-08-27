"use client";
import { ProductType, formatIDR } from "@/data/products";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductCardProps {
  product: ProductType;
  onAdd: (product: ProductType) => void;
  className?: string;
}

export default function ProductCard({ product, onAdd, className }: ProductCardProps) {
  return (
    <Card className={`${className} overflow-hidden hover:shadow-lg transition-shadow py-0`}>
      <CardHeader className="p-0">
        <Image src={product.image} alt={product.name} width={500} height={500} className="aspect-square bg-muted object-cover" />
      </CardHeader>
      <CardContent >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <Badge variant={product.category === 'coffee' ? 'default' : 'secondary'}>
            {product.category}
          </Badge>
        </div>
        <p className="text-2xl font-bold text-primary">
          {formatIDR(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAdd(product)}
          className="w-full"
          size="sm"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}


