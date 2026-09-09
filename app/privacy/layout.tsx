import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi AGGRE CAPITAL dalam melindungi data pribadi pengguna sesuai regulasi OJK dan peraturan perlindungan data Indonesia.",
  path: "/privacy",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
