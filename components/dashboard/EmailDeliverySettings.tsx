"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";

interface EmailConfiguration {
  enabled: boolean;
  ready: boolean;
  apiKeyConfigured: boolean;
  senderConfigured: boolean;
  from: string;
  replyTo: string;
}

export default function EmailDeliverySettings({
  userEmail,
}: {
  userEmail: string;
}) {
  const [config, setConfig] = useState<EmailConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const refresh = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/settings/email", {
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error();
      setConfig(result.data);
    } catch {
      setConfig(null);
      setFailed(true);
      setMessage("Pengaturan email belum dapat dimuat.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const test = async () => {
    setTesting(true);
    setMessage("");
    try {
      const response = await fetch("/api/settings/email/test", {
        method: "POST",
      });
      const result = await response.json();
      setFailed(!response.ok || !result.success);
      setMessage(
        result.message || result.error || "Email uji belum dapat dikirim.",
      );
    } catch {
      setFailed(true);
      setMessage(
        "Status email uji belum dapat dipastikan. Periksa log Resend sebelum mencoba lagi.",
      );
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="admin-panel md:col-span-2">
      <CardHeader className="admin-panel-heading">
        <CardTitle className="admin-panel-title flex items-center gap-2">
          <Mail size={20} /> Notifikasi email · Resend
        </CardTitle>
        <p className="text-sm text-gray-600">
          Konfirmasi pengajuan, perubahan status, dan pesan kontak dikirim
          melalui Resend.
        </p>
      </CardHeader>
      <CardContent className="admin-panel-body space-y-5">
        {loading ? (
          <p role="status">Memuat konfigurasi email…</p>
        ) : (
          config && (
            <>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-semibold">
                  {!config.enabled
                    ? "Pengiriman dinonaktifkan"
                    : config.ready
                      ? "Konfigurasi tersedia untuk diuji"
                      : "Konfigurasi Resend belum lengkap"}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Status ini memeriksa konfigurasi server. Verifikasi domain dan
                  status terkirim dapat dilihat di Resend.
                </p>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <dt className="text-gray-500">API key</dt>
                  <dd className="font-medium">
                    {config.apiKeyConfigured
                      ? "Tersimpan di server"
                      : "Belum diatur"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Pengirim</dt>
                  <dd className="font-medium break-all">
                    {config.from || "Belum diatur"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Alamat balasan</dt>
                  <dd className="font-medium break-all">
                    {config.replyTo || "Mengikuti alamat pengirim"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Penerima email uji</dt>
                  <dd className="font-medium break-all">{userEmail}</dd>
                </div>
              </dl>
              {!config.ready && (
                <p className="text-sm text-gray-600">
                  Atur <code>RESEND_API_KEY</code> dan{" "}
                  <code>RESEND_FROM_EMAIL</code> pada environment server.
                  Gunakan domain pengirim yang terverifikasi di Resend dan{" "}
                  <code>EMAIL_DISABLED=false</code>. Setelah perubahan di
                  Vercel, lakukan redeploy.
                </p>
              )}
            </>
          )
        )}
        {message && (
          <p
            role="status"
            className={
              failed ? "text-sm text-red-700" : "text-sm text-green-800"
            }
          >
            {message}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={test}
            disabled={loading || testing || !config?.ready}
          >
            {testing && <Loader2 size={16} className="mr-2 animate-spin" />}
            {testing ? "Mengirim email uji…" : "Kirim email uji ke akun saya"}
          </Button>
          <Button
            onClick={refresh}
            variant="outline"
            disabled={loading || testing}
          >
            Periksa ulang konfigurasi
          </Button>
          <a
            href="https://resend.com/emails"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 text-sm underline"
          >
            Buka log Resend
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
