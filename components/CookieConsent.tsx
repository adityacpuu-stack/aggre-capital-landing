"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "aggre_cookie_consent";

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function getCookiePreferences(): CookiePreferences {
  if (typeof window === "undefined") {
    return {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  };
}

export function saveCookiePreferences(prefs: CookiePreferences) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  // Dispatch event so other components can react
  window.dispatchEvent(new Event("cookiePreferencesUpdated"));
}

export function hasConsented(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!hasConsented()) {
      // Small delay so it doesn't flash on first render
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    const all = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveCookiePreferences(all);
    setVisible(false);
  };

  const acceptNecessary = () => {
    const necessary = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    saveCookiePreferences(necessary);
    setVisible(false);
  };

  const saveCustom = () => {
    saveCookiePreferences(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section className="ac-cookie" aria-labelledby="cookie-title">
      <div className="ac-cookie-heading">
        <Cookie size={21} aria-hidden="true" />
        <h2 id="cookie-title">Preferensi cookie</h2>
        <button
          onClick={acceptNecessary}
          aria-label="Tutup, gunakan cookie penting saja"
        >
          <X size={18} />
        </button>
      </div>
      <p>
        Kami menggunakan cookie untuk mendukung pengalaman Anda. Baca{" "}
        <Link href="/cookies">kebijakan cookie</Link> untuk informasi lengkap.
      </p>
      <button
        className="ac-cookie-settings"
        aria-expanded={expanded}
        aria-controls="cookie-options"
        onClick={() => setExpanded(!expanded)}
      >
        <Settings size={16} aria-hidden="true" />
        Atur preferensi{" "}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expanded && (
        <div id="cookie-options" className="ac-cookie-options">
          <label>
            <input type="checkbox" checked disabled />
            Cookie penting — selalu aktif
          </label>
          {(
            [
              ["functional", "Fungsional"],
              ["analytics", "Analitik"],
              ["marketing", "Pemasaran"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={prefs[key]}
                onChange={(event) =>
                  setPrefs((previous) => ({
                    ...previous,
                    [key]: event.target.checked,
                  }))
                }
              />
              {label}
            </label>
          ))}
          <Button variant="outline" onClick={saveCustom}>
            Simpan pilihan
          </Button>
        </div>
      )}
      <div className="ac-cookie-buttons">
        <Button onClick={acceptNecessary}>Hanya yang penting</Button>
        <Button onClick={acceptAll}>Terima semua</Button>
      </div>
    </section>
  );
}
