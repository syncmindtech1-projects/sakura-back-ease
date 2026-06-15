import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Star, ArrowRight } from "lucide-react";

const paths = [
  { title: "Become a Full-Stack Developer", duration: "6 months", level: "Beginner", learners: "12k+", rating: 4.8, modules: ["HTML/CSS Foundations", "JavaScript & TypeScript", "React & Tailwind", "Node.js & Express", "Databases & SQL", "Deploy with Vercel"], category: "Technology" },
  { title: "Digital Marketing Specialist", duration: "3 months", level: "Beginner", learners: "8k+", rating: 4.7, modules: ["SEO Fundamentals", "Google Ads", "Social Media Strategy", "Email Marketing", "Analytics & Reporting"], category: "Marketing" },
  { title: "Data Analyst Career Path", duration: "4 months", level: "Intermediate", learners: "6k+", rating: 4.9, modules: ["Excel for Analysts", "SQL Deep Dive", "Power BI / Looker", "Statistics Basics", "Storytelling with Data"], category: "Data" },
  { title: "UI/UX Designer", duration: "4 months", level: "Beginner", learners: "5k+", rating: 4.8, modules: ["Design Principles", "Figma Mastery", "User Research", "Prototyping", "Design Systems"], category: "Design" },
  { title: "Project Manager (PMP-aligned)", duration: "3 months", level: "Intermediate", learners: "4k+", rating: 4.6, modules: ["Agile & Scrum", "Stakeholder Management", "Risk & Budget", "Jira & Roadmaps", "Leadership"], category: "Business" },
  { title: "Cloud Engineer (AWS)", duration: "5 months", level: "Intermediate", learners: "3k+", rating: 4.8, modules: ["Linux & Networking", "AWS Core Services", "IaC with Terraform", "CI/CD Pipelines", "Security & Monitoring"], category: "Cloud" },
];

const LearningPaths = () => (
  <PageLayout>
    <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(210,40%,96%)] py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          🎓 Learning Paths
        </motion.h1>
        <p className="text-muted-foreground max-w-2xl">Curated, step-by-step roadmaps that take you from beginner to job-ready in the most in-demand careers across Africa.</p>
      </div>
    </section>

    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paths.map((p, i) => (
            <motion.div key={p.title} className="bg-card rounded-2xl border border-border p-6 hover:shadow-elevated hover:border-primary/20 transition-all" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
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
              <ul className="mt-4 space-y-1.5">
                {p.modules.map((m, idx) => (
                  <li key={m} className="text-sm text-foreground/90 flex items-start gap-2">
                    <span className="text-xs font-bold text-primary mt-0.5">{idx + 1}.</span> {m}
                  </li>
                ))}
              </ul>
              <button className="mt-5 w-full gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.97]">
                Start This Path <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <AdsBanner variant="banner" adIndex={0} />
        </div>
      </div>
    </section>
  </PageLayout>
);

export default LearningPaths;
