import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { CartProvider } from "@/hooks/CartContext";

export const metadata: Metadata = {
  title: "Rumah Singgah Caffe",
  description: "Experience the perfect blend of tradition and innovation in every cup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body >
        <CartProvider>
          <PageTransition />
          <Navbar />
          <main className="pt-20 min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
