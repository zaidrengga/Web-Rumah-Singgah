"use client";

import { useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // load user dari localStorage (misalnya setelah refresh)
    useEffect(() => {
        const storedUser = async () => {
            try {
                const user = await fetch("/api/auth/protected");
                const data = await user.json();
                setUser(data.user);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        storedUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return { user, loading, login, logout };
}
