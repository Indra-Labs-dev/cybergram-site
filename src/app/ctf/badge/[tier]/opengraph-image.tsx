import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { TIERS, type Tier } from "@/lib/ctf";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(TIERS).map((tier) => ({ tier }));
export const alt = "Badge du mini-CTF CyberGram";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ tier: string }> }) {
  const { tier } = await params;
  const t = TIERS[tier as Tier];
  return ogImage({ eyebrow: `Mini-CTF · badge ${t.label}`, title: `Mini-CTF terminé. Niveau ${t.label}.`, accent: "teal", cmd: "submit CG{...} ✓" });
}
