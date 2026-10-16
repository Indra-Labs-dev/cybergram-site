import type { Metadata } from "next";
import { SITE } from "@/lib/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}

// Les images de partage viennent des fichiers opengraph-image.tsx (une par page, héritée sinon).
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
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
