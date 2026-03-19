import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { MapPin, Clock, Bookmark, Search, Filter, Briefcase } from "lucide-react";
import { featuredJobs } from "@/lib/jobData";
import { useState } from "react";

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const collarFilters = ["All", "White Collar", "Blue Collar"];

const Jobs = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [collarFilter, setCollarFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = featuredJobs.filter((job) => {
    if (typeFilter !== "All" && job.type !== typeFilter) return false;
    if (collarFilter === "White Collar" && job.collar !== "white") return false;
    if (collarFilter === "Blue Collar" && job.collar !== "blue") return false;
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && !job.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <PageLayout>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1
            className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Browse All Jobs
          </motion.h1>
          <p className="text-muted-foreground mb-8">Discover opportunities across every industry</p>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {collarFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setCollarFilter(f)}
                  className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors ${collarFilter === f ? 'gradient-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {jobTypes.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${typeFilter === t ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground hover:text-foreground'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Results */}
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} jobs found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((job, i) => (
              <motion.div
                key={job.id}
                className="group bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-primary/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${job.collar === 'white' ? 'bg-primary/10 text-primary' : 'bg-highlight/10 text-highlight'}`}>
                    {job.collar === 'white' ? '👔 White' : '🔧 Blue'}
                  </span>
                  {job.remote && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent">Remote</span>}
                  {job.urgent && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md gradient-warm text-highlight-foreground">Urgent</span>}
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg">{job.logo}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{job.posted}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm font-bold text-foreground">{job.salary}</span>
                  <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-lg">{job.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Jobs;
