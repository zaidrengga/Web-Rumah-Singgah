import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyToken(token: string) {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // halaman & route yang boleh diakses tanpa login
    const publicPaths = ["/login", "/api/auth/login"];

    // ambil token dari cookie
    const token = (await cookies()).get("token")?.value;

    // cek kalau user sudah login & mau ke /login → redirect ke home
    if (pathname.startsWith("/login") && token) {
        const valid = await verifyToken(token);
        if (valid) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // kalau request mengarah ke public path, izinkan langsung
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // kalau tidak ada token → redirect ke login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // verifikasi token
    const valid = await verifyToken(token);
    if (!valid) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // token valid → lanjutkan request
    return NextResponse.next();
}

// Tentukan halaman yang akan diproteksi middleware
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
