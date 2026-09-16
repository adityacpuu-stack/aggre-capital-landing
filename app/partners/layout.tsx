import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Partner Strategis",
  description:
    "Jaringan mitra AGGRE CAPITAL lintas cabang, termasuk BPR Tata Karya Indonesia, BPR Bank Kertiawan, Bank Vima, dan BPR Satyadhana Artha.",
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
