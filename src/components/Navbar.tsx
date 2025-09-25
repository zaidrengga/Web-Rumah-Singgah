"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { AlignLeft, X } from "lucide-react";
import gsap from "gsap";
import { useCart } from "@/hooks/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();


  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Animasi GSAP
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      // buka menu
      gsap.to(menuRef.current, {
        x: 0,
        duration: 1,
        ease: "power3.in",
        display: "block",
      });


      // animasi fade + slide nav item
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            delay: 0.2,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      }
    } else {
      // tutup menu
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-background/80 border-b">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Rumah <span className="text-amber-600">Singgah</span>
        </Link>
        <div className="flex items-center gap-6">
          {/* desktop menu */}
          <ul className="hidden sm:flex items-center gap-2">
            <li>
              <Button
                asChild
                variant={pathname === "/" ? "default" : "ghost"}
              >
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant={pathname === "/menu" ? "default" : "ghost"}
              >
                <Link href="/menu">Menu</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant={pathname === "/order" ? "default" : "ghost"}
              >
                <Link href="/order">Order ({totalItems})</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant={pathname === "/dashboard" ? "default" : "ghost"}
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </li>
          </ul>

          <DarkModeToggle />

          {/* mobile menu */}
          <div className="sm:hidden flex items-center">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="outline"
              size={"icon"}
            >
              {!isOpen ? (
                <AlignLeft className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </Button>

            <div
              ref={menuRef}
              className="fixed top-[61px] right-0 w-full h-[calc(100dvh-61px)] bg-background z-50 translate-x-full hidden"
            >
              <ul
                ref={listRef}
                className="flex flex-col items-center gap-4 mt-10"
              >
                <li>
                  <Button
                    asChild
                    variant={pathname === "/" ? "default" : "ghost"}
  
                  >
                    <Link href="/">Home</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    asChild
                    variant={pathname === "/menu" ? "default" : "ghost"}
  
                  >
                    <Link href="/menu">Menu</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    asChild
                    variant={pathname === "/order" ? "default" : "ghost"}
  
                  >
                    <Link href="/order">Order</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    asChild
                    variant={pathname === "/dashboard" ? "default" : "ghost"}
  
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}
