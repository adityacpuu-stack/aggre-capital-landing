import { NextRequest, NextResponse } from "next/server";
import { getPublishedArticles } from "@/lib/published-news";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const positiveInt = (value: string | null, fallback: number) => {
      const number = Number(value);
      return Number.isSafeInteger(number) && number > 0 ? number : fallback;
    };
    const page = positiveInt(searchParams.get("page"), 1);
    const limit = Math.min(500, positiveInt(searchParams.get("limit"), 10));
    const featured = searchParams.get("featured") === "true";
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.trim().toLocaleLowerCase("id-ID");
    const slug = searchParams.get("slug");
    const articles = (await getPublishedArticles()).filter(article =>
      (!slug || article.slug === slug) &&
      (!featured || article.featured) &&
      (!category || category === "all" || article.category === category) &&
      (!search || [article.title, article.excerpt, article.content]
        .some(value => (value || "").toLocaleLowerCase("id-ID").includes(search))),
    );
    const offset = (page - 1) * limit;
    return NextResponse.json({
      success: true,
      data: articles.slice(offset, offset + limit).map(article => ({
        ...article,
        image: article.featured_image,
        date: new Date(article.published_at || article.created_at).toLocaleDateString("id-ID", {
          day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta",
        }),
      })),
      pagination: { page, limit, total: articles.length, pages: Math.ceil(articles.length / limit) },
    });
  } catch (error) {
    console.error("News public GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch news" }, { status: 500 });
  }
}
