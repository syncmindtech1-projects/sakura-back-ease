import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JobCategories from "@/components/JobCategories";
import Features from "@/components/Features";
import Audience from "@/components/Audience";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AdsBanner from "@/components/AdsBanner";
import VideoShowcase from "@/components/VideoShowcase";
import VideoAdSection from "@/components/VideoAdSection";
import LiveJobs from "@/components/LiveJobs";
import SiteChatbot from "@/components/SiteChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LiveJobs limit={9} />
      <Stats />
      <AdsBanner variant="banner" adIndex={0} />
      <VideoShowcase />
      <JobCategories />
      <VideoAdSection adIndex={0} />
      <Features />
      <AdsBanner variant="banner" adIndex={1} />
      <Audience />
      <VideoAdSection adIndex={1} />
      <AdsBanner variant="banner" adIndex={2} />
      <Testimonials />
      <Newsletter />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
