import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Partner Strategis",
  description:
    "Ekosistem mitra strategis AGGRE CAPITAL — BPR, bank, dan lembaga keuangan terpercaya yang mendukung solusi pendanaan multiguna terbaik di Indonesia.",
  path: "/partners",
  keywords: [
    "partner aggre capital",
    "mitra aggre capital",
    "BPR partner fintech",
    "ekosistem keuangan indonesia",
    "kolaborasi pendanaan",
  ],
});

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
