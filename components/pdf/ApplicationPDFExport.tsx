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

      // Helper function for section headers
      const addSectionHeader = (title: string, y: number) => {
        doc.setFillColor(sectionBg);
        doc.rect(margin, y, contentWidth, 8, 'F');
        doc.setDrawColor(borderColor);
        doc.setLineWidth(0.3);
        doc.rect(margin, y, contentWidth, 8, 'S');

        doc.setTextColor(accentColor);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(title, margin + 5, y + 5.5);

        return y + 12;
      };

      // Helper function for compact data rows
      const addCompactDataRow = (label: string, value: string, x: number, y: number, width: number) => {
        doc.setTextColor(textColor);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(label, x, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(lightText);
        const lines = doc.splitTextToSize(value || 'Tidak diisi', width - 50);
        doc.text(lines, x + 45, y);

        return y + Math.max(lines.length * 4, 6) + 2;
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

      // Data Pribadi Section
      yPosition = addCompactSection('INFORMASI PRIBADI', yPosition);

      const personalDataLeft = [
        ['Nama Lengkap', application.customer_name],
        ['Email', application.email],
        ['Nomor Telepon', application.phone],
        ['Nomor KTP', application.nomor_ktp],
        ['Alamat', application.alamat],
      ];

      const personalDataRight = [
        ['Tempat & Tanggal Lahir', application.tempat_tanggal_lahir],
        ['Nama Ibu Kandung', application.nama_ibu],
        ['Pendidikan Terakhir', application.pendidikan_terakhir],
        ['', ''], // Empty for alignment
        ['', ''], // Empty for alignment
      ];

      let leftY = yPosition;
      let rightY = yPosition;

      personalDataLeft.forEach(([label, value]) => {
        if (label) {
          leftY = addCompactDataRow(label, value, margin + 5, leftY, contentWidth / 2 - 10);
        }
      });

      personalDataRight.forEach(([label, value]) => {
        if (label) {
          rightY = addCompactDataRow(label, value, pageWidth / 2 + 5, rightY, contentWidth / 2 - 10);
        }
      });

      yPosition = Math.max(leftY, rightY) + 8;

      // Data Pekerjaan Section
      yPosition = addCompactSection('INFORMASI PEKERJAAN', yPosition);

      const workDataLeft = [
        ['Pekerjaan', application.pekerjaan],
        ['Nama Usaha / Tempat Kerja', application.tempat_kerja],
      ];

      const workDataRight = [
        ['Alamat Kantor / Usaha', application.alamat_kantor],
        ['', ''], // Empty for alignment
      ];

      leftY = yPosition;
      rightY = yPosition;

      workDataLeft.forEach(([label, value]) => {
        leftY = addCompactDataRow(label, value, margin + 5, leftY, contentWidth / 2 - 10);
      });

      workDataRight.forEach(([label, value]) => {
        if (label) {
          rightY = addCompactDataRow(label, value, pageWidth / 2 + 5, rightY, contentWidth / 2 - 10);
        }
      });

      yPosition = Math.max(leftY, rightY) + 8;

      // Data Pasangan Section
      yPosition = addCompactSection('INFORMASI PASANGAN', yPosition);

      const spouseDataLeft = [
        ['Nama Pasangan', application.nama_istri],
      ];

      const spouseDataRight = [
        ['Nomor HP Pasangan', application.nomor_hp_pasangan],
      ];

      leftY = yPosition;
      rightY = yPosition;

      spouseDataLeft.forEach(([label, value]) => {
        leftY = addCompactDataRow(label, value, margin + 5, leftY, contentWidth / 2 - 10);
      });

      spouseDataRight.forEach(([label, value]) => {
        rightY = addCompactDataRow(label, value, pageWidth / 2 + 5, rightY, contentWidth / 2 - 10);
      });

      yPosition = Math.max(leftY, rightY) + 8;

      // Data Pinjaman Section
      yPosition = addCompactSection('DETAIL PINJAMAN', yPosition);

      const loanDataLeft = [
        ['Jumlah Pinjaman', formatCurrency(application.amount)],
      ];

      const loanDataRight = [
        ['Tujuan Penggunaan', application.purpose],
      ];

      leftY = yPosition;
      rightY = yPosition;

      loanDataLeft.forEach(([label, value]) => {
        leftY = addCompactDataRow(label, value, margin + 5, leftY, contentWidth / 2 - 10);
      });

      loanDataRight.forEach(([label, value]) => {
        rightY = addCompactDataRow(label, value, pageWidth / 2 + 5, rightY, contentWidth / 2 - 10);
      });

      yPosition = Math.max(leftY, rightY) + 8;

      // Data Jaminan Section
      yPosition = addCompactSection('INFORMASI JAMINAN', yPosition);

      const collateralDataLeft = [
        ['Jenis Jaminan', application.jenis_jaminan],
        ['Alamat Jaminan', application.alamat_jaminan],
      ];

      const collateralDataRight = [
        ['Aset atas nama', application.aset_atas_nama],
        ['', ''], // Empty for alignment
      ];

      leftY = yPosition;
      rightY = yPosition;

      collateralDataLeft.forEach(([label, value]) => {
        leftY = addCompactDataRow(label, value, margin + 5, leftY, contentWidth / 2 - 10);
      });

      collateralDataRight.forEach(([label, value]) => {
        if (label) {
          rightY = addCompactDataRow(label, value, pageWidth / 2 + 5, rightY, contentWidth / 2 - 10);
        }
      });

      yPosition = Math.max(leftY, rightY) + 12;

      // Check if we need a new page for agreement
      if (yPosition > pageHeight - 120) {
        doc.addPage();
        yPosition = 30;
      }

      // Perjanjian Section
      yPosition = addCompactSection('PERJANJIAN DAN PERSETUJUAN', yPosition);

      // Agreement text as separate paragraphs (like the form)
      const agreementTexts = [
        'Dengan ini menyatakan benar bahwa saya mengajukan permohonan pinjaman atau pendanaan kepada Aggre Capital dan segala informasi yang saya isi dan sampaikan BENAR adanya dan TANPA PAKSAAN dari pihak mana pun.',
        'Saya SETUJU untuk memberikan informasi atau Data yang saya isi atau upload pada Form Registrasi ini kepada Aggre Capital serta untuk diperiksa dan diserahkan kepada pihak ketiga lainnya atau kepada kredit biro.',
        'Saya SETUJU untuk mengikuti semua proses peminjaman dari Aggre Capital.',
        'Saya setuju dikemudian hari tidak akan melakukan tuntutatan dalam bentuk apapun kepada Aggre Capital.'
      ];

      agreementTexts.forEach((text, index) => {
        // Split text to fit in available width with better utilization
        const splitText = doc.splitTextToSize(text, pageWidth - 2 * margin - 10);
        
        // Add agreement text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(textColor);
        
        splitText.forEach((line: string, lineIndex: number) => {
          if (yPosition > pageHeight - 60) {
            // Add new page if not enough space
            doc.addPage();
            yPosition = 30;
          }
          
          // Align text to left without excessive indentation
          doc.text(line, margin + 5, yPosition);
          yPosition += 4.5;
        });
        
        yPosition += 6; // Space between paragraphs
      });

      // Signature section
      yPosition += 10;
      
      // Add new page if not enough space for signature
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 30;
      }

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
        const footerY = pageHeight - 25;

        // Footer background
        doc.setFillColor(primaryColor);
        doc.rect(0, footerY, pageWidth, 25, 'F');

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
        doc.text(`Halaman ${pageNumber}`, pageWidth - 25, footerY + 18);
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
