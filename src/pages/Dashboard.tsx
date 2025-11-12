import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Target, TrendingUp, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Profile {
  full_name: string;
  email: string;
  phone: string | null;
}

interface Consultation {
  id: string;
  topic: string;
  preferred_date: string | null;
  status: string;
  scheduled_date: string | null;
  mentor_name: string | null;
  created_at: string;
}

interface CareerProgress {
  id: string;
  milestone_type: string;
  title: string;
  description: string | null;
  completed: boolean;
  completed_at: string | null;
  target_date: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [careerProgress, setCareerProgress] = useState<CareerProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch profile - TODO: Create profiles table
      // const { data: profileData } = await supabase
      //   .from("profiles")
      //   .select("*")
      //   .eq("id", user!.id)
      //   .single();
      // if (profileData) setProfile(profileData);

      // Fetch consultations - TODO: Create consultations table
      // const { data: consultationsData } = await supabase
      //   .from("consultations")
      //   .select("*")
      //   .eq("user_id", user!.id)
      //   .order("created_at", { ascending: false });
      // if (consultationsData) setConsultations(consultationsData);

      // Fetch career progress - TODO: Create career_progress table
      // const { data: progressData } = await supabase
      //   .from("career_progress")
      //   .select("*")
      //   .eq("user_id", user!.id)
      //   .order("created_at", { ascending: false });
      // if (progressData) setCareerProgress(progressData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Menunggu" },
      confirmed: { variant: "default" as const, label: "Terkonfirmasi" },
      completed: { variant: "default" as const, label: "Selesai" },
      cancelled: { variant: "destructive" as const, label: "Dibatalkan" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getMilestoneIcon = (type: string) => {
    const icons = {
      skill: Target,
      course: Calendar,
      achievement: TrendingUp,
      goal: CheckCircle,
    };
    const Icon = icons[type as keyof typeof icons] || Target;
    return <Icon className="h-5 w-5" />;
  };

  const calculateProgress = () => {
    if (careerProgress.length === 0) return 0;
    const completed = careerProgress.filter((item) => item.completed).length;
    return Math.round((completed / careerProgress.length) * 100);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang kembali, {profile?.full_name || "User"}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Konsultasi</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations.length}</div>
              <p className="text-xs text-muted-foreground">
                {consultations.filter((c) => c.status === "pending").length} menunggu konfirmasi
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress Karier</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateProgress()}%</div>
              <Progress value={calculateProgress()} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Milestone Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {careerProgress.filter((p) => p.completed).length}
              </div>
              <p className="text-xs text-muted-foreground">
                dari {careerProgress.length} milestone
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="consultations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="consultations">Riwayat Konsultasi</TabsTrigger>
            <TabsTrigger value="progress">Progress Karier</TabsTrigger>
          </TabsList>

          <TabsContent value="consultations" className="space-y-4">
            {consultations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Belum ada riwayat konsultasi
                  </p>
                  <Button onClick={() => navigate("/konsultasi")}>
                    Jadwalkan Konsultasi
                  </Button>
                </CardContent>
              </Card>
            ) : (
              consultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{consultation.topic}</CardTitle>
                        <CardDescription className="mt-1">
                          Dibuat: {format(new Date(consultation.created_at), "d MMMM yyyy", { locale: id })}
                        </CardDescription>
                      </div>
                      {getStatusBadge(consultation.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {consultation.scheduled_date && (
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          Jadwal: {format(new Date(consultation.scheduled_date), "d MMMM yyyy, HH:mm", { locale: id })}
                        </div>
                      )}
                      {consultation.mentor_name && (
                        <div className="flex items-center text-muted-foreground">
                          <Target className="h-4 w-4 mr-2" />
                          Mentor: {consultation.mentor_name}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            {careerProgress.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Belum ada milestone karier
                  </p>
                  <p className="text-sm text-center text-muted-foreground max-w-md">
                    Milestone akan ditambahkan setelah konsultasi dengan mentor
                  </p>
                </CardContent>
              </Card>
            ) : (
              careerProgress.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          item.completed ? "bg-accent/10 text-accent" : "bg-muted"
                        }`}>
                          {getMilestoneIcon(item.milestone_type)}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          {item.description && (
                            <CardDescription className="mt-1">
                              {item.description}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-accent" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <Badge variant="outline" className="capitalize">
                        {item.milestone_type}
                      </Badge>
                      {item.target_date && (
                        <span>Target: {format(new Date(item.target_date), "d MMM yyyy", { locale: id })}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
