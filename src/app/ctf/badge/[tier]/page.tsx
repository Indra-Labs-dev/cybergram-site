import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/ui";
import { createPageMetadata } from "@/lib/page-metadata";
import { TIERS, type Tier } from "@/lib/ctf";

// Page cible du bouton « Partager mon badge » : une image de partage par niveau.
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(TIERS).map((tier) => ({ tier }));

type Props = { params: Promise<{ tier: string }> };

export async function generateMetadata({ params }: Props) {
  const { tier } = await params;
  const t = TIERS[tier as Tier];
  return {
    ...createPageMetadata({ title: `Badge ${t.label} · Mini-CTF`, description: `Un joueur ${t.line} Cinq défis tirés pour vous, à résoudre dans le navigateur.`, path: `/ctf/badge/${tier}` }),
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: Props) {
  const { tier } = await params;
  const t = TIERS[tier as Tier];
  if (!t) notFound();
  return (
    <>
      <PageHead eyebrow={`Mini-CTF · badge ${t.label}`} title={`Un joueur ${t.line}`} lead="Cinq défis tirés au hasard, des drapeaux uniques pour chaque partie. Saurez-vous faire mieux ?" />
      <section className="container section" style={{ paddingTop: 48 }}>
        <div className="btn-row"><Link href="/ctf" className="btn btn--primary">Relever le défi →</Link></div>
      </section>
    </>
  );
}
