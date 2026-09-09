"use client";

import { useState } from "react";
import PublicPage from "@/components/PublicPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Send,
  MessageSquare,
  Navigation,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomor: "",
    pesan: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nama,
          email: formData.email,
          phone: formData.nomor,
          message: formData.pesan,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ nama: "", email: "", nomor: "", pesan: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicPage
      eyebrow="Kontak"
      title="Rencana besar dimulai dari percakapan."
      description="Ceritakan kebutuhan pendanaan Anda. Kami siap membantu menjelaskan pilihan dan tahap berikutnya."
    >
      <div className="ac-contact-grid">
        <aside className="ac-contact-info">
          <p className="ac-eyebrow">HUBUNGI KAMI</p>
          <h2>Terhubung dengan tim AGGRE CAPITAL.</h2>
          <a href="tel:+622127881921">
            <Phone size={22} aria-hidden="true" />
            <span>
              <small>Telepon</small>+62 21 27881921
            </span>
          </a>
          <a href="mailto:corp@aggrecapital.com">
            <Mail size={22} aria-hidden="true" />
            <span>
              <small>Email</small>corp@aggrecapital.com
            </span>
          </a>
          <div>
            <MapPin size={22} aria-hidden="true" />
            <span>
              <small>Kantor pusat</small>Menara Sentraya, Lantai 18
              <br />
              Jl. Iskandarsyah Raya No. 1 A<br />
              Melawai, Kebayoran Baru
              <br />
              Jakarta Selatan 12160
            </span>
          </div>
          <div>
            <Clock size={22} aria-hidden="true" />
            <span>
              <small>Jam operasional</small>Senin–Jumat, 08.00–17.00 WIB
            </span>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Menara+Sentraya+Jakarta"
            target="_blank"
            rel="noopener noreferrer"
            className="ac-text-link"
          >
            Lihat lokasi di peta ↗
          </a>
        </aside>
        <section className="ac-form-panel ac-form">
          <p className="ac-eyebrow">KONSULTASI & PERTANYAAN</p>
          <h2>Kirim pesan Anda.</h2>
          <p className="ac-form-note">
            Isi kontak yang dapat dihubungi. Kolom bertanda * wajib diisi.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="nama"
                  className="text-sm font-semibold text-gray-700"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleInputChange("nama", e.target.value)}
                  className="mt-2"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="nomor"
                  className="text-sm font-semibold text-gray-700"
                >
                  Nomor Telepon <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nomor"
                  value={formData.nomor}
                  onChange={(e) => handleInputChange("nomor", e.target.value)}
                  className="mt-2"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-2"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="pesan"
                className="text-sm font-semibold text-gray-700"
              >
                Pesan / Pertanyaan <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="pesan"
                value={formData.pesan}
                onChange={(e) => handleInputChange("pesan", e.target.value)}
                className="mt-2"
                placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                rows={6}
                required
              />
            </div>

            {submitStatus === "success" && (
              <div
                role="status"
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
              >
                Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
              </div>
            )}
            {submitStatus === "error" && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
              >
                Gagal mengirim pesan. Silakan coba lagi atau hubungi kami
                langsung.
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
            </Button>
          </form>
        </section>
      </div>
    </PublicPage>
  );
}
