import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { MapPin, Clock, Bookmark, Search, Briefcase, SlidersHorizontal, ExternalLink, SearchX, ArrowRight } from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useSavedJobs } from "@/contexts/SavedJobsContext";
import { useJobFeed, useJobCountries, PAGE_SIZE } from "@/hooks/useJobFeed";


const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const sortOptions = ["Most Recent", "Salary: High to Low", "Salary: Low to High"];

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [draftQuery, setDraftQuery] = useState(initialQuery);
  const [country, setCountry] = useState("Uganda");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const countries = useJobCountries();
  const { jobs: pageJobs, total, loading } = useJobFeed({ country, query: searchQuery, type: typeFilter, page });
  const { toggleSave, isSaved } = useSavedJobs();
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  useEffect(() => { setPage(1); }, [country, searchQuery, typeFilter]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);
  const setVisible = (_: number) => setPage(1);

  const filtered = useMemo(() => {
    const num = (v: string) => parseInt(v.replace(/\D/g, "") || "0");
    if (sortBy === "Salary: High to Low") return [...pageJobs].sort((a, b) => num(b.salary) - num(a.salary));
    if (sortBy === "Salary: Low to High") return [...pageJobs].sort((a, b) => num(a.salary) - num(b.salary));
    return pageJobs;
  }, [pageJobs, sortBy]);

  return (
    <PageLayout>
      <section className="bg-primary text-primary-foreground py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Browse All Jobs
          </motion.h1>
          <p className="text-primary-foreground/80 mb-6">Discover opportunities across every industry</p>
          <motion.form onSubmit={(e) => { e.preventDefault(); setSearchQuery(draftQuery.trim()); setVisible(30); }} className="bg-card text-foreground rounded-2xl shadow-card p-2 flex flex-col md:flex-row gap-2 max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex-1 flex items-center gap-2 pl-4 pr-1 py-1 rounded-xl bg-secondary/50">
              <Search size={18} className="text-muted-foreground shrink-0" />
              <input type="search" enterKeyHint="search" placeholder="Job title, company, or keyword..." value={draftQuery} onChange={(e) => { setDraftQuery(e.target.value); if (!e.target.value) setSearchQuery(""); }} className="bg-transparent w-full min-w-0 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
              <button type="submit" aria-label="Search jobs" className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition">
                <ArrowRight size={18} />
              </button>
            </div>
            <button type="button" onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary/50 text-sm text-muted-foreground hover:text-foreground transition-colors lg:hidden">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </motion.form>
          <div className="flex gap-2 overflow-x-auto mt-3 max-w-3xl pb-1 -mx-1 px-1">
            {jobTypes.map((t) => (
              <button key={t} type="button" onClick={() => { setTypeFilter(t); setVisible(30); }} className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${typeFilter === t ? 'bg-card text-primary border-card' : 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className={`lg:w-64 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((t) => (
                    <button key={t} onClick={() => setTypeFilter(t)} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${typeFilter === t ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Country</h3>
                <div className="space-y-2">
                  {countries.map((l) => (
                    <button key={l} onClick={() => setCountry(l)} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${country === l ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <AdsBanner variant="sidebar" adIndex={1} />
            </aside>

            <div className="flex-1 min-w-0">
              <div role="tablist" aria-label="Filter by country" className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
                {countries.map((c) => (
                  <button key={c} role="tab" aria-selected={country === c} type="button" onClick={() => setCountry(c)} className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${country === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {loading ? "Loading live jobs…" : (<><span className="font-semibold text-foreground">{total}</span> jobs in {country}</>)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground outline-none focus:border-primary">
                    {sortOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {loading && (
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border p-5 animate-pulse">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-2/3 rounded bg-secondary" />
                          <div className="h-3 w-1/3 rounded bg-secondary" />
                          <div className="h-3 w-full rounded bg-secondary" />
                          <div className="h-3 w-5/6 rounded bg-secondary" />
                          <div className="h-3 w-1/2 rounded bg-secondary" />
                        </div>
                        <div className="h-8 w-20 rounded-lg bg-secondary shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {!loading && filtered.map((job, i) => (

                  <motion.div key={job.id} className="group bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-primary/20 transition-all" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link to={`/jobs/sc-${job.id}`} className="block">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <CompanyLogo name={job.employer} size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            {job.remote && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent">Remote</span>}
                                                      </div>
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.employer}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{job.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                            <span className="flex items-center gap-1"><Clock size={12} />{job.timeAgo}</span>
                            <span className="flex items-center gap-1"><Briefcase size={12} />{job.jobType}</span>
                          </div>

                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0" onClick={(e) => e.preventDefault()}>
                          <span className="text-sm font-bold text-foreground">{job.salary}</span>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(job.id); }}
                            className={`p-2 rounded-lg transition-colors ${isSaved(job.id) ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground hover:text-foreground'}`}
                          >
                            <Bookmark size={16} className={isSaved(job.id) ? 'fill-primary' : ''} />
                          </button>
                          <Link to={`/jobs/sc-${job.id}`} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-xs font-semibold border border-border text-foreground px-3 py-2 rounded-lg hover:bg-secondary transition-colors">
                            Details
                          </Link>
                          <a
                            href={job.urlLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity active:scale-95"
                          >
                            Apply <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {!loading && totalPages > 1 && (
                <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
                  <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="text-sm font-semibold border border-border px-4 py-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-40">Previous</button>
                  <span className="text-sm text-muted-foreground px-2">Page {page} of {totalPages}</span>
                  <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="text-sm font-semibold border border-border px-4 py-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-40">Next</button>
                </nav>
              )}

              {!loading && filtered.length === 0 && (

                <div className="text-center py-16">
                  <SearchX size={44} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
                  <button onClick={() => { setSearchQuery(""); setTypeFilter("All");  }} className="mt-4 text-sm font-semibold text-primary hover:underline">
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
