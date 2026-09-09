"use client";

import PublicPage from "@/components/PublicPage";
import { Button } from "@/components/ui/button";

export default function NewsError({ reset }: { reset: () => void }) {
  return (
    <PublicPage eyebrow="Berita & insight" title="Berita belum dapat dimuat.">
      <p className="mb-6">
        Terjadi gangguan saat memuat berita. Silakan coba lagi.
      </p>
      <Button onClick={reset}>Coba lagi</Button>
    </PublicPage>
  );
}
