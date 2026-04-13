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
import AdsBanner from "@/components/AdsBanner";
import VideoShowcase from "@/components/VideoShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <FeaturedJobs />
      <AdsBanner variant="banner" adIndex={0} />
      <VideoShowcase />
      <JobCategories />
      <AdsBanner variant="banner" adIndex={3} />
      <Features />
      <AdsBanner variant="banner" adIndex={1} />
      <HowItWorks />
      <Audience />
      <AdsBanner variant="banner" adIndex={4} />
      <TopCompanies />
      <AdsBanner variant="banner" adIndex={2} />
      <Testimonials />
      <Newsletter />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
