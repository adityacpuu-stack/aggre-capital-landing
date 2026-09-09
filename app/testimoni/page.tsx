"use client";

import { useState, useEffect } from "react";
import PublicPage, { ContactBand } from "@/components/PublicPage";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Star,
  Quote,
  User,
  Briefcase,
  Home,
  Building2,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const result = await apiClient.getTestimonials();
      if (
        result.success &&
        result.data &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        const transformedData = transformTestimonials(result.data as any[]);
        setTestimonials(transformedData);
      } else {
        setTestimonials(staticTestimonials);
      }
    } catch (error) {
      // Fallback to static data if API fails
      setTestimonials(staticTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return Briefcase;
      case "Home":
        return Home;
      case "Building2":
        return Building2;
      case "Heart":
        return Heart;
      default:
        return User;
    }
  };

  // Transform data from database to match frontend expectations
  const transformTestimonials = (testimonials: any[]) => {
    return testimonials.map((testimonial) => ({
      ...testimonial,
      icon: testimonial.icon || "User", // Ensure icon is always a string
      rating: parseInt(testimonial.rating) || 5, // Ensure rating is a number
      loan_amount_numeric: parseInt(testimonial.loan_amount_numeric) || 0,
    }));
  };
  const staticTestimonials = [
    {
      id: 1,
      name: "Bapak Angga",
      role: "Pengusaha",
      avatar: "/placeholder-user.jpg",
      content:
        "Awalnya saya sempat ragu mengingat riwayat pinjaman saya sebelumnya. Tetapi, Tim Aggre sangat ramah dan sabar dalam mencari solusi permasalahan saya. Saya bersyukur pinjaman saya akhirnya disetujui dan cair",
      rating: 5,
      category: "Modal Usaha",
      amount: "Rp 250 juta",
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Ibu Mita",
      role: "Ibu Rumah Tangga",
      avatar: "/placeholder-user.jpg",
      content:
        "Tim Aggre sangat membantu dari proses awal sampai dana cair. Proses pengajuan lebih terarah dan komunikasi yang baik membuat saya merasa nyaman",
      rating: 5,
      category: "Renovasi Rumah",
      amount: "Rp 150 juta",
      icon: Home,
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      name: "Ibu Usy",
      role: "Pemilik Usaha",
      avatar: "/placeholder-user.jpg",
      content:
        "Berkat bantuan Aggre usaha tambah maju, dibantu pendanaan usaha yang sesuai dengan kebutuhan saya. Terima kasih AGGRE CAPITAL!",
      rating: 5,
      category: "Pengembangan Usaha",
      amount: "Rp 300 juta",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      name: "Bapak Rudi",
      role: "Karyawan Swasta",
      avatar: "/placeholder-user.jpg",
      content:
        "Prosesnya sangat cepat dan mudah dipahami. Tim customer service selalu responsif menjawab pertanyaan saya. Dalam waktu 1 minggu dana sudah cair. Sangat membantu untuk kebutuhan mendesak saya.",
      rating: 5,
      category: "Dana Darurat",
      amount: "Rp 100 juta",
      icon: User,
      color: "from-red-500 to-red-600",
    },
    {
      id: 5,
      name: "Ibu Sari",
      role: "Pedagang",
      avatar: "/placeholder-user.jpg",
      content:
        "Saya sudah mencoba beberapa tempat pinjaman tapi tidak ada yang cocok. Di Aggre Capital, prosesnya transparan dan tidak ada biaya tersembunyi. Sangat direkomendasikan untuk yang butuh pendanaan cepat.",
      rating: 5,
      category: "Modal Usaha",
      amount: "Rp 200 juta",
      icon: Briefcase,
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 6,
      name: "Bapak Doni",
      role: "Wiraswasta",
      avatar: "/placeholder-user.jpg",
      content:
        "Tim Aggre membantu saya untuk take over pinjaman dari bank lain dengan bunga yang lebih kompetitif. Cicilan per bulan jadi lebih ringan dan prosesnya tidak berbelit-belit.",
      rating: 5,
      category: "Take Over",
      amount: "Rp 400 juta",
      icon: Building2,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 7,
      name: "Ibu Fitri",
      role: "Ibu Rumah Tangga",
      avatar: "/placeholder-user.jpg",
      content:
        "Alhamdulillah, dengan bantuan Aggre Capital pernikahan anak saya bisa terlaksana dengan lancar. Prosesnya cepat dan pelayanannya sangat baik. Tim nya profesional dan terpercaya.",
      rating: 5,
      category: "Dana Pernikahan",
      amount: "Rp 180 juta",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 8,
      name: "Bapak Joko",
      role: "Pegawai Negeri",
      avatar: "/placeholder-user.jpg",
      content:
        "Untuk biaya pendidikan anak, Aggre Capital memberikan solusi terbaik. Bunga kompetitif dan tenor yang fleksibel sesuai kemampuan bayar saya. Highly recommended!",
      rating: 5,
      category: "Dana Pendidikan",
      amount: "Rp 120 juta",
      icon: User,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <PublicPage
      eyebrow="Testimoni"
      title="Cerita mereka. Kepercayaan untuk melangkah."
      description="Pengalaman nasabah yang telah menjalani proses pendanaan bersama AGGRE CAPITAL."
    >
      {loading ? (
        <div className="ac-state" role="status">
          Memuat cerita nasabah…
        </div>
      ) : (
        <div className="ac-testimonial-grid">
          {testimonials.map((review, index) => (
            <article className="ac-testimonial" key={review.id}>
              <div className="ac-review-top">
                <span className="ac-pill">
                  {review.category || "Pengalaman nasabah"}
                </span>
                <Quote size={28} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div
                className="ac-stars"
                aria-label={
                  Math.min(5, Math.max(0, review.rating)) + " dari 5 bintang"
                }
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote>"{review.content}"</blockquote>
              <div className="ac-review-person">
                <span className="ac-initial" aria-hidden="true">
                  {review.name?.replace(/^(Bapak|Ibu) /, "").charAt(0)}
                </span>
                <div>
                  <h2>{review.name}</h2>
                  <p>{review.role}</p>
                </div>
              </div>
              {review.amount && (
                <p className="ac-review-amount">Pendanaan {review.amount}</p>
              )}
            </article>
          ))}
        </div>
      )}
      <ContactBand />
    </PublicPage>
  );
}
