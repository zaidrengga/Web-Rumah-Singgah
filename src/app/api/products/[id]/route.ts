import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string };
}

// GET: ambil detail produk
export async function GET(req: Request, { params }: Params) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id },
        });

        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

        return NextResponse.json(product);
    } catch (error) {
        console.error("GET /products/:id error:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

// PUT: update produk
export async function PUT(req: Request, { params }: Params) {
    try {
        const data = await req.json();
        const product = await prisma.product.update({
            where: { id: params.id },
            data,
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("PUT /products/:id error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

// DELETE: hapus produk
export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // cek apakah produk masih dipakai di order
        const count = await prisma.orderItem.count({
            where: { productId: id },
        });

        if (count > 0) {
            return new NextResponse(
                JSON.stringify({ error: "Product is still used in some orders" }),
                { status: 400 }
            );
        }

        await prisma.product.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("DELETE /products/[id] error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
