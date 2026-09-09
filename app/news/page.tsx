import NewsIndexContent from "@/components/news/NewsIndexContent";
import { getPublishedNewsIndex } from "@/lib/published-news";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  return <NewsIndexContent initialData={await getPublishedNewsIndex()} />;
}
