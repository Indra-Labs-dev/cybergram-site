import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Trois drapeaux à capturer avant l'ouverture.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Mini-CTF", title: "Trois drapeaux à capturer avant l'ouverture.", accent: "teal", cmd: "submit CG{...}" });
}
