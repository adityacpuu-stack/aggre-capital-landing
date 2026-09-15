# Curated media coverage

The three user-provided links are stored in `lib/media-coverage.ts`. They appear on the homepage and `/news`, with a related Waspada link on `/penghargaan`. Cards open the original publisher in a new tab and contain short summaries, not full article copies. No database records or remote publications were changed.

Verified on 15 September 2026:

- [Waspada.id](https://www.waspada.id/berita/67-tokoh-nasional-terima-pimred-award-dan-pena-emas-2026-fprmi-apresiasi-pemimpin-yang-dekat-dengan-pers): published 19 July 2026. The recipient list includes Rian Hidayat of AGGRE CAPITAL under Corporate Leadership The Best Communication.
- [Investor.id](https://investor.id/multimedia/443952/bi-rate-naik-575-persen-perbanyak-edukasi-ke-pelaku-umkm): published 24 June 2026. Investor Daily TV discussion with Rian Hidayat on financing alternatives and UMKM. Verified from the publisher's visible browser page after automated fetching failed.
- [CNBC Indonesia](https://www.cnbcindonesia.com/market/20250728135913-19-652800/video-mencari-jalan-keluar-sulitnya-akses-pembiayaan-di-ri): published 28 July 2025. Evening Up interview with Rian Hidayat on access to financing and financial education. Verified from the publisher's visible browser page after automated fetching failed.

Publication dates are historical article dates; the BI Rate headline is not presented as a live rate.

If the internal news database is unavailable, `/news` still displays curated media and shows an explicit retryable error for company articles. It does not turn the failed query into a successful empty article list.

The initial local preview received `connect EACCES` because its dev server ran inside the restricted sandbox. The same read-only database probe succeeded outside the sandbox. Restarting `npm.cmd run dev -- --port 3100` with approved network access resolved the issue; the news, partners and testimonials public APIs all returned HTTP 200 with `success: true`. Database credentials and network firewall rules were unchanged.
