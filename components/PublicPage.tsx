import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
export default function PublicPage({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"ac-site " + className}>
      <SiteHeader />
      <main id="main-content">
        <section className="ac-page-intro">
          <div className="ac-container">
            <nav aria-label="Breadcrumb" className="ac-breadcrumb">
              <Link href="/">Beranda</Link>
              <span>/</span>
              <span>{eyebrow}</span>
            </nav>
            {title && (
              <div className="ac-intro-grid">
                <div>
                  <p className="ac-eyebrow">AGGRE CAPITAL / {eyebrow}</p>
                  <h1>{title}</h1>
                </div>
                {description && <p className="ac-lead">{description}</p>}
              </div>
            )}
          </div>
        </section>
        <div className="ac-container ac-content">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
export function ContactBand() {
  return (
    <section className="ac-contact-band">
      <div>
        <p className="ac-eyebrow">MULAI PERCAKAPAN</p>
        <h2>Mari bicarakan rencana Anda.</h2>
        <p>Tim kami siap membantu menemukan pilihan pendanaan yang sesuai.</p>
      </div>
      <Link href="/kontak" className="ac-button">
        Konsultasi gratis <ArrowUpRight size={19} aria-hidden="true" />
      </Link>
    </section>
  );
}
