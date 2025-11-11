import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Target, Lightbulb, Code, Briefcase, PenTool, DollarSign, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import switchCareerIcon from "@/assets/switch-career-icon.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const SwitchCareer = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('career_guides')
        .select('*')
        .eq('target_audience', 'Career Switcher')
        .order('created_at', { ascending: false });
      
      if (data) setArticles(data);
      setLoading(false);
    };
    
    fetchArticles();
  }, []);

  const timeline = [
    { month: "Bulan 1-2", title: "Self-Assessment & Research", description: "Identifikasi skill, minat, dan riset industri target" },
    { month: "Bulan 3-4", title: "Skill Development", description: "Pelajari skill baru melalui kursus dan praktik" },
    { month: "Bulan 5-6", title: "Portfolio Building", description: "Bangun portfolio dan mulai networking" },
    { month: "Bulan 7-9", title: "Job Application", description: "Lamar pekerjaan dan persiapan interview" },
    { month: "Bulan 10-12", title: "Transition & Onboarding", description: "Mulai posisi baru dan adaptasi dengan lingkungan" },
  ];

  const successStories = [
    {
      name: "Rina Marlina",
      from: "Akuntan → UX Designer",
      story: "Setelah 5 tahun di bidang akuntansi, saya merasa ingin berkarya secara kreatif. Dengan bimbingan Dharmapatha, saya berhasil transition ke UX Design dalam 8 bulan.",
    },
    {
      name: "Dimas Prasetyo",
      from: "Marketing → Software Engineer",
      story: "Background marketing saya ternyata sangat membantu dalam memahami user needs. Sekarang saya bekerja sebagai frontend developer di startup teknologi.",
    },
    {
      name: "Linda Kusuma",
      from: "HR → Data Analyst",
      story: "Passion saya dalam data mendorong saya untuk switch career. Program mentoring Dharmapatha membantu saya mendapat pekerjaan impian sebagai Data Analyst.",
    },
  ];

  const potentialFields = [
    { icon: Code, title: "Technology", description: "Software Development, Data Science, UX/UI Design", growth: "High" },
    { icon: DollarSign, title: "Finance", description: "Financial Analyst, Investment Banking, Fintech", growth: "High" },
    { icon: PenTool, title: "Creative", description: "Content Creator, Graphic Designer, Video Editor", growth: "Medium" },
    { icon: Briefcase, title: "Business", description: "Product Manager, Business Analyst, Consultant", growth: "High" },
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Switch Career dengan Percaya Diri
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Transisi karier bukan mimpi. Dengan strategi yang tepat dan bimbingan profesional, Anda bisa meraih karier baru yang lebih memuaskan.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/konsultasi">Mulai Perjalanan Anda</Link>
              </Button>
            </div>
            <div>
              <img
                src={switchCareerIcon}
                alt="Switch Career"
                className="rounded-2xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Timeline Realistis Switch Career
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Panduan 12 bulan untuk transisi karier yang sukses dan terencana
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {timeline.map((phase, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm text-accent font-semibold mb-1">{phase.month}</div>
                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                      </div>
                    </div>
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base ml-16">
                    {phase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Potential Fields */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bidang Karier Potensial
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Eksplorasi industri dengan peluang tinggi untuk career switcher
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {potentialFields.map((field, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <field.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{field.title}</CardTitle>
                  <div className="inline-block px-3 py-1 rounded-full bg-highlight/20 text-highlight-foreground text-xs font-semibold">
                    Growth: {field.growth}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{field.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kisah Sukses Career Switcher
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Inspirasi dari mereka yang berhasil meraih karier impian
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="h-20 w-20 rounded-full bg-gradient-primary mx-auto mb-4" />
                  <CardTitle className="text-xl text-center">{story.name}</CardTitle>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold">
                      {story.from}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base italic text-center">
                    "{story.story}"
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Panduan & Resource
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artikel edukatif untuk mendukung perjalanan switch career Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              <div className="col-span-3 text-center text-muted-foreground">Memuat artikel...</div>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <Card key={article.id} className="hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="h-48 bg-gradient-accent rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-white/50" />
                    </div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    {article.category && (
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold w-fit">
                        {article.category}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {article.description}
                    </CardDescription>
                    <Button variant="link" className="p-0 text-primary">
                      Baca Artikel →
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground">
                Belum ada artikel tersedia
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap untuk Career Switch?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Konsultasi dengan mentor berpengalaman untuk merencanakan strategi transisi karier yang tepat untuk Anda
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/konsultasi">Jadwalkan Konsultasi Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SwitchCareer;
