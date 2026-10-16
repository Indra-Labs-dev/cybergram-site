import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Mentions légales";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Mentions légales", title: "Mentions légales · CyberGram", cmd: "cat mentions-legales.md" });
}
