import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "La cybersécurité, rendue accessible.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "À propos", title: "La cybersécurité, rendue accessible.", accent: "teal", cmd: "whoami" });
}
