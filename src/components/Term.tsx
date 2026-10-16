import Link from "next/link";
import { GLOSSARY } from "@/lib/content";

export const termSlug = (t: string) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Terme souligné avec sa définition au survol ou au focus ; le lien mène au glossaire.
export function Term({ t, children }: { t: string; children?: React.ReactNode }) {
  const entry = GLOSSARY.find((g) => g.term === t);
  if (!entry) return <>{children ?? t}</>;
  const id = `def-${termSlug(t)}`;
  return (
    <span className="term-tip">
      <Link href={`/glossaire#${termSlug(t)}`} className="term-tip__word" aria-describedby={id}>{children ?? t}</Link>
      <span role="tooltip" id={id} className="term-tip__def"><strong>{entry.term}</strong>{entry.def}</span>
    </span>
  );
}
