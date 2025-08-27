"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      "main",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
    return () => {
      gsap.killTweensOf("main");
    };
  }, [pathname]);

  return null;
}


