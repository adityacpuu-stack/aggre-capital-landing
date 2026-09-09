import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Ajukan Pendanaan",
  description:
    "Ajukan pendanaan multiguna mulai Rp 100 juta secara online. Proses cepat, syarat mudah, bisa balloon payment & cicilan 60 bulan. Modal usaha, renovasi, pendidikan, pernikahan.",
  path: "/pengajuan",
  keywords: [
    "ajukan pinjaman online",
    "pengajuan modal usaha",
    "kredit multiguna jakarta",
    "pinjaman renovasi rumah",
    "pendanaan UMKM online",
    "kredit tanpa agunan jakarta",
    "pinjaman pendidikan",
    "balloon payment",
    "cicilan 60 bulan",
  ],
});

export default function PengajuanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
