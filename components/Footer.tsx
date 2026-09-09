import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
export default function Footer() {
  return (
    <footer className="ac-footer">
      <div className="ac-container">
        <div className="ac-footer-grid">
          <div className="ac-footer-brand">
            <Link href="/" aria-label="AGGRE CAPITAL — Beranda">
              <Image
                src="/images/logo.png"
                alt="AGGRE CAPITAL"
                width={160}
                height={105}
              />
            </Link>
            <p>
              Partner pendanaan untuk bisnis yang tumbuh dan rencana yang terus
              bergerak.
            </p>
            <a
              href="https://www.instagram.com/aggrecapital"
              target="_blank"
              rel="noopener noreferrer"
              className="ac-social"
            >
              <Instagram size={19} aria-hidden="true" /> Instagram{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div>
            <h2>Jelajahi</h2>
            <nav aria-label="Tautan perusahaan">
              {[
                ["Layanan", "/#layanan"],
                ["Tim kami", "/team"],
                ["Mitra strategis", "/partners"],
                ["Cerita nasabah", "/testimoni"],
                ["Berita & insight", "/news"],
              ].map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>Kami siap membantu</h2>
            <nav aria-label="Bantuan">
              {[
                ["Ajukan pendanaan", "/pengajuan"],
                ["Konsultasi gratis", "/kontak"],
                ["Pertanyaan umum", "/faq"],
              ].map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
            <a
              href="mailto:corp@aggrecapital.com"
              className="ac-footer-contact"
            >
              <Mail size={17} aria-hidden="true" />
              corp@aggrecapital.com
            </a>
            <a href="tel:+622127881921" className="ac-footer-contact">
              <Phone size={17} aria-hidden="true" />
              +62 21 27881921
            </a>
          </div>
          <div>
            <h2>Kantor kami</h2>
            <p>
              Menara Sentraya, Lantai 18
              <br />
              Jl. Iskandarsyah Raya No. 1 A<br />
              Kebayoran Baru, Jakarta Selatan 12160
            </p>
            <p className="ac-office-hours">
              Senin–Jumat
              <br />
              08.00–17.00 WIB
            </p>
            <Link href="/kontak" className="ac-social">
              Detail lokasi <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="ac-footer-bottom">
          <p>© {new Date().getFullYear()} AGGRE CAPITAL</p>
          <nav aria-label="Informasi situs">
            <Link href="/privacy">Privasi</Link>
            <Link href="/terms">Syarat & ketentuan</Link>
            <Link href="/cookies">Cookie</Link>
            <Link href="/sitemap">Peta situs</Link>
          </nav>
          <a href="#top" aria-label="Kembali ke atas">
            Ke atas ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
