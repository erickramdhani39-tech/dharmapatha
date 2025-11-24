import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import FreshGraduate from "./pages/FreshGraduate";
import SwitchCareer from "./pages/SwitchCareer";
import Consultation from "./pages/Consultation";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminCareerGuides from "./pages/AdminCareerGuides";
import AdminAssessments from "./pages/AdminAssessments";
import ArticleDetail from "./pages/ArticleDetail";
import AssessmentFreshGrad from "./pages/AssessmentFreshGrad";
import AssessmentCareerSwitch from "./pages/AssessmentCareerSwitch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tentang" element={<About />} />
                <Route path="/freshgraduate" element={<FreshGraduate />} />
                <Route path="/switch-career" element={<SwitchCareer />} />
                <Route path="/artikel/:id" element={<ArticleDetail />} />
                <Route path="/assessment/freshgrad" element={<AssessmentFreshGrad />} />
                <Route path="/assessment/careerswitch" element={<AssessmentCareerSwitch />} />
                <Route path="/konsultasi" element={<Consultation />} />
                <Route path="/kontak" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/career-guides" element={<AdminCareerGuides />} />
                <Route path="/admin/assessments" element={<AdminAssessments />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
