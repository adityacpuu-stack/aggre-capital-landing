import NewsIndexContent from "@/components/news/NewsIndexContent";
import { getPublishedNewsIndex } from "@/lib/published-news";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  try {
    return <NewsIndexContent initialData={await getPublishedNewsIndex()} />;
  } catch {
    // Keep curated source links available during an internal article outage.
    // Preserve an explicit error state rather than presenting a successful empty list.
    return (
      <NewsIndexContent
        initialData={{ articles: [], featured: [], total: 0 }}
        initialError
      />
    );
  }
}
