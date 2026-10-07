import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Berita & Liputan Media",
  description:
    "Berita dan liputan AGGRE CAPITAL: kegiatan Aggre Charity, penghargaan, serta wawasan pembiayaan dari Kompasiana, Waspada.id, Investor.id, dan CNBC Indonesia.",
  path: "/news",
  keywords: [
    "berita fintech indonesia",
    "artikel modal usaha",
    "tips keuangan UMKM",
    "berita aggre capital",
    "pinjaman usaha terbaru",
  ],
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
