import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Confidentialité";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Confidentialité", title: "Confidentialité · CyberGram", cmd: "cat confidentialite.md" });
}
