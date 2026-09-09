import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticleContent from "@/components/news/NewsArticleContent";
import { getPublishedArticle } from "@/lib/published-news";
import { articleMetadata, articleJsonLd } from "@/lib/article-metadata";
import { jsonLdStringify } from "@/lib/site-metadata";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getPublishedArticle((await params).slug);
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
  const article = await getPublishedArticle((await params).slug);
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
