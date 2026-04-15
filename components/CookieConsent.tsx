"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie, X, Settings, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

const STORAGE_KEY = "aggre_cookie_consent"

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export function getCookiePreferences(): CookiePreferences {
  if (typeof window === "undefined") {
    return { necessary: true, functional: false, analytics: false, marketing: false }
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { necessary: true, functional: false, analytics: false, marketing: false }
}

export function saveCookiePreferences(prefs: CookiePreferences) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  // Dispatch event so other components can react
  window.dispatchEvent(new Event("cookiePreferencesUpdated"))
}

export function hasConsented(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(STORAGE_KEY) !== null
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    if (!hasConsented()) {
      // Small delay so it doesn't flash on first render
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const acceptAll = () => {
    const all = { necessary: true, functional: true, analytics: true, marketing: true }
    saveCookiePreferences(all)
    setVisible(false)
  }

  const acceptNecessary = () => {
    const necessary = { necessary: true, functional: false, analytics: false, marketing: false }
    saveCookiePreferences(necessary)
    setVisible(false)
  }

  const saveCustom = () => {
    saveCookiePreferences(prefs)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 animate-fade-in-up">
      <div className="relative bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-1.5 rounded-lg">
                <Cookie className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-white font-bold text-sm">Kebijakan Cookie</h3>
            </div>
            <button
              onClick={acceptNecessary}
              className="text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Baca{" "}
            <Link href="/cookies" className="text-teal-400 hover:underline">
              kebijakan cookie
            </Link>{" "}
            kami untuk info lengkap.
          </p>

          {/* Expandable custom settings */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-200 transition-colors mb-3"
          >
            <Settings className="h-3 w-3" />
            <span>Atur preferensi</span>
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {expanded && (
            <div className="space-y-2 mb-4 bg-white/5 rounded-xl p-3 border border-white/10">
              {[
                { key: "necessary", label: "Cookie Penting", desc: "Selalu aktif", locked: true },
                { key: "functional", label: "Cookie Fungsional", desc: "Preferensi & tampilan", locked: false },
                { key: "analytics", label: "Cookie Analitik", desc: "Statistik penggunaan", locked: false },
                { key: "marketing", label: "Cookie Pemasaran", desc: "Iklan personal", locked: false },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs font-medium">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                  {item.locked ? (
                    <span className="text-xs text-teal-400 font-medium">Aktif</span>
                  ) : (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prefs[item.key as keyof CookiePreferences]}
                        onChange={(e) => setPrefs(prev => ({ ...prev, [item.key]: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  )}
                </div>
              ))}
              <Button
                onClick={saveCustom}
                size="sm"
                className="w-full mt-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs h-7"
              >
                Simpan Pilihan
              </Button>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              onClick={acceptNecessary}
              size="sm"
              className="flex-1 bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 text-xs h-8"
            >
              Hanya Penting
            </Button>
            <Button
              onClick={acceptAll}
              size="sm"
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white text-xs h-8 font-semibold"
            >
              Terima Semua
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
