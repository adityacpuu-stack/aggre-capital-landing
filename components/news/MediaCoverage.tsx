import Link from "next/link";
import { ArrowUpRight, Newspaper, Play } from "lucide-react";
import { mediaCoverage } from "@/lib/media-coverage";
import s from "./media-coverage.module.css";

export default function MediaCoverage({ showAllLink = false }: { showAllLink?: boolean }) {
  return (
    <section id="liputan-media" className={s.section} aria-labelledby="media-title">
      <div className={s.heading}>
        <div>
          <h2 id="media-title">AGGRE CAPITAL dalam media.</h2>
          <p>Liputan penghargaan dan dialog seputar akses pembiayaan.</p>
        </div>
        {showAllLink && (
          <Link href="/news" className={s.allLink}>
            Berita & liputan <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className={s.grid}>
        {mediaCoverage.map((item) => (
          <article key={item.id} className={s.card}>
            <div className={s.source}>
              <span>{item.source}</span>
              {item.type === "Video" ? <Play size={21} aria-hidden="true" /> : <Newspaper size={21} aria-hidden="true" />}
            </div>
            <div className={s.meta}>
              <span>{item.type}</span>
              <time dateTime={item.date}>{item.dateLabel}</time>
            </div>
            <h3>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.title}<span className="sr-only"> — buka di {item.source}, tab baru</span>
              </a>
            </h3>
            <p className={s.summary}>{item.summary}</p>
            <a href={item.href} target="_blank" rel="noopener noreferrer" className={s.action}>
              {item.type === "Video" ? "Tonton di " : "Baca di "}{item.source}
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> (tab baru)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
