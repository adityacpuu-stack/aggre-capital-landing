import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "FAQ - Pertanyaan yang Sering Ditanyakan",
  description:
    "Temukan jawaban atas pertanyaan umum seputar AGGRE CAPITAL: limit pendanaan, syarat pengajuan, lama proses, balloon payment, tenor cicilan, dan informasi layanan lainnya.",
  path: "/faq",
  keywords: [
    "FAQ aggre capital",
    "syarat pengajuan pinjaman",
    "berapa limit pinjaman aggre capital",
    "berapa lama proses pendanaan",
    "apa itu balloon payment",
    "tenor cicilan aggre capital",
    "cara mengajukan pinjaman",
    "dokumen pengajuan kredit",
    "take over pinjaman",
    "pendanaan multiguna syarat",
  ],
});

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
