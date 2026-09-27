import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticleContent from "@/components/news/NewsArticleContent";
import { getPublishedArticle } from "@/lib/published-news";
import { articleMetadata, articleJsonLd } from "@/lib/article-metadata";
import { jsonLdStringify } from "@/lib/site-metadata";
import { newsUnderReview } from "@/lib/news-editorial";
import PublicPage, { ContactBand } from "@/components/PublicPage";
import Link from "next/link";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (newsUnderReview.has(slug)) return {
    title: { absolute: "Artikel dalam Peninjauan | AGGRE CAPITAL" },
    description: "Artikel ini sedang ditinjau. Temukan informasi layanan terbaru melalui tim AGGRE CAPITAL.",
    robots: { index: false, follow: true },
    alternates: { canonical: null },
    openGraph: null,
    twitter: null,
  };
  const article = await getPublishedArticle(slug);
  if (!article)
    return {
      title: { absolute: "Artikel Tidak Ditemukan | AGGRE CAPITAL" },
      robots: { index: false, follow: true },
      alternates: { canonical: null },
      openGraph: null,
      twitter: null,
    };
  return articleMetadata(article);
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  if (newsUnderReview.has(slug)) return (
    <PublicPage eyebrow="Berita & insight" title="Artikel sedang ditinjau."
      description="Kami sedang memeriksa kembali informasi dalam artikel ini agar tetap akurat dan relevan.">
      <p>Untuk informasi layanan terbaru, hubungi tim kami atau kunjungi halaman berikut.</p>
      <div className="flex flex-wrap gap-6 my-8">
        <Link href="/news" className="ac-text-link">Berita & liputan</Link>
        <Link href="/penghargaan" className="ac-text-link">Penghargaan & pencapaian</Link>
        <Link href="/partners" className="ac-text-link">Jaringan mitra</Link>
      </div>
      <ContactBand />
    </PublicPage>
  );
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdStringify(articleJsonLd(article)),
        }}
      />
      <NewsArticleContent article={article} />
    </>
  );
}
