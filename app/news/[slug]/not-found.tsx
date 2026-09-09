import Link from "next/link";
import PublicPage from "@/components/PublicPage";

export default function ArticleNotFound() {
  return (
    <PublicPage eyebrow="Berita & insight" title="Artikel tidak ditemukan.">
      <p className="mb-6">
        Artikel yang Anda cari tidak tersedia atau telah dihapus.
      </p>
      <Link href="/news" className="ac-button">
        Lihat semua berita
      </Link>
    </PublicPage>
  );
}
