// Curated external coverage; the Kompasiana entry was verified on 7 October 2026.
// These are source links with short summaries, not locally republished articles.
export const mediaCoverage = [
  {
    id: "aggre-charity-sayap-ibu-2026",
    source: "Kompasiana",
    title: "Aggre Charity Salurkan Tali Asih untuk Operasional Yayasan Sayap Ibu",
    summary:
      "Melalui Aggre Charity, AGGRE CAPITAL menyerahkan bantuan Rp10 juta pada 18 September 2026 untuk menunjang operasional dan pengasuhan anak di Yayasan Sayap Ibu.",
    date: "2026-10-02",
    dateLabel: "2 Oktober 2026",
    type: "Artikel",
    href: "https://www.kompasiana.com/diahpitalokamargareta8296/6abfad0f34777c6c942fecb3/aggre-charity-salurkan-tali-asih-untuk-operasional-yayasan-sayap-ibu",
  },
  {
    id: "pimred-award-2026",
    source: "Waspada.id",
    title: "67 tokoh nasional menerima Pimred Award dan Pena Emas 2026",
    summary:
      "Rian Hidayat dari AGGRE CAPITAL tercantum dalam daftar penerima kategori Corporate Leadership The Best Communication.",
    date: "2026-07-19",
    dateLabel: "19 Juli 2026",
    type: "Artikel",
    href: "https://www.waspada.id/berita/67-tokoh-nasional-terima-pimred-award-dan-pena-emas-2026-fprmi-apresiasi-pemimpin-yang-dekat-dengan-pers",
  },
  {
    id: "investor-umkm-2026",
    source: "Investor.id",
    title: "BI Rate Naik 5,75 Persen, Perbanyak Edukasi ke Pelaku UMKM",
    summary:
      "Dialog bersama Rian Hidayat mengenai alternatif pendanaan dan tantangan permodalan UMKM saat suku bunga meningkat.",
    date: "2026-06-24",
    dateLabel: "24 Juni 2026",
    type: "Video",
    href: "https://investor.id/multimedia/443952/bi-rate-naik-575-persen-perbanyak-edukasi-ke-pelaku-umkm",
  },
  {
    id: "cnbc-pembiayaan-2025",
    source: "CNBC Indonesia",
    title: "Mencari Jalan Keluar Sulitnya Akses Pembiayaan di RI",
    summary:
      "Rian Hidayat membahas hambatan memperoleh pendanaan serta peran edukasi keuangan dalam program Evening Up.",
    date: "2025-07-28",
    dateLabel: "28 Juli 2025",
    type: "Video",
    href: "https://www.cnbcindonesia.com/market/20250728135913-19-652800/video-mencari-jalan-keluar-sulitnya-akses-pembiayaan-di-ri",
  },
] as const;

export const awardCoverage = mediaCoverage.find((item) => item.id === "pimred-award-2026")!;
