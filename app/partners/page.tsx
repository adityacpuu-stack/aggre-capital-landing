"use client";

import { useState, useEffect } from "react";
import PublicPage, { ContactBand } from "@/components/PublicPage";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Building2,
  Handshake,
  Shield,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [additionalPartners, setAdditionalPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchPartners();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchPartners = async () => {
    try {
      // Add cache busting to ensure fresh data
      const result = await fetch(`/api/partners?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        const data = await result.json();
        if (data.success) {
          setPartners(data.data?.strategic_partners || []);
          setAdditionalPartners(data.data?.ecosystem_partners || []);
        }
      } else {
        throw new Error("Failed to fetch partners");
      }
    } catch (error) {
      console.error("Failed to fetch partners:", error);
      // Fallback to static data if API fails
      setPartners(staticPartners);
      setAdditionalPartners(staticAdditionalPartners);
    } finally {
      setLoading(false);
    }
  };
  const staticPartners = [
    {
      id: 1,
      name: "BPR OLYMPINDO",
      subtitle: "SEJAHTERA",
      logo: "/images/bpr-olympindo-sejahtera.png",
      established: "2010",
      location: "Jakarta, Indonesia",
      description:
        "BPR Olympindo Sejahtera adalah mitra strategis yang telah dipercaya dalam menyediakan solusi pendanaan berkualitas dengan fokus pada pelayanan prima dan kepercayaan nasabah.",
      services: [
        "Kredit Modal Kerja",
        "Kredit Investasi",
        "Kredit Konsumsi",
        "Simpanan Berjangka",
      ],
      achievements: [
        "Aset Rp 500+ Miliar",
        "15.000+ Nasabah Aktif",
        "Rating A- (Excellent)",
        "ISO 9001:2015 Certified",
      ],
      contact: {
        phone: "+62 21 7890 1111",
        email: "info@bpr-olympindo-sejahtera.co.id",
        address: "Jl. Sudirman No. 45, Jakarta Pusat",
      },
      color: "from-blue-500 to-blue-600",
      type: "BPR",
    },
    {
      id: 2,
      name: "BPR OLYMPINDO",
      subtitle: "PRIMADANA",
      logo: "/images/bpr-olympindo-primadana.png",
      established: "2012",
      location: "Jakarta, Indonesia",
      description:
        "BPR Olympindo Primadana hadir sebagai mitra terpercaya dalam ekosistem keuangan mikro dengan komitmen memberikan akses pendanaan yang mudah dan terjangkau bagi masyarakat.",
      services: [
        "Kredit Usaha Mikro",
        "Kredit Multiguna",
        "Kredit Kendaraan",
        "Tabungan & Deposito",
      ],
      achievements: [
        "Aset Rp 750+ Miliar",
        "20.000+ Nasabah Aktif",
        "Rating A (Very Good)",
        "Award Best BPR 2023",
      ],
      contact: {
        phone: "+62 21 7890 2222",
        email: "info@bpr-olympindo-primadana.co.id",
        address: "Jl. Thamrin No. 67, Jakarta Pusat",
      },
      color: "from-teal-500 to-teal-600",
      type: "BPR",
    },
    {
      id: 3,
      name: "BPR DHANA",
      subtitle: "SEMESTA",
      logo: "/images/bpr-dhana-semesta.png",
      established: "2015",
      location: "Jakarta, Indonesia",
      description:
        "BPR Dhana Semesta berkomitmen untuk memberikan solusi keuangan terbaik dengan tagline 'Bersama Menuju Sejahtera', melayani kebutuhan finansial masyarakat dengan profesional.",
      services: [
        "Kredit Properti",
        "Kredit Bisnis",
        "Kredit Personal",
        "Investasi Deposito",
      ],
      achievements: [
        "Aset Rp 400+ Miliar",
        "12.000+ Nasabah Aktif",
        "Rating B+ (Good)",
        "Best Growth 2023",
      ],
      contact: {
        phone: "+62 21 7890 3333",
        email: "info@bpr-dhanasemesta.co.id",
        address: "Jl. Kemang Raya No. 88, Jakarta Selatan",
      },
      color: "from-orange-500 to-orange-600",
      type: "BPR",
    },
  ];

  const staticAdditionalPartners = [
    {
      name: "Danamon",
      subtitle: "A member of MUFG",
      logo: "/images/danamon.png",
    },
    {
      name: "Bank Sampoerna",
      subtitle: "Trusted Financial Partner",
      logo: "/images/bank-sampoerna.png",
    },
    {
      name: "Venteny",
      subtitle: "Digital Innovation",
      logo: "/images/venteny.png",
    },
    {
      name: "Bank Dassa",
      subtitle: "PT Bank Perkreditan Rakyat",
      logo: "/images/bank-dassa.png",
    },
    {
      name: "Bank Bahtera Masyarakat",
      subtitle: "Melayani dengan Hati",
      logo: "/images/bbm.png",
    },
    {
      name: "KB Financial Group",
      subtitle: "Global Financial Services",
      logo: "/images/kb-financial.png",
    },
    {
      name: "Bank Vima",
      subtitle: "PT Bank Pembangunan Daerah Bali",
      logo: "/images/bank-vima.png",
    },
    { name: "Ralali", subtitle: "B2B Marketplace", logo: "/images/ralali.png" },
    {
      name: "MNC Finance",
      subtitle: "Multifinance Solutions",
      logo: "/images/mnc-finance.png",
    },
    { name: "Mekar", subtitle: "Fintech Platform", logo: "/images/mekar.png" },
    {
      name: "Pepper Advantage",
      subtitle: "Credit Solutions",
      logo: "/images/pepper-advantage.png",
    },
  ];

  const partnershipBenefits = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description:
        "Semua partner telah tersertifikasi OJK dan menerapkan standar keamanan tertinggi",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: "Pertumbuhan Berkelanjutan",
      description:
        "Track record pertumbuhan yang konsisten dengan manajemen risiko yang baik",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Award,
      title: "Prestasi Terbukti",
      description:
        "Meraih berbagai penghargaan dan sertifikasi dari lembaga kredibel",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Jaringan Luas",
      description:
        "Melayani ribuan nasabah dengan jangkauan layanan yang komprehensif",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <PublicPage
      eyebrow="Mitra strategis"
      title="Satu jaringan. Lebih banyak peluang."
      description="Kolaborasi dengan lembaga keuangan untuk menghadirkan pilihan pendanaan bagi kebutuhan Anda."
    >
      <div className="ac-toolbar">
        <div>
          <p className="ac-eyebrow">MITRA STRATEGIS</p>
          <h2>Bertumbuh melalui kolaborasi.</h2>
        </div>
        <Button variant="outline" onClick={fetchPartners} disabled={loading}>
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
            aria-hidden="true"
          />
          {loading ? "Memuat…" : "Perbarui"}
        </Button>
      </div>
      {loading ? (
        <div role="status" className="ac-state">
          Memuat jaringan mitra…
        </div>
      ) : (
        <>
          <div className="ac-partner-grid">
            {partners.map((partner, index) => (
              <article className="ac-partner-card" key={partner.id}>
                <div className="ac-partner-heading">
                  <span className="ac-pill">{partner.type || "Mitra"}</span>
                  <span>0{index + 1}</span>
                </div>
                <h2>
                  {partner.name}
                  <span>{partner.subtitle}</span>
                </h2>
                {partner.location && (
                  <p className="ac-location">
                    <MapPin size={16} aria-hidden="true" />
                    {partner.location}
                  </p>
                )}
                <p>{partner.description}</p>
                <div className="ac-tags">
                  {(partner.services || []).map((service: string) => (
                    <span key={service}>{service}</span>
                  ))}
                </div>
                <details className="ac-details">
                  <summary>Profil & kontak mitra</summary>
                  {partner.established && (
                    <p>Berdiri sejak {partner.established}</p>
                  )}
                  <ul>
                    {(partner.achievements || []).map((achievement: string) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  {partner.contact?.phone && (
                    <a
                      href={
                        "tel:" + partner.contact.phone.replace(/[^+0-9]/g, "")
                      }
                    >
                      {partner.contact.phone}
                    </a>
                  )}
                  {partner.contact?.email && (
                    <a href={"mailto:" + partner.contact.email}>
                      {partner.contact.email}
                    </a>
                  )}
                  {partner.contact?.address && <p>{partner.contact.address}</p>}
                </details>
              </article>
            ))}
          </div>
          <section className="ac-section">
            <div className="ac-section-title">
              <p className="ac-eyebrow">EKOSISTEM KAMI</p>
              <h2>Kemitraan yang saling melengkapi.</h2>
            </div>
            <div className="ac-ecosystem">
              {additionalPartners.map((partner) => (
                <article key={partner.id || partner.name}>
                  <Building2 size={25} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{partner.name}</h3>
                  <p>{partner.subtitle}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
      <ContactBand />
    </PublicPage>
  );
}
