"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  LogIn,
  Shield,
  Mail,
  Lock,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { apiClient } from "@/lib/api-client";
import ChunkErrorBoundary from "@/components/ChunkErrorBoundary";

export default function LoginPage() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // httpOnly cookie can't be read via document.cookie — hit server directly
        const result = await apiClient.verifySession();
        if (result.success) {
          window.location.href = "/dashboard";
          return;
        }
      } catch {
        // No valid session
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await apiClient.login(formData.email, formData.password);

      if (result.success && result.data) {
        // Login successful, redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        setError(
          result.error || "Login gagal. Periksa email dan kata sandi Anda.",
        );
      }
    } catch (error: any) {
      console.error("Login error:", error);

      let errorMessage = "Login gagal. Silakan coba lagi.";

      if (error?.error) {
        errorMessage = error.error;
      } else if (error?.message?.includes("Failed to fetch")) {
        errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi Anda.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChunkErrorBoundary>
      <main className="admin-login">
        <section className="admin-login-brand">
          <Link href="/" aria-label="AGGRE CAPITAL — Beranda">
            <Image
              src="/images/logo.png"
              alt="AGGRE CAPITAL"
              width={174}
              height={112}
              priority
            />
          </Link>
          <div>
            <p className="admin-eyebrow">AGGRE CAPITAL / WORKSPACE</p>
            <h2>
              Satu tempat.
              <br />
              Setiap aktivitas.
              <br />
              <span>Lebih terarah.</span>
            </h2>
            <p>
              Kelola pengajuan, konten, dan kemitraan dalam portal manajemen
              AGGRE CAPITAL.
            </p>
          </div>
          <Link href="/">
            <ArrowLeft size={18} aria-hidden="true" />
            Kembali ke website perusahaan
          </Link>
        </section>
        <section className="admin-login-form">
          <div className="admin-login-inner">
            <p className="admin-eyebrow">PORTAL MANAJEMEN</p>
            <h1>Selamat datang kembali.</h1>
            <p className="admin-login-description">
              Masuk menggunakan akun admin Anda.
            </p>
            {isCheckingAuth ? (
              <div role="status" className="admin-loading">
                <span className="admin-spinner" />
                Memeriksa sesi Anda…
              </div>
            ) : (
              <>
                {error && (
                  <div role="alert" id="login-error" className="admin-error">
                    <AlertCircle size={20} aria-hidden="true" />
                    <p>{error}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="admin-login-fields">
                  <div>
                    <Label htmlFor="email">Alamat email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="username"
                      value={formData.email}
                      onChange={(event) =>
                        handleInputChange("email", event.target.value)
                      }
                      placeholder="nama@aggrecapital.com"
                      required
                      disabled={isLoading}
                      aria-describedby={error ? "login-error" : undefined}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Kata sandi</Label>
                    <div className="admin-password">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(event) =>
                          handleInputChange("password", event.target.value)
                        }
                        placeholder="Masukkan kata sandi"
                        required
                        disabled={isLoading}
                        aria-describedby={error ? "login-error" : undefined}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={
                          showPassword
                            ? "Sembunyikan kata sandi"
                            : "Tampilkan kata sandi"
                        }
                        aria-pressed={showPassword}
                        disabled={isLoading}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="admin-login-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="admin-spinner" />
                        Sedang masuk…
                      </>
                    ) : (
                      <>
                        Masuk ke dashboard{" "}
                        <LogIn size={18} aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </form>
                <p className="admin-access-help">
                  Butuh bantuan akses?{" "}
                  <Link href="/kontak">Hubungi tim kami</Link>
                </p>
              </>
            )}
            <p className="admin-login-footer">
              © {new Date().getFullYear()} AGGRE CAPITAL
            </p>
          </div>
        </section>
      </main>
    </ChunkErrorBoundary>
  );
}
