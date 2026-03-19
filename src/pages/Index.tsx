import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeaturedJobs";
import JobCategories from "@/components/JobCategories";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Audience from "@/components/Audience";
import Stats from "@/components/Stats";
import TopCompanies from "@/components/TopCompanies";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <FeaturedJobs />
      <JobCategories />
      <Features />
      <HowItWorks />
      <Audience />
      <TopCompanies />
      <Testimonials />
      <Newsletter />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
