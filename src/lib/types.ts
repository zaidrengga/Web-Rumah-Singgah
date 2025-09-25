import { Order, OrderItem } from "@prisma/client";

export interface OrderType extends Order {
    items: OrderItem[];
}


export interface CartItem {
    productId: string;
    qty: number;
    price: number;
}