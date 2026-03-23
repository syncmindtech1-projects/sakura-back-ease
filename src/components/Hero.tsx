import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, TrendingUp, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobStats } from "@/lib/jobData";

const popularSearches = ["Software Developer", "Electrician", "Nurse", "Data Scientist", "Plumber", "Teacher", "Driver", "Accountant"];
const { totalJobs, countries } = getJobStats();

const Hero = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Warm, calming background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,40%,96%)] via-[hsl(200,35%,97%)] to-[hsl(45,30%,96%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(210,60%,85%/0.3)] rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[hsl(45,60%,88%/0.3)] rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(160,40%,90%/0.2)] rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-8 py-16 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6"
          >
            <Zap size={16} />
            <span>🇺🇬 Uganda's #1 Free Job Board — 24,500+ jobs across Africa, UAE, Europe & Americas</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-foreground leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Find Your Next{" "}
            <span className="text-gradient">Dream Career</span>
            <br />
            <span className="relative inline-block">
              <span className="text-gradient font-extrabold">For Free</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
            <br />
            <span className="text-muted-foreground text-2xl md:text-4xl lg:text-4xl font-semibold">
              All Jobs. Every Industry. One Platform.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            From software engineering to skilled trades — browse <strong className="text-foreground">100% free</strong> job listings across Uganda, East Africa, UAE, Europe, USA & Canada. White collar & blue collar, all in one place.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="bg-card rounded-2xl shadow-elevated p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50">
              <Search size={20} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Job title, keyword, or company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50">
              <MapPin size={20} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="City, country, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 justify-center active:scale-[0.97] transition-transform"
            >
              <Search size={18} />
              Search
            </button>
          </motion.div>

          {/* Popular searches */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs text-muted-foreground">Popular:</span>
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); navigate(`/jobs?q=${encodeURIComponent(s)}`); }}
                className="text-xs px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors active:scale-95"
              >
                {s}
              </button>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: Briefcase, label: "24,500+ Free Jobs", sub: "Always 100% free" },
              { icon: Star, label: "50+ Countries", sub: "Africa, UAE, Europe & Americas" },
              { icon: TrendingUp, label: "3.2M+ Users", sub: "Growing community" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
