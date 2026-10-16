import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Cinq drapeaux tirés pour vous avant l'ouverture.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Mini-CTF", title: "Cinq drapeaux tirés pour vous avant l'ouverture.", accent: "teal", cmd: "submit CG{...}" });
}
