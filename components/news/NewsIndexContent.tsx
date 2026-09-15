"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Newspaper, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PublicPage from "@/components/PublicPage";
import MediaCoverage from "@/components/news/MediaCoverage";
import type {
  NewsIndexData,
  NewsListArticle as Article,
} from "@/lib/news-types";
const categories = [
  ["all", "Semua artikel"],
  ["News", "Berita"],
  ["Achievement", "Prestasi"],
  ["Partnership", "Kemitraan"],
  ["Innovation", "Inovasi"],
  ["Education", "Edukasi"],
  ["Analysis", "Analisis"],
  ["Press Release", "Siaran pers"],
  ["Event", "Acara"],
  ["CSR", "CSR"],
];
function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="ac-news-card">
      <Link
        href={"/news/" + article.slug}
        className="ac-news-photo"
        tabIndex={-1}
        aria-hidden="true"
      >
        {article.featured_image ? (
          <Image
            src={article.featured_image}
            alt=""
            fill
            sizes="(max-width: 760px) 90vw, 33vw"
          />
        ) : (
          <Newspaper size={45} strokeWidth={1} />
        )}
      </Link>
      <span className="ac-pill">{article.category}</span>
      <h2>
        <Link href={"/news/" + article.slug}>{article.title}</Link>
      </h2>
      <p>{article.excerpt}</p>
      <div className="ac-news-meta">
        <span>{article.date}</span>
        {article.read_time > 0 && <span>{article.read_time} menit baca</span>}
      </div>
      <Link href={"/news/" + article.slug} className="ac-text-link">
        Baca artikel <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </article>
  );
}
export default function NewsIndexContent({
  initialData,
  initialError = false,
}: {
  initialData: NewsIndexData;
  initialError?: boolean;
}) {
  const [articles, setArticles] = useState<Article[]>(initialData.articles),
    [featured, setFeatured] = useState<Article[]>(initialData.featured),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(initialError);
  const [query, setQuery] = useState(""),
    [search, setSearch] = useState(""),
    [category, setCategory] = useState("all"),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(initialData.total),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    if (page === 1 && search === "" && category === "all" && retry === 0) {
      setArticles(initialData.articles);
      setFeatured(initialData.featured);
      setTotal(initialData.total);
      setLoading(false);
      setError(initialError);
      return;
    }
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "9",
          category,
          search,
        });
        const responses = await Promise.all([
          fetch("/api/news/public?" + params, { signal: controller.signal }),
          fetch("/api/news/public?featured=true&limit=3", {
            signal: controller.signal,
          }),
        ]);
        if (responses.some((r) => !r.ok)) throw new Error("unavailable");
        const [list, highlights] = await Promise.all(
          responses.map((r) => r.json()),
        );
        if (!list.success || !highlights.success)
          throw new Error("unavailable");
        if (controller.signal.aborted) return;
        setArticles(Array.isArray(list.data) ? list.data : []);
        setFeatured(Array.isArray(highlights.data) ? highlights.data : []);
        setTotal(Number(list.pagination?.total) || 0);
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
          setArticles([]);
          setFeatured([]);
          setTotal(0);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [page, search, category, retry, initialData, initialError]);
  const pages = Math.max(1, Math.ceil(total / 9));
  return (
    <PublicPage
      eyebrow="Berita & insight"
      title="Wawasan baru untuk langkah berikutnya."
      description="Liputan media, kabar perusahaan, dan wawasan seputar pembiayaan bersama AGGRE CAPITAL."
    >
      <MediaCoverage />
      {(initialData.total > 0 || total > 0 || loading || search || category !== "all" || error) && (
        <section aria-labelledby="company-articles-title">
          <h2 id="company-articles-title" className="mb-8">Artikel AGGRE CAPITAL</h2>
          <div className="ac-news-controls">
            <form
              className="ac-search"
              onSubmit={(event) => {
                event.preventDefault();
                setPage(1);
                setSearch(query.trim());
              }}
            >
              <label htmlFor="news-search" className="sr-only">
                Cari artikel
              </label>
              <Input
                id="news-search"
                placeholder="Cari berita atau topik…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Button type="submit" aria-label="Cari artikel">
                <Search size={19} />
              </Button>
            </form>
            <p>{loading ? "Memuat artikel…" : error ? "Artikel belum tersedia" : total + " artikel"}</p>
          </div>
          <div className="ac-filter-tabs" aria-label="Kategori artikel">
            {categories.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={category === value}
                onClick={() => {
                  setCategory(value);
                  setPage(1);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="ac-state" role="status">
              Memuat berita & insight…
            </div>
          ) : error ? (
            <div className="ac-state" role="alert">
              <h2>Artikel perusahaan belum dapat dimuat.</h2>
              <p>Silakan coba kembali beberapa saat lagi.</p>
              <Button
                className="mt-5"
                onClick={() => setRetry((value) => value + 1)}
              >
                Coba lagi
              </Button>
            </div>
          ) : (
            <>
              {featured.length > 0 &&
                category === "all" &&
                !search &&
                page === 1 && (
                  <section className="ac-news-featured">
                    <p className="ac-eyebrow">PILIHAN REDAKSI</p>
                    <div className="ac-news-grid">
                      {featured.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                </section>
            )}
          {articles.length > 0 ? (
            <>
              <div className="ac-news-grid">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              {pages > 1 && (
                <nav aria-label="Halaman artikel" className="ac-pagination">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((value) => value - 1)}
                  >
                    Sebelumnya
                  </Button>
                  <span>
                    Halaman {page} dari {pages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page >= pages}
                    onClick={() => setPage((value) => value + 1)}
                  >
                    Berikutnya
                  </Button>
                </nav>
              )}
            </>
          ) : (
            <div className="ac-state">
              <h2>
                Belum ada artikel{search ? " yang cocok" : " di kategori ini"}.
              </h2>
              <p>Coba kata kunci atau kategori lain.</p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => {
                  setSearch("");
                  setQuery("");
                  setCategory("all");
                  setPage(1);
                }}
              >
                Lihat semua artikel
              </Button>
            </div>
          )}
        </>
      )}
      </section>
      )}
    </PublicPage>
  );
}
