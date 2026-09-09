import PublicPage, { ContactBand } from "@/components/PublicPage";
import TeamPortrait from "@/components/TeamPortrait";
import { ShieldCheck, HeartHandshake, Lightbulb, Target } from "lucide-react";
const team = [
  {
    key: "rian" as const,
    name: "Rian",
    role: "Founder",
    text: "Memimpin AGGRE CAPITAL dengan komitmen untuk memberikan akses pendanaan yang mudah dan terpercaya bagi masyarakat Indonesia.",
    experience: "Lebih dari 10 tahun di institusi keuangan.",
    quote:
      "Kami berkomitmen untuk menjadi jembatan antara kebutuhan finansial masyarakat dengan solusi pendanaan yang tepat dan terpercaya.",
  },
  {
    key: "silvester" as const,
    name: "Silvester",
    role: "Co-founder",
    text: "Berfokus pada operasional dan kualitas layanan, dengan proses yang efisien dan pengalaman nasabah sebagai prioritas.",
    experience: "Lebih dari 10 tahun di institusi keuangan & fintech.",
    quote:
      "Kunci kesuksesan AGGRE CAPITAL adalah kombinasi antara teknologi modern dan pelayanan yang berpusat pada kepuasan nasabah.",
  },
];
export default function TeamPage() {
  return (
    <PublicPage
      eyebrow="Tim kami"
      title="Kenali orang di balik setiap langkah."
      description="Pengalaman di dunia keuangan. Komitmen yang sama untuk mendampingi rencana Anda."
    >
      <div className="ac-leadership">
        {team.map((member, index) => (
          <article className="ac-profile" key={member.key}>
            <TeamPortrait person={member.key} priority={index === 0} />
            <div className="ac-profile-copy">
              <p className="ac-eyebrow">
                0{index + 1} / {member.role}
              </p>
              <h2>{member.name}</h2>
              <p className="ac-experience">{member.experience}</p>
              <p>{member.text}</p>
              <blockquote>"{member.quote}"</blockquote>
            </div>
          </article>
        ))}
      </div>
      <section className="ac-section">
        <div className="ac-section-title">
          <p className="ac-eyebrow">NILAI YANG KAMI PEGANG</p>
          <h2>Kepercayaan dimulai dari cara kami bekerja.</h2>
        </div>
        <div className="ac-value-grid">
          {[
            {
              Icon: ShieldCheck,
              title: "Integritas",
              text: "Menjalankan bisnis dengan transparansi dan kejujuran.",
            },
            {
              Icon: HeartHandshake,
              title: "Nasabah sebagai prioritas",
              text: "Memahami kebutuhan dan mengutamakan kualitas pelayanan.",
            },
            {
              Icon: Lightbulb,
              title: "Inovasi",
              text: "Mengembangkan cara yang lebih baik untuk melayani kebutuhan pendanaan.",
            },
            {
              Icon: Target,
              title: "Kualitas",
              text: "Menjaga standar layanan dalam setiap tahap pengajuan.",
            },
          ].map(({ Icon, title, text }) => (
            <article className="ac-value" key={title}>
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </PublicPage>
  );
}
