import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string };
}

// GET: detail order
export async function GET(_: Request, { params }: Params) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: params.id },
            include: {
                user: true,
                items: { include: { product: true } },
            },
        });

        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        return NextResponse.json(order);
    } catch (error) {
        console.error("GET /orders/:id error:", error);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }
}

// PUT: update status order
export async function PUT(req: Request, { params }: Params) {
    try {
        const { status } = await req.json();

        const order = await prisma.order.update({
            where: { id: params.id },
            data: { status },
            include: { items: { include: { product: true } } },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("PUT /orders/:id error:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}

// DELETE: hapus order
export async function DELETE(_: Request, { params }: Params) {
    try {
        await prisma.order.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Order deleted" });
    } catch (error) {
        console.error("DELETE /orders/:id error:", error);
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}
