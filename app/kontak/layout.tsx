import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Kontak Kami",
  description:
    "Hubungi AGGRE CAPITAL di Jakarta Selatan. Telepon +62 21 3880 8101. Konsultasi pendanaan multiguna, modal usaha, renovasi rumah, dan kebutuhan finansial lainnya.",
  path: "/kontak",
  keywords: [
    "kontak aggre capital",
    "telepon aggre capital",
    "alamat aggre capital",
    "konsultasi pendanaan jakarta",
    "hubungi aggre capital",
  ],
});

export default function KontakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
