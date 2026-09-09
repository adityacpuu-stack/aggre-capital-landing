import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";
import { authenticate } from "@/lib/auth-middleware";
import { sendEmail } from "@/lib/email-service";
import { applicationEmail } from "@/lib/email-templates";
import type { EmailResult } from "@/lib/resend-email";
import { isValidEmail } from "@/lib/sanitize";

export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return (
        authResult.response ||
        NextResponse.json({ error: "Authentication required" }, { status: 401 })
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    console.log("GET /api/applications - Query params:", {
      status,
      type,
      page,
      limit,
    });

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramCount = 0;

    if (status && status !== "all") {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      params.push(status);
      console.log("GET /api/applications - Filtering by status:", status);
    } else {
      console.log(
        "GET /api/applications - No status filter applied (showing all)",
      );
    }

    if (type) {
      paramCount++;
      whereClause += ` AND application_type = $${paramCount}`;
      params.push(type);
    }

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) as count FROM applications ${whereClause}`,
      params,
    );
    const total = parseInt(countResult.rows[0]?.count || "0");

    // Get applications with pagination
    const offset = (page - 1) * limit;
    paramCount++;
    const applicationsResult = await query(
      `
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
    `,
      [...params, limit, offset],
    );

    console.log(
      "GET /api/applications - Retrieved:",
      applicationsResult.rows.length,
      "applications",
    );
    console.log("GET /api/applications - Status distribution:", {
      pending: applicationsResult.rows.filter((app) => app.status === "pending")
        .length,
      reviewing: applicationsResult.rows.filter(
        (app) => app.status === "reviewing",
      ).length,
      approved: applicationsResult.rows.filter(
        (app) => app.status === "approved",
      ).length,
      rejected: applicationsResult.rows.filter(
        (app) => app.status === "rejected",
      ).length,
    });

    return NextResponse.json({
      success: true,
      data: applicationsResult.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Applications GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 },
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
      persetujuan,
    } = body;

    // Validate required fields
    if (!namaDebitur || !email || !jumlahPinjaman) {
      return NextResponse.json(
        {
          success: false,
          error: "Nama debitur, email, dan jumlah pinjaman diperlukan",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Format email tidak valid" },
        { status: 400 },
      );
    }

    const jumlahPinjamanNum = Number(jumlahPinjaman);
    if (!Number.isFinite(jumlahPinjamanNum) || jumlahPinjamanNum <= 0) {
      return NextResponse.json(
        { success: false, error: "Jumlah pinjaman tidak valid" },
        { status: 400 },
      );
    }

    // Generate application ID: AGC-YYYYMMDD-XXXXXX
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const randomSuffix = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const applicationId = `AGC-${year}${month}${day}-${randomSuffix}`;

    // Insert application
    const result = await query(
      `
      INSERT INTO applications (
        application_id, customer_name, email, phone, amount, purpose,
        alamat, pekerjaan, tempat_kerja, alamat_kantor,
        nama_istri, jenis_jaminan, alamat_jaminan,
        nomor_ktp, tempat_tanggal_lahir, nama_ibu, pendidikan_terakhir,
        aset_atas_nama, nomor_hp_pasangan,
        status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW(), NOW())
      RETURNING id, application_id, customer_name, email, status, created_at
    `,
      [
        applicationId,
        namaDebitur,
        email,
        nomorTelepon || "",
        jumlahPinjaman,
        tujuanPenggunaan || "",
        alamat || "",
        pekerjaan || "",
        tempatKerja || "",
        alamatKantor || "",
        namaIstri || "",
        jenisJaminan || "",
        alamatJaminan || "",
        nomorKtp || "",
        tempatTanggalLahir || "",
        namaIbuKandung || "",
        pendidikanTerakhir || "",
        asetAtasNama || "",
        nomorHpPasangan || "",
        "pending",
      ],
    );

    let notificationStatus: EmailResult["status"] = "unknown";

    // Send email notification directly
    try {
      const emailResult = await sendEmail({
        to: email,
        ...applicationEmail({
          customerName: namaDebitur,
          applicationId,
          status: "pending",
          submittedAt: result.rows[0].created_at
            ? new Date(result.rows[0].created_at)
            : now,
          amount: jumlahPinjamanNum,
          purpose: tujuanPenggunaan || undefined,
        }),
        idempotencyKey: `application-received/${applicationId}`,
      });

      notificationStatus = emailResult.status;
      if (emailResult.success) {
        console.log(
          "Resend accepted application email:",
          emailResult.messageId,
        );
      } else {
        console.error("Failed to send email notification:", emailResult.error);
      }
    } catch (emailError) {
      console.error("Email notification error:", emailError);
      // Don't fail the application submission if email fails
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: "Application submitted successfully",
      notification: {
        channel: "email",
        provider: "resend",
        status: notificationStatus,
      },
    });
  } catch (error) {
    console.error("Applications POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
