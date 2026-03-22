import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { MapPin, Clock, Bookmark, Search, Briefcase, SlidersHorizontal, ExternalLink } from "lucide-react";
import { featuredJobs } from "@/lib/jobData";
import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const collarFilters = ["All", "White Collar", "Blue Collar"];
const locationFilters = ["All Locations", "Uganda", "Kenya", "Tanzania", "Rwanda", "Nigeria", "South Africa", "UAE", "UK", "USA", "Canada", "Remote"];
const sortOptions = ["Most Recent", "Salary: High to Low", "Salary: Low to High"];

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCollar = searchParams.get("collar") === "white" ? "White Collar" : searchParams.get("collar") === "blue" ? "Blue Collar" : "All";

  const [typeFilter, setTypeFilter] = useState("All");
  const [collarFilter, setCollarFilter] = useState(initialCollar);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let jobs = featuredJobs.filter((job) => {
      if (typeFilter !== "All" && job.type !== typeFilter) return false;
      if (collarFilter === "White Collar" && job.collar !== "white") return false;
      if (collarFilter === "Blue Collar" && job.collar !== "blue") return false;
      if (locationFilter !== "All Locations") {
        if (locationFilter === "Remote") { if (!job.remote) return false; }
        else if (!job.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.tags.some(t => t.toLowerCase().includes(q)) || job.description.toLowerCase().includes(q);
      }
      return true;
    });

    if (sortBy === "Salary: High to Low") {
      jobs = [...jobs].sort((a, b) => parseInt(b.salary.replace(/\D/g, "")) - parseInt(a.salary.replace(/\D/g, "")));
    } else if (sortBy === "Salary: Low to High") {
      jobs = [...jobs].sort((a, b) => parseInt(a.salary.replace(/\D/g, "")) - parseInt(b.salary.replace(/\D/g, "")));
    }
    return jobs;
  }, [typeFilter, collarFilter, searchQuery, locationFilter, sortBy]);

  return (
    <PageLayout>
      {/* Page header */}
      <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] via-[hsl(200,35%,97%)] to-[hsl(45,30%,96%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1
            className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Browse All Jobs
          </motion.h1>
          <p className="text-muted-foreground mb-6">Discover opportunities across every industry</p>

          {/* Search */}
          <motion.div
            className="bg-card rounded-2xl shadow-card p-2 flex flex-col md:flex-row gap-2 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search job title, company, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/50 text-sm text-muted-foreground hover:text-foreground transition-colors md:hidden"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className={`lg:w-64 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${typeFilter === t ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Collar Type</h3>
                <div className="space-y-2">
                  {collarFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setCollarFilter(f)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${collarFilter === f ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Location</h3>
                <div className="space-y-2">
                  {locationFilters.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLocationFilter(l)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${locationFilter === l ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <AdsBanner variant="sidebar" adIndex={1} />
            </aside>

            {/* Job results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filtered.length}</span> jobs found
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground outline-none focus:border-primary"
                  >
                    {sortOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filtered.map((job, i) => (
                  <motion.div
                    key={job.id}
                    className="group bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-primary/20 transition-all"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link to={`/jobs/${job.id}`} className="block">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0">
                          {job.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${job.collar === 'white' ? 'bg-primary/10 text-primary' : 'bg-highlight/10 text-highlight'}`}>
                              {job.collar === 'white' ? '👔 White' : '🔧 Blue'}
                            </span>
                            {job.remote && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent">Remote</span>}
                            {job.urgent && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md gradient-warm text-highlight-foreground">Urgent</span>}
                            {job.featured && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md gradient-primary text-primary-foreground">Featured</span>}
                          </div>
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                            <span className="flex items-center gap-1"><Clock size={12} />{job.posted}</span>
                            <span className="flex items-center gap-1"><Briefcase size={12} />{job.type}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {job.tags.map((tag) => (
                              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0" onClick={(e) => e.preventDefault()}>
                          <span className="text-sm font-bold text-foreground">{job.salary}</span>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(job.id); }}
                            className={`p-2 rounded-lg transition-colors ${savedJobs.has(job.id) ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground hover:text-foreground'}`}
                          >
                            <Bookmark size={16} className={savedJobs.has(job.id) ? 'fill-primary' : ''} />
                          </button>
                          <a
                            href={job.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity active:scale-95"
                          >
                            Apply <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <span className="text-5xl block mb-4">🔍</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => { setSearchQuery(""); setTypeFilter("All"); setCollarFilter("All"); setLocationFilter("All Locations"); }}
                    className="mt-4 text-sm font-semibold text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              <div className="mt-6">
                <AdsBanner variant="inline" adIndex={0} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Jobs;
