import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Audience from "@/components/Audience";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Audience />
      <CTASection />
      <footer className="bg-card border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BackPain Relief Now. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
