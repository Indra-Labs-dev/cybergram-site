import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/ecosysteme", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fonctionnalites", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hackpen", priority: 0.8, changeFrequency: "monthly" },
  { path: "/a-propos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/lancement", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ctf", priority: 0.7, changeFrequency: "daily" },
  { path: "/glossaire", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: SITE.url + r.path,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
