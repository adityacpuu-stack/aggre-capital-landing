import type { Metadata } from "next";

export const SITE_URL = "https://www.aggrecapital.com";
export const SITE_NAME = "AGGRE CAPITAL";
export const DEFAULT_TITLE = "AGGRE CAPITAL - Solusi Pendanaan Terpercaya";
export const DEFAULT_DESCRIPTION =
  "Pendanaan multiguna mulai Rp 100 juta. Proses cepat, balloon payment & installment 60 bulan. Solusi modal usaha, renovasi, dan kebutuhan lainnya.";
export const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.jpg`;

export function absoluteSiteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function articleImageUrl(image?: string | null): string {
  if (!image?.trim()) return DEFAULT_IMAGE;
  try {
    const url = new URL(image.trim(), `${SITE_URL}/`);
    return ["http:", "https:"].includes(url.protocol)
      ? url.href
      : DEFAULT_IMAGE;
  } catch {
    return DEFAULT_IMAGE;
  }
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: Metadata["keywords"];
}): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  const url = absoluteSiteUrl(path);
  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [
        { url: DEFAULT_IMAGE, width: 1200, height: 630, alt: fullTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: DEFAULT_IMAGE, alt: fullTitle }],
    },
  };
}

export function privatePageMetadata(title: string): Metadata {
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    alternates: { canonical: null },
    openGraph: null,
    twitter: null,
  };
}

export function jsonLdStringify(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
