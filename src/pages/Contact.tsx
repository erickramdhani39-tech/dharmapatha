import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan merespons dalam 1x24 jam.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@dharmapatha.id",
      link: "mailto:info@dharmapatha.id",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 812-3456-7890",
      link: "tel:+628123456789",
    },
    {
      icon: MapPin,
      title: "Alamat",
      content: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220",
      link: "#",
    },
  ];

  const socialMedia = [
    { icon: Linkedin, name: "LinkedIn", link: "#", handle: "@dharmapatha" },
    { icon: Instagram, name: "Instagram", link: "#", handle: "@dharmapatha.id" },
    { icon: Youtube, name: "YouTube", link: "#", handle: "Dharmapatha Career" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Ada pertanyaan atau ingin diskusi lebih lanjut? Kami siap membantu Anda
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-center text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a
                    href={info.link}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.content}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Kirim Pesan</h2>
                <p className="text-muted-foreground">
                  Isi form di bawah ini dan tim kami akan merespons pertanyaan Anda sesegera mungkin.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Jam Operasional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Senin - Jumat</span>
                    <span className="font-semibold">09:00 - 18:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sabtu</span>
                    <span className="font-semibold">10:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minggu</span>
                    <span className="font-semibold">Tutup</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ikuti Kami</CardTitle>
                  <CardDescription>
                    Dapatkan tips karier dan update terbaru dari media sosial kami
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <social.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{social.name}</div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Form Kontak</CardTitle>
                <CardDescription>
                  Kami akan merespons dalam 1x24 jam
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek *</Label>
                    <Input
                      id="subject"
                      placeholder="Topik pertanyaan Anda"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tulis pesan Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-primary">
                    <Send className="mr-2 h-5 w-5" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-6xl mx-auto overflow-hidden">
            <div className="h-96 bg-gradient-hero flex items-center justify-center text-white">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Lokasi Kami</h3>
                <p className="opacity-90">Jl. Sudirman No. 123, Jakarta Pusat</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
