"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }

export default function FormProtection({ action, onToken, resetKey, website, onWebsite }: {
  action: "contact" | "application";
  onToken: (token: string) => void;
  resetKey: number;
  website: string;
  onWebsite: (value: string) => void;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    onToken("");
    if (!ready || !siteKey || !container.current || !window.turnstile) return;
    let active = true;
    setError("");
    const widget = window.turnstile.render(container.current, {
      sitekey: siteKey, action, theme: "light", size: "flexible", language: "id",
      "response-field": false,
      callback: (token: string) => { if (active) { onToken(token); setError(""); } },
      "expired-callback": () => { if (active) onToken(""); },
      "timeout-callback": () => { if (active) { onToken(""); setError("Verifikasi kedaluwarsa. Silakan coba lagi."); } },
      "error-callback": () => {
        if (active) { onToken(""); setError("Verifikasi gagal dimuat. Periksa koneksi lalu coba lagi."); }
      },
    });
    return () => { active = false; window.turnstile?.remove(widget); };
  }, [ready, siteKey, action, resetKey, retry, onToken]);

  return (
    <div className="space-y-3">
      <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
        <label htmlFor={`${action}-website`}>Biarkan kolom ini kosong</label>
        <input id={`${action}-website`} name="website" type="text" tabIndex={-1} autoComplete="off"
          value={website} onChange={(event) => onWebsite(event.target.value)} />
      </div>
      {siteKey ? <>
        <Script id="cloudflare-turnstile" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive" onReady={() => setReady(true)}
          onError={() => setError("Verifikasi gagal dimuat. Muat ulang halaman atau hubungi corp@aggrecapital.com.")} />
        <div ref={container} className="min-h-[65px]" aria-label="Verifikasi keamanan" />
        {!ready && !error && <p role="status" className="text-sm text-gray-600">Memuat verifikasi keamanan…</p>}
        {error && <div role="alert" className="text-sm text-red-700">
          <p>{error}</p>
          {ready && <button type="button" className="mt-2 underline" onClick={() => setRetry((value) => value + 1)}>Ulangi verifikasi</button>}
        </div>}
      </> : <p role="alert" className="text-sm text-red-700">Formulir sementara belum tersedia. Hubungi <a className="underline" href="mailto:corp@aggrecapital.com">corp@aggrecapital.com</a>.</p>}
    </div>
  );
}
