import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, BadgeCheck, Sparkles, Globe2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobStats } from "@/lib/jobData";
import heroProfessional from "@/assets/hero-professional.jpg";

const popularSearches = [
  "Software Engineer",
  "Nurse",
  "Driver",
  "Accountant",
  "Remote",
  "Customer Care",
];

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
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 lg:gap-16 xl:gap-20 items-center py-16 md:py-24 lg:py-28">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium tracking-wide uppercase text-foreground/70">
                Africa's Free Job Platform
              </span>
            </div>

            <h1
              className="mt-6 text-[44px] leading-[1.05] md:text-[60px] lg:text-[68px] font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Discover verified jobs{" "}
              <span className="italic text-primary">across Africa.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg">
              JobSphere is a free, human-curated index of {totalJobs.toLocaleString()}+ open
              roles across {countries} countries — Uganda, Kenya, Tanzania, Rwanda, South
              Sudan, Ethiopia and Ghana. No paywalls, no noise.
            </p>

            {/* Search */}
            <div className="mt-8 bg-white border border-border rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="grid md:grid-cols-[1fr_1fr_auto]">
                <label className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border">
                  <Search size={18} className="text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="bg-transparent w-full text-sm md:text-base text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </label>
                <label className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border">
                  <MapPin size={18} className="text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="City or country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="bg-transparent w-full text-sm md:text-base text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </label>
                <button
                  onClick={handleSearch}
                  className="m-2 px-6 md:px-7 py-3 md:py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2"
                >
                  Search
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Trending pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">
                Trending
              </span>
              {popularSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => navigate(`/jobs?q=${encodeURIComponent(s)}`)}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-border bg-background hover:bg-secondary hover:border-foreground/30 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-border">
              {[
                { v: `${totalJobs}+`, k: "Jobs" },
                { v: `${countries}+`, k: "Countries" },
                { v: "100%", k: "Free" },
              ].map((it) => (
                <div key={it.k}>
                  <dt
                    className="text-3xl md:text-[34px] font-semibold text-foreground tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {it.v}
                  </dt>
                  <dd className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                    {it.k}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-secondary">
              <img
                src={heroProfessional}
                alt="African professional at work"
                width={1200}
                height={1408}
                className="w-full h-full object-cover"
              />
              {/* subtle vignette for legibility of floating cards */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating card — top left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden md:block absolute -left-6 top-10 w-[260px] bg-white rounded-xl border border-border p-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles size={18} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    Senior Software Engineer
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Kampala · UGX 5M/month
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                    <BadgeCheck size={12} />
                    Verified Employer
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card — mid right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-[240px] bg-white rounded-xl border border-border p-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                  <BadgeCheck size={18} className="text-accent-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    Registered Nurse
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Nairobi · KES 180K/month
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Hiring Now
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="hidden md:block absolute -left-4 bottom-10 w-[260px] bg-white rounded-xl border border-border p-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Globe2 size={18} className="text-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    Remote UI Designer
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Africa · Remote
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                    Apply Today
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
