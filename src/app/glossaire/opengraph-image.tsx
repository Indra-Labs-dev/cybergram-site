import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Le vocabulaire de la cybersécurité, sans jargon.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Glossaire", title: "Le vocabulaire de la cybersécurité, sans jargon.", accent: "teal", cmd: "man cve" });
}
