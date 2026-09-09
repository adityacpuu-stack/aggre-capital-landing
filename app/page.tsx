"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CreditCard,
  GraduationCap,
  Heart,
  Home,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import TeamPortrait from "@/components/TeamPortrait";
import s from "./landing.module.css";

const services = [
  {
    icon: Building2,
    title: "Modal usaha",
    text: "Buka peluang baru. Dukung operasional dan langkah ekspansi bisnis Anda.",
    label: "Kembangkan bisnis",
  },
  {
    icon: Home,
    title: "Renovasi rumah",
    text: "Jadikan properti Anda ruang yang lebih nyaman untuk tumbuh bersama.",
    label: "Wujudkan ruang impian",
  },
  {
    icon: GraduationCap,
    title: "Biaya pendidikan",
    text: "Persiapkan langkah pendidikan berikutnya dengan pendanaan yang sesuai.",
    label: "Persiapkan masa depan",
  },
  {
    icon: ShieldCheck,
    title: "Kebutuhan darurat",
    text: "Diskusikan kebutuhan mendesak Anda dan pilihan pendanaan yang tersedia.",
    label: "Temukan solusi",
  },
  {
    icon: CreditCard,
    title: "Take over pinjaman",
    text: "Tinjau kembali pinjaman Anda untuk menemukan skema yang lebih sesuai.",
    label: "Atur kembali keuangan",
  },
  {
    icon: Heart,
    title: "Biaya pernikahan",
    text: "Rencanakan momen penting Anda dengan kebutuhan dana yang terarah.",
    label: "Rencanakan hari istimewa",
  },
];
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}
interface Partner {
  id: number;
  name: string;
  subtitle: string;
}

export default function AggreCapitalLanding() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    async function loadContent() {
      const results = await Promise.allSettled([
        fetch("/api/testimonials/public?featured=true&limit=3", {
          signal: controller.signal,
        }).then(async (r) => (r.ok ? r.json() : null)),
        fetch("/api/partners?featured=true", {
          signal: controller.signal,
        }).then(async (r) => (r.ok ? r.json() : null)),
      ]);
      if (controller.signal.aborted) return;
      const [reviews, network] = results;
      if (
        reviews.status === "fulfilled" &&
        reviews.value?.success &&
        Array.isArray(reviews.value.data)
      )
        setTestimonials(reviews.value.data.slice(0, 3));
      if (
        network.status === "fulfilled" &&
        network.value?.success &&
        Array.isArray(network.value.data?.strategic_partners)
      )
        setPartners(network.value.data.strategic_partners);
    }
    void loadContent();
    return () => controller.abort();
  }, []);
  return (
    <div className={s.site}>
      <SiteHeader />
      <main id="main-content">
        <section className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span /> PARTNER UNTUK LANGKAH BESAR ANDA
            </p>
            <h1 id="hero-title">
              Pendanaan untuk
              <br />
              <span>langkah besar Anda.</span>
            </h1>
            <p className={s.heroDescription}>
              Solusi pendanaan multiguna mulai Rp 100 juta. Untuk bisnis yang berkembang dan rencana hidup yang terus bergerak.
            </p>
            <div className={s.heroActions}>
              <Button asChild className={s.primaryButton}>
                <Link href="/pengajuan">
                  Ajukan pendanaan <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
              <Link href="/kontak" className={s.textLink}>
                Konsultasi gratis <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
            <div className={s.heroNote}>
              <Check size={16} aria-hidden="true" /> Pendampingan personal, dari
              awal pengajuan.
            </div>
          </div>
          <div className={s.heroVisual}>
            <Image
              src="/images/banner.jpg"
              alt="AGGRE CAPITAL — Solusi pinjaman kebutuhan Anda"
              width={1200}
              height={800}
              sizes="(max-width: 760px) 100vw, 48vw"
              priority
              className={s.heroImage}
            />
          </div>
          <a href="#layanan" className={s.explore}>
            KENALI SOLUSI KAMI <ArrowDown size={16} aria-hidden="true" />
          </a>
        </section>
        <section className={s.facts} aria-label="Pilihan pendanaan">
          <div>
            <span>01 / LIMIT PENDANAAN</span>
            <strong>
              Rp 100 juta<span> mulai dari</span>
            </strong>
          </div>
          <div>
            <span>02 / TENOR FLEKSIBEL</span>
            <strong>
              60 bulan<span> hingga</span>
            </strong>
          </div>
          <div>
            <span>03 / SKEMA PEMBAYARAN</span>
            <strong>Balloon & installment</strong>
          </div>
        </section>
        <section
          id="layanan"
          className={s.section}
          aria-labelledby="services-title"
        >
          <div className={s.sectionHeading}>
            <div>
              <p className={s.sectionLabel}>01 — SOLUSI PENDANAAN</p>
              <h2 id="services-title">
                Banyak rencana.
                <br />
                <span>Satu partner pendanaan.</span>
              </h2>
            </div>
            <p>
              Setiap kebutuhan punya cerita.
              <br />
              Temukan dukungan pendanaan yang sesuai dengan langkah Anda
              berikutnya.
            </p>
          </div>
          <div className={s.serviceGrid}>
            {services.map((service, index) => (
              <Link
                href="/pengajuan"
                className={s.serviceCard}
                key={service.title}
              >
                <div className={s.serviceTop}>
                  <service.icon
                    size={27}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className={s.serviceBottom}>
                  {service.label}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section
          id="keunggulan"
          className={s.advantage}
          aria-labelledby="advantage-title"
        >
          <div className={s.advantageIntro}>
            <p className={s.sectionLabel}>02 — MENGAPA AGGRE CAPITAL</p>
            <h2 id="advantage-title">
              Lebih dari dana.
              <br />
              <span>
                Partner dalam
                <br />
                setiap langkah.
              </span>
            </h2>
            <p>
              Kami membantu Anda memahami pilihan pendanaan, agar setiap
              keputusan terasa lebih jelas dan terarah.
            </p>
            <Link href="/kontak" className={s.textLink}>
              Bicara dengan tim kami{" "}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <div>
            {[
              {
                title: "Satu pintu, lebih sederhana",
                text: "Akses solusi pendanaan dan pendampingan dalam satu layanan yang terintegrasi.",
              },
              {
                title: "Pendanaan sesuai kebutuhan",
                text: "Mulai Rp 100 juta, dengan limit yang disesuaikan dengan profil dan kebutuhan Anda.",
              },
              {
                title: "Pilihan pembayaran fleksibel",
                text: "Diskusikan skema balloon payment atau installment dengan tenor hingga 60 bulan.",
              },
              {
                title: "Pendampingan dari awal",
                text: "Tim kami membantu Anda menyiapkan pengajuan dan memahami tahapan prosesnya.",
              },
            ].map((item, index) => (
              <div className={s.advantageItem} key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <ArrowUpRight size={23} aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>
        <section className={s.section} aria-labelledby="team-title">
          <div className={s.sectionHeading}>
            <div>
              <p className={s.sectionLabel}>03 — TIM KAMI</p>
              <h2 id="team-title">
                Pengalaman yang membangun
                <br />
                <span>kepercayaan.</span>
              </h2>
            </div>
            <Link href="/team" className={s.darkLink}>
              Kenali tim kami <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.teamGrid}>
            {[
              {
                name: "Rian",
                role: "Founder",
                image: "/images/rians.png",
                description: "Lebih dari 10 tahun di institusi keuangan.",
              },
              {
                name: "Silvester",
                role: "Co-founder",
                image: "/images/adi.png",
                description:
                  "Lebih dari 10 tahun di institusi keuangan & fintech.",
              },
            ].map((person) => (
              <article className={s.teamCard} key={person.name}>
                <TeamPortrait
                  person={person.name === "Rian" ? "rian" : "silvester"}
                />
                <div className={s.teamInfo}>
                  <span>{person.role}</span>
                  <h3>{person.name}</h3>
                  <p>{person.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        {testimonials.length > 0 && (
          <section
            className={`${s.section} ${s.testimonials}`}
            aria-labelledby="testimonials-title"
          >
            <div className={s.sectionHeading}>
              <div>
                <p className={s.sectionLabel}>CERITA NASABAH</p>
                <h2 id="testimonials-title">
                  Langkah mereka.
                  <br />
                  <span>Inspirasi untuk Anda.</span>
                </h2>
              </div>
              <Link href="/testimoni" className={s.darkLink}>
                Semua testimoni <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
            <div className={s.reviewGrid}>
              {testimonials.map((review) => (
                <article className={s.reviewCard} key={review.id}>
                  <div
                    className={s.stars}
                    aria-label={`${Math.max(0, Math.min(5, review.rating))} dari 5 bintang`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill={index < review.rating ? "currentColor" : "none"}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote>“{review.content}”</blockquote>
                  <div>
                    <strong>{review.name}</strong>
                    <p>{review.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        <section className={s.partners} aria-labelledby="partners-title">
          <div>
            <p className={s.sectionLabel}>JARINGAN KEMITRAAN</p>
            <h2 id="partners-title">Bertumbuh bersama.</h2>
          </div>
          <div className={s.partnerNames}>
            {partners.length > 0 ? (
              partners.map((partner) => (
                <Link href="/partners" key={partner.id}>
                  {partner.name}
                  <span>{partner.subtitle}</span>
                </Link>
              ))
            ) : (
              <p>
                Kenali jaringan mitra strategis
                <br />
                di balik layanan AGGRE CAPITAL.
              </p>
            )}
          </div>
          <Link href="/partners" className={s.darkLink}>
            Lihat mitra <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </section>
        <section className={s.cta} aria-labelledby="cta-title">
          <div>
            <p className={s.sectionLabel}>LANGKAH BESAR DIMULAI DI SINI</p>
            <h2 id="cta-title">
              Rencana Anda berikutnya?
              <br />
              Mari wujudkan bersama.
            </h2>
            <p>Ceritakan kebutuhan Anda. Tim kami siap membantu.</p>
          </div>
          <div className={s.ctaActions}>
            <Button asChild className={s.primaryButton}>
              <Link href="/pengajuan">
                Ajukan pendanaan <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Link href="/kontak" className={s.darkLink}>
              Konsultasi gratis <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
