import { MetadataRoute } from "next";
import { query } from "@/lib/database";
import { SITE_URL } from "@/lib/site-metadata";

// Regenerasi sitemap tiap jam supaya artikel berita baru ikut terindeks.
export const revalidate = 3600;

const baseUrl = SITE_URL;

async function getNewsUrls(): Promise<MetadataRoute.Sitemap> {
  // Let database errors propagate so ISR retains the previous successful sitemap.
  const result = await query(
    "SELECT slug, updated_at, published_at, created_at FROM news WHERE status = 'published' AND slug IS NOT NULL AND TRIM(slug) <> '' ORDER BY created_at DESC",
  );
  const seen = new Set<string>();
  return result.rows
    .filter((row) => {
      if (seen.has(row.slug)) return false;
      seen.add(row.slug);
      return true;
    })
    .map((row) => {
      const changed = row.updated_at || row.published_at || row.created_at;
      const date = changed ? new Date(changed) : null;
      return {
        url: baseUrl + "/news/" + encodeURIComponent(row.slug),
        ...(date && !Number.isNaN(date.getTime())
          ? { lastModified: date }
          : {}),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/pengajuan`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/team`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/penghargaan`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/testimoni`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/partners`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/kontak`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/sitemap`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const newsPages = await getNewsUrls();
  return [...staticPages, ...newsPages];
}
