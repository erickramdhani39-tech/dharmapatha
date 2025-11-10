import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Fokus pada Tujuan",
      description: "Kami membantu setiap individu menemukan dan mencapai tujuan karier yang bermakna.",
    },
    {
      icon: Heart,
      title: "Empati & Dukungan",
      description: "Kami memahami tantangan karier dan memberikan dukungan penuh dalam perjalanan Anda.",
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Kami percaya pada kekuatan mentoring dan komunitas untuk pertumbuhan karier.",
    },
    {
      icon: Award,
      title: "Profesionalisme",
      description: "Mentor berpengalaman dan metodologi terbukti untuk hasil maksimal.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Dharmapatha</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Platform konsultasi karier terpercaya yang membantu Anda menemukan arah dan meraih kesuksesan profesional
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Visi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  Menjadi platform konsultasi karier terdepan di Indonesia yang memberdayakan setiap individu untuk menemukan dan meraih potensi penuh mereka dalam dunia profesional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">Misi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Memberikan bimbingan karier berkualitas tinggi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Membantu individu menemukan passion dan tujuan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Memfasilitasi transisi karier yang sukses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Membangun komunitas profesional yang suportif</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prinsip yang memandu setiap langkah kami dalam membantu Anda mencapai kesuksesan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Apa yang Kami Lakukan?
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                <span className="font-semibold text-primary">Dharmapatha</span> adalah platform konsultasi karier yang didedikasikan untuk membantu fresh graduate dan profesional yang ingin beralih karier menemukan arah yang tepat. Kami memahami bahwa setiap perjalanan karier adalah unik, dan kami berkomitmen untuk memberikan dukungan personal yang disesuaikan dengan kebutuhan Anda.
              </p>
              <p>
                Melalui kombinasi <span className="font-semibold">tes minat dan kepribadian</span>, <span className="font-semibold">konsultasi one-on-one dengan mentor berpengalaman</span>, dan <span className="font-semibold">program pengembangan skill</span>, kami membantu Anda:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">✓</span>
                  <span>Mengidentifikasi kekuatan, minat, dan nilai-nilai karier Anda</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">✓</span>
                  <span>Merencanakan jalur karier yang realistis dan achievable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">✓</span>
                  <span>Mengembangkan skill yang dibutuhkan untuk sukses di industri pilihan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">✓</span>
                  <span>Membangun confidence dan strategi untuk interview dan networking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">✓</span>
                  <span>Mendapatkan dukungan berkelanjutan dalam perjalanan karier Anda</span>
                </li>
              </ul>
              <p>
                Dengan tim mentor yang terdiri dari profesional berpengalaman dari berbagai industri, kami siap membantu Anda menavigasi kompleksitas dunia kerja modern dan mencapai kesuksesan yang Anda impikan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tim Mentor Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dipandu oleh profesional berpengalaman dari berbagai industri
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Dr. Ahmad Wijaya", role: "Career Development Expert", experience: "15+ tahun" },
              { name: "Sarah Chen", role: "Tech Industry Mentor", experience: "12+ tahun" },
              { name: "Budi Hartono", role: "HR & Recruitment Specialist", experience: "10+ tahun" },
            ].map((mentor, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-32 w-32 rounded-full bg-gradient-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{mentor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary mb-2">{mentor.role}</p>
                  <p className="text-sm text-muted-foreground">Pengalaman: {mentor.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
