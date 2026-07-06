import { motion } from "framer-motion";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobStats } from "@/lib/jobData";
import heroTeam from "@/assets/hero-team.jpg";

const popularSearches = ["Software Developer", "Nurse", "Data Scientist", "Teacher", "Accountant"];
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
    <section className="border-b border-border bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top eyebrow rule */}
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="eyebrow">Issue №{new Date().getFullYear()} · Careers Weekly</span>
          <span className="eyebrow hidden md:block">Kampala · Nairobi · Kigali · Juba · Addis · Accra · Dar es Salaam</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 py-14 md:py-20 lg:py-24 items-start">
          {/* LEFT: Editorial headline */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Feature · Free Job Board</span>
            <h1 className="serif mt-5 text-[44px] leading-[1.02] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.035em] text-foreground">
              A quieter way<br />
              to find <em className="italic font-normal text-primary">meaningful</em> work<br />
              across Africa.
            </h1>

            <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
              JobSphere is a free, human-curated index of {totalJobs.toLocaleString()}+ open roles across {countries} countries — Uganda, Kenya, Tanzania, Rwanda, South Sudan, Ethiopia and Ghana. No paywalls, no noise.
            </p>

            {/* Search — editorial, bordered */}
            <div className="mt-10 border border-border bg-card">
              <div className="grid md:grid-cols-[1fr_1fr_auto]">
                <label className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border">
                  <Search size={16} className="text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Role, keyword or skill"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </label>
                <label className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border">
                  <MapPin size={16} className="text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="City or country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </label>
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-foreground text-background text-sm font-medium tracking-wide hover:bg-primary transition-colors inline-flex items-center justify-center gap-2"
                >
                  Search <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow">Trending</span>
              {popularSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => navigate(`/jobs?q=${encodeURIComponent(s)}`)}
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Figure + running numbers */}
          <motion.aside
            className="lg:col-span-5 lg:pl-10 lg:border-l border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <figure>
              <img
                src={heroTeam}
                alt="A team collaborating in a modern office"
                width={960}
                height={1080}
                className="w-full h-[380px] lg:h-[460px] object-cover grayscale-[15%]"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground italic">
                Photograph — Working teams across East Africa's fastest-growing employers.
              </figcaption>
            </figure>

            <dl className="mt-8 grid grid-cols-3 border-t border-border">
              {[
                { k: "Open roles", v: `${totalJobs.toLocaleString()}` },
                { k: "Countries", v: `${countries}` },
                { k: "Cost to apply", v: "Free" },
              ].map((it) => (
                <div key={it.k} className="py-4 pr-4 border-r last:border-r-0 border-border">
                  <dt className="eyebrow">{it.k}</dt>
                  <dd className="serif text-2xl md:text-3xl mt-1 text-foreground num">{it.v}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
