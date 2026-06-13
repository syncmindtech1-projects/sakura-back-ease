import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Brain, Target, ArrowRight } from "lucide-react";
import { useState } from "react";

const assessments = [
  { title: "Software Engineering", duration: "20 min", questions: 25, level: "Beginner → Advanced", category: "Technology", color: "bg-primary/10 text-primary" },
  { title: "Digital Marketing", duration: "15 min", questions: 20, level: "All levels", category: "Marketing", color: "bg-highlight/10 text-highlight" },
  { title: "Data Analysis (SQL & Excel)", duration: "25 min", questions: 30, level: "Intermediate", category: "Technology", color: "bg-accent/10 text-accent" },
  { title: "Project Management", duration: "20 min", questions: 25, level: "All levels", category: "Business", color: "bg-primary/10 text-primary" },
  { title: "UI / UX Design", duration: "18 min", questions: 22, level: "Intermediate", category: "Design", color: "bg-highlight/10 text-highlight" },
  { title: "Accounting & Bookkeeping", duration: "20 min", questions: 25, level: "All levels", category: "Finance", color: "bg-accent/10 text-accent" },
  { title: "Customer Service", duration: "12 min", questions: 15, level: "Beginner", category: "Support", color: "bg-primary/10 text-primary" },
  { title: "Electrical & Wiring", duration: "20 min", questions: 25, level: "Intermediate", category: "Trades", color: "bg-highlight/10 text-highlight" },
];

const benefits = [
  { icon: Brain, title: "Discover Your Strengths", desc: "Identify what you're great at and where you can grow." },
  { icon: Target, title: "Get Job Matches", desc: "We recommend roles that fit your verified skill profile." },
  { icon: Award, title: "Shareable Badges", desc: "Earn credentials you can add to your resume and LinkedIn." },
];

const SkillsAssessment = () => {
  const [started, setStarted] = useState<string | null>(null);

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(250,30%,96%)] to-[hsl(210,35%,97%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            🧠 Skills Assessment
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl">Take a free assessment, measure your skill level against industry benchmarks, and unlock personalised job recommendations.</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {benefits.map((b, i) => (
              <motion.div key={b.title} className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3"><b.icon size={22} className="text-primary" /></div>
                <h3 className="text-base font-semibold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold font-display text-foreground mb-4">Choose an Assessment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map((a, i) => (
              <motion.div key={a.title} className="bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-primary/20 transition-all" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${a.color}`}>{a.category}</span>
                <h3 className="text-base font-semibold font-display text-foreground mt-3">{a.title}</h3>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                  <span>⏱ {a.duration}</span>
                  <span>📝 {a.questions} questions</span>
                  <span>📊 {a.level}</span>
                </div>
                <button onClick={() => setStarted(a.title)} className="mt-4 w-full gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.97]">
                  {started === a.title ? <><CheckCircle2 size={14} /> Saved to your dashboard</> : <>Start Free Assessment <ArrowRight size={14} /></>}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <AdsBanner variant="banner" adIndex={1} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SkillsAssessment;
