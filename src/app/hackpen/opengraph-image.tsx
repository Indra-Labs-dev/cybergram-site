import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Un environnement pour la pratique encadrée.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "HackPen", title: "Un environnement pour la pratique encadrée.", accent: "amber", cmd: "hackpen projet créer" });
}
