import type { Metadata, Viewport } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { AmbientGlow } from "@/components/AmbientGlow";
import { SITE } from "@/lib/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600"], variable: "--f-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "CyberGram — Apprendre. Échanger. Explorer.", template: "%s · CyberGram" },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "CyberGram" }],
  creator: "CyberGram",
  publisher: "CyberGram",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "CyberGram — Apprendre. Échanger. Explorer." }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/images/og-image.png"],
  },
};

export const viewport: Viewport = { themeColor: "#06090B", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sora.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#contenu">Aller au contenu</a>
        <TopBar />
        <AmbientGlow />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
