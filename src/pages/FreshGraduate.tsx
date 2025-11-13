import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Linkedin, Users, Briefcase, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import freshgradIcon from "@/assets/freshgrad-icon.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const FreshGraduate = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await (supabase as any)
        .from('career_guides')
        .select('*')
        .eq('target_audience', 'fresh_graduate')
        .order('created_at', { ascending: false });
      
      if (data) {
        // Get public URLs for images
        const articlesWithImages = data.map((article: any) => {
          if (article.image_url) {
            const { data: urlData } = supabase.storage
              .from('career_guides')
              .getPublicUrl(article.image_url);
            return { ...article, imagePublicUrl: urlData.publicUrl };
          }
          return article;
        });
        setArticles(articlesWithImages);
      }
      setLoading(false);
    };
    
    fetchArticles();
  }, []);

  const checklist = [
    { icon: FileText, title: "Buat CV Profesional", description: "Template dan panduan lengkap untuk CV yang menarik perhatian recruiter" },
    { icon: Linkedin, title: "Optimasi Profil LinkedIn", description: "Bangun personal branding yang kuat di platform profesional" },
    { icon: Users, title: "Bangun Network", description: "Strategi networking efektif untuk fresh graduate" },
    { icon: Briefcase, title: "Persiapan Interview", description: "Tips dan mock interview untuk meningkatkan confidence" },
    { icon: BookOpen, title: "Skill Development", description: "Identifikasi dan kembangkan skill yang dibutuhkan industri" },
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Fresh Graduate Priority
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Panduan lengkap dan dukungan khusus untuk membantu Anda memulai karier profesional dengan percaya diri dan sukses
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/konsultasi">Konsultasi Gratis</Link>
              </Button>
            </div>
            <div>
              <img
                src={freshgradIcon}
                alt="Fresh Graduate"
                className="rounded-2xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Checklist Persiapan Kerja
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Langkah-langkah penting yang harus Anda persiapkan sebelum melamar pekerjaan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {checklist.map((item, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                  <Button variant="link" className="mt-4 p-0 text-primary">
                    Pelajari Lebih Lanjut →
                  </Button>
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
              Artikel & Panduan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resource edukatif untuk membantu Anda memulai karier dengan baik
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              <div className="col-span-3 text-center text-muted-foreground">Memuat artikel...</div>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <Card key={article.id} className="hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="h-48 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {article.imagePublicUrl ? (
                        <img 
                          src={article.imagePublicUrl} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="h-16 w-16 text-white/50" />
                      )}
                    </div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    {article.category && (
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold w-fit">
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

      {/* Quiz Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Sudah Siap Kerja?</CardTitle>
              <CardDescription className="text-lg">
                Ikuti quiz interaktif kami untuk mengetahui seberapa siap Anda memasuki dunia kerja
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-accent" />
                  <span>10 pertanyaan interaktif</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-accent" />
                  <span>Hasil instant dengan rekomendasi personal</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-accent" />
                  <span>Gratis dan tanpa registrasi</span>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-primary">
                Mulai Quiz Sekarang
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Butuh Bantuan Lebih Lanjut?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Jadwalkan konsultasi one-on-one dengan mentor kami untuk mendapatkan panduan personal yang disesuaikan dengan situasi Anda
          </p>
          <Button size="lg" variant="secondary">
            <Link to="/konsultasi">Jadwalkan Konsultasi</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FreshGraduate;
