import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Kebijakan Cookie",
  description:
    "Informasi tentang penggunaan cookie di website AGGRE CAPITAL untuk meningkatkan pengalaman pengguna.",
  path: "/cookies",
});

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
