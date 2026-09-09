import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Testimoni Pelanggan",
  description:
    "Kisah sukses pelanggan AGGRE CAPITAL. Ribuan nasabah telah mempercayakan kebutuhan pendanaan modal usaha, renovasi rumah, dan pendidikan kepada kami.",
  path: "/testimoni",
  keywords: [
    "testimoni aggre capital",
    "review aggre capital",
    "pengalaman pinjaman aggre capital",
    "kisah sukses modal usaha",
    "ulasan nasabah aggre capital",
  ],
});

export default function TestimoniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
