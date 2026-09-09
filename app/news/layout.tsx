import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Berita & Artikel",
  description:
    "Baca artikel terbaru seputar fintech, keuangan, dan tips modal usaha dari AGGRE CAPITAL. Update informasi industri keuangan Indonesia untuk UMKM dan pengusaha.",
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
