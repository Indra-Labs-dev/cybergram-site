import { ViewTransition, type ReactNode } from "react";

// Fondu court entre les pages via la View Transitions API (navigateurs compatibles uniquement).
export function PageTransition({ children }: { children: ReactNode }) {
  return <ViewTransition default="page-fade">{children}</ViewTransition>;
}
