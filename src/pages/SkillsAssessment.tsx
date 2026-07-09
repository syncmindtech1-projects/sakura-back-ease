import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Award, Brain, Target, ArrowRight, X, RotateCcw, Trophy } from "lucide-react";
import { useState } from "react";

interface Question {
  q: string;
  options: string[];
  answer: number;
}
interface Assessment {
  title: string;
  duration: string;
  level: string;
  category: string;
  color: string;
  questions: Question[];
}

const assessments: Assessment[] = [
  {
    title: "Software Engineering", duration: "5 min", level: "Beginner → Advanced", category: "Technology", color: "bg-primary/10 text-primary",
    questions: [
      { q: "Which HTTP status code means 'Not Found'?", options: ["200", "301", "404", "500"], answer: 2 },
      { q: "In JavaScript, what does `===` compare?", options: ["Value only", "Type only", "Value and type", "Reference only"], answer: 2 },
      { q: "Which is NOT a JavaScript framework?", options: ["React", "Vue", "Django", "Angular"], answer: 2 },
      { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Logic", "Standard Question Language", "Server Query Loop"], answer: 0 },
      { q: "Which sorting algorithm has O(n log n) average time complexity?", options: ["Bubble sort", "Merge sort", "Selection sort", "Insertion sort"], answer: 1 },
    ],
  },
  {
    title: "Digital Marketing", duration: "4 min", level: "All levels", category: "Marketing", color: "bg-highlight/10 text-highlight",
    questions: [
      { q: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engagement Online", "Site Editing Order", "Sales Enablement Ops"], answer: 0 },
      { q: "CTR measures…", options: ["Cost per install", "Click-through rate", "Content transfer rate", "Conversion time ratio"], answer: 1 },
      { q: "Which platform is best for B2B lead-gen?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], answer: 1 },
      { q: "A 'buyer persona' is…", options: ["A staff role", "A fictional target customer", "A pricing model", "An ad format"], answer: 1 },
      { q: "Which is a KPI for email marketing?", options: ["Bounce rate", "PageRank", "Domain authority", "Kernel size"], answer: 0 },
    ],
  },
  {
    title: "Data Analysis (SQL & Excel)", duration: "5 min", level: "Intermediate", category: "Technology", color: "bg-accent/10 text-accent",
    questions: [
      { q: "In Excel, which function looks up a value in a table?", options: ["SUMIF", "VLOOKUP", "TRIM", "IFERROR"], answer: 1 },
      { q: "SQL: which clause filters rows?", options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], answer: 2 },
      { q: "Which is a measure of central tendency?", options: ["Variance", "Median", "Standard deviation", "Range"], answer: 1 },
      { q: "A pivot table is used to…", options: ["Encrypt data", "Summarize and aggregate data", "Design forms", "Send emails"], answer: 1 },
      { q: "INNER JOIN returns…", options: ["All rows from both tables", "Only matching rows from both tables", "Only rows from left table", "Only rows from right table"], answer: 1 },
    ],
  },
  {
    title: "Project Management", duration: "4 min", level: "All levels", category: "Business", color: "bg-primary/10 text-primary",
    questions: [
      { q: "In Scrum, a sprint typically lasts…", options: ["1 day", "1–4 weeks", "3 months", "6 months"], answer: 1 },
      { q: "A Gantt chart is best used to…", options: ["Track budgets", "Visualize project schedule", "Score risks", "Rank teams"], answer: 1 },
      { q: "MVP stands for…", options: ["Most Valuable Player", "Minimum Viable Product", "Major Version Plan", "Marketing Value Point"], answer: 1 },
      { q: "Who owns the product backlog in Scrum?", options: ["Scrum Master", "Product Owner", "Dev Team", "Stakeholders"], answer: 1 },
      { q: "SMART goals are Specific, Measurable, Achievable, Relevant, and…", options: ["Trending", "Timely", "Technical", "Tested"], answer: 1 },
    ],
  },
  {
    title: "UI / UX Design", duration: "4 min", level: "Intermediate", category: "Design", color: "bg-highlight/10 text-highlight",
    questions: [
      { q: "A wireframe is…", options: ["A high-fidelity mockup", "A low-fidelity structural sketch", "A CSS framework", "A prototyping tool"], answer: 1 },
      { q: "Which principle keeps interfaces consistent?", options: ["Contrast", "Consistency", "Chaos", "Compression"], answer: 1 },
      { q: "In Figma, 'Auto Layout' is used to…", options: ["Compress files", "Manage responsive spacing", "Import PDFs", "Publish plugins"], answer: 1 },
      { q: "WCAG defines standards for…", options: ["Accessibility", "Performance", "Security", "Databases"], answer: 0 },
      { q: "Which is a UX research method?", options: ["A/B testing", "Kubernetes", "Git rebase", "OAuth"], answer: 0 },
    ],
  },
  {
    title: "Accounting & Bookkeeping", duration: "4 min", level: "All levels", category: "Finance", color: "bg-accent/10 text-accent",
    questions: [
      { q: "Assets = Liabilities + ?", options: ["Revenue", "Equity", "Expenses", "Cash"], answer: 1 },
      { q: "Which is a current asset?", options: ["Building", "Inventory", "Loan payable", "Trademark"], answer: 1 },
      { q: "Double-entry means every transaction has…", options: ["Two dates", "A debit and a credit", "Two approvers", "Two accounts payable"], answer: 1 },
      { q: "A trial balance checks that…", options: ["Cash matches", "Debits equal credits", "Assets equal profit", "Revenue equals cost"], answer: 1 },
      { q: "Depreciation applies to…", options: ["Inventory", "Fixed assets", "Cash", "Accounts payable"], answer: 1 },
    ],
  },
  {
    title: "Customer Service", duration: "3 min", level: "Beginner", category: "Support", color: "bg-primary/10 text-primary",
    questions: [
      { q: "First response time measures…", options: ["Time to close ticket", "Time to first reply", "Time on hold", "Time to escalate"], answer: 1 },
      { q: "Active listening is…", options: ["Repeating words", "Fully focusing and confirming understanding", "Reading scripts", "Multitasking"], answer: 1 },
      { q: "CSAT stands for…", options: ["Customer Satisfaction", "Call Support Assist Tool", "Client Service Alert Team", "Case Study Analysis"], answer: 0 },
      { q: "For an angry customer, first…", options: ["Argue back", "Acknowledge and apologize", "Transfer immediately", "Hang up"], answer: 1 },
      { q: "A knowledge base helps agents…", options: ["Track hours", "Find answers quickly", "Set salaries", "Design ads"], answer: 1 },
    ],
  },
  {
    title: "Electrical & Wiring", duration: "4 min", level: "Intermediate", category: "Trades", color: "bg-highlight/10 text-highlight",
    questions: [
      { q: "Ohm's law: V = ?", options: ["I × R", "I / R", "R / I", "P × I"], answer: 0 },
      { q: "A circuit breaker protects against…", options: ["Rust", "Overload / short circuit", "UV rays", "Voltage drop only"], answer: 1 },
      { q: "AC stands for…", options: ["Alternating Current", "Active Circuit", "Amp Cycle", "Analog Coil"], answer: 0 },
      { q: "The color code for earth/ground (IEC) is…", options: ["Red", "Blue", "Green-yellow", "Black"], answer: 2 },
      { q: "A multimeter cannot directly measure…", options: ["Voltage", "Current", "Resistance", "Light intensity"], answer: 3 },
    ],
  },
];

const benefits = [
  { icon: Brain, title: "Discover Your Strengths", desc: "Identify what you're great at and where you can grow." },
  { icon: Target, title: "Get Job Matches", desc: "We recommend roles that fit your verified skill profile." },
  { icon: Award, title: "Shareable Badges", desc: "Earn credentials you can add to your resume and LinkedIn." },
];

const SkillsAssessment = () => {
  const [active, setActive] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const start = (a: Assessment) => { setActive(a); setAnswers([]); setStep(0); setDone(false); };
  const close = () => { setActive(null); setDone(false); };
  const pick = (idx: number) => {
    if (!active) return;
    const next = [...answers, idx];
    setAnswers(next);
    if (step + 1 >= active.questions.length) setDone(true);
    else setStep(step + 1);
  };
  const retry = () => { setAnswers([]); setStep(0); setDone(false); };
  const score = active ? answers.filter((a, i) => a === active.questions[i].answer).length : 0;
  const pct = active ? Math.round((score / active.questions.length) * 100) : 0;
  const grade = pct >= 80 ? { label: "Expert", color: "text-emerald-600" } : pct >= 60 ? { label: "Proficient", color: "text-amber-600" } : { label: "Learning", color: "text-rose-600" };

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(160,25%,95%)] py-10 md:py-14">
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
                  <span>📝 {a.questions.length} questions</span>
                  <span>📊 {a.level}</span>
                </div>
                <button onClick={() => start(a)} className="mt-4 w-full gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.97]">
                  Start Free Assessment <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <AdsBanner variant="banner" adIndex={1} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[70] bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-card w-full max-w-xl rounded-t-3xl md:rounded-3xl border border-border shadow-elevated">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">{active.title}</h3>
                <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary"><X size={18} /></button>
              </div>

              {!done ? (
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Question {step + 1} of {active.questions.length}</span>
                    <span>{Math.round((step / active.questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
                    <div className="h-full gradient-primary transition-all" style={{ width: `${((step) / active.questions.length) * 100}%` }} />
                  </div>
                  <p className="text-lg font-semibold font-display text-foreground mb-4">{active.questions[step].q}</p>
                  <div className="space-y-2">
                    {active.questions[step].options.map((opt, idx) => (
                      <button key={idx} onClick={() => pick(idx)} className="w-full text-left px-4 py-3 rounded-xl border border-border bg-secondary/50 hover:bg-primary/10 hover:border-primary transition-all text-sm text-foreground">
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Trophy size={48} className={`${grade.color} mx-auto mb-3`} />
                  <p className="text-3xl font-bold font-display text-foreground">{score} / {active.questions.length}</p>
                  <p className={`text-lg font-semibold mt-1 ${grade.color}`}>{grade.label} — {pct}%</p>
                  <p className="text-sm text-muted-foreground mt-3 max-w-sm mx-auto">
                    {pct >= 80 ? "Impressive! You're ready to apply for senior roles in this area." : pct >= 60 ? "Solid foundation — a few targeted courses will push you to expert level." : "Great start. Try our Learning Paths to close the gap fast."}
                  </p>
                  <div className="flex gap-2 justify-center mt-6">
                    <button onClick={retry} className="inline-flex items-center gap-2 bg-secondary text-foreground font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-secondary/80"><RotateCcw size={14} /> Retry</button>
                    <button onClick={close} className="gradient-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-xl inline-flex items-center gap-2"><CheckCircle2 size={14} /> Done</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default SkillsAssessment;
