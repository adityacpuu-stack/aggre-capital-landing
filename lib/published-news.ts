import "server-only";
import { cache } from "react";
import { query } from "@/lib/database";
import type {
  NewsArticle,
  NewsIndexData,
  NewsListArticle,
} from "@/lib/news-types";

function isoDate(value: unknown): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

// React cache shares the result between metadata and the page within a request.
// Database failures propagate; only a successful empty query means not found.
export const getPublishedArticle = cache(
  async (slug: string): Promise<NewsArticle | null> => {
    const result = await query(
      `
    SELECT id, title, slug, content, excerpt, featured_image, author, status,
           category, tags, meta_description, read_time, featured,
           created_at, updated_at, published_at
    FROM news WHERE slug = $1 AND status = 'published' LIMIT 1
  `,
      [slug],
    );
    const row = result.rows[0];
    if (!row) return null;
    return {
      ...row,
      category: row.category || "News",
      author: row.author || "AGGRE CAPITAL",
      tags: Array.isArray(row.tags) ? row.tags.join(",") : row.tags || "",
      created_at: isoDate(row.created_at),
      updated_at: isoDate(row.updated_at),
      published_at: isoDate(row.published_at),
    };
  },
);

const listColumns =
  "id, title, slug, excerpt, category, read_time, featured_image, author, created_at, published_at";

export async function getPublishedNewsIndex(): Promise<NewsIndexData> {
  const [list, featured, total] = await Promise.all([
    query(
      `SELECT ${listColumns} FROM news WHERE status = 'published' ORDER BY created_at DESC LIMIT 9`,
    ),
    query(
      `SELECT ${listColumns} FROM news WHERE status = 'published' AND featured = true ORDER BY created_at DESC LIMIT 3`,
    ),
    query("SELECT COUNT(*) AS count FROM news WHERE status = 'published'"),
  ]);
  const format = (row: Record<string, any>): NewsListArticle => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    category: row.category || "News",
    read_time: row.read_time || 0,
    featured_image: row.featured_image || "",
    author: row.author || "AGGRE CAPITAL",
    date: isoDate(row.published_at || row.created_at)
      ? new Date(row.published_at || row.created_at).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Jakarta",
          },
        )
      : "",
  });
  return {
    articles: list.rows.map(format),
    featured: featured.rows.map(format),
    total: Number(total.rows[0]?.count || 0),
  };
}
