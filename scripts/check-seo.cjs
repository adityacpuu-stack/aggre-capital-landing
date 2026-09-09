// Run against a local production build: node scripts/check-seo.cjs [http://localhost:3100]
// Read-only checks; no application records or authentication sessions are created.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const http = require("node:http");
const https = require("node:https");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const base = process.argv[2] || "http://localhost:3100";
assert(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Use a local server",
);

function loadTs(relative, mocks = {}) {
  const filename = path.join(root, relative);
  const module = new Module(filename);
  module.filename = filename;
  module.paths = Module._nodeModulePaths(path.dirname(filename));
  module.require = (id) => {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (id.startsWith("@/")) return loadTs(id.slice(2) + ".ts", mocks);
    return require(id);
  };
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  module._compile(source, filename);
  return module.exports;
}

const unescape = (value = "") =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const attr = (tag, name) =>
  unescape(new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1]);
const metas = (html, name) =>
  [...html.matchAll(/<meta\b[^>]*>/g)]
    .map((m) => m[0])
    .filter(
      (tag) => attr(tag, "name") === name || attr(tag, "property") === name,
    )
    .map((tag) => attr(tag, "content"));
const canonicals = (html) =>
  [...html.matchAll(/<link\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => attr(tag, "rel") === "canonical")
    .map((tag) => attr(tag, "href"));
const title = (html) => unescape(/<title>(.*?)<\/title>/s.exec(html)?.[1]);
const schemas = (html) =>
  [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].map((m) => JSON.parse(m[1]));

async function get(route, options = {}) {
  const response = await fetch(base + route, {
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
    ...options,
  });
  return { response, html: await response.text() };
}

async function main() {
  const { articleMetadata, articleJsonLd } = loadTs("lib/article-metadata.ts");
  const { articleImageUrl, DEFAULT_IMAGE, SITE_URL, jsonLdStringify } = loadTs(
    "lib/site-metadata.ts",
  );
  const fixture = {
    title: "Artikel contoh",
    slug: "contoh",
    author: "AGGRE CAPITAL",
    meta_description: "Deskripsi khusus dari editor",
    excerpt: "Ringkasan berbeda",
    featured_image: "/uploads/contoh.jpg",
    created_at: "2025-01-01T00:00:00.000Z",
    published_at: "2025-02-01T00:00:00.000Z",
    updated_at: "2025-03-01T00:00:00.000Z",
  };
  const metadata = articleMetadata(fixture);
  assert.equal(metadata.description, fixture.meta_description);
  assert.equal(metadata.openGraph.publishedTime, fixture.published_at);
  assert.equal(
    metadata.openGraph.images[0].url,
    SITE_URL + fixture.featured_image,
  );
  assert.equal(articleJsonLd(fixture).datePublished, fixture.published_at);
  assert.equal(
    articleMetadata({ ...fixture, meta_description: "  " }).description,
    fixture.excerpt,
  );
  assert.equal(articleImageUrl("javascript:alert(1)"), DEFAULT_IMAGE);
  assert.equal(articleImageUrl(""), DEFAULT_IMAGE);
  const hostile = { headline: "</script><script>alert(1)</script>" };
  assert(!jsonLdStringify(hostile).includes("<"));
  assert.deepEqual(JSON.parse(jsonLdStringify(hostile)), hostile);

  let mode = "missing";
  const mocks = {
    "server-only": {},
    react: { cache: (fn) => fn },
    "@/lib/database": {
      query: async (sql, params) => {
        assert(sql.includes("status = 'published'"));
        assert.deepEqual(params, ["unavailable"]);
        if (mode === "failure") throw new Error("database unavailable");
        return { rows: [] };
      },
    },
  };
  const { getPublishedArticle } = loadTs("lib/published-news.ts", mocks);
  assert.equal(await getPublishedArticle("unavailable"), null);
  mode = "failure";
  await assert.rejects(
    getPublishedArticle("unavailable"),
    /database unavailable/,
  );
  console.log(
    "PASS: editor metadata, publication dates, relative images, JSON-LD escaping, missing vs database failure",
  );

  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.response.status, 200);
  const entries = [...sitemap.html.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
    (m) => ({
      url: unescape(/<loc>(.*?)<\/loc>/.exec(m[1])[1]),
      lastmod: /<lastmod>(.*?)<\/lastmod>/.exec(m[1])?.[1],
    }),
  );
  assert(entries.length >= 12);
  assert.equal(new Set(entries.map((e) => e.url)).size, entries.length);
  const all = await Promise.all(
    entries.map(async (entry) => {
      const pathname = new URL(entry.url).pathname;
      const result = await get(pathname, {
        headers: { "User-Agent": "Googlebot" },
      });
      const { html, response } = result;
      assert.equal(response.status, 200, pathname);
      assert.deepEqual(
        canonicals(html).map((url) => new URL(url).href),
        [new URL(pathname, SITE_URL).href],
        pathname,
      );
      assert.equal(
        new URL(metas(html, "og:url")[0]).href,
        new URL(pathname, SITE_URL).href,
        pathname,
      );
      assert(metas(html, "og:image").length === 1, pathname + " OG image");
      assert.equal(metas(html, "twitter:title")[0], title(html), pathname);
      assert.equal(metas(html, "og:title")[0], title(html), pathname);
      assert(!metas(html, "robots").join(",").includes("noindex"), pathname);
      assert(!response.headers.get("x-robots-tag"), pathname);
      assert(html.includes("<h1"), pathname + " server H1");
      if (!pathname.startsWith("/news/"))
        assert(!entry.lastmod, pathname + " fabricated lastmod");
      return { pathname, ...result };
    }),
  );

  const api = await get("/api/news/public?limit=500");
  const articles = JSON.parse(api.html).data;
  const newsIndex = all.find((row) => row.pathname === "/news").html;
  for (const article of articles.slice(0, 9))
    assert(newsIndex.includes(`/news/${article.slug}`), "server article link");
  let count = 0;
  for (const article of articles) {
    const page = all.find(
      (row) => row.pathname === "/news/" + encodeURIComponent(article.slug),
    );
    assert(page, "published article in sitemap");
    assert(
      page.html.includes(article.content),
      "full article body in initial HTML",
    );
    assert(!page.html.includes("Memuat artikel..."));
    assert.equal(
      metas(page.html, "description")[0],
      article.meta_description?.trim() ||
        article.excerpt?.trim() ||
        `Baca artikel "${article.title}" di AGGRE CAPITAL.`,
    );
    const schema = schemas(page.html).find((s) => s["@type"] === "Article");
    assert(schema, "Article structured data");
    assert.equal(schema.headline, article.title);
    assert.equal(
      schema.datePublished,
      new Date(article.published_at || article.created_at).toISOString(),
    );
    count++;
  }
  console.log(
    `PASS: ${entries.length} sitemap pages, ${count} server-rendered articles, canonical / OG / Twitter / schema`,
  );

  for (const route of [
    "/login",
    "/pengajuan/seo-check-missing",
    "/aplikasi/seo-check-missing",
  ]) {
    const { html, response } = await get(route);
    assert(metas(html, "robots").join(",").includes("noindex"), route);
    assert(response.headers.get("x-robots-tag")?.includes("noindex"), route);
    assert.equal(canonicals(html).length, 0, route);
    assert.equal((title(html).match(/AGGRE CAPITAL/g) || []).length, 1, route);
  }
  const dashboard = await get("/dashboard");
  assert.equal(dashboard.response.status, 307);
  assert(dashboard.response.headers.get("location")?.endsWith("/login"));
  assert.equal(
    (await get("/api/applications/seo-check-missing")).response.status,
    401,
  );
  for (const agent of ["Googlebot", "Mozilla/5.0"]) {
    const missing = await get("/news/seo-check-missing", {
      headers: { "User-Agent": agent },
    });
    assert.equal(missing.response.status, 404);
    assert(metas(missing.html, "robots").join(",").includes("noindex"));
  }
  // Node's fetch may replace Host; use the HTTP client to exercise host routing.
  const redirect = await new Promise((resolve, reject) => {
    const url = new URL("/team", base);
    const request = (url.protocol === "https:" ? https : http).get(
      url,
      { headers: { Host: "aggrecapital.com" } },
      (response) => {
        response.resume();
        resolve({
          status: response.statusCode,
          location: response.headers.location,
        });
      },
    );
    request.setTimeout(20000, () =>
      request.destroy(new Error("redirect check timed out")),
    );
    request.on("error", reject);
  });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.location, SITE_URL + "/team");
  const robots = await get("/robots.txt");
  assert(robots.html.includes("Disallow: /api/"));
  assert(robots.html.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
  assert.equal((await get("/images/og-image.jpg")).response.status, 200);
  console.log(
    "PASS: private noindex, protected API, actual 404, permanent host redirect, robots and OG asset",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
