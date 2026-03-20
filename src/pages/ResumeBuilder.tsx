import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Download, Eye, Palette, Zap, ArrowRight } from "lucide-react";

const templates = [
  { name: "Professional", desc: "Clean and corporate", color: "bg-primary/10 text-primary" },
  { name: "Modern", desc: "Bold and creative", color: "bg-accent/10 text-accent" },
  { name: "Minimal", desc: "Simple and elegant", color: "bg-highlight/10 text-highlight" },
  { name: "Technical", desc: "For developers & engineers", color: "bg-primary/10 text-primary" },
];

const features = [
  { icon: Zap, title: "AI-Powered Suggestions", desc: "Get intelligent content recommendations based on your target role" },
  { icon: Palette, title: "Customizable Templates", desc: "Choose from professionally designed templates and customize colors, fonts, and layout" },
  { icon: Eye, title: "ATS-Optimized", desc: "Your resume passes through applicant tracking systems with a high match score" },
  { icon: Download, title: "Export Anywhere", desc: "Download as PDF, DOCX, or share via a unique link with employers" },
];

const ResumeBuilder = () => (
  <PageLayout>
    <section className="bg-gradient-to-br from-[hsl(250,30%,96%)] to-[hsl(210,35%,97%)] py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            📝 Resume Builder
          </motion.h1>
          <p className="text-lg text-muted-foreground mb-6">Create a professional, ATS-friendly resume in minutes — no design skills needed.</p>
          <button className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2 active:scale-[0.97]">
            Start Building — It's Free <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feat, i) => (
            <motion.div key={feat.title} className="bg-card rounded-2xl border border-border p-6 hover:shadow-elevated transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feat.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold font-display text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Templates */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">Choose a Template</h2>
          <p className="text-muted-foreground mt-2">Pick a starting point and customize it to fit your style</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {templates.map((t, i) => (
            <motion.div key={t.name} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated hover:border-primary/20 transition-all cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
              <div className="h-40 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <FileText size={48} className="text-muted-foreground/30" />
              </div>
              <div className="p-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${t.color}`}>{t.name}</span>
                <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
                <button className="mt-3 text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                  Use this template <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Steps */}
        <motion.div className="bg-card rounded-3xl border border-border p-8 md:p-12 max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold font-display text-foreground mb-6 text-center">How It Works</h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Choose a template", desc: "Pick from our professionally designed templates" },
              { step: "2", title: "Fill in your details", desc: "Add your experience, skills, and education — our AI helps you write" },
              { step: "3", title: "Download & apply", desc: "Export as PDF and start applying to jobs with confidence" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">{item.step}</div>
                <div>
                  <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.97]">
              Build Your Resume Now
            </button>
          </div>
        </motion.div>

        <div className="mt-12">
          <AdsBanner variant="banner" adIndex={2} />
        </div>
      </div>
    </section>
  </PageLayout>
);

export default ResumeBuilder;
