"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const links = [
  ["Layanan", "/#layanan"],
  ["Tim kami", "/team"],
  ["Penghargaan", "/penghargaan"],
  ["Mitra", "/partners"],
  ["Testimoni", "/testimoni"],
  ["FAQ", "/faq"],
  ["Kontak", "/kontak"],
];
export default function SiteHeader() {
  const path = usePathname();
  return (
    <header className="ac-header" id="top">
      <a className="ac-skip" href="#main-content">
        Lewati ke konten
      </a>
      <div className="ac-nav">
        <Link href="/" className="ac-logo" aria-label="AGGRE CAPITAL — Beranda">
          <Image
            src="/images/logo.png"
            alt="AGGRE CAPITAL"
            width={125}
            height={82}
            priority
          />
        </Link>
        <nav aria-label="Navigasi utama" className="ac-nav-links">
          {links.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="ac-button ac-header-cta" href="/pengajuan">
          Ajukan pendanaan <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="ac-menu"
              variant="ghost"
              size="icon"
              aria-label="Buka menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="ac-drawer">
            <SheetTitle>AGGRE CAPITAL</SheetTitle>
            <SheetDescription>
              Pendanaan untuk setiap langkah Anda.
            </SheetDescription>
            <nav aria-label="Navigasi seluler">
              {links
                .concat([
                  ["Berita", "/news"],
                  ["Ajukan pendanaan", "/pengajuan"],
                ])
                .map(([label, href]) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      aria-current={path === href ? "page" : undefined}
                    >
                      {label}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </SheetClose>
                ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
