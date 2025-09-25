import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: ambil semua produk
export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        console.error("GET /products error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST: tambah produk baru
export async function POST(req: Request) {
    try {
        const { name, price, image, description, category } = await req.json();

        if (!name || !price || !category) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: { name, price, image, description, category },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("POST /products error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
