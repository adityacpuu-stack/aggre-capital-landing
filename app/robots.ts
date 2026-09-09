import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/pengajuan",
        "/team",
        "/news",
        "/testimoni",
        "/partners",
        "/kontak",
        "/privacy",
        "/terms",
        "/cookies",
        "/sitemap",
      ],
      // Hanya blok /api/. /login, /dashboard, /aplikasi TIDAK diblok di sini
      // supaya Google bisa meng-crawl dan membaca meta noindex-nya (lalu drop dari index).
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
