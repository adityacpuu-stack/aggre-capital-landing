import type { NewsArticle } from "@/lib/news-types";

// Public presentation policy only. Original CMS records remain untouched.
// Restore these stories only after the evidence checklist in docs/SEO_EDITORIAL.md is met.
export const newsUnderReview = new Set([
  "aggre-capital-best-fintech-2024",
  "aggre-capital-best-fintech-innovation-2024",
  "ekspansi-aggre-capital-5-kota-besar",
  "kisah-sukses-5-nasabah-aggre-capital-yang-berhasil-mengembangkan-bisnis",
  "ekspansi-partnership-3-bpr-baru",
]);

export const editorialUpdatedAt = "2026-09-27T10:00:00+07:00";

const revisions: Record<string, Pick<NewsArticle, "title" | "excerpt" | "content">> = {
  "panduan-lengkap-cara-mengajukan-pinjaman-online-di-aggre-capital": {
    title: "Panduan Mengajukan Pendanaan melalui Website AGGRE CAPITAL",
    excerpt: "Kenali data yang perlu disiapkan, cara mengisi formulir, dan langkah setelah mengirim pengajuan pendanaan melalui website AGGRE CAPITAL.",
    content: `<h2>Mulai dari kebutuhan pendanaan Anda</h2>
<p>Pengajuan yang jelas membantu tim memahami rencana Anda. Tuliskan tujuan penggunaan dana, jumlah yang dibutuhkan, serta informasi pekerjaan atau usaha. Layanan yang ditampilkan di website AGGRE CAPITAL mencakup pendanaan multiguna mulai Rp100 juta dan pembiayaan dengan jaminan sertifikat SHM atau SHGB. Pilihan produk, jumlah yang disetujui, dan ketentuannya mengikuti pemeriksaan pengajuan serta mitra pembiayaan.</p>
<p>Jika belum yakin apakah kebutuhan Anda sesuai, gunakan <a href="/kontak">form konsultasi</a> sebelum mengisi pengajuan lengkap. Sampaikan wilayah layanan yang dibutuhkan dan gambaran properti yang akan dijaminkan agar tim dapat menjelaskan langkah berikutnya.</p>
<h2>1. Siapkan informasi sebelum mengisi formulir</h2>
<p>Formulir website meminta informasi identitas, kontak, pekerjaan atau usaha, kebutuhan dana, dan jaminan. Siapkan nama sesuai identitas, nomor telepon dan email aktif, alamat, tujuan peminjaman, serta informasi aset dan kepemilikannya. Masukkan data dengan teliti dan pastikan kontak Anda dapat dihubungi.</p>
<p>Dokumen yang dibutuhkan dapat berbeda sesuai produk dan kondisi pemohon. Minta daftar dokumen serta kanal penyerahan yang benar kepada tim. Jangan menganggap daftar umum pada artikel sebagai persyaratan final untuk semua mitra.</p>
<h2>2. Isi formulir pengajuan resmi</h2>
<p>Buka <a href="/pengajuan">halaman Pengajuan AGGRE CAPITAL</a>. Lengkapi kolom wajib pada bagian data diri, pekerjaan, kebutuhan dana, data jaminan, dan persetujuan. Periksa kembali jumlah dana, alamat jaminan, email, dan nomor telepon sebelum mengirim.</p>
<p>Mengirim formulir merupakan langkah pengajuan, bukan persetujuan pembiayaan. Jangan mengirim informasi yang belum Anda pahami atau menyetujui pernyataan yang tidak sesuai kondisi sebenarnya.</p>
<h2>3. Simpan ID pengajuan</h2>
<p>Setelah pengajuan berhasil tersimpan, website menampilkan ID pengajuan. Simpan nomor tersebut untuk tindak lanjut. Halaman juga menampilkan informasi tentang pemrosesan email konfirmasi. Jika pengajuan sudah berhasil tetapi email belum diterima, simpan ID yang muncul dan hubungi tim; jangan langsung mengirim formulir yang sama berulang kali.</p>
<h2>4. Bahas ketentuan sebelum mengambil keputusan</h2>
<p>Saat tindak lanjut, minta penjelasan mengenai lembaga pemberi pembiayaan, persyaratan jaminan, tenor, bunga, seluruh biaya, serta jadwal pembayaran. Untuk skema balloon payment, minta rincian kewajiban pokok di akhir tenor agar Anda dapat merencanakan sumber pelunasannya.</p>
<p>Waktu pemeriksaan dan keputusan bergantung pada kelengkapan data serta ketentuan pihak terkait. Artikel ini tidak menetapkan bunga, menjanjikan waktu pencairan, atau menjamin pengajuan akan disetujui. Gunakan penawaran tertulis terbaru sebagai bahan pertimbangan.</p>
<h2>Butuh bantuan saat mengisi?</h2>
<p>Lihat <a href="/faq">pertanyaan umum</a> atau hubungi tim melalui <a href="/kontak">halaman Kontak</a>. Sertakan ID pengajuan jika sudah tersedia dan jelaskan bagian yang ingin ditanyakan. Anda tidak perlu menuliskan ulang seluruh data identitas dalam pesan konsultasi.</p>`,
  },
  "tips-memilih-pinjaman-online-aman": {
    title: "Hal yang Perlu Diperiksa Sebelum Mengajukan Pendanaan Online",
    excerpt: "Periksa identitas penyedia, rincian biaya, skema pembayaran, serta kanal pengiriman data sebelum melanjutkan pengajuan pendanaan secara online.",
    content: `<h2>Kenali pihak yang terlibat dalam pembiayaan</h2>
<p>Sebelum melanjutkan pengajuan, mintalah nama badan usaha yang memberikan pembiayaan, nama produk, dan penjelasan peran setiap pihak yang membantu prosesnya. Nama merek atau logo mitra saja belum menjelaskan siapa yang menjadi pihak dalam perjanjian Anda.</p>
<p>Untuk memeriksa informasi pelaku sektor jasa keuangan, gunakan <a href="https://find.ojk.go.id/" target="_blank" rel="noopener noreferrer">Financial Institutions Directory (FIND) OJK</a>. Cocokkan nama badan usaha dan informasi yang tercantum dengan penawaran yang Anda terima. Rujukan ini bukan pernyataan bahwa AGGRE CAPITAL memiliki izin tertentu atau bahwa semua produk memiliki ketentuan yang sama.</p>
<h2>Minta rincian biaya secara tertulis</h2>
<p>Jangan membandingkan penawaran dari angka cicilan saja. Mintalah rincian bunga, biaya administrasi, biaya penilaian jaminan bila ada, biaya lain yang berlaku, serta jumlah dana bersih yang diterima. Tanyakan pula ketentuan keterlambatan dan pelunasan dipercepat sebelum menyetujui perjanjian.</p>
<p>Jika ada perbedaan antara iklan, percakapan, dan dokumen penawaran, minta penjelasan tertulis. Simpan dokumen yang menjadi dasar keputusan Anda. Jangan menganggap contoh perhitungan sebagai penawaran final untuk kondisi Anda.</p>
<h2>Pahami pembayaran sampai akhir tenor</h2>
<p>Mintalah jadwal pembayaran lengkap dari awal hingga akhir. Pada skema balloon payment, perhatikan besarnya pokok yang masih harus dibayar di akhir tenor. Cicilan berkala yang terlihat ringan perlu dinilai bersama kewajiban akhir tersebut.</p>
<p>Untuk pembiayaan dengan jaminan properti, minta penjelasan proses penilaian, dokumen yang dibutuhkan, serta kewajiban terkait jaminan dalam perjanjian. Pertimbangkan kemampuan memenuhi seluruh kewajiban pembayaran sebelum melanjutkan.</p>
<h2>Pastikan kanal komunikasi dan pengiriman data</h2>
<p>Mulailah dari alamat website dan kontak resmi yang dapat Anda periksa. Konfirmasikan identitas petugas dan tujuan permintaan dokumen. Jangan membagikan PIN, kata sandi, atau kode OTP kepada orang yang mengaku membantu pengajuan. HTTPS membantu melindungi koneksi, tetapi keberadaannya saja bukan bukti legalitas sebuah penyedia.</p>
<h2>Pertanyaan yang bisa dibawa saat konsultasi</h2>
<ul><li>Siapa pihak pemberi pembiayaan dan penandatangan perjanjian?</li><li>Berapa dana bersih yang diterima dan total kewajiban pembayaran?</li><li>Apa syarat jaminan dan dokumen untuk pengajuan saya?</li><li>Bagaimana tahapan pemeriksaan dan cara mengetahui status pengajuan?</li><li>Ke mana saya dapat menyampaikan pertanyaan atau keluhan?</li></ul>
<p>Untuk layanan melalui AGGRE CAPITAL, lihat <a href="/partners">jaringan mitra</a>, pelajari <a href="/faq">pertanyaan umum</a>, atau sampaikan kebutuhan Anda melalui <a href="/kontak">form konsultasi</a>. Ketentuan pembiayaan harus dikonfirmasi untuk produk dan mitra yang benar-benar ditawarkan kepada Anda.</p>`,
  },
};

export function applyEditorialRevision<T extends { slug: string }>(article: T): T {
  const revision = Object.hasOwn(revisions, article.slug) ? revisions[article.slug] : undefined;
  if (!revision) return article;
  const words = revision.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return {
    ...article, ...revision,
    meta_description: revision.excerpt,
    author: "AGGRE CAPITAL",
    category: "Education",
    tags: "pendanaan,pengajuan,konsultasi",
    featured_image: "",
    read_time: Math.max(1, Math.ceil(words / 200)),
    updated_at: new Date(editorialUpdatedAt).toISOString(),
  };
}
