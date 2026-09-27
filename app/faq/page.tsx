import PublicPage, { ContactBand } from "@/components/PublicPage";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Pengajuan & Proses",
    items: [
      {
        q: "Berapa limit pendanaan yang bisa diajukan?",
        a: "AGGRE CAPITAL menyediakan limit pendanaan mulai dari Rp 100 juta. Besaran limit disesuaikan dengan profil dan kemampuan finansial pemohon.",
      },
      {
        q: "Berapa lama proses pengajuan pendanaan?",
        a: "Proses pengajuan pendanaan di AGGRE CAPITAL dirancang cepat dan efisien. Setelah dokumen lengkap diterima, tim kami akan memproses dan memberikan keputusan dalam waktu singkat. Hubungi kami untuk informasi lebih lanjut mengenai estimasi waktu proses.",
      },
      {
        q: "Bagaimana cara mengajukan pendanaan?",
        a: "Pengajuan bisa dilakukan melalui halaman Pengajuan di website kami, atau dengan menghubungi tim AGGRE CAPITAL di +62 21 27881921. Tim kami akan memandu Anda melalui proses pengajuan.",
      },
      {
        q: "Apakah bisa mengajukan secara online?",
        a: "Ya, AGGRE CAPITAL menyediakan formulir pengajuan online yang bisa diakses 24 jam. Isi data diri dan kebutuhan pendanaan Anda, lalu tim kami akan menghubungi Anda untuk tindak lanjut.",
      },
    ],
  },
  {
    category: "Syarat & Dokumen",
    items: [
      {
        q: "Apa saja syarat pengajuan pendanaan?",
        a: "Siapkan informasi identitas, pekerjaan atau usaha, kebutuhan dana, dan jaminan yang akan diajukan. Persyaratan serta kelayakan pengajuan mengikuti produk dan mitra pembiayaan yang dipilih. Minta daftar persyaratan kepada tim sebelum menyiapkan dokumen.",
      },
      {
        q: "Dokumen apa saja yang diperlukan?",
        a: "Dokumen yang umumnya diperlukan antara lain: KTP, NPWP, slip gaji atau laporan keuangan usaha, dan dokumen pendukung lainnya sesuai jenis pendanaan. Tim kami akan memberikan checklist dokumen lengkap setelah konsultasi awal.",
      },
      {
        q: "Apakah perlu agunan atau jaminan?",
        a: "Layanan yang ditampilkan di website mencakup pembiayaan dengan jaminan sertifikat SHM atau SHGB. Penerimaan dan penilaian jaminan mengikuti pemeriksaan serta ketentuan mitra pembiayaan. Konsultasikan kondisi properti Anda kepada tim.",
      },
    ],
  },
  {
    category: "Produk & Layanan",
    items: [
      {
        q: "Apa itu pendanaan multiguna?",
        a: "Pendanaan multiguna adalah fasilitas pinjaman yang dapat digunakan untuk berbagai kebutuhan seperti modal usaha, renovasi rumah, biaya pendidikan, biaya pernikahan, atau kebutuhan finansial lainnya. Fleksibel dan bisa disesuaikan dengan tujuan Anda.",
      },
      {
        q: "Apa itu balloon payment?",
        a: "Balloon payment adalah skema pembayaran di mana sebagian besar pokok pinjaman dilunasi di akhir tenor. Skema ini cocok untuk nasabah yang ingin menikmati cicilan bulanan lebih ringan dengan melunasi sisa pokok di akhir periode.",
      },
      {
        q: "Berapa lama tenor atau jangka waktu cicilan?",
        a: "AGGRE CAPITAL menawarkan fleksibilitas tenor hingga 60 bulan (5 tahun), sehingga cicilan bulanan bisa disesuaikan dengan kemampuan finansial Anda.",
      },
      {
        q: "Apakah bisa melakukan take over dari bank atau lembaga lain?",
        a: "Ya, AGGRE CAPITAL melayani take over pinjaman dari bank atau lembaga keuangan lain. Hubungi tim kami untuk mengetahui syarat dan ketentuan take over yang berlaku.",
      },
      {
        q: "Untuk kebutuhan apa saja pendanaan bisa digunakan?",
        a: "Pendanaan AGGRE CAPITAL bisa digunakan untuk: modal usaha & pengembangan bisnis, renovasi atau pembelian properti, biaya pendidikan, biaya pernikahan, take over pinjaman, dan kebutuhan finansial produktif lainnya.",
      },
    ],
  },
  {
    category: "Legalitas & Kepercayaan",
    items: [
      {
        q: "Apakah AGGRE CAPITAL terdaftar dan diawasi OJK?",
        a: "AGGRE CAPITAL beroperasi sesuai dengan regulasi yang berlaku di Indonesia. Untuk informasi lebih detail mengenai legalitas dan perizinan, silakan hubungi tim kami atau kunjungi kantor kami di Menara Sentraya Lantai 18, Jakarta Selatan.",
      },
      {
        q: "Apakah data pribadi saya aman?",
        a: "Keamanan data nasabah adalah prioritas utama AGGRE CAPITAL. Semua data yang diberikan dijaga kerahasiaannya sesuai dengan Kebijakan Privasi dan regulasi perlindungan data yang berlaku di Indonesia.",
      },
      {
        q: "Di daerah mana saja AGGRE CAPITAL melayani?",
        a: "Kantor pusat AGGRE CAPITAL berada di Menara Sentraya Lantai 18, Jakarta Selatan. Hubungi tim melalui halaman Kontak untuk memastikan ketersediaan layanan di wilayah Anda dan lokasi properti yang akan dijaminkan.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <PublicPage
      eyebrow="Pertanyaan umum"
      title="Jawaban untuk langkah yang lebih pasti."
      description="Kenali layanan, persyaratan, dan proses pengajuan sebelum memulai."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.flatMap((group) =>
              group.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            ),
          }),
        }}
      />
      <div className="ac-sidebar-layout">
        <aside className="ac-aside">
          <p className="ac-eyebrow">TOPIK PERTANYAAN</p>
          <nav aria-label="Kategori FAQ">
            {faqs.map((group, index) => (
              <a key={group.category} href={"#faq-" + index}>
                <span>0{index + 1}</span>
                {group.category}
              </a>
            ))}
          </nav>
          <p>Belum menemukan jawaban?</p>
          <Link href="/kontak" className="ac-text-link">
            Hubungi tim kami ↗
          </Link>
        </aside>
        <div className="ac-faq-groups">
          {faqs.map((group, index) => (
            <section
              id={"faq-" + index}
              key={group.category}
              className="ac-faq-group"
            >
              <p className="ac-eyebrow">0{index + 1}</p>
              <h2>{group.category}</h2>
              <div>
                {group.items.map((item) => (
                  <details className="ac-faq-item" key={item.q}>
                    <summary>{item.q}<ChevronDown size={20} aria-hidden="true" /></summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <ContactBand />
    </PublicPage>
  );
}
