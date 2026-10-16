"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties, type JSX } from "react";

type Variant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
}

const VARIANT_STYLES: Record<Variant, { from: CSSProperties; to: CSSProperties }> = {
  "fade-up": {
    from: { opacity: 0, transform: "translateY(32px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "fade-left": {
    from: { opacity: 0, transform: "translateX(-32px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    from: { opacity: 0, transform: "translateX(32px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "scale-in": {
    from: { opacity: 0, transform: "scale(0.92)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
  "blur-in": {
    from: { opacity: 0, filter: "blur(8px)" },
    to: { opacity: 1, filter: "blur(0px)" },
  },
};

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
  className,
  style,
  stagger,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      return;
    }

    const { from, to } = VARIANT_STYLES[variant];

    // Apply initial styles
    Object.assign(el.style, from);
    el.style.transition = "none";

    // Stagger children if enabled
    if (stagger) {
      const children = el.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        Object.assign(child.style, from);
        child.style.transition = "none";
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          if (stagger) {
            const children = el.children;
            for (let i = 0; i < children.length; i++) {
              const child = children[i] as HTMLElement;
              const childDelay = delay + i * stagger;
              child.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms`;
              Object.assign(child.style, to);
            }
            // Also reveal the container
            el.style.opacity = "1";
          } else {
            el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
            Object.assign(el.style, to);
          }
          if (once) observer.disconnect();
        } else if (!once) {
          if (stagger) {
            const children = el.children;
            for (let i = 0; i < children.length; i++) {
              Object.assign((children[i] as HTMLElement).style, from);
            }
          } else {
            Object.assign(el.style, from);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, delay, duration, threshold, once, stagger]);

  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
}
