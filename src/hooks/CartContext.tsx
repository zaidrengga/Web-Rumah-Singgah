"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CartContextType {
    cart: Record<string, number>;
    totalItems: number;
    add: (productId: string) => void;
    remove: (productId: string) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Record<string, number>>({});

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("menuCart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch {
                setCart({});
            }
        }
    }, []);

    // Save cart to localStorage (only if not empty)
    useEffect(() => {
        if (Object.keys(cart).length === 0) {
            localStorage.removeItem("menuCart");
        } else {
            localStorage.setItem("menuCart", JSON.stringify(cart));
        }
    }, [cart]);

    const add = (productId: string) => {
        setCart((prev) => ({
            ...prev,
            [productId]: (prev[productId] ?? 0) + 1,
        }));
    };

    const remove = (productId: string) => {
        setCart((prev) => {
            const newCart = { ...prev };
            if (!newCart[productId]) return prev; // kalau memang belum ada, abaikan
            if (newCart[productId] <= 1) {
                delete newCart[productId]; // qty habis → hapus key
            } else {
                newCart[productId] -= 1;
            }
            return newCart;
        });
    };

    const clear = () => setCart({});

    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    return (
        <CartContext.Provider value={{ cart, totalItems, add, remove, clear }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
