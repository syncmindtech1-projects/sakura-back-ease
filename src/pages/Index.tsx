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
import VideoShowcase from "@/components/VideoShowcase";
import SiteChatbot from "@/components/SiteChatbot";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <VideoShowcase />
      <JobCategories />
      <Features />
      <Audience />
      <Testimonials />
      <Newsletter />
      <CTASection />
      <Footer />
      <SiteChatbot />
    </div>
  );
};


export default Index;
