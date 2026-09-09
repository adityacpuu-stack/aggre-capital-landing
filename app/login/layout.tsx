import { privatePageMetadata } from "@/lib/site-metadata";

export const metadata = privatePageMetadata("Login");

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
