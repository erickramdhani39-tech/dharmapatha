import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const questions = [
  {
    id: "q1",
    question: "Berapa lama pengalaman kerja Anda di bidang saat ini?",
    options: [
      { value: "4", label: "Lebih dari 5 tahun" },
      { value: "3", label: "3-5 tahun" },
      { value: "2", label: "1-3 tahun" },
      { value: "1", label: "Kurang dari 1 tahun" }
    ]
  },
  {
    id: "q2",
    question: "Seberapa yakin Anda dengan pilihan karir baru?",
    options: [
      { value: "4", label: "Sangat yakin, sudah riset mendalam" },
      { value: "3", label: "Cukup yakin" },
      { value: "2", label: "Masih ragu-ragu" },
      { value: "1", label: "Belum yakin sama sekali" }
    ]
  },
  {
    id: "q3",
    question: "Apakah Anda sudah memiliki skill yang dibutuhkan di karir baru?",
    options: [
      { value: "4", label: "Ya, sudah menguasai skill utama" },
      { value: "3", label: "Sudah punya sebagian skill" },
      { value: "2", label: "Masih dalam proses belajar" },
      { value: "1", label: "Belum mulai belajar skill baru" }
    ]
  },
  {
    id: "q4",
    question: "Apakah Anda punya financial buffer untuk masa transisi?",
    options: [
      { value: "4", label: "Ya, cukup untuk 6+ bulan" },
      { value: "3", label: "Cukup untuk 3-6 bulan" },
      { value: "2", label: "Hanya untuk 1-3 bulan" },
      { value: "1", label: "Tidak punya financial buffer" }
    ]
  },
  {
    id: "q5",
    question: "Apakah Anda sudah punya network di industri target?",
    options: [
      { value: "4", label: "Ya, punya banyak koneksi" },
      { value: "3", label: "Punya beberapa koneksi" },
      { value: "2", label: "Sangat sedikit koneksi" },
      { value: "1", label: "Tidak punya koneksi sama sekali" }
    ]
  },
  {
    id: "q6",
    question: "Apakah dukungan keluarga dan lingkungan Anda positif?",
    options: [
      { value: "4", label: "Sangat mendukung" },
      { value: "3", label: "Cukup mendukung" },
      { value: "2", label: "Kurang mendukung" },
      { value: "1", label: "Tidak mendukung" }
    ]
  },
  {
    id: "q7",
    question: "Apakah Anda sudah membuat rencana transisi yang detail?",
    options: [
      { value: "4", label: "Ya, sudah punya roadmap lengkap" },
      { value: "3", label: "Punya rencana dasar" },
      { value: "2", label: "Masih kasar" },
      { value: "1", label: "Belum punya rencana" }
    ]
  },
  {
    id: "q8",
    question: "Apakah Anda sudah mencoba proyek atau freelance di bidang baru?",
    options: [
      { value: "4", label: "Ya, sudah punya beberapa proyek" },
      { value: "3", label: "Sudah 1-2 proyek" },
      { value: "2", label: "Sedang mencoba proyek pertama" },
      { value: "1", label: "Belum sama sekali" }
    ]
  }
];

const AssessmentCareerSwitch = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ score: 0, recommendations: "" });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0);
    const maxScore = questions.length * 4;
    return (totalScore / maxScore) * 100;
  };

  const generateRecommendations = (score: number) => {
    if (score >= 80) {
      return `Luar biasa! Anda sangat siap untuk switch career. Berikut langkah selanjutnya:

• Mulai aplikasi ke posisi di industri baru
• Leverage network yang sudah Anda bangun
• Update LinkedIn dengan skill dan proyeknya baru
• Persiapkan cerita transisi karir yang compelling
• Pertimbangkan untuk mulai dengan posisi entry-to-mid level
• Jangan ragu untuk negotiate berdasarkan pengalaman Anda`;
    } else if (score >= 60) {
      return `Bagus! Anda di jalur yang tepat, namun ada beberapa area yang perlu diperkuat:

• Perkuat skill fundamental di bidang baru melalui kursus atau bootcamp
• Bangun portfolio dengan 2-3 proyek solid
• Perluas network dengan aktif di komunitas industri target
• Pastikan financial buffer cukup untuk masa transisi
• Mulai aplikasi sambil terus belajar
• Pertimbangkan untuk ambil part-time project di bidang baru`;
    } else if (score >= 40) {
      return `Anda perlu persiapan lebih matang sebelum switch. Fokus pada:

• Deep dive ke skill yang dibutuhkan di karir baru
• Buat rencana transisi yang detail dengan timeline realistis
• Mulai bangun network dari sekarang
• Kumpulkan financial buffer minimal 3-6 bulan
• Coba freelance atau side project di bidang baru
• Cari mentor yang sudah sukses di industri target`;
    } else {
      return `Switch career adalah keputusan besar. Anda perlu persiapan lebih intensif:

• Lakukan riset mendalam tentang industri target
• Mulai belajar skill fundamental secara intensif
• Buat financial plan untuk masa transisi
• Diskusikan dengan keluarga tentang rencana Anda
• Pertimbangkan untuk mulai dengan part-time atau freelance
• Cari career counselor atau mentor untuk guidance
• Set timeline realistis (minimal 6-12 bulan persiapan)
• Jangan buru-buru resign, persiapkan dulu dengan matang`;
    }
  };

  const handleSubmit = async () => {
    if (!email && !user) {
      toast.error("Silakan masukkan email Anda");
      return;
    }

    if (Object.keys(answers).length < questions.length) {
      toast.error("Mohon jawab semua pertanyaan");
      return;
    }

    setIsSubmitting(true);

    try {
      const score = calculateScore();
      const recommendations = generateRecommendations(score);

      const { error } = await supabase.from("assessments").insert({
        user_id: user?.id || null,
        email: email || user?.email || "",
        assessment_type: "career_switcher",
        answers: answers,
        score: score,
        recommendations: recommendations
      });

      if (error) throw error;

      setResult({ score, recommendations });
      setShowResult(true);
      toast.success("Assessment berhasil disimpan!");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Gagal menyimpan assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Hasil Assessment Kesiapan Switch Career</CardTitle>
              <CardDescription>Career Switcher</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <div className="text-6xl font-bold text-primary mb-2">
                  {result.score.toFixed(0)}%
                </div>
                <p className="text-muted-foreground">Tingkat Kesiapan Anda</p>
              </div>
              
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Rekomendasi untuk Anda:</h3>
                <div className="whitespace-pre-line text-sm">{result.recommendations}</div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => navigate("/consultation")} className="flex-1">
                  Konsultasi dengan Expert
                </Button>
                <Button variant="outline" onClick={() => navigate("/switchcareer")} className="flex-1">
                  Kembali ke Halaman Utama
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Kesiapan Switch Career</CardTitle>
            <CardDescription>
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!user && currentQuestion === 0 && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Kami akan mengirimkan hasil assessment ke email Anda
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>
              <RadioGroup
                value={answers[questions[currentQuestion].id]}
                onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 space-y-0">
                    <RadioGroupItem value={option.value} id={`${questions[currentQuestion].id}-${option.value}`} />
                    <Label
                      htmlFor={`${questions[currentQuestion].id}-${option.value}`}
                      className="font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Sebelumnya
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Assessment
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!answers[questions[currentQuestion].id]}
                >
                  Selanjutnya
                </Button>
              )}
            </div>

            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentCareerSwitch;
