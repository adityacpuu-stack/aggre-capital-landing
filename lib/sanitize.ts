// Utilitas keamanan output untuk konten yang berasal dari input pengguna.
// Dipakai sebelum menyisipkan nilai apa pun ke dalam template HTML email.

/** Escape karakter HTML supaya input pengguna tidak bisa menyuntik markup/tautan. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Validasi format email dasar (mencegah header/isi email dikendalikan penuh oleh penyerang). */
export function isValidEmail(value: unknown): boolean {
  const s = String(value ?? '').trim()
  if (s.length === 0 || s.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}
