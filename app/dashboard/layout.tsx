import { privatePageMetadata } from "@/lib/site-metadata";

export const metadata = privatePageMetadata("Dashboard");

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
