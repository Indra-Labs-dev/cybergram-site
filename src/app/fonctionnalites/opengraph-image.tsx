import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Apprendre, Communauté, Événements, Intelligence.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Fonctionnalités", title: "Apprendre, Communauté, Événements, Intelligence.", accent: "teal", cmd: "ls modules/" });
}
