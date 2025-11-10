import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, TrendingUp, Users, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import freshgradIcon from "@/assets/freshgrad-icon.jpg";
import switchCareerIcon from "@/assets/switch-career-icon.jpg";
import consultationIcon from "@/assets/consultation-icon.jpg";

const Home = () => {
  const features = [
    {
      icon: Target,
      title: "Kenali Diri",
      description: "Temukan passion, minat, dan kekuatan unik Anda melalui tes kepribadian dan konsultasi personal.",
      image: freshgradIcon,
    },
    {
      icon: TrendingUp,
      title: "Tentukan Arah",
      description: "Dapatkan panduan strategis untuk merencanakan jalur karier yang sesuai dengan tujuan Anda.",
      image: switchCareerIcon,
    },
    {
      icon: Users,
      title: "Bangun Masa Depan",
      description: "Wujudkan karier impian dengan dukungan mentor profesional dan komunitas yang solid.",
      image: consultationIcon,
    },
  ];

  const testimonials = [
    {
      name: "Andi Prasetyo",
      role: "Software Engineer at Tech Startup",
      content: "Dharmapatha membantu saya menemukan passion di bidang teknologi. Sekarang saya bekerja di startup impian!",
      rating: 5,
    },
    {
      name: "Sarah Wijaya",
      role: "Digital Marketing Specialist",
      content: "Berkat konsultasi di Dharmapatha, saya berhasil switch career dari akuntansi ke digital marketing dengan percaya diri.",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Product Manager",
      content: "Program mentoring yang terstruktur dan mentor yang berpengalaman benar-benar mengubah perspektif karier saya.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Temukan Arah Kariermu Bersama <span className="text-highlight">Dharmapatha</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Platform edukasi dan konsultasi karier untuk fresh graduate dan switch career. Wujudkan karier impianmu dengan bimbingan profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/konsultasi" className="flex items-center">
                    Mulai Konsultasi Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white hover:bg-white/20 text-white">
                  <Link to="/tentang">Pelajari Lebih Lanjut</Link>
                </Button>
              </div>
            </div>
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Career Consultation"
                className="rounded-2xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Langkah Menuju Karier Impian</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami membantu Anda menemukan dan meraih karier yang sesuai dengan passion dan potensi Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-medium">
                <CardHeader>
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Konsultasi Berhasil" },
              { number: "95%", label: "Tingkat Kepuasan" },
              { number: "50+", label: "Mentor Profesional" },
              { number: "20+", label: "Industri Partner" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kisah Sukses Alumni</h2>
            <p className="text-lg text-muted-foreground">
              Dengarkan cerita mereka yang telah menemukan arah karier bersama Dharmapatha
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-highlight text-highlight" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Memulai Perjalanan Kariermu?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Bergabunglah dengan ratusan profesional muda yang telah menemukan arah karier mereka bersama Dharmapatha
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/konsultasi" className="flex items-center">
              Jadwalkan Konsultasi Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
