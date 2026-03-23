import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { ArrowRight, Search, Briefcase, MapPin, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getJobCategoriesWithCounts, featuredJobs } from "@/lib/jobData";

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
        <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(200,35%,97%)] py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-8">
            <Link to="/categories" className="text-sm text-primary hover:underline mb-4 inline-block">← All Categories</Link>
            <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {catData?.icon} {catData?.name || category} Jobs
            </motion.h1>
            <p className="text-muted-foreground">{catData?.count.toLocaleString() || 0} positions available</p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-8">
            {catJobs.length > 0 ? (
              <div className="space-y-3">
                {catJobs.map((job, i) => (
                  <motion.div key={job.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-elevated transition-all" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-lg">{job.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={12} />{job.posted}</span>
                          <span className="flex items-center gap-1"><Briefcase size={12} />{job.type}</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-foreground">{job.salary}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="text-5xl block mb-4">{catData?.icon || "📂"}</span>
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
      <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(200,35%,97%)] py-10 md:py-14">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link to={`/categories/${cat.name.toLowerCase()}`} className="group flex flex-col items-center text-center p-8 rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/20 transition-all">
                  <span className="text-5xl mb-4">{cat.icon}</span>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{cat.count.toLocaleString()} jobs</p>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary mt-3 group-hover:translate-x-1 transition-all" />
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
