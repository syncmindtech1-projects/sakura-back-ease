import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { ArrowRight, Search, Briefcase, MapPin, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getJobCategoriesWithCounts, featuredJobs } from "@/lib/jobData";
import { getCategoryIcon } from "@/lib/categoryIcons";
import CompanyLogo from "@/components/CompanyLogo";

const jobCategories = getJobCategoriesWithCounts();
import { useState } from "react";

const Categories = () => {
  const { category } = useParams();
  const [search, setSearch] = useState("");

  if (category) {
    const catData = jobCategories.find((c) => c.name.toLowerCase() === category.toLowerCase());
    const catJobs = featuredJobs.filter((j) => j.category.toLowerCase() === category.toLowerCase());

    return (
      <PageLayout>
        <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(160,25%,95%)] py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-8">
            <Link to="/categories" className="text-sm text-primary hover:underline mb-4 inline-block">← All Categories</Link>
            <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {catData?.name || category} Jobs
            </motion.h1>
            <p className="text-muted-foreground">{catData?.count.toLocaleString() || 0} positions available</p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-8">
            {catJobs.length > 0 ? (
              <div className="space-y-3">
                {catJobs.map((job, i) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="block">
                    <motion.div className="bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-primary/20 transition-all cursor-pointer" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <div className="flex items-start gap-4">
                        <CompanyLogo name={job.company} size="sm" />
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                            <span className="flex items-center gap-1"><Clock size={12} />{job.posted}</span>
                            <span className="flex items-center gap-1"><Briefcase size={12} />{job.type}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {job.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-foreground">{job.salary}</span>
                          <span className="block text-xs text-primary mt-1">View Details →</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                {(() => { const Icon = getCategoryIcon(catData?.name || category); return <Icon size={44} className="mx-auto mb-4 text-primary" />; })()}
                <h3 className="text-lg font-semibold text-foreground mb-2">Jobs coming soon</h3>
                <p className="text-sm text-muted-foreground">We're actively curating {catData?.name || category} jobs. Check back shortly!</p>
                <Link to="/jobs" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Browse all jobs →</Link>
              </div>
            )}
            <div className="mt-8">
              <AdsBanner variant="banner" adIndex={0} />
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const filteredCategories = jobCategories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(160,25%,95%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Job Categories
          </motion.h1>
          <p className="text-muted-foreground mb-6">Explore jobs across 12+ industries</p>
          <div className="max-w-md">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link to={`/categories/${cat.name.toLowerCase()}`} className="group flex flex-col h-full p-6 rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/20 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    {(() => { const Icon = getCategoryIcon(cat.name); return <Icon size={30} className="text-primary" />; })()}
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">{cat.count.toLocaleString()} jobs</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex-1">{(cat as any).description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {((cat as any).roles || []).slice(0, 4).map((r: string) => (
                      <span key={r} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{r}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary">
                    Browse jobs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <AdsBanner variant="banner" adIndex={2} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Categories;
