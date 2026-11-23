import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/events.md`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
  ];

  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/events/${event.id}`,
    lastModified: new Date(event.lastCheckedAt),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticPages, ...eventPages];
}
