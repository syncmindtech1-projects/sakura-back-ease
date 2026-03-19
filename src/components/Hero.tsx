import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, TrendingUp, Star, Zap } from "lucide-react";
import { useState } from "react";

const popularSearches = ["React Developer", "Electrician", "Nurse", "Data Scientist", "Plumber", "Product Manager"];

const Hero = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-8 py-16 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6"
          >
            <Zap size={16} />
            <span>24,500+ new jobs posted this week</span>
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
            <span className="text-muted-foreground text-3xl md:text-5xl lg:text-5xl font-semibold">
              All Jobs. One Platform.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            From software engineering to skilled trades — we curate jobs across every industry so you don't have to search everywhere.
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
                className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50">
              <MapPin size={20} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <button className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
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
                className="text-xs px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
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
              { icon: Briefcase, label: "24,500+ Jobs", sub: "Updated hourly" },
              { icon: Star, label: "8,200+ Companies", sub: "Verified employers" },
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
