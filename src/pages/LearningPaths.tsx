import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Users, Star, ArrowRight, X, CheckCircle2, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Path {
  id: string;
  title: string;
  duration: string;
  level: string;
  learners: string;
  rating: number;
  category: string;
  overview: string;
  outcomes: string[];
  modules: { title: string; duration: string; description: string }[];
}

const paths: Path[] = [
  {
    id: "fullstack", title: "Become a Full-Stack Developer", duration: "6 months", level: "Beginner", learners: "12k+", rating: 4.8, category: "Technology",
    overview: "Go from zero coding to shipping production web apps. Learn the modern stack teams actually use — TypeScript, React, Node, Postgres — with weekly projects reviewed by mentors.",
    outcomes: ["Build 6 portfolio projects", "Deploy apps to Vercel & Supabase", "Pass a junior-dev technical interview", "Contribute to open source"],
    modules: [
      { title: "HTML, CSS & Tailwind Foundations", duration: "3 weeks", description: "Semantic HTML, responsive layouts, and utility-first CSS with Tailwind. Ends with a portfolio site." },
      { title: "JavaScript & TypeScript", duration: "4 weeks", description: "Modern JS (ES2024), async/await, types, generics. Build a task-tracker CLI." },
      { title: "React & State Management", duration: "5 weeks", description: "Hooks, context, Zustand/TanStack Query. Ship an e-commerce front-end." },
      { title: "Node.js & Express API", duration: "4 weeks", description: "REST APIs, auth, validation. Build a blog API tested with Vitest." },
      { title: "Databases with Postgres", duration: "3 weeks", description: "Schema design, SQL, indexes, RLS. Migrate the blog API to Supabase." },
      { title: "Deploy, Monitor, Iterate", duration: "3 weeks", description: "CI/CD, error tracking, analytics. Ship the final capstone project." },
    ],
  },
  {
    id: "marketing", title: "Digital Marketing Specialist", duration: "3 months", level: "Beginner", learners: "8k+", rating: 4.7, category: "Marketing",
    overview: "Master the marketing stack used by fast-growing brands — from SEO and paid ads to email and analytics.",
    outcomes: ["Run a Google Ads campaign end-to-end", "Rank a page on Google", "Ship an email drip that converts", "Build a marketing dashboard"],
    modules: [
      { title: "Marketing Foundations", duration: "1 week", description: "Positioning, funnels, ICP. Choose your niche and target." },
      { title: "SEO Fundamentals", duration: "3 weeks", description: "Keyword research, on-page SEO, technical SEO, backlinks." },
      { title: "Google & Meta Ads", duration: "3 weeks", description: "Campaign setup, targeting, budgets, creative testing." },
      { title: "Email Marketing", duration: "2 weeks", description: "List building, automation, deliverability, copy that converts." },
      { title: "Analytics & Reporting", duration: "3 weeks", description: "GA4, Looker Studio, attribution, weekly reporting cadence." },
    ],
  },
  {
    id: "data", title: "Data Analyst Career Path", duration: "4 months", level: "Intermediate", learners: "6k+", rating: 4.9, category: "Data",
    overview: "Learn the analyst workflow used at real companies: pull data with SQL, model it, visualize it, and tell a story stakeholders act on.",
    outcomes: ["Write intermediate/advanced SQL", "Build interactive dashboards", "Present insights to non-technical stakeholders", "Land a junior analyst role"],
    modules: [
      { title: "Excel for Analysts", duration: "2 weeks", description: "Pivot tables, INDEX/MATCH, Power Query, dashboards." },
      { title: "SQL Deep Dive", duration: "5 weeks", description: "Joins, window functions, CTEs, optimization. 100+ practice problems." },
      { title: "Data Visualization", duration: "3 weeks", description: "Looker Studio and Power BI. Chart selection and storytelling." },
      { title: "Statistics Basics", duration: "3 weeks", description: "Descriptive stats, distributions, correlation vs causation, A/B tests." },
      { title: "Portfolio Capstone", duration: "3 weeks", description: "End-to-end analysis on a real dataset, presented to peers." },
    ],
  },
  {
    id: "uiux", title: "UI/UX Designer", duration: "4 months", level: "Beginner", learners: "5k+", rating: 4.8, category: "Design",
    overview: "Move from copying tutorials to designing products people love. Learn Figma, user research, prototyping, and design systems.",
    outcomes: ["3 case-study projects", "Master Figma auto-layout & components", "Conduct user interviews", "Build a design system"],
    modules: [
      { title: "Design Principles", duration: "2 weeks", description: "Hierarchy, contrast, spacing, typography, color theory." },
      { title: "Figma Mastery", duration: "4 weeks", description: "Frames, auto-layout, components, variants, prototyping." },
      { title: "User Research", duration: "3 weeks", description: "Interviews, surveys, usability testing, synthesis." },
      { title: "Prototyping & Handoff", duration: "3 weeks", description: "Interactive prototypes, design tokens, developer handoff." },
      { title: "Design Systems", duration: "4 weeks", description: "Build a scalable system for a real product." },
    ],
  },
  {
    id: "pm", title: "Project Manager (PMP-aligned)", duration: "3 months", level: "Intermediate", learners: "4k+", rating: 4.6, category: "Business",
    overview: "Deliver projects on time, on budget, and with a happy team. Aligned to the PMBOK Guide and Agile.",
    outcomes: ["Run Scrum ceremonies confidently", "Build project charters and roadmaps", "Manage risk and stakeholders", "Prep for PMP or Scrum Master certification"],
    modules: [
      { title: "Foundations & Frameworks", duration: "2 weeks", description: "Waterfall, Agile, hybrid — when to use what." },
      { title: "Scrum & Agile in Practice", duration: "3 weeks", description: "Backlogs, sprints, retrospectives, velocity." },
      { title: "Stakeholder & Risk Management", duration: "2 weeks", description: "Communication plans, RAID logs, escalation." },
      { title: "Tools: Jira, Asana, Notion", duration: "2 weeks", description: "Hands-on setup of dashboards and workflows." },
      { title: "Leadership & Certification Prep", duration: "3 weeks", description: "Practice exams, mock interviews, cert roadmap." },
    ],
  },
  {
    id: "cloud", title: "Cloud Engineer (AWS)", duration: "5 months", level: "Intermediate", learners: "3k+", rating: 4.8, category: "Cloud",
    overview: "Learn to build, secure, and operate production cloud infrastructure on AWS — with Infrastructure as Code and CI/CD baked in.",
    outcomes: ["Deploy a 3-tier app on AWS", "Automate infra with Terraform", "Pass AWS Cloud Practitioner + Associate exams", "Set up monitoring and alerts"],
    modules: [
      { title: "Linux & Networking", duration: "3 weeks", description: "Bash, systemd, TCP/IP, DNS, load balancing." },
      { title: "AWS Core Services", duration: "5 weeks", description: "EC2, VPC, S3, RDS, IAM, Lambda." },
      { title: "Infrastructure as Code (Terraform)", duration: "3 weeks", description: "Modules, state, workspaces, CI-run plans." },
      { title: "CI/CD Pipelines", duration: "3 weeks", description: "GitHub Actions, blue/green deploys, rollbacks." },
      { title: "Security & Monitoring", duration: "4 weeks", description: "IAM policies, KMS, CloudWatch, incident response." },
    ],
  },
];

const LearningPaths = () => {
  const [open, setOpen] = useState<Path | null>(null);
  const [completed, setCompleted] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const stored = localStorage.getItem("learningProgress");
    if (stored) setCompleted(JSON.parse(stored));
  }, []);

  const toggle = (pathId: string, modTitle: string) => {
    setCompleted((prev) => {
      const list = prev[pathId] ?? [];
      const next = list.includes(modTitle) ? list.filter((m) => m !== modTitle) : [...list, modTitle];
      const updated = { ...prev, [pathId]: next };
      localStorage.setItem("learningProgress", JSON.stringify(updated));
      return updated;
    });
  };

  const progress = (p: Path) => Math.round(((completed[p.id]?.length ?? 0) / p.modules.length) * 100);

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(210,40%,96%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Learning Paths
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl">Curated, step-by-step roadmaps that take you from beginner to job-ready in the most in-demand careers across Africa. Click a path to see modules and track progress.</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paths.map((p, i) => {
              const pct = progress(p);
              return (
                <motion.div key={p.id} onClick={() => setOpen(p)} className="cursor-pointer bg-card rounded-2xl border border-border p-6 hover:shadow-elevated hover:border-primary/20 transition-all" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">{p.category}</span>
                      <h3 className="text-lg font-bold font-display text-foreground mt-2">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-foreground"><Star size={14} className="text-highlight fill-highlight" /> {p.rating}</div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3">
                    <span className="inline-flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                    <span className="inline-flex items-center gap-1"><BookOpen size={12} /> {p.level}</span>
                    <span className="inline-flex items-center gap-1"><Users size={12} /> {p.learners} learners</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{p.overview}</p>
                  {pct > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Your progress</span>
                        <span className="font-semibold text-primary">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full gradient-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                  <button className="mt-5 w-full gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.97]">
                    {pct > 0 ? "Continue Path" : "Start This Path"} <ArrowRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10">
            <AdsBanner variant="banner" adIndex={0} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-card w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border border-border shadow-elevated">
              <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">{open.category}</span>
                <button onClick={() => setOpen(null)} className="p-1.5 rounded-lg hover:bg-secondary"><X size={18} /></button>
              </div>
              <div className="px-6 py-6 md:px-10 md:py-8">
                <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">{open.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2 mb-5">
                  <span className="inline-flex items-center gap-1"><Clock size={12} />{open.duration}</span>
                  <span className="inline-flex items-center gap-1"><BookOpen size={12} />{open.level}</span>
                  <span className="inline-flex items-center gap-1"><Users size={12} />{open.learners}</span>
                  <span className="inline-flex items-center gap-1"><Star size={12} className="text-highlight fill-highlight" />{open.rating}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{open.overview}</p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mt-6 mb-3">What you'll be able to do</h3>
                <ul className="space-y-1.5">
                  {open.outcomes.map((o) => (
                    <li key={o} className="text-sm text-foreground/80 flex items-start gap-2"><CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />{o}</li>
                  ))}
                </ul>

                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mt-6 mb-3">Curriculum ({open.modules.length} modules)</h3>
                <div className="space-y-2">
                  {open.modules.map((m, i) => {
                    const isDone = completed[open.id]?.includes(m.title);
                    return (
                      <button key={m.title} onClick={() => toggle(open.id, m.title)} className={`w-full text-left p-4 rounded-xl border transition-all ${isDone ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}>
                        <div className="flex items-start gap-3">
                          {isDone ? <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /> : <PlayCircle size={18} className="text-muted-foreground shrink-0 mt-0.5" />}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="text-sm font-semibold text-foreground">{i + 1}. {m.title}</p>
                              <span className="text-[11px] text-muted-foreground shrink-0">{m.duration}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">Tap a module to mark it complete. Progress is saved on this device.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default LearningPaths;
