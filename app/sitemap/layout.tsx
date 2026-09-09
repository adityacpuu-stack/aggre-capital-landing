import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Sitemap",
  description:
    "Peta lengkap halaman website AGGRE CAPITAL — temukan semua halaman layanan, informasi, dan konten kami.",
  path: "/sitemap",
});

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
