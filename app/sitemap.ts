import type { MetadataRoute } from "next";
import essays from "../lib/essays";
import prints from "../lib/prints";
import sessions from "../lib/sessions";

const BASE = "https://juancnava.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const essayRoutes = essays.map((e) => ({
    url: `${BASE}/writing/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const printRoutes = prints.map((p) => ({
    url: `${BASE}/prints/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const sessionRoutes = sessions.map((s) => ({
    url: `${BASE}/book/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/prints`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/policies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...sessionRoutes,
    ...printRoutes,
    ...essayRoutes,
  ];
}
