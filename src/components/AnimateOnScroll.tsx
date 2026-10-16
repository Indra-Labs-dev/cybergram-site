import type { ReactNode, CSSProperties, JSX, HTMLAttributes } from "react";

type Variant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "style" | "className" | "children"> {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  /** Délai en ms entre chaque enfant direct. */
  stagger?: number;
}

// Rendu serveur : seul l'attribut data-reveal est posé ; le CSS masque, RevealObserver
// ajoute .is-in. Sans JS (<noscript> du layout) ou sous prefers-reduced-motion, tout reste visible.
export function AnimateOnScroll({ children, variant = "fade-up", delay = 0, duration = 600, as: Tag = "div", className, style, stagger, ...rest }: Props) {
  const Component = Tag as React.ElementType;
  const vars = { "--rv-delay": `${delay}ms`, "--rv-dur": `${duration}ms`, ...(stagger ? { "--rv-stagger": `${stagger}ms` } : {}), ...style } as CSSProperties;
  return (
    <Component {...rest} data-reveal={variant} data-reveal-stagger={stagger ? "" : undefined} className={className} style={vars}>
      {children}
    </Component>
  );
}
