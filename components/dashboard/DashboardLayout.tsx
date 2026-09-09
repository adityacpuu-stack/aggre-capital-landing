"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Star,
  Building2,
  Settings,
  LogOut,
  Menu,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userEmail: string;
  onLogout: () => void;
}
const items = [
  {
    id: "overview",
    name: "Ringkasan",
    icon: LayoutDashboard,
    description: "Pantau pengajuan dan aktivitas portal.",
  },
  {
    id: "applications",
    name: "Pengajuan",
    icon: FileText,
    description: "Tinjau data nasabah dan kelola status pengajuan.",
  },
  {
    id: "news",
    name: "Berita & artikel",
    icon: Newspaper,
    description: "Kelola artikel, publikasi, dan pembaruan perusahaan.",
  },
  {
    id: "testimonials",
    name: "Testimoni",
    icon: Star,
    description: "Kelola cerita dan pengalaman nasabah.",
  },
  {
    id: "partners",
    name: "Mitra & ekosistem",
    icon: Building2,
    description: "Kelola profil mitra strategis dan ekosistem perusahaan.",
  },
  {
    id: "settings",
    name: "Pengaturan",
    icon: Settings,
    description: "Kelola konfigurasi email dan informasi akun.",
  },
];
export default function DashboardLayout({
  children,
  activeTab,
  onTabChange,
  userEmail,
  onLogout,
}: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const current = items.find((item) => item.id === activeTab) || items[0];
  const sidebar = (
    <>
      <Link
        href="/"
        className="admin-brand"
        aria-label="AGGRE CAPITAL — Beranda"
      >
        <Image
          src="/images/logo.png"
          alt="AGGRE CAPITAL"
          width={145}
          height={94}
          priority
        />
      </Link>
      <p className="admin-sidebar-label">PORTAL MANAJEMEN</p>
      <nav aria-label="Navigasi dashboard" className="admin-nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={activeTab === item.id ? "page" : undefined}
            onClick={() => {
              onTabChange(item.id);
              setOpen(false);
            }}
          >
            <item.icon size={19} strokeWidth={1.7} aria-hidden="true" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="admin-sidebar-bottom">
        <Link href="/" target="_blank" className="admin-view-site">
          Lihat website <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <div className="admin-account">
          <span className="admin-avatar" aria-hidden="true">
            {userEmail.charAt(0).toUpperCase() || "A"}
          </span>
          <div>
            <small>Akun admin</small>
            <p>{userEmail || "Portal manajemen"}</p>
          </div>
        </div>
        <button type="button" className="admin-logout" onClick={onLogout}>
          <LogOut size={18} aria-hidden="true" />
          Keluar dari akun
        </button>
      </div>
    </>
  );
  return (
    <div className="admin-shell">
      <a href="#admin-content" className="ac-skip">
        Lewati ke konten dashboard
      </a>
      <aside className="admin-sidebar">{sidebar}</aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-topbar-start">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="admin-menu"
                  aria-label="Buka navigasi dashboard"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="admin-mobile-sidebar">
                <SheetTitle className="sr-only">Navigasi dashboard</SheetTitle>
                <SheetDescription className="sr-only">
                  Pilih bagian portal manajemen.
                </SheetDescription>
                {sidebar}
              </SheetContent>
            </Sheet>
            <span>
              Workspace <span className="admin-divider">/</span>{" "}
              <strong>{current.name}</strong>
            </span>
          </div>
          <Link href="/" className="admin-top-link">
            Website perusahaan <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </header>
        <main id="admin-content" className="admin-surface">
          <div className="admin-page-heading">
            <p className="admin-eyebrow">AGGRE CAPITAL / ADMIN</p>
            <h1>{current.name}</h1>
            <p>{current.description}</p>
          </div>
          {children}
        </main>
        <footer className="admin-workspace-footer">
          AGGRE CAPITAL <span>Portal manajemen</span>
        </footer>
      </div>
    </div>
  );
}
