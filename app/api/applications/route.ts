import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticate } from '@/lib/auth-middleware';
import { sendEmail } from '@/lib/email-service';

export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    if (status && status !== 'all') {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (type) {
      paramCount++;
      whereClause += ` AND application_type = $${paramCount}`;
      params.push(type);
    }

    // Get total count
    const countResult = await query(`SELECT COUNT(*) as count FROM applications ${whereClause}`, params);
    const total = parseInt(countResult.rows[0]?.count || '0');

    // Get applications with pagination
    const offset = (page - 1) * limit;
    paramCount++;
    const applicationsResult = await query(`
      SELECT id, application_id, customer_name, email, phone, amount, purpose,
             alamat, pekerjaan, tempat_kerja, alamat_kantor,
             nama_istri, jenis_jaminan, alamat_jaminan,
             nomor_ktp, tempat_tanggal_lahir, nama_ibu, pendidikan_terakhir,
             aset_atas_nama, nomor_hp_pasangan,
             status, created_at, updated_at
      FROM applications
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...params, limit, offset]);

    return NextResponse.json({
      success: true,
      data: applicationsResult.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Applications GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      namaDebitur,
      email,
      nomorTelepon,
      jumlahPinjaman,
      tujuanPenggunaan,
      alamat,
      pekerjaan,
      tempatKerja,
      alamatKantor,
      namaIstri,
      jenisJaminan,
      alamatJaminan,
      tempatTanggalLahir,
      nomorKtp,
      namaIbuKandung,
      pendidikanTerakhir,
      nomorHpPasangan,
      asetDijaminkan,
      asetAtasNama,
      persetujuan
    } = body;

    // Validate required fields
    if (!namaDebitur || !email || !jumlahPinjaman) {
      return NextResponse.json(
        { success: false, error: 'Nama debitur, email, dan jumlah pinjaman diperlukan' },
        { status: 400 }
      );
    }

    // Generate application ID: AGC-YYYYMMDD-XXXXXX
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomSuffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const applicationId = `AGC-${year}${month}${day}-${randomSuffix}`;

    // Insert application
    const result = await query(`
      INSERT INTO applications (
        application_id, customer_name, email, phone, amount, purpose,
        alamat, pekerjaan, tempat_kerja, alamat_kantor,
        nama_istri, jenis_jaminan, alamat_jaminan,
        nomor_ktp, tempat_tanggal_lahir, nama_ibu, pendidikan_terakhir,
        aset_atas_nama, nomor_hp_pasangan,
        status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW(), NOW())
      RETURNING id, application_id, customer_name, email, status, created_at
    `, [
      applicationId,
      namaDebitur,
      email,
      nomorTelepon || '',
      jumlahPinjaman,
      tujuanPenggunaan || '',
      alamat || '',
      pekerjaan || '',
      tempatKerja || '',
      alamatKantor || '',
      namaIstri || '',
      jenisJaminan || '',
      alamatJaminan || '',
      nomorKtp || '',
      tempatTanggalLahir || '',
      namaIbuKandung || '',
      pendidikanTerakhir || '',
      asetAtasNama || '',
      nomorHpPasangan || '',
      'pending'
    ]);

    // Send email notification directly
    try {
      const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const emailHTML = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Status Pengajuan Kredit - Aggre Capital</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                AGGRE CAPITAL
              </h1>
              <p style="color: #e6fffa; margin: 8px 0 0 0; font-size: 16px; font-weight: 300;">
                Solusi Pendanaan Terpercaya
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 24px; font-weight: bold;">✓</span>
                </div>
                <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">
                  Pengajuan Kredit Diterima
                </h2>
                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                  ${currentDate}
                </p>
              </div>

              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <p style="color: #374151; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
                  Halo <strong style="color: #1f2937;">${namaDebitur}</strong>,
                </p>
                <p style="color: #374151; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
                  Terima kasih telah mengajukan kredit di Aggre Capital. Pengajuan Anda telah diterima dan sedang dalam proses review oleh tim kami.
                </p>
                <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                    ID Pengajuan
                  </p>
                  <p style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 600; font-family: 'Courier New', monospace;">
                    ${applicationId}
                  </p>
                </div>
                <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
                  <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 600;">
                    ⏰ Proses Review
                  </p>
                  <p style="color: #92400e; margin: 5px 0 0 0; font-size: 14px;">
                    Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk proses selanjutnya.
                  </p>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://aggre-capital-landing.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Kunjungi Website
                </a>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
                  Terima kasih telah mempercayai <strong style="color: #0f766e;">Aggre Capital</strong> sebagai mitra pendanaan Anda.
                </p>
                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                  Salam hangat,<br>
                  <strong style="color: #1f2937;">Tim Aggre Capital</strong>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 12px;">
                © 2024 Aggre Capital. All rights reserved.
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 11px;">
                Email ini dikirim secara otomatis. Mohon tidak membalas email ini.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      const emailResult = await sendEmail({
        to: email,
        subject: `✅ Pengajuan Kredit Diterima - ${applicationId}`,
        html: emailHTML
      });

      if (emailResult.success) {
        console.log('Email notification sent successfully:', emailResult.messageId);
      } else {
        console.error('Failed to send email notification:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Don't fail the application submission if email fails
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Applications POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}