# Konfigurasi SEO

## Metadata publik

`lib/site-metadata.ts` menjadi sumber domain canonical (`https://www.aggrecapital.com`), gambar OG, serta metadata Open Graph dan Twitter. Layout publik memakai `createPageMetadata` supaya metadata anak tidak menghilangkan gambar preview. Judul memakai bentuk absolute untuk menghindari nama perusahaan ganda. Verifikasi Google pada root layout tetap dipertahankan.

## Halaman internal

Layout login, dashboard, detail aplikasi, dan detail pengajuan memakai `privatePageMetadata`: noindex/nofollow, tanpa canonical publik yang diwarisi. `next.config.mjs` juga memberi X-Robots-Tag pada URL internal dan API. Form publik `/pengajuan` tetap indexable. Ini pengaturan mesin pencari; autentikasi API tetap menangani akses data.

## Artikel

- `/news` mengambil daftar awal di server; pencarian, filter, dan pagination masih memakai API publik.
- `/news/[slug]` mengambil artikel published di server, lalu meneruskan data ke komponen interaktif. Isi dan judul tersedia tanpa request JavaScript tambahan.
- React cache membagi hasil query antara metadata dan isi halaman dalam satu request. Halaman bersifat dinamis agar perubahan status publikasi segera terbaca.
- Description mengutamakan `meta_description`, lalu `excerpt`. Tanggal publikasi mengutamakan `published_at`, lalu `created_at`.
- Gambar relatif seperti `/uploads/foto.jpg` diselesaikan terhadap domain canonical. Gambar kosong atau protokol tidak valid memakai gambar OG bawaan.
- Schema Article menyertakan judul, penulis, penerbit, gambar dan tanggal dari artikel. JSON-LD meng-escape karakter `<`.
- Hasil query kosong menghasilkan 404 dan noindex; error database diteruskan sebagai error, bukan diubah menjadi artikel tidak ditemukan.

## Sitemap dan redirect

Sitemap mencantumkan halaman publik serta slug artikel published yang unik. Halaman statis tidak diberi lastmod rekaan; artikel memakai tanggal perubahan dari database. Bila regenerasi ISR gagal mengakses database, error diteruskan supaya versi sitemap berhasil sebelumnya tetap tersedia.

Rule redirect host non-www ke www memakai HTTP 308 di source lokal. Setting redirect pada domain Vercel dapat berjalan sebelum aplikasi dan perlu diperiksa kembali saat deployment; perubahan lokal tidak mengubah setting domain Vercel.

## Verifikasi lokal

Jalankan production build dan server lokal, lalu:

```powershell
npm run build
npm run start -- --port 3100
# Jalankan di terminal lain:
node scripts/check-seo.cjs
```

Pemeriksaan mencakup canonical/OG/Twitter seluruh URL sitemap, isi artikel di HTML awal, metadata editor, schema, 404 browser/crawler, noindex internal, autentikasi API, redirect host, escaping JSON-LD, dan perbedaan artikel hilang dengan kegagalan database. Semua pemeriksaan read-only.

Google Search Console, status indeks sebenarnya, Core Web Vitals, dan perilaku domain production perlu diverifikasi setelah deployment. Perubahan ini hanya diterapkan di lokal.
