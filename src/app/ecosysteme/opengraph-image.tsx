import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Un parcours continu, de la lecture à la pratique.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Écosystème", title: "Un parcours continu, de la lecture à la pratique.", accent: "teal", cmd: "cat ecosysteme.md" });
}
