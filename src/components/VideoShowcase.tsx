import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search, Heart, Send, FileText, ChevronRight } from "lucide-react";

const demos = [
  {
    id: "search",
    title: "Smart Job Search",
    desc: "Find your perfect job in seconds with powerful filters and AI-powered recommendations",
    icon: Search,
    color: "hsl(var(--primary))",
    steps: ["Type a keyword or job title", "Filter by location, type & salary", "Get instant matched results"],
  },
  {
    id: "save",
    title: "Save & Track Jobs",
    desc: "Bookmark jobs you love and track your applications all in one place",
    icon: Heart,
    color: "hsl(var(--accent))",
    steps: ["Click the heart icon on any job", "Access saved jobs from your dashboard", "Get notified when jobs expire"],
  },
  {
    id: "apply",
    title: "One-Click Apply",
    desc: "Apply to any job with a single click — your profile does the rest",
    icon: Send,
    color: "hsl(var(--highlight))",
    steps: ["Build your profile once", "Click 'Apply Now' on any listing", "Track your application status"],
  },
  {
    id: "resume",
    title: "AI Resume Builder",
    desc: "Create a professional resume in minutes with our intelligent builder",
    icon: FileText,
    color: "hsl(280, 70%, 55%)",
    steps: ["Choose a professional template", "AI fills in your details", "Download and share instantly"],
  },
];

const VideoShowcase = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">See It In Action</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2">
            How JobSphere <span className="text-gradient">Works For You</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Watch quick demos of our most powerful features</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-2">
            {demos.map((demo, i) => (
              <motion.button key={demo.id} onClick={() => setActiveDemo(i)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                  activeDemo === i ? 'bg-card border-primary/30 shadow-elevated' : 'border-transparent hover:bg-card/50 hover:border-border'
                }`}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${demo.color}15`, color: demo.color }}>
                    <demo.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">{demo.title}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{demo.desc}</p>
                    {activeDemo === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-3 space-y-2">
                        {demo.steps.map((step, j) => (
                          <motion.div key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.1 }}
                            className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                              style={{ backgroundColor: `${demo.color}15`, color: demo.color }}>{j + 1}</span>
                            {step}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform shrink-0 mt-1 ${activeDemo === i ? 'rotate-90' : ''}`} />
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div className="lg:col-span-3" initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 }}>
            <div className="relative bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/40" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--highlight))]/40" />
                  <div className="w-3 h-3 rounded-full bg-accent/40" />
                </div>
                <div className="flex-1 bg-secondary rounded-lg px-3 py-1 text-[11px] text-muted-foreground text-center">
                  jobsphere.com/{demos[activeDemo].id}
                </div>
              </div>
              <div className="p-8 min-h-[360px] flex items-center justify-center">
                <AnimatedDemo demo={demos[activeDemo]} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AnimatedDemo = ({ demo }: { demo: typeof demos[0] }) => {
  return (
    <motion.div key={demo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }} className="w-full max-w-md mx-auto text-center">
      <motion.div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: `${demo.color}15`, color: demo.color }}
        initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15, delay: 0.1 }}>
        <demo.icon size={36} />
      </motion.div>
      <motion.h3 className="text-xl font-bold font-display text-foreground mb-2"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {demo.title}
      </motion.h3>
      <motion.p className="text-sm text-muted-foreground mb-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {demo.desc}
      </motion.p>
      <div className="space-y-3">
        {demo.steps.map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3 text-left">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: `${demo.color}20`, color: demo.color }}>{i + 1}</span>
            <span className="text-sm text-foreground">{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoShowcase;
