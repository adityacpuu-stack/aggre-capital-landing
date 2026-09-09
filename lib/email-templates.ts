import { escapeHtml } from "@/lib/sanitize";
import { SITE_URL } from "@/lib/site-metadata";

export const ALLOWED_STATUSES = [
  "pending",
  "reviewing",
  "approved",
  "rejected",
] as const;
export type ApplicationStatus = (typeof ALLOWED_STATUSES)[number];
export function isAllowedStatus(value: unknown): value is ApplicationStatus {
  return (
    typeof value === "string" &&
    (ALLOWED_STATUSES as readonly string[]).includes(value)
  );
}

type Detail = readonly [string, string];
type EmailContent = {
  subject: string;
  preheader: string;
  category: string;
  title: string;
  greeting: string;
  introduction: string;
  applicationId?: string;
  status?: { label: string; color: string; background: string };
  details?: Detail[];
  sectionTitle: string;
  paragraphs: string[];
  note?: string;
  action?: { label: string; path: string };
  internal?: boolean;
};

const plainSubject = (value: string) => value.replace(/[\r\n]+/g, " ");
const lines = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");

// Table layout and inline styles keep the core layout independent of CSS support.
// All content values are escaped here; callers supply text, never raw HTML.
function renderEmail(content: EmailContent) {
  const action = content.action || {
    label: "Hubungi tim kami",
    path: "/kontak",
  };
  const actionUrl = new URL(action.path, SITE_URL).href;
  const year = new Date().getFullYear();
  const details = (content.details || [])
    .map(
      ([label, value]) => `
    <tr><td style="padding:12px 0;border-bottom:1px solid #dce5dd;word-break:break-word;overflow-wrap:anywhere;">
      <p style="margin:0 0 4px;font-size:12px;line-height:18px;color:#62736a;">${escapeHtml(label)}</p>
      <p style="margin:0;font-size:15px;line-height:23px;color:#153f32;">${lines(value)}</p>
    </td></tr>`,
    )
    .join("");
  const footer = content.internal
    ? "Notifikasi internal AGGRE CAPITAL. Gunakan informasi ini hanya untuk menindaklanjuti permintaan terkait."
    : "Email otomatis terkait pengajuan Anda. Untuk pertanyaan, gunakan halaman kontak dan sertakan nomor pengajuan.";
  const html = `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(content.subject)}</title>
<style>body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}table{border-collapse:collapse}a{color:#285c43}@media only screen and (max-width:620px){.email-outer{padding:12px 8px!important}.email-pad{padding-left:22px!important;padding-right:22px!important}.email-title{font-size:26px!important;line-height:33px!important}}</style></head>
<body style="margin:0;padding:0;width:100%;background-color:#f4f7f2;font-family:Arial,Helvetica,sans-serif;color:#153f32;">
<div style="display:none;font-size:1px;line-height:1px;color:#f4f7f2;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(content.preheader)}</div>
<table role="presentation" width="100%" bgcolor="#f4f7f2"><tr><td class="email-outer" align="center" style="padding:32px 12px;">
<!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
<table role="presentation" width="100%" bgcolor="#ffffff" style="width:100%;max-width:600px;table-layout:fixed;">
  <tr><td bgcolor="#c1f879" height="5" style="height:5px;font-size:0;line-height:0;">&nbsp;</td></tr>
  <tr><td class="email-pad" bgcolor="#0d3027" style="padding:30px 40px;">
    <p style="margin:0;color:#ffffff;font-size:22px;line-height:28px;font-weight:700;letter-spacing:2px;">AGGRE CAPITAL</p>
    <p style="margin:8px 0 0;color:#c1f879;font-size:11px;line-height:18px;letter-spacing:1.5px;">${escapeHtml(content.category.toUpperCase())}</p>
  </td></tr>
  <tr><td class="email-pad" style="padding:36px 40px 32px;word-break:break-word;overflow-wrap:anywhere;">
    <h1 class="email-title" style="margin:0 0 24px;font-size:30px;line-height:38px;letter-spacing:-0.5px;color:#153f32;">${escapeHtml(content.title)}</h1>
    <p style="margin:0 0 12px;font-size:15px;line-height:25px;">${escapeHtml(content.greeting)}</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:25px;color:#4e6157;">${escapeHtml(content.introduction)}</p>
    ${
      content.applicationId
        ? `<table role="presentation" width="100%" bgcolor="#f4f7f2" style="table-layout:fixed;border:1px solid #dce5dd;"><tr><td style="padding:20px;word-break:break-all;">
      <p style="margin:0 0 8px;font-size:11px;line-height:18px;letter-spacing:1px;color:#62736a;">NOMOR PENGAJUAN</p>
      <p style="margin:0;font-family:'Courier New',monospace;font-size:19px;line-height:28px;font-weight:700;color:#153f32;">${escapeHtml(content.applicationId)}</p>
      ${content.status ? `<p style="margin:12px 0 0;font-size:12px;line-height:22px;"><span style="display:inline-block;padding:3px 10px;background-color:${content.status.background};color:${content.status.color};font-weight:700;">${escapeHtml(content.status.label)}</span></p>` : ""}
    </td></tr></table>`
        : ""
    }
    ${details ? `<table role="presentation" width="100%" style="margin-top:12px;table-layout:fixed;">${details}</table>` : ""}
    <h2 style="margin:28px 0 12px;font-size:17px;line-height:25px;color:#153f32;">${escapeHtml(content.sectionTitle)}</h2>
    ${content.paragraphs.map((p) => `<p style="margin:0 0 12px;font-size:14px;line-height:24px;color:#4e6157;">${lines(p)}</p>`).join("")}
    ${content.note ? `<p style="margin:18px 0 0;padding:14px 16px;border-left:3px solid #90bd59;background-color:#f4f7f2;color:#4e6157;font-size:13px;line-height:22px;">${lines(content.note)}</p>` : ""}
    <table role="presentation" style="margin-top:26px;"><tr><td bgcolor="#153f32" style="border:1px solid #153f32;border-radius:4px;mso-padding-alt:14px 22px;"><a href="${escapeHtml(actionUrl)}" style="display:inline-block;padding:14px 22px;font-size:14px;line-height:20px;font-weight:700;color:#ffffff;text-decoration:none;">${escapeHtml(action.label)}</a></td></tr></table>
    <p style="margin:28px 0 0;font-size:14px;line-height:23px;color:#4e6157;">Salam hangat,<br><strong style="color:#153f32;">Tim AGGRE CAPITAL</strong></p>
  </td></tr>
  <tr><td class="email-pad" bgcolor="#0d3027" style="padding:24px 40px;">
    <p style="margin:0 0 8px;font-size:12px;line-height:21px;color:#d9e6df;">${escapeHtml(footer)}</p>
    <p style="margin:0;font-size:11px;line-height:20px;color:#d9e6df;">&copy; ${year} AGGRE CAPITAL &nbsp;&middot;&nbsp; <a href="${SITE_URL}" style="color:#c1f879;text-decoration:underline;">aggrecapital.com</a></p>
  </td></tr>
</table><!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
  const text = [
    "AGGRE CAPITAL",
    content.title,
    content.greeting,
    content.introduction,
    content.applicationId && `Nomor pengajuan: ${content.applicationId}`,
    content.status && `Status: ${content.status.label}`,
    ...(content.details || []).map(([label, value]) => `${label}: ${value}`),
    content.sectionTitle,
    ...content.paragraphs,
    content.note,
    `${action.label}: ${actionUrl}`,
    "Salam hangat,\nTim AGGRE CAPITAL",
    footer,
    `© ${year} AGGRE CAPITAL — ${SITE_URL}`,
  ]
    .filter(Boolean)
    .join("\n\n");
  return { subject: plainSubject(content.subject), html, text };
}

const statusCopy = {
  pending: {
    title: "Pengajuan Anda telah diterima",
    label: "Menunggu peninjauan",
    color: "#72551b",
    background: "#f7edcf",
    introduction:
      "Terima kasih telah mengajukan pendanaan melalui AGGRE CAPITAL. Data pengajuan Anda telah kami terima dan akan ditinjau oleh tim kami.",
    paragraphs: [
      "Tim kami akan memeriksa data pengajuan dan menghubungi Anda untuk verifikasi atau kelengkapan dokumen.",
      "Pastikan nomor telepon Anda aktif. Simpan nomor pengajuan di atas sebagai referensi saat menghubungi tim kami.",
    ],
    note: "Penerimaan pengajuan belum merupakan persetujuan pendanaan.",
  },
  reviewing: {
    title: "Pengajuan Anda sedang ditinjau",
    label: "Dalam peninjauan",
    color: "#72551b",
    background: "#f7edcf",
    introduction:
      "Tim kami sedang meninjau data dan dokumen pengajuan pendanaan Anda.",
    paragraphs: [
      "Jika diperlukan informasi tambahan, tim kami akan menghubungi Anda melalui kontak yang tercantum pada pengajuan.",
      "Hasil peninjauan akan diinformasikan setelah proses evaluasi selesai.",
    ],
    note: "Simpan nomor pengajuan sebagai referensi komunikasi dengan tim kami.",
  },
  approved: {
    title: "Pengajuan Anda disetujui",
    label: "Disetujui",
    color: "#153f32",
    background: "#e4f2d9",
    introduction:
      "Kami informasikan bahwa pengajuan pendanaan Anda telah disetujui.",
    paragraphs: [
      "Tim kami akan menghubungi Anda untuk menjelaskan ketentuan persetujuan, dokumen yang perlu dilengkapi, dan tahapan selanjutnya.",
    ],
    note: "Pencairan mengikuti pemenuhan persyaratan dan ketentuan yang disampaikan oleh tim kami.",
  },
  rejected: {
    title: "Informasi hasil pengajuan Anda",
    label: "Belum disetujui",
    color: "#8b3d36",
    background: "#f8e9e7",
    introduction:
      "Terima kasih atas kepercayaan Anda kepada AGGRE CAPITAL. Berdasarkan hasil peninjauan, pengajuan Anda belum dapat kami setujui saat ini.",
    paragraphs: [
      "Jika Anda memerlukan penjelasan lebih lanjut mengenai hasil pengajuan, silakan hubungi tim kami dengan menyertakan nomor pengajuan di atas.",
    ],
    note: "Kami menghargai waktu yang Anda luangkan untuk melengkapi proses pengajuan.",
  },
};

export function applicationEmail(input: {
  customerName?: string;
  applicationId: string;
  status: ApplicationStatus;
  submittedAt?: Date;
  amount?: number;
  purpose?: string;
  message?: string;
}) {
  const variant = statusCopy[input.status];
  const details: Detail[] = [];
  if (input.submittedAt)
    details.push(["Tanggal pengajuan", formatEmailDate(input.submittedAt)]);
  if (input.amount !== undefined)
    details.push(["Nominal yang diajukan", formatAmount(input.amount)]);
  if (input.purpose) details.push(["Tujuan penggunaan", input.purpose]);
  return renderEmail({
    subject: `${variant.title} | ${input.applicationId} | AGGRE CAPITAL`,
    preheader: `${variant.label}. Nomor pengajuan ${input.applicationId}.`,
    category: "Layanan pengajuan pendanaan",
    title: variant.title,
    greeting: `Yth. ${input.customerName || "Bapak/Ibu"},`,
    introduction: variant.introduction,
    applicationId: input.applicationId,
    status: variant,
    details,
    sectionTitle:
      input.status === "rejected"
        ? "Informasi lebih lanjut"
        : "Langkah berikutnya",
    paragraphs: [
      ...variant.paragraphs,
      ...(input.message ? [input.message] : []),
    ],
    note: variant.note,
  });
}

export const formatAmount = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
export const formatEmailDate = (value: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(value) + " WIB";

export function adminApplicationEmail(input: {
  applicationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  purpose: string;
  status: string;
  submittedAt: Date;
  additionalDetails?: {
    address?: string;
    occupation?: string;
    workplace?: string;
    collateralType?: string;
    collateralAddress?: string;
  };
}) {
  const extra = input.additionalDetails;
  const details: Detail[] = [
    ["Nama pemohon", input.customerName],
    ["Email", input.customerEmail],
    ["Nomor telepon", input.customerPhone || "—"],
    ["Nominal yang diajukan", formatAmount(input.amount)],
    ["Tujuan penggunaan", input.purpose || "—"],
    ["Tanggal pengajuan", formatEmailDate(input.submittedAt)],
  ];
  for (const [label, value] of [
    ["Alamat", extra?.address],
    ["Pekerjaan", extra?.occupation],
    ["Tempat kerja", extra?.workplace],
    ["Jenis jaminan", extra?.collateralType],
    ["Alamat jaminan", extra?.collateralAddress],
  ]) {
    if (value) details.push([label!, value]);
  }
  return renderEmail({
    subject: `Pengajuan baru | ${input.applicationId} | AGGRE CAPITAL`,
    preheader: `Pengajuan ${input.applicationId} siap ditindaklanjuti.`,
    category: "Notifikasi internal",
    title: "Pengajuan baru masuk",
    greeting: "Yth. Tim AGGRE CAPITAL,",
    introduction:
      "Pengajuan berikut telah tercatat dalam sistem. Silakan tinjau data dan tindak lanjuti melalui dashboard.",
    applicationId: input.applicationId,
    status: isAllowedStatus(input.status)
      ? statusCopy[input.status]
      : undefined,
    details,
    sectionTitle: "Tindak lanjut",
    paragraphs: [
      "Periksa kelengkapan data, hubungi pemohon bila diperlukan, dan perbarui status pengajuan melalui dashboard.",
    ],
    action: { label: "Buka dashboard", path: "/dashboard" },
    internal: true,
  });
}

export function contactEmail(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return renderEmail({
    subject: `Pesan kontak | ${input.name} | AGGRE CAPITAL`,
    preheader: "Pesan baru dari formulir Hubungi Kami.",
    category: "Notifikasi internal",
    title: "Pesan baru dari website",
    greeting: "Yth. Tim AGGRE CAPITAL,",
    introduction: "Berikut pesan yang dikirim melalui formulir Hubungi Kami.",
    details: [
      ["Nama", input.name],
      ["Email", input.email],
      ["Nomor telepon", input.phone || "—"],
    ],
    sectionTitle: "Pesan pengirim",
    paragraphs: [input.message],
    note: "Gunakan Balas / Reply pada email ini untuk menghubungi pengirim.",
    action: { label: "Kunjungi website", path: "/" },
    internal: true,
  });
}

export function testEmail(message?: string) {
  return renderEmail({
    subject: "[TEST] Uji notifikasi email | AGGRE CAPITAL",
    preheader:
      "Email uji untuk memeriksa pengiriman dan tampilan notifikasi AGGRE CAPITAL.",
    category: "Pengujian notifikasi",
    title: "Email uji AGGRE CAPITAL",
    greeting: "Halo,",
    introduction:
      "Email ini dikirim untuk memeriksa pengiriman dan tampilan notifikasi AGGRE CAPITAL.",
    sectionTitle: "Detail pengujian",
    paragraphs: [
      message ||
        "Jika Anda dapat membaca email ini, email uji telah sampai ke alamat tujuan.",
    ],
    note: "Ini adalah email uji. Tidak ada pengajuan nasabah yang dibuat atau diubah melalui pengujian ini.",
    action: { label: "Kunjungi website", path: "/" },
    internal: true,
  });
}
