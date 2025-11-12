import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import consultationIcon from "@/assets/consultation-icon.jpg";

const Consultation = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    message: "",
    date: "",
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk menjadwalkan konsultasi",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [user, navigate, toast]);

  const topics = [
    "Tes Minat & Kepribadian",
    "Persiapan Wawancara",
    "Rencana Switch Career",
    "CV & Portfolio Review",
    "Strategi Job Hunting",
    "Pengembangan Skill",
    "Lainnya",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "Anda harus login terlebih dahulu",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Uncomment after creating consultations table
      // const { error } = await supabase.from("consultations").insert({
      //   user_id: user.id,
      //   topic: formData.topic,
      //   preferred_date: formData.date || null,
      //   message: formData.message || null,
      //   status: "pending",
      // });
      // if (error) throw error;

      toast({
        title: "Pendaftaran Berhasil!",
        description: "Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi jadwal konsultasi.",
      });

      // Reset form
      setFormData({
        topic: "",
        message: "",
        date: "",
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting consultation:", error);
      toast({
        title: "Error",
        description: error.message || "Gagal menyimpan data konsultasi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: User, title: "Mentor Berpengalaman", description: "Konsultasi dengan profesional dari berbagai industri" },
    { icon: Calendar, title: "Jadwal Fleksibel", description: "Pilih waktu yang sesuai dengan kesibukan Anda" },
    { icon: Clock, title: "Sesi 60 Menit", description: "Waktu yang cukup untuk diskusi mendalam" },
    { icon: CheckCircle, title: "Follow-up Support", description: "Dukungan berkelanjutan setelah konsultasi" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Konsultasi Karier</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Dapatkan bimbingan personal dari mentor profesional untuk merencanakan dan mencapai tujuan karier Anda
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Form */}
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div>
              <img
                src={consultationIcon}
                alt="Consultation"
                className="rounded-2xl shadow-large w-full mb-6"
              />
              <Card>
                <CardHeader>
                  <CardTitle>Kenapa Konsultasi dengan Kami?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Mentor dengan pengalaman 10+ tahun di berbagai industri</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Pendekatan personal yang disesuaikan dengan kebutuhan Anda</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Praktis dan actionable advice yang bisa langsung diterapkan</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Follow-up support via email selama 2 minggu setelah sesi</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Jadwalkan Konsultasi</CardTitle>
                <CardDescription>
                  Isi form di bawah ini dan tim kami akan menghubungi Anda untuk konfirmasi jadwal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topik Konsultasi *</Label>
                    <Select
                      value={formData.topic}
                      onValueChange={(value) => setFormData({ ...formData, topic: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih topik konsultasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Tanggal Preferensi</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tim kami akan menghubungi Anda untuk konfirmasi jadwal final
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan (Opsional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Ceritakan sedikit tentang situasi Anda dan apa yang ingin Anda diskusikan"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Memproses..." : "Kirim Pendaftaran"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Dengan mengirim form ini, Anda menyetujui{" "}
                    <a href="#" className="text-primary hover:underline">
                      Kebijakan Privasi
                    </a>{" "}
                    kami
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Testimoni dari peserta konsultasi kami
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Rina Marlina",
                role: "UX Designer",
                text: "Konsultasi dengan mentor Dharmapatha membuka perspektif baru tentang karier saya. Sangat helpful!",
              },
              {
                name: "Dimas Prasetyo",
                role: "Software Engineer",
                text: "Sesi konsultasi membantu saya membuat rencana yang jelas untuk switch career. Highly recommended!",
              },
              {
                name: "Linda Kusuma",
                role: "Data Analyst",
                text: "Mentor sangat profesional dan memberikan advice yang praktis. Worth every penny!",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto mb-4" />
                  <CardTitle className="text-center text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-center">{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
