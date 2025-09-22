"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Users, 
  Award, 
  TrendingUp, 
  Building2,
  Target,
  Heart,
  Shield,
  Lightbulb
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Rian",
      role: "Founder & CEO",
      avatar: "/images/rians.jpg",
      description: "Visionary leader dengan pengalaman lebih dari 15 tahun di industri keuangan. Memimpin AGGRE CAPITAL dengan komitmen untuk memberikan akses pendanaan yang mudah dan terpercaya bagi masyarakat Indonesia.",
      achievements: [
        "15+ Years Finance Industry",
        "Former Bank Executive",
        "MBA Finance Graduate",
        "Certified Risk Manager"
      ],
      expertise: [
        "Strategic Leadership",
        "Risk Management", 
        "Financial Planning",
        "Business Development"
      ],
      quote: "Kami berkomitmen untuk menjadi jembatan antara kebutuhan finansial masyarakat dengan solusi pendanaan yang tepat dan terpercaya.",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      id: 2,
      name: "Silverster",
      role: "CO-Founder & COO", 
      avatar: "/images/team-silverster.jpg",
      description: "Ahli operasional dengan track record solid dalam membangun sistem dan proses yang efisien. Bertanggung jawab atas operasional harian dan memastikan kualitas layanan terbaik untuk setiap nasabah.",
      achievements: [
        "12+ Years Operations",
        "Process Excellence Expert", 
        "Technology Integration",
        "Customer Experience Focus"
      ],
      expertise: [
        "Operations Management",
        "System Development",
        "Quality Assurance",
        "Team Leadership"
      ],
      quote: "Kunci kesuksesan AGGRE CAPITAL adalah kombinasi antara teknologi modern dan pelayanan yang berpusat pada kepuasan nasabah.",
      color: "from-teal-500 to-teal-600", 
      bgColor: "from-teal-50 to-teal-100"
    }
  ]

  const companyValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Menjalankan bisnis dengan transparansi dan kejujuran tinggi",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Mengutamakan kepentingan dan kepuasan nasabah di atas segalanya",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Terus berinovasi untuk memberikan solusi keuangan terdepan",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Berkomitmen memberikan layanan berkualitas tinggi secara konsisten",
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-lime-50 to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm border-b transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="AGGRE CAPITAL - LOAN SOLUTIONS"
                width={120}
                height={40}
                className="object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-lime-400 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-full">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Tim leadership berpengalaman yang berkomitmen membangun masa depan keuangan yang lebih baik bagi Indonesia
            </p>
            
            {/* Company Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-teal-600">25+</div>
                <div className="text-sm text-gray-600">Years Combined Experience</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-lime-600">500+</div>
                <div className="text-sm text-gray-600">Successful Projects</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-teal-600">100%</div>
                <div className="text-sm text-gray-600">Dedicated to Excellence</div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-16 mb-16">
            {teamMembers.map((member, index) => (
              <Card
                key={member.id}
                className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className={`grid lg:grid-cols-5 ${index % 2 === 1 ? 'lg:grid-cols-5' : ''}`}>
                    {/* Avatar & Role Section */}
                    <div className={`lg:col-span-2 bg-gradient-to-br ${member.bgColor} p-12 flex flex-col items-center justify-center text-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
                          <Image
                            src={member.id === 1 
                              ? "/images/rians.png"
                              : "/images/adi.png"
                            }
                            alt={`${member.name} - ${member.role}`}
                            width={128}
                            height={128}
                            className={`w-full h-full object-cover ${member.id === 2 ? 'object-[center_20%]' : 'object-center'}`}
                          />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${member.color} p-3 rounded-full shadow-lg`}>
                          <Award className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h2>
                      <Badge className={`bg-gradient-to-r ${member.color} text-white px-4 py-2 text-sm font-semibold mb-6`}>
                        {member.role}
                      </Badge>
                      
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-3 p-8 lg:p-12">
                      <div className="space-y-8">
                        {/* Description */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">About {member.name}</h3>
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {member.description}
                          </p>
                          
                          {/* Quote */}
                          <div className={`bg-gradient-to-r ${member.bgColor} p-6 rounded-lg relative`}>
                            <div className="text-6xl text-teal-200 absolute -top-2 -left-2">"</div>
                            <p className="text-gray-700 italic text-lg leading-relaxed relative z-10">
                              {member.quote}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-lg text-gray-600">
                Nilai-nilai fundamental yang memandu setiap keputusan dan tindakan kami
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyValues.map((value, index) => (
                <Card
                  key={index}
                  className="group text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="space-y-6">
                    <div className={`bg-gradient-to-r ${value.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <value.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-teal-600 via-teal-700 to-lime-600 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent animate-pulse"></div>
              <CardContent className="p-12 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Work with Our Team?
                </h2>
                <p className="text-xl mb-8 text-teal-100">
                  Mari bersama-sama mewujudkan solusi keuangan terbaik untuk kebutuhan Anda
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pengajuan">
                    <Button
                      size="lg"
                      className="bg-white text-teal-700 hover:bg-gray-100 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Ajukan Pendanaan
                    </Button>
                  </Link>
                  <Link href="/kontak">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-teal-700 px-8 py-3 font-semibold"
                    >
                      Hubungi Tim Kami
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}