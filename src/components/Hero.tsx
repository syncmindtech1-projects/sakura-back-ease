import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, TrendingUp, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobStats } from "@/lib/jobData";
import heroBg from "@/assets/hero-bg.jpg";

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
    <section className="relative overflow-hidden min-h-[600px]">
      {/* Dark green cinematic background */}
      <div className="absolute inset-0 bg-[hsl(160,30%,6%)]" />
      
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160,30%,4%/0.6)] via-transparent to-[hsl(160,30%,4%/0.85)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(160,30%,4%/0.5)] via-transparent to-[hsl(160,30%,4%/0.3)]" />

      <div className="relative container mx-auto px-4 md:px-8 py-16 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full px-4 py-2 text-sm font-medium mb-6 border border-white/10"
          >
            <Zap size={16} className="text-[hsl(var(--highlight))]" />
            <span>🇺🇬 Uganda's #1 Free Job Board — {totalJobs}+ jobs across Africa, UAE, Europe & Americas</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <span className="text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">Find Your Next</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(160,80%,60%)] to-[hsl(180,70%,55%)] drop-shadow-lg">Dream Career</span>
            <br />
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(35,95%,65%)] to-[hsl(25,90%,60%)] font-extrabold">For Free</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-[hsl(160,70%,50%)] to-[hsl(35,95%,55%)] rounded-full shadow-lg"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
            <br />
            <span className="text-white text-2xl md:text-4xl lg:text-4xl font-semibold drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
              All Jobs. Every Industry. One Platform.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            From software engineering to skilled trades — browse <strong className="text-white font-bold">100% free</strong> job listings across Uganda, East Africa, UAE, Europe, USA & Canada. All industries, one platform.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
              <Search size={20} className="text-white/50 shrink-0" />
              <input
                type="text"
                placeholder="Job title, keyword, or company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-transparent w-full text-sm text-white placeholder:text-white/40 outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
              <MapPin size={20} className="text-white/50 shrink-0" />
              <input
                type="text"
                placeholder="City, country, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-transparent w-full text-sm text-white placeholder:text-white/40 outline-none"
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
            <span className="text-xs text-white/50 font-medium">Popular:</span>
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); navigate(`/jobs?q=${encodeURIComponent(s)}`); }}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors active:scale-95"
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
              { icon: Briefcase, label: `${totalJobs}+ Free Jobs`, sub: "Always 100% free" },
              { icon: Star, label: `${countries}+ Countries`, sub: "Africa, UAE, Europe & Americas" },
              { icon: TrendingUp, label: "3.2M+ Users", sub: "Growing community" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <item.icon size={20} className="text-[hsl(160,70%,55%)]" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="text-xs text-white/60">{item.sub}</div>
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
