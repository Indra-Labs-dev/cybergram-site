import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { SITE, launchDateLabel } from "@/lib/site";

export const dynamic = "force-static";
export const alt = SITE.appOpen ? "CyberGram est ouvert." : `Ouverture le ${launchDateLabel}.`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Lancement", title: alt, accent: "teal", cmd: "notify --on-launch" });
}
