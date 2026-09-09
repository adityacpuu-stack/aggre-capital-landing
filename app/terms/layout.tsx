import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan layanan pendanaan AGGRE CAPITAL. Baca dengan cermat sebelum menggunakan layanan kami.",
  path: "/terms",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
