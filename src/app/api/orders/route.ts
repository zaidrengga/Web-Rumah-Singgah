import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: ambil semua order
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: {
                    include: { product: true },
                },
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("GET /orders error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

// POST: buat order baru
export async function POST(req: Request) {
    try {
        const { customerName, userId, items } = await req.json();

        if (!customerName || !items || items.length === 0) {
            return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
        }

        const total = items.reduce(
            (acc: number, item: { price: number; qty: number }) => acc + item.price * item.qty,
            0
        );

        const order = await prisma.order.create({
            data: {
                customerName,
                userId,
                total,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        qty: item.qty,
                    })),
                },
            },
            include: {
                items: { include: { product: true } },
            },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("POST /orders error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
