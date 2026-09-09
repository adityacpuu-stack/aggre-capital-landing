import { privatePageMetadata } from "@/lib/site-metadata";

export const metadata = privatePageMetadata("Detail Pengajuan");

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
