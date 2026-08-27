import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import crypto from 'crypto';
import { authenticate } from '@/lib/auth-middleware';

// Deteksi tipe gambar dari magic bytes (bukan dari Content-Type kiriman client,
// yang bisa dipalsukan). Mengembalikan ekstensi aman atau null.
function sniffImageExt(buf: Buffer): 'jpg' | 'png' | 'gif' | 'webp' | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf.length >= 6 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return 'gif';
  if (buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Wajib login — hanya admin yang boleh meng-upload.
    const authResult = await authenticate(request);
    if (!authResult.isAuthenticated) {
      return authResult.response || NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('file') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    // Batasi jumlah file per request agar tidak dipakai menghabiskan disk.
    if (files.length > 10) {
      return NextResponse.json(
        { success: false, error: 'Maksimal 10 file per permintaan.' },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB per file

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uploadResults = [];

    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} terlalu besar. Maksimal 5MB.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Tentukan ekstensi dari isi file, bukan dari nama/Content-Type kiriman.
      const ext = sniffImageExt(buffer);
      if (!ext) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} bukan gambar yang valid (hanya JPG, PNG, GIF, WEBP).` },
          { status: 400 }
        );
      }

      // Nama file sepenuhnya di-generate server — tidak memakai nama kiriman.
      const fileName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
      await writeFile(join(uploadsDir, fileName), buffer);

      uploadResults.push({
        originalName: file.name,
        url: `/uploads/${fileName}`,
        size: file.size,
      });
    }

    if (uploadResults.length === 1) {
      return NextResponse.json({
        success: true,
        url: uploadResults[0].url,
        message: 'File uploaded successfully',
      });
    }
    return NextResponse.json({
      success: true,
      files: uploadResults,
      message: `${uploadResults.length} files uploaded successfully`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
