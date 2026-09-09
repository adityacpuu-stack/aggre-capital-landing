'use client';

import { jsPDF } from 'jspdf';
import { Download, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ApplicationData {
  id: number;
  application_id: string;
  customer_name: string;
  email: string;
  phone: string;
  amount: string;
  purpose: string;
  alamat: string;
  pekerjaan: string;
  tempat_kerja: string;
  alamat_kantor: string;
  nama_istri: string;
  jenis_jaminan: string;
  alamat_jaminan: string;
  nomor_ktp: string;
  tempat_tanggal_lahir: string;
  nama_ibu: string;
  pendidikan_terakhir: string;
  aset_atas_nama: string;
  nomor_hp_pasangan: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ApplicationPDFExportProps {
  application: ApplicationData;
}

export default function ApplicationPDFExport({ application }: ApplicationPDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numAmount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#f59e0b'; // amber-500 (warning)
      case 'reviewing':
        return '#0d9488'; // teal-600 (brand color)
      case 'approved':
        return '#16a34a'; // green-600 (success)
      case 'rejected':
        return '#dc2626'; // red-600 (error)
      default:
        return '#0d9488'; // teal-600 (default brand color)
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Menunggu Review';
      case 'reviewing':
        return 'Sedang Direview';
      case 'approved':
        return 'Disetujui';
      case 'rejected':
        return 'Ditolak';
      default:
        return status;
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Website Brand Colors
      const primaryColor = '#0d9488'; // teal-600 (main brand color)
      const accentColor = '#0f766e'; // teal-700 (darker accent)
      const sectionBg = '#f0fdfa'; // teal-50 (light background)
      const textColor = '#134e4a'; // teal-900 (dark text)
      const lightText = '#0d9488'; // teal-600 (medium text)
      const borderColor = '#ccfbf1'; // teal-100 (light border)

      // Margins and layout
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = 0;

      // The background reaches the paper edges, while all footer text stays
      // inside the page margins and away from the bottom edge.
      const footerHeight = 35;
      const footerTop = pageHeight - footerHeight;
      const contentBottom = footerTop - 10;
      const continuationTop = 30;
      const newContentPage = () => {
        doc.addPage();
        yPosition = continuationTop;
      };
      const ensureSpace = (height: number) => {
        if (yPosition + height > contentBottom) newContentPage();
      };

      // Helper function for compact spacing
      const addCompactSection = (title: string, y: number) => {
        doc.setFillColor(sectionBg);
        doc.rect(margin, y, contentWidth, 7, 'F');
        doc.setDrawColor(borderColor);
        doc.setLineWidth(0.3);
        doc.rect(margin, y, contentWidth, 7, 'S');

        doc.setTextColor(accentColor);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(title, margin + 5, y + 5);

        return y + 10;
      };

      // Lay out both columns together, including wrapped labels. A row must
      // fit above the footer; unusually long rows continue on the next page.
      const addDataSection = (title: string, left: string[][], right: string[][]) => {
        const lineHeight = 4;
        const labelWidth = 33;
        const valueWidth = contentWidth / 2 - 10 - 35;
        const measure = (field?: string[]) => {
          if (!field?.[0]) return { label: [] as string[], value: [] as string[] };
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          const label: string[] = doc.splitTextToSize(field[0], labelWidth);
          doc.setFont('helvetica', 'normal');
          const value: string[] = doc.splitTextToSize(field[1] || 'Tidak diisi', valueWidth);
          return { label, value };
        };
        const rows = Array.from({ length: Math.max(left.length, right.length) }, (_, i) => {
          const cells = [measure(left[i]), measure(right[i])];
          const lines = Math.max(1, ...cells.flatMap(cell => [cell.label.length, cell.value.length]));
          return { cells, lines };
        });
        const sectionHeight = 10 + rows.reduce((height, row) => height + row.lines * lineHeight + 4, 0) + 8;
        // Keep short sections together without leaving a nearly empty page
        // when a section contains a very long address or description.
        if (sectionHeight <= 90) ensureSpace(sectionHeight);
        else ensureSpace(10 + Math.min(rows[0]?.lines || 1, 3) * lineHeight + 4);
        yPosition = addCompactSection(title, yPosition);
        for (const row of rows) {
          const rowHeight = row.lines * lineHeight + 4;
          if (rowHeight <= 70 && yPosition + rowHeight > contentBottom) {
            newContentPage();
            yPosition = addCompactSection(title + ' (lanjutan)', yPosition);
          }
          let offset = 0;
          while (offset < row.lines) {
            const capacity = Math.floor((contentBottom - yPosition - 4) / lineHeight);
            if (capacity < 1) {
              newContentPage();
              yPosition = addCompactSection(title + ' (lanjutan)', yPosition);
              continue;
            }
            const count = Math.min(capacity, row.lines - offset);
            row.cells.forEach((cell, index) => {
              const x = index === 0 ? margin + 5 : pageWidth / 2 + 5;
              doc.setFontSize(8);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(textColor);
              cell.label.slice(offset, offset + count).forEach((line, i) => doc.text(line, x, yPosition + i * lineHeight));
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(lightText);
              cell.value.slice(offset, offset + count).forEach((line, i) => doc.text(line, x + 35, yPosition + i * lineHeight));
            });
            yPosition += count * lineHeight + 4;
            offset += count;
          }
        }
        yPosition += 8;
      };

      // Header Section
      doc.setFillColor(primaryColor);
      doc.rect(0, 0, pageWidth, 35, 'F');

      // Company branding
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('AGGRE CAPITAL', margin, 18);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('Solusi Pendanaan Terpercaya', margin, 26);

      // Document info
      doc.setFontSize(9);
      doc.text(`ID: ${application.application_id}`, pageWidth - 80, 15);
      doc.text(`Tanggal: ${formatDate(new Date().toISOString()).split(',')[0]}`, pageWidth - 80, 20);

      // Status badge
      const statusText = getStatusText(application.status);
      const statusWidth = doc.getTextWidth(statusText) + 8;
      doc.setFillColor(getStatusColor(application.status));
      doc.roundedRect(pageWidth - statusWidth - 20, 23, statusWidth, 6, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(statusText, pageWidth - statusWidth - 16, 27);

      yPosition = 45;

      // Document Title
      doc.setTextColor(primaryColor);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('FORMULIR PENGAJUAN KREDIT', margin, yPosition);

      // Decorative line
      doc.setDrawColor(accentColor);
      doc.setLineWidth(1);
      doc.line(margin, yPosition + 3, margin + 120, yPosition + 3);

      yPosition += 12;

      addDataSection('INFORMASI PRIBADI', [
        ['Nama Lengkap', application.customer_name],
        ['Email', application.email],
        ['Nomor Telepon', application.phone],
        ['Nomor KTP', application.nomor_ktp],
        ['Alamat', application.alamat],
      ], [
        ['Tempat & Tanggal Lahir', application.tempat_tanggal_lahir],
        ['Nama Ibu Kandung', application.nama_ibu],
        ['Pendidikan Terakhir', application.pendidikan_terakhir],
      ]);
      addDataSection('INFORMASI PEKERJAAN', [
        ['Pekerjaan', application.pekerjaan],
        ['Nama Usaha / Tempat Kerja', application.tempat_kerja],
      ], [
        ['Alamat Kantor / Usaha', application.alamat_kantor],
      ]);
      addDataSection('INFORMASI PASANGAN', [
        ['Nama Pasangan', application.nama_istri],
      ], [
        ['Nomor HP Pasangan', application.nomor_hp_pasangan],
      ]);
      addDataSection('DETAIL PINJAMAN', [
        ['Jumlah Pinjaman', formatCurrency(application.amount)],
      ], [
        ['Tujuan Penggunaan', application.purpose],
      ]);
      addDataSection('INFORMASI JAMINAN', [
        ['Jenis Jaminan', application.jenis_jaminan],
        ['Alamat Jaminan', application.alamat_jaminan],
      ], [
        ['Aset atas nama', application.aset_atas_nama],
      ]);

      // Agreement text as separate paragraphs (like the form)
      const agreementTexts = [
        'Dengan ini menyatakan benar bahwa saya mengajukan permohonan pinjaman atau pendanaan kepada Aggre Capital dan segala informasi yang saya isi dan sampaikan BENAR adanya dan TANPA PAKSAAN dari pihak mana pun.',
        'Saya SETUJU untuk memberikan informasi atau Data yang saya isi atau upload pada Form Registrasi ini kepada Aggre Capital serta untuk diperiksa dan diserahkan kepada pihak ketiga lainnya atau kepada kredit biro.',
        'Saya SETUJU untuk mengikuti semua proses peminjaman dari Aggre Capital.',
        'Saya setuju dikemudian hari tidak akan melakukan tuntutatan dalam bentuk apapun kepada Aggre Capital.'
      ];

      // Keep the agreement and its consent box together when possible.
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const agreementHeight = 10 + 40 + agreementTexts.reduce((height, text) =>
        height + doc.splitTextToSize(text, contentWidth - 10).length * 4.5 + 6, 0);
      ensureSpace(agreementHeight);
      yPosition = addCompactSection('PERJANJIAN DAN PERSETUJUAN', yPosition);

      agreementTexts.forEach((text) => {
        // Measure with the same font settings used to render the paragraph.
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        const splitText: string[] = doc.splitTextToSize(text, contentWidth - 10);
        const paragraphHeight = splitText.length * 4.5 + 6;
        if (yPosition + paragraphHeight > contentBottom) {
          newContentPage();
          yPosition = addCompactSection('PERJANJIAN DAN PERSETUJUAN (lanjutan)', yPosition);
        }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(textColor);
        splitText.forEach((line) => {
          doc.text(line, margin + 5, yPosition);
          yPosition += 4.5;
        });
        yPosition += 6;
      });

      // Keep the complete consent box above the footer.
      ensureSpace(40);
      yPosition += 10;

      // Checkbox area
      doc.setDrawColor(primaryColor);
      doc.setLineWidth(0.5);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 30);
      
      yPosition += 10;
      
      // Checkbox
      doc.setDrawColor(primaryColor);
      doc.setLineWidth(1);
      doc.rect(margin + 10, yPosition - 2, 8, 8);
      
      // Checkbox label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryColor);
      doc.text('SAYA SETUJU *', margin + 25, yPosition + 5);
      
      yPosition += 30;

      // Professional Footer - Add to all pages
      const addFooter = (pageNumber: number) => {
        const footerY = footerTop;

        // Footer background
        doc.setFillColor(primaryColor);
        doc.rect(0, footerY, pageWidth, footerHeight, 'F');

        // Footer content
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('AGGRE CAPITAL | Dokumen Rahasia', margin, footerY + 8);
        doc.text(`Dibuat pada: ${formatDate(new Date().toISOString())}`, margin, footerY + 13);

        doc.text('Status Aplikasi:', pageWidth - 80, footerY + 8);
        doc.setFont('helvetica', 'bold');
        doc.text(getStatusText(application.status), pageWidth - 80, footerY + 13);

        // Page number
        doc.setFont('helvetica', 'normal');
        doc.text(`Halaman ${pageNumber}`, pageWidth - margin, footerY + 8, { align: 'right' });
      };

      // Add footer to all pages
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i);
      }

      // Save the PDF
      const fileName = `Pengajuan_${application.application_id}_${application.customer_name.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {isGenerating ? 'Membuat PDF...' : 'Export PDF'}
    </button>
  );
}
