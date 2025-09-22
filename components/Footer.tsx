"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Youtube,
  ArrowUp,
  Shield,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  MessageCircle,
  Download,
  FileText,
  Globe,
  Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-500/5 to-lime-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Image
                  src="/images/logo.png"
                  alt="AGGRE CAPITAL - LOAN SOLUTIONS"
                  width={150}
                  height={50}
                  className="object-contain"
                />
                <p className="text-gray-300 leading-relaxed">
                  Solusi pendanaan terpercaya untuk berbagai kebutuhan Anda dengan proses yang cepat, aman, dan mudah.
                </p>
              </div>


              {/* Social Media */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-white">Ikuti Kami</h5>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                    { icon: Twitter, href: "#", color: "hover:text-blue-300" },
                    { icon: Linkedin, href: "#", color: "hover:text-blue-500" },
                    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                    { icon: Youtube, href: "#", color: "hover:text-red-400" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className={`p-2 bg-gray-700 rounded-lg ${social.color} transition-all duration-300 hover:bg-gray-600 hover:scale-110`}
                    >
                      <social.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Layanan Kami</h4>
              <ul className="space-y-3">
                {[
                  { name: "Modal Usaha", href: "#keunggulan", icon: TrendingUp },
                  { name: "Renovasi Rumah", href: "#keunggulan", icon: Building2 },
                  { name: "Biaya Pendidikan", href: "#keunggulan", icon: FileText },
                  { name: "Dana Darurat", href: "#keunggulan", icon: Shield },
                  { name: "Biaya Pernikahan", href: "#keunggulan", icon: Star },
                  { name: "Konsultasi Gratis", href: "#kontak", icon: MessageCircle },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-lime-400 transition-colors duration-300 hover:translate-x-1 transform group"
                    >
                      <service.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Perusahaan</h4>
              <ul className="space-y-3">
                {[
                  { name: "Tentang Kami", href: "/about" },
                  { name: "Tim Kami", href: "/team" },
                  { name: "News & Updates", href: "/news" },
                  { name: "Testimoni", href: "/testimoni" },
                  { name: "Strategic Partner", href: "/partners" },
                  { name: "Karir", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-lime-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Kontak & Newsletter</h4>
              
              {/* Contact Info */}
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "corp@aggrercapital.com", href: "mailto:corp@aggrercapital.com" },
                  { icon: Phone, text: "+62 21 1234 5678", href: "tel:+622112345678" },
                  { icon: MapPin, text: "Jakarta, Indonesia", href: "#" },
                  { icon: Clock, text: "Senin - Jumat: 08:00 - 17:00", href: "#" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <contact.icon className="h-5 w-5 text-lime-400 group-hover:scale-110 transition-transform duration-300" />
                    <Link
                      href={contact.href}
                      className="text-gray-300 group-hover:text-white transition-colors duration-300"
                    >
                      {contact.text}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-white">Newsletter</h5>
                <p className="text-sm text-gray-300">
                  Dapatkan tips keuangan dan update terbaru langsung di inbox Anda.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Email Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-lime-400 focus:ring-lime-400"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-lime-500 hover:bg-lime-600 text-white px-4"
                    >
                      {isSubscribed ? <CheckCircle className="h-4 w-4" /> : "Subscribe"}
                    </Button>
                  </div>
                  {isSubscribed && (
                    <p className="text-sm text-lime-400 flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Berhasil berlangganan!</span>
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} AGGRE CAPITAL. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start space-x-4 mt-2 text-sm text-gray-500">
                <Link href="/privacy" className="hover:text-lime-400 transition-colors">
                  Kebijakan Privasi
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-lime-400 transition-colors">
                  Syarat & Ketentuan
                </Link>
                <span>•</span>
                <Link href="/cookies" className="hover:text-lime-400 transition-colors">
                  Kebijakan Cookie
                </Link>
                <span>•</span>
                <Link href="/sitemap" className="hover:text-lime-400 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>

            {/* Back to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-lime-500 hover:border-lime-500 hover:text-white transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Kembali ke Atas
            </Button>
          </div>
        </div>

      </div>
    </footer>
  )
}
