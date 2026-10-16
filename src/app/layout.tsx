import type { Metadata, Viewport } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_FR", siteName: SITE.name, url: SITE.url, images: [{ url: "/images/logo.png", width: 1536, height: 1024, alt: "CyberGram" }] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#06090B", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sora.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#contenu">Aller au contenu</a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
