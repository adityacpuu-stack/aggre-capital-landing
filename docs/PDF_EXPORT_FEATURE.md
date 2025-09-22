# PDF Export Feature

## Overview
Fitur export PDF untuk detail pengajuan kredit yang memungkinkan pengguna untuk mengunduh dokumen PDF profesional dari halaman detail pengajuan.

## Features
- **Professional Design**: Template PDF yang rapih dengan header perusahaan, warna branding, dan layout yang terorganisir
- **Complete Data**: Menampilkan semua data pengajuan yang relevan dalam format yang mudah dibaca
- **Status Indicator**: Visual indicator untuk status pengajuan dengan warna yang sesuai
- **Responsive Layout**: Layout yang optimal untuk format A4
- **Loading State**: Indikator loading saat PDF sedang dibuat

## Technical Implementation

### Dependencies
- `jspdf`: Library untuk generate PDF
- `html2canvas`: Library untuk convert HTML ke canvas (tidak digunakan dalam implementasi saat ini)

### File Structure
```
components/pdf/
└── ApplicationPDFExport.tsx    # Komponen utama untuk export PDF

app/pengajuan/[id]/
└── page.tsx                    # Halaman detail dengan tombol export
```

### Key Features

#### 1. Professional Header
- Logo perusahaan (AGGRE CAPITAL)
- Tagline perusahaan
- Application ID dan status
- Status indicator dengan warna

#### 2. Organized Sections
- **Data Pribadi**: Informasi personal debitur
- **Data Pekerjaan**: Informasi pekerjaan dan tempat kerja
- **Data Pasangan**: Informasi pasangan debitur
- **Data Pinjaman**: Detail pinjaman dan tujuan
- **Data Jaminan**: Informasi jaminan yang diberikan

#### 3. Data Formatting
- Currency formatting untuk jumlah pinjaman
- Date formatting untuk tanggal
- Status translation (pending → Menunggu Review)
- Fallback text untuk data kosong

#### 4. Visual Design
- Color scheme yang konsisten dengan branding
- Section headers dengan background color
- Proper spacing dan typography
- Professional footer dengan timestamp

## Usage

### Basic Usage
```tsx
import ApplicationPDFExport from "@/components/pdf/ApplicationPDFExport";

<ApplicationPDFExport application={applicationData} />
```

### Props
```typescript
interface ApplicationPDFExportProps {
  application: ApplicationData;
}
```

### Generated PDF Features
- **Filename**: `Pengajuan_{application_id}_{customer_name}.pdf`
- **Format**: A4 Portrait
- **Content**: Complete application details
- **Timestamp**: Generation date and time
- **Status**: Current application status

## Styling
- Primary Color: #0f766e (teal-700)
- Secondary Color: #14b8a6 (teal-500)
- Text Color: #374151 (gray-700)
- Light Background: #f3f4f6 (gray-100)

## Error Handling
- Try-catch untuk error generation
- User-friendly error messages
- Loading state management
- Graceful fallback untuk data kosong

## Recent Improvements (v3.0 - Single Page Layout)

### Single Page Design
- **One Page Layout**: All application details now fit on a single A4 page
- **Two Column Layout**: Data is organized in 2 columns to maximize space efficiency
- **Compact Font Sizes**: Reduced font sizes (8pt for data, 10pt for headers) to fit more content
- **Optimized Spacing**: Reduced spacing between fields and sections for better space utilization
- **No Page Breaks**: Removed page break logic since everything fits on one page

### Layout Improvements
- **Text Overflow Handling**: Long text automatically wraps to multiple lines
- **Aligned Values**: All field values are properly aligned in their respective columns
- **Consistent Layout**: All sections use the same 2-column layout system
- **Compact Headers**: Section headers are smaller and more space-efficient
- **Streamlined Footer**: Footer information is condensed into a single line

### Technical Improvements
- **Dynamic Text Wrapping**: Uses `doc.splitTextToSize()` to handle long addresses and text
- **Page Break Detection**: `checkPageBreak()` function prevents content from being cut off
- **Better Footer Positioning**: Footer always appears at the bottom of the page
- **Responsive Layout**: Content adapts to different text lengths

### Visual Enhancements
- **No More Text Overlap**: Fixed the issue where "Nomor KTP" overlapped with "Alamat"
- **Professional Spacing**: Consistent 8mm spacing between all fields
- **Clean Section Breaks**: Each section starts on a new page if needed
- **Better Readability**: Improved text positioning and alignment

## Future Enhancements
- Custom PDF templates
- Watermark support
- Digital signature
- Batch export functionality
- Email integration
