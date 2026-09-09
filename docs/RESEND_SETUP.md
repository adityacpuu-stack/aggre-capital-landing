# Notifikasi email melalui Resend

## Alur pengiriman

Vercel menjalankan API aplikasi. Setelah formulir pengajuan tersimpan di PostgreSQL, API menunggu respons dari HTTPS API Resend. Email konfirmasi memuat ID pengajuan. Email perubahan status dan pesan dari formulir kontak memakai pengirim yang sama.

`lib/resend-email.ts` adalah satu-satunya jalur transport email aplikasi. `lib/email-service.ts` dan `lib/email.ts` menggunakan pengirim ini. Tidak ada fallback otomatis ke SMTP. Endpoint SMTP lama mengembalikan 410 setelah autentikasi, dan pengaturan dashboard menampilkan konfigurasi Resend.

## Environment

Isi pada `.env.local` untuk lokal dan Environment Variables project Vercel `aggree1/aggre-capital-landing` untuk deployment yang dituju:

```dotenv
RESEND_API_KEY=
RESEND_FROM_EMAIL="AGGRE CAPITAL <notifikasi@pathfinder.co.id>"
RESEND_REPLY_TO=
EMAIL_DISABLED=false
ADMIN_EMAIL=alamat-penerima-notifikasi-admin@domain-anda.com
```

- API key harus server-side, tanpa prefix NEXT_PUBLIC. Simpan dalam environment, jangan commit ke Git.
- Alamat `RESEND_FROM_EMAIL` wajib memakai domain yang sudah diverifikasi di akun Resend. Tentukan nama dan alamat pengirim yang memang ingin dipakai; key tetap harus diisi melalui environment.
- `RESEND_REPLY_TO` opsional. Form kontak menggunakan email pengirim formulir sebagai reply-to, bukan sebagai from.
- Penerima form `/kontak` ditetapkan di server ke `corp@aggrecapital.com`, tanpa membaca `ADMIN_EMAIL` atau `EMAIL_USER`. Pengirim tetap mengikuti `RESEND_FROM_EMAIL`.
- Setelah mengubah environment di Vercel, redeploy agar runtime memakainya. Restart server lokal setelah perubahan `.env.local`.
- SMTP lama di environment/database tidak digunakan pengirim baru. Tidak perlu menghapus kredensial lama untuk menyiapkan migrasi.
- Konfigurasi sender/domain belum diverifikasi hanya dengan adanya environment; periksa status domain di Resend.

Referensi: [mengirim email](https://resend.com/docs/api-reference/emails/send-email), [verifikasi domain](https://resend.com/docs/dashboard/domains/introduction).

## Status notifikasi

API submit mengembalikan status pengajuan terpisah dari `notification.status`:

| Status | Arti |
| --- | --- |
| accepted | Resend sudah menerima permintaan dan memberikan ID email. Belum membuktikan email masuk inbox. |
| failed | Konfigurasi belum lengkap, input email tidak valid, atau provider menolak permintaan. |
| disabled | EMAIL_DISABLED=true; tidak ada permintaan email yang dikirim. |
| unknown | Respons jaringan tidak terkonfirmasi; periksa log Resend sebelum mencoba lagi. |

Kegagalan email tidak membatalkan pengajuan yang tersimpan. Nasabah tetap melihat ID pengajuan beserta informasi status email, sehingga tidak perlu mengirim ulang formulir. Ini belum merupakan antrean retry email yang persisten dan belum menyimpan status delivered/bounced dari webhook.

Request konfirmasi memakai idempotency key berdasarkan ID pengajuan. Tidak ada pengulangan otomatis sesudah timeout untuk menghindari email ganda. Ini tidak menggantikan deduplikasi submit formulir.

## Pengujian

```powershell
node scripts/check-resend.cjs
npm run build
```

Tes memakai transport dan database simulasi, tanpa email nyata atau mutasi database. Meliputi reply-to, idempotency, konfigurasi kosong, disabled, provider error, timeout, status submit, serta autentikasi endpoint test.

Untuk uji nyata, login dashboard > Pengaturan > Notifikasi email > **Kirim email uji ke akun saya**. Tombol ini baru aktif jika konfigurasi tersedia dan selalu mengirim ke email admin yang sedang login. Periksa inbox/spam dan log Resend. Tidak ada email yang otomatis dikirim saat membuka halaman pengaturan.

## Status konfigurasi saat publikasi

Pada 9 September 2026, `RESEND_API_KEY` (Secret), `RESEND_FROM_EMAIL`, dan `EMAIL_DISABLED=false` telah dipasang pada environment Production dan Preview project Vercel. Development lokal memakai `.env.local` yang diabaikan Git. Deployment baru diperlukan untuk memakai kode dan environment tersebut.

Pengujian nyata dari `notifikasi@pathfinder.co.id` telah diterima Resend, termasuk template baru. Status inbox/delivered belum diverifikasi melalui API. Key pengiriman tidak disimpan dalam repository.

## Template email

`lib/email-templates.ts` menyediakan layout bersama untuk konfirmasi pengajuan, empat status pengajuan, notifikasi admin, pesan kontak, dan email uji. Layout tabel dengan CSS inline memakai warna website, ringkasan pengajuan, tombol kontak, tahun footer otomatis, serta versi teks biasa. Data dinamis di-escape; tanggal ditampilkan dalam WIB. Template tidak menjanjikan waktu evaluasi atau ketentuan biaya yang belum dikonfirmasi.
