import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PublicPage from "@/components/PublicPage";
import { createPageMetadata } from "@/lib/site-metadata";
import { awardCoverage } from "@/lib/media-coverage";
import s from "./penghargaan.module.css";

export const metadata = createPageMetadata({
  title: "Penghargaan & Pencapaian",
  description:
    "Dokumentasi penghargaan dan pencapaian AGGRE CAPITAL, termasuk Pemred Award Pena Emas 2026. Penghargaan untuk komitmen, inspirasi untuk negeri.",
  path: "/penghargaan",
});

export default function AwardsPage() {
  return (
    <PublicPage
      eyebrow="Penghargaan"
      title="Penghargaan untuk komitmen. Inspirasi untuk negeri."
      description="AGGRE CAPITAL bangga menjadi bagian dari para pemimpin yang terus berkontribusi dan menginspirasi perubahan positif."
    >
      <article className={s.feature} aria-labelledby="award-title">
        <figure className={s.documentation}>
          <a
            href="/images/pemred-award-2026.jpg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka dokumentasi Pemred Award Pena Emas 2026 dalam ukuran penuh"
          >
            <Image
              src="/images/pemred-award-2026.jpg"
              alt="Dokumentasi Pemred Award Pena Emas 2026: para penerima memegang piagam dan trofi, suasana panggung, serta penyerahan penghargaan."
              width={1024}
              height={825}
              sizes="(max-width: 900px) 88vw, (max-width: 1440px) 57vw, 800px"
              priority
              className={s.image}
            />
          </a>
          <figcaption>Dokumentasi Pemred Award Pena Emas 2026.</figcaption>
        </figure>
        <div className={s.story}>
          <p className={s.year}>2026</p>
          <h2 id="award-title">Pemred Award Pena Emas</h2>
          <p>
            Momen penghargaan yang mengangkat komitmen dan kontribusi para
            pemimpin dalam menginspirasi perubahan positif.
          </p>
          <p>
            Dokumentasi ini merangkum suasana acara, para penerima piagam,
            dan momen penyerahan penghargaan.
          </p>
          <a
            className="ac-button"
            href="/images/pemred-award-2026.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat foto ukuran penuh <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </article>
      <section className={s.coverage} aria-labelledby="award-coverage-title">
        <div>
          <p className={s.year}>Waspada.id / {awardCoverage.dateLabel}</p>
          <h2 id="award-coverage-title">Penghargaan ini dalam pemberitaan.</h2>
          <p>{awardCoverage.summary}</p>
        </div>
        <div className={s.coverageLinks}>
          <a href={awardCoverage.href} target="_blank" rel="noopener noreferrer">
            Baca liputan Waspada.id <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> (tab baru)</span>
          </a>
          <Link href="/news#liputan-media">Lihat liputan media lainnya <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className={s.teamLink} aria-labelledby="people-title">
        <div>
          <h2 id="people-title">Kenali orang di balik AGGRE CAPITAL.</h2>
          <p>Pengalaman dan komitmen yang mendampingi setiap langkah Anda.</p>
        </div>
        <Link href="/team">
          Kenali tim kami <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
      </section>
    </PublicPage>
  );
}
