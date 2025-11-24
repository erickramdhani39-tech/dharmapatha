import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users, TrendingUp, Award, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Assessment {
  id: string;
  user_id: string | null;
  email: string | null;
  assessment_type: string;
  score: number;
  recommendations: string | null;
  created_at: string;
}

interface Statistics {
  total: number;
  avgScore: number;
  freshGradCount: number;
  careerSwitchCount: number;
  scoreDistribution: { range: string; count: number }[];
  dailyStats: { date: string; count: number }[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const AdminAssessments = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      checkAdminRole();
    }
  }, [user]);

  const checkAdminRole = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsAdmin(true);
        fetchAssessments();
      } else {
        toast({
          title: "Akses Ditolak",
          description: "Anda tidak memiliki akses admin",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setAssessments(data || []);
      calculateStatistics(data || []);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data assessment",
        variant: "destructive",
      });
    }
  };

  const calculateStatistics = (data: Assessment[]) => {
    if (data.length === 0) {
      setStatistics({
        total: 0,
        avgScore: 0,
        freshGradCount: 0,
        careerSwitchCount: 0,
        scoreDistribution: [],
        dailyStats: [],
      });
      return;
    }

    const total = data.length;
    const avgScore = data.reduce((sum, a) => sum + Number(a.score), 0) / total;
    const freshGradCount = data.filter(a => a.assessment_type === "fresh_graduate").length;
    const careerSwitchCount = data.filter(a => a.assessment_type === "career_switch").length;

    // Score distribution
    const scoreRanges = [
      { range: "0-20", min: 0, max: 20 },
      { range: "21-40", min: 21, max: 40 },
      { range: "41-60", min: 41, max: 60 },
      { range: "61-80", min: 61, max: 80 },
      { range: "81-100", min: 81, max: 100 },
    ];

    const scoreDistribution = scoreRanges.map(r => ({
      range: r.range,
      count: data.filter(a => Number(a.score) >= r.min && Number(a.score) <= r.max).length,
    }));

    // Daily stats (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyStats = last7Days.map(date => ({
      date: format(new Date(date), "dd MMM", { locale: id }),
      count: data.filter(a => a.created_at.startsWith(date)).length,
    }));

    setStatistics({
      total,
      avgScore: Math.round(avgScore * 10) / 10,
      freshGradCount,
      careerSwitchCount,
      scoreDistribution,
      dailyStats,
    });
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500">Sangat Baik</Badge>;
    if (score >= 60) return <Badge className="bg-blue-500">Baik</Badge>;
    if (score >= 40) return <Badge className="bg-yellow-500">Cukup</Badge>;
    return <Badge variant="destructive">Perlu Peningkatan</Badge>;
  };

  const typeData = statistics ? [
    { name: "Fresh Graduate", value: statistics.freshGradCount },
    { name: "Career Switch", value: statistics.careerSwitchCount },
  ] : [];

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Assessment</h1>
        <p className="text-muted-foreground mt-2">
          Statistik dan hasil assessment dari semua pengguna
        </p>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessment</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.total}</div>
              <p className="text-xs text-muted-foreground">Semua tipe assessment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.avgScore}</div>
              <p className="text-xs text-muted-foreground">Dari 100 poin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fresh Graduate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.freshGradCount}</div>
              <p className="text-xs text-muted-foreground">
                {statistics.total > 0 ? Math.round((statistics.freshGradCount / statistics.total) * 100) : 0}% dari total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Career Switch</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.careerSwitchCount}</div>
              <p className="text-xs text-muted-foreground">
                {statistics.total > 0 ? Math.round((statistics.careerSwitchCount / statistics.total) * 100) : 0}% dari total
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Daftar Assessment</TabsTrigger>
          <TabsTrigger value="charts">Grafik & Statistik</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Semua Hasil Assessment</CardTitle>
              <CardDescription>
                Daftar lengkap assessment yang telah diselesaikan pengguna
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assessments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada data assessment
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Rekomendasi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assessments.map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell>
                            {format(new Date(assessment.created_at), "dd MMM yyyy, HH:mm", { locale: id })}
                          </TableCell>
                          <TableCell className="font-medium">
                            {assessment.email || "-"}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {assessment.assessment_type === "fresh_graduate" 
                                ? "Fresh Graduate" 
                                : "Career Switch"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold">
                            {Number(assessment.score).toFixed(0)}
                          </TableCell>
                          <TableCell>{getScoreBadge(Number(assessment.score))}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {assessment.recommendations || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Score</CardTitle>
                <CardDescription>Jumlah pengguna per rentang score</CardDescription>
              </CardHeader>
              <CardContent>
                {statistics && statistics.scoreDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statistics.scoreDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Tidak ada data
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipe Assessment</CardTitle>
                <CardDescription>Perbandingan jumlah assessment</CardDescription>
              </CardHeader>
              <CardContent>
                {typeData.length > 0 && typeData.some(d => d.value > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="hsl(var(--primary))"
                        dataKey="value"
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Tidak ada data
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Tren Assessment (7 Hari Terakhir)</CardTitle>
                <CardDescription>Jumlah assessment yang diselesaikan per hari</CardDescription>
              </CardHeader>
              <CardContent>
                {statistics && statistics.dailyStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statistics.dailyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Tidak ada data
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAssessments;
