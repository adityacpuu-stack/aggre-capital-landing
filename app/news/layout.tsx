import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Berita & Liputan Media",
  description:
    "Liputan AGGRE CAPITAL di Waspada.id, Investor.id, dan CNBC Indonesia, serta berita perusahaan dan wawasan seputar akses pembiayaan.",
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
