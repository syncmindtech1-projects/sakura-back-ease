import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SavedJobsProvider } from "@/contexts/SavedJobsContext";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Categories from "./pages/Categories";
import Companies from "./pages/Companies";
import RemoteJobs from "./pages/RemoteJobs";
import CareerAdvice from "./pages/CareerAdvice";
import ResumeBuilder from "./pages/ResumeBuilder";
import JobAlerts from "./pages/JobAlerts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import InterviewPrep from "./pages/InterviewPrep";
import SkillsAssessment from "./pages/SkillsAssessment";
import LearningPaths from "./pages/LearningPaths";
import PostJob from "./pages/PostJob";
import SavedJobs from "./pages/SavedJobs";
import Auth from "./pages/Auth";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AuthCallback from "./pages/AuthCallback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <SavedJobsProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:category" element={<Categories />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/remote-jobs" element={<RemoteJobs />} />
              <Route path="/career-advice" element={<CareerAdvice />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/job-alerts" element={<JobAlerts />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/skills-assessment" element={<SkillsAssessment />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SavedJobsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
