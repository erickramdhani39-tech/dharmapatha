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
    question: "Seberapa siap CV dan portfolio Anda?",
    options: [
      { value: "4", label: "Sangat siap, sudah profesional dan lengkap" },
      { value: "3", label: "Cukup siap, ada beberapa yang perlu diperbaiki" },
      { value: "2", label: "Belum siap, masih perlu banyak perbaikan" },
      { value: "1", label: "Belum punya CV atau portfolio" }
    ]
  },
  {
    id: "q2",
    question: "Apakah Anda sudah memahami industri yang ingin Anda masuki?",
    options: [
      { value: "4", label: "Sangat memahami, sudah riset mendalam" },
      { value: "3", label: "Cukup memahami dasar-dasarnya" },
      { value: "2", label: "Belum terlalu memahami" },
      { value: "1", label: "Sama sekali belum tahu" }
    ]
  },
  {
    id: "q3",
    question: "Berapa banyak lamaran yang sudah Anda kirim?",
    options: [
      { value: "4", label: "Lebih dari 20 lamaran" },
      { value: "3", label: "10-20 lamaran" },
      { value: "2", label: "1-10 lamaran" },
      { value: "1", label: "Belum mengirim sama sekali" }
    ]
  },
  {
    id: "q4",
    question: "Seberapa percaya diri Anda dalam interview?",
    options: [
      { value: "4", label: "Sangat percaya diri, sudah latihan banyak" },
      { value: "3", label: "Cukup percaya diri" },
      { value: "2", label: "Kurang percaya diri" },
      { value: "1", label: "Sangat tidak percaya diri" }
    ]
  },
  {
    id: "q5",
    question: "Apakah Anda punya koneksi atau network di industri target?",
    options: [
      { value: "4", label: "Ya, punya banyak koneksi" },
      { value: "3", label: "Punya beberapa koneksi" },
      { value: "2", label: "Sangat sedikit koneksi" },
      { value: "1", label: "Tidak punya koneksi sama sekali" }
    ]
  },
  {
    id: "q6",
    question: "Apakah Anda sudah mengikuti training atau sertifikasi relevan?",
    options: [
      { value: "4", label: "Ya, sudah punya beberapa sertifikasi" },
      { value: "3", label: "Sudah 1-2 sertifikasi" },
      { value: "2", label: "Sedang dalam proses" },
      { value: "1", label: "Belum sama sekali" }
    ]
  },
  {
    id: "q7",
    question: "Seberapa fleksibel Anda dengan lokasi dan gaji awal?",
    options: [
      { value: "4", label: "Sangat fleksibel, terbuka untuk berbagai pilihan" },
      { value: "3", label: "Cukup fleksibel" },
      { value: "2", label: "Kurang fleksibel" },
      { value: "1", label: "Sangat spesifik dengan ekspektasi" }
    ]
  },
  {
    id: "q8",
    question: "Apakah Anda sudah punya pengalaman magang atau proyek nyata?",
    options: [
      { value: "4", label: "Ya, punya pengalaman magang dan beberapa proyek" },
      { value: "3", label: "Punya pengalaman magang saja" },
      { value: "2", label: "Hanya punya proyek kuliah/pribadi" },
      { value: "1", label: "Belum punya pengalaman sama sekali" }
    ]
  }
];

const AssessmentFreshGrad = () => {
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
      return `Luar biasa! Anda sangat siap memasuki dunia kerja. Berikut rekomendasi untuk memaksimalkan peluang:

• Terus kirim lamaran ke perusahaan target
• Manfaatkan network yang sudah Anda miliki
• Persiapkan portfolio online yang menarik
• Aktif di LinkedIn dan platform profesional lainnya
• Pertimbangkan untuk melamar posisi yang lebih menantang`;
    } else if (score >= 60) {
      return `Bagus! Anda cukup siap, namun ada beberapa area yang perlu ditingkatkan:

• Perbaiki dan update CV serta portfolio Anda
• Tambah koneksi profesional melalui networking event
• Ikuti training atau sertifikasi yang relevan
• Latih kemampuan interview dengan teman atau mentor
• Riset lebih dalam tentang industri target Anda`;
    } else if (score >= 40) {
      return `Anda perlu persiapan lebih matang. Fokus pada area berikut:

• Buat CV profesional dan portfolio yang menarik
• Mulai riset industri dan perusahaan target
• Ikuti workshop atau bootcamp untuk skill development
• Mulai bangun network profesional
• Cari pengalaman magang atau project freelance`;
    } else {
      return `Anda masih di tahap awal persiapan. Langkah-langkah yang harus dilakukan:

• Segera buat CV dan portfolio dasar
• Tentukan industri dan posisi yang Anda minati
• Ikuti kursus online atau bootcamp intensif
• Cari mentor atau career counselor
• Mulai dari volunteer atau magang untuk pengalaman
• Bergabung dengan komunitas profesional di bidang Anda`;
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
        assessment_type: "fresh_graduate",
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
              <CardTitle>Hasil Assessment Kesiapan Karir</CardTitle>
              <CardDescription>Fresh Graduate</CardDescription>
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
                <Button variant="outline" onClick={() => navigate("/freshgraduate")} className="flex-1">
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
            <CardTitle>Assessment Kesiapan Karir Fresh Graduate</CardTitle>
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

export default AssessmentFreshGrad;
