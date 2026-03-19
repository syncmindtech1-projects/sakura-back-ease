import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import Categories from "./pages/Categories";
import Companies from "./pages/Companies";
import RemoteJobs from "./pages/RemoteJobs";
import SalaryGuide from "./pages/SalaryGuide";
import CareerAdvice from "./pages/CareerAdvice";
import ResumeBuilder from "./pages/ResumeBuilder";
import JobAlerts from "./pages/JobAlerts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import InterviewPrep from "./pages/InterviewPrep";
import PostJob from "./pages/PostJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Categories />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/remote-jobs" element={<RemoteJobs />} />
          <Route path="/salary-guide" element={<SalaryGuide />} />
          <Route path="/career-advice" element={<CareerAdvice />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/job-alerts" element={<JobAlerts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
