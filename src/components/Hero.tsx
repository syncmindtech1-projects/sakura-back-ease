import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Briefcase, TrendingUp, Star, Zap, ArrowRight, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getJobStats } from "@/lib/jobData";
import heroTeam from "@/assets/hero-team.jpg";

const popularSearches = ["Software Developer", "Electrician", "Nurse", "Data Scientist", "Plumber", "Teacher", "Driver", "Accountant"];
const { totalJobs, countries } = getJobStats();

const floatingJobs = [
  { title: "Senior Developer", company: "SafeBoda", salary: "UGX 4M/mo", icon: "💻", delay: 0 },
  { title: "Nurse", company: "Mulago Hospital", salary: "UGX 1.5M/mo", icon: "🏥", delay: 1.5 },
  { title: "Sales Manager", company: "MTN Uganda", salary: "UGX 3M/mo", icon: "📱", delay: 3 },
  { title: "Electrician", company: "Umeme Ltd", salary: "UGX 1.2M/mo", icon: "⚡", delay: 4.5 },
];

const Hero = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[700px] lg:min-h-[85vh] bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/3 to-transparent" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative container mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Content */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6 border border-primary/20"
            >
              <Sparkles size={16} />
              <span>🇺🇬 Uganda's #1 Free Job Board — {totalJobs}+ Jobs</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-[1.08] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <span className="text-foreground">Find Your</span>{" "}
              <span className="text-gradient">Dream Career</span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--highlight))] to-[hsl(25,90%,55%)]">For Free</span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1.5 rounded-full gradient-warm"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Browse <strong className="text-foreground">100% free</strong> listings across Uganda, East Africa, UAE, Europe & Americas. Every industry, one platform.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="bg-card rounded-2xl border border-border shadow-elevated p-2 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50">
                <Search size={18} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50">
                <MapPin size={18} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="City or country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button
                onClick={handleSearch}
                className="gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 justify-center active:scale-[0.97]"
              >
                <Search size={16} />
                Search
              </button>
            </motion.div>

            {/* Popular searches */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-xs text-muted-foreground font-medium">Popular:</span>
              {popularSearches.slice(0, 5).map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); navigate(`/jobs?q=${encodeURIComponent(s)}`); }}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  {s}
                </button>
              ))}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Briefcase, value: `${totalJobs}+`, label: "Free Jobs" },
                { icon: Star, value: `${countries}+`, label: "Countries" },
                { icon: TrendingUp, value: "3.2M+", label: "Users" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Visual */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            style={{ y: imageY }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden shadow-elevated border border-border/50"
              >
                <img
                  src={heroTeam}
                  alt="Professional team working in modern office"
                  width={960}
                  height={1080}
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating job cards */}
              {floatingJobs.map((job, i) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                  className={`absolute glass rounded-xl p-3 shadow-elevated hidden md:flex items-center gap-3 ${
                    i === 0 ? '-left-8 top-8' :
                    i === 1 ? '-right-6 top-1/4' :
                    i === 2 ? '-left-10 bottom-1/3' :
                    '-right-4 bottom-12'
                  }`}
                >
                  <span className="text-2xl">{job.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-foreground whitespace-nowrap">{job.title}</div>
                    <div className="text-[10px] text-muted-foreground">{job.company} · {job.salary}</div>
                  </div>
                </motion.div>
              ))}

              {/* Stats badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-3 shadow-elevated flex items-center gap-4"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{totalJobs}+</div>
                  <div className="text-[10px] text-muted-foreground">Jobs</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-foreground" style={{ color: 'hsl(var(--accent))' }}>{countries}+</div>
                  <div className="text-[10px] text-muted-foreground">Countries</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-lg font-bold text-[hsl(var(--highlight))]">100%</div>
                  <div className="text-[10px] text-muted-foreground">Free</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
