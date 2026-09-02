import type { MetadataRoute } from "next";
import { objects } from "@/content/objects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/thailand"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...objects.map((object) => ({
      url: absoluteUrl(`/thailand/${object.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/thailand/policy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/thailand/consent"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/thailand/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
