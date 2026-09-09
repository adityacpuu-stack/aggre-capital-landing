import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Tim Leadership",
  description:
    "Kenali tim leadership AGGRE CAPITAL — para profesional berpengalaman di industri keuangan dan fintech Indonesia yang mendorong inovasi pendanaan UMKM.",
  path: "/team",
  keywords: [
    "tim aggre capital",
    "leadership aggre capital",
    "manajemen fintech indonesia",
    "founder aggre capital",
  ],
});

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
