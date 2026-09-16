import { ArrowUpRight, Building2 } from "lucide-react";
import { branchPartners } from "@/lib/branch-partners";
import s from "./branch-partners.module.css";

export default function BranchPartners() {
  return (
    <section id="mitra-cabang" className={s.section} aria-labelledby="branch-partners-title">
      <div className={s.heading}>
        <h2 id="branch-partners-title">Jaringan mitra lintas cabang.</h2>
        <p>Perwakilan mitra perbankan dari seluruh cabang AGGRE CAPITAL.</p>
      </div>
      <div className={s.grid}>
        {branchPartners.map(partner => (
          <article className={s.card} key={partner.id}>
            <Building2 size={28} strokeWidth={1.5} aria-hidden="true" />
            <h3>{partner.name}</h3>
            <p>{partner.legalName}</p>
            <a href={partner.website} target="_blank" rel="noopener noreferrer">
              <span>Kunjungi situs resmi<span className={s.domain}>{partner.domain}</span></span>
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> {partner.name} (tab baru)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
