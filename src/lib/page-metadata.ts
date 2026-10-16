import type { Metadata } from "next";
import { SITE } from "@/lib/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}

const socialImage = {
  url: "/images/og-image.png",
  width: 1200,
  height: 630,
  alt: "CyberGram — Apprendre. Échanger. Explorer.",
};

export function createPageMetadata({ title, description, path, absoluteTitle = false }: PageMetadataOptions): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} · ${SITE.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE.name,
      title: socialTitle,
      description,
      url: `${SITE.url}${path}`,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
