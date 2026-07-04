import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/about/", priority: 0.9 },
    { path: "/services/", priority: 0.9 },
    { path: "/gallery/", priority: 0.8 },
    { path: "/contact/", priority: 0.9 },
    { path: "/privacy-policy/", priority: 0.2 },
    { path: "/terms-and-conditions/", priority: 0.2 },
    { path: "/copyright-policy/", priority: 0.2 },
    { path: "/cookies-policy/", priority: 0.2 },
  ];
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.priority,
  }));
}
