# SEO and editorial corrections — 27 September 2026

## Boundaries

No production database records, schema, environment, or credentials are changed.
The original articles remain available in the authenticated CMS. `lib/news-editorial.ts`
controls the public presentation while their claims are reviewed. Public search,
server-rendered news lists, article pages, metadata, and sitemap use the same policy.
The public news endpoint no longer invents random view counts.

## Corrected pages

- FAQ uses native `details`/`summary`: every answer is in the initial HTML and works
  without JavaScript. Removed unsupported blanket age/geographic claims and aligned
  the phone number and collateral description with the current contact/landing pages.
- The submission guide describes the actual form and application ID flow. It does
  not promise an interest rate, approval time, 24/7 staffed support, or regulatory status.
- The safer-borrowing guide asks users to identify the contracting institution,
  review written terms, and consult the official [OJK FIND directory](https://find.ojk.go.id/).
  It does not claim a specific licence for AGGRE. Original publication dates are
  retained; the actual editorial revision date is exposed in schema, UI and sitemap.
- The 2026 awards page identifies the person/category already supported by the
  [Waspada report](https://www.waspada.id/berita/67-tokoh-nasional-terima-pimred-award-dan-pena-emas-2026-fprmi-apresiasi-pemimpin-yang-dekat-dengan-pers).

## Stories awaiting evidence

These five URLs display a neutral review notice with `noindex, follow`, no Article
schema, and no canonical inherited from the homepage. They are excluded from the
public API, news list and sitemap, without deleting the CMS originals:

| Slug | Evidence needed before restoring publication |
| --- | --- |
| aggre-capital-best-fintech-2024 | Issuer, award/certificate, date; evidence for customer/financing/satisfaction figures |
| aggre-capital-best-fintech-innovation-2024 | Issuer, award/certificate, date; substantiation for processing-time claims |
| ekspansi-aggre-capital-5-kota-besar | Actual branch locations/opening dates and current status; verify historical targets |
| kisah-sukses-5-nasabah-aggre-capital-yang-berhasil-mengembangkan-bisnis | Authentic approved testimonials, publication consent, amounts and outcomes |
| ekspansi-partnership-3-bpr-baru | Named institutions, agreement dates and evidence for claimed financing capacity |

After the owner supplies supporting facts, review/rewrite the original content and
remove its slug from the hold list in the same release. For the two educational
articles, the versioned revisions intentionally override CMS edits until an editor
explicitly migrates the reviewed text into the CMS and removes the corresponding
revision entry. Do not silently restore old claims just to increase indexed URLs.

## Verification

`npm.cmd run build`, then `npm.cmd start -- --port 3100`, then
`node scripts/check-seo.cjs http://localhost:3100`.
The SEO check only reads endpoints: all FAQ answers without script content, article
metadata/HTML/schema, review-page noindex, public API/search/pagination, sitemap,
authentication, redirects and robots. It does not submit forms or mutate records.

Request recrawling only for ready pages after deployment. A successful live test or
indexing request is not proof of inclusion in Google. See [Google guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
