import type { Metadata } from "next";
import type { NewsArticle } from "@/lib/news-types";
import {
  SITE_NAME,
  SITE_URL,
  absoluteSiteUrl,
  articleImageUrl,
} from "@/lib/site-metadata";

export function articleMetadata(article: NewsArticle): Metadata {
  const title = `${article.title} | ${SITE_NAME}`;
  const description =
    article.meta_description?.trim() ||
    article.excerpt?.trim() ||
    `Baca artikel "${article.title}" di ${SITE_NAME}.`;
  const url = absoluteSiteUrl(`/news/${encodeURIComponent(article.slug)}`);
  const image = articleImageUrl(article.featured_image);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "id_ID",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: image, alt: article.title }],
      publishedTime: article.published_at || article.created_at || undefined,
      modifiedTime: article.updated_at || undefined,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: article.title }],
    },
  };
}

export function articleJsonLd(article: NewsArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description:
      article.meta_description?.trim() || article.excerpt || undefined,
    image: [articleImageUrl(article.featured_image)],
    datePublished: article.published_at || article.created_at || undefined,
    dateModified: article.updated_at || undefined,
    mainEntityOfPage: absoluteSiteUrl(
      `/news/${encodeURIComponent(article.slug)}`,
    ),
    inLanguage: "id-ID",
    author: {
      "@type": article.author === SITE_NAME ? "Organization" : "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
  };
}
