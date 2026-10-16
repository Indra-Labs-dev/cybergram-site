"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Observe tous les [data-reveal] de la page. threshold 0 : un bloc plus haut que
// l'écran se révèle dès qu'il y entre, quelle que soit sa hauteur.
export function RevealObserver() {
  const path = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-reveal-stagger")) {
            Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--rv-i", String(i)));
          }
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return null;
}
