import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Bookmark, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredJobs } from "@/lib/jobData";
import { useSavedJobs } from "@/contexts/SavedJobsContext";

const SavedJobs = () => {
  const { savedJobs, toggleSave } = useSavedJobs();
  const saved = featuredJobs.filter((j) => savedJobs.has(j.id));

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(var(--primary)/0.05)] via-background to-[hsl(var(--accent)/0.05)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1
            className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Bookmark className="inline mr-2 mb-1" size={32} />
            Saved Jobs
          </motion.h1>
          <p className="text-muted-foreground">
            You have <span className="font-semibold text-foreground">{saved.length}</span> saved job{saved.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {saved.length > 0 ? (
            <div className="space-y-3">
              {saved.map((job, i) => (
                <motion.div
                  key={job.id}
                  className="bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-primary/20 transition-all"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <Link to={`/jobs/${job.id}`} className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0">
                        {job.logo}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {job.remote && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent">Remote</span>}
                          {job.urgent && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md gradient-warm text-highlight-foreground">Urgent</span>}
                          {job.featured && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md gradient-primary text-primary-foreground">Featured</span>}
                        </div>
                        <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={12} />{job.posted}</span>
                          <span className="flex items-center gap-1"><Briefcase size={12} />{job.type}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-bold text-foreground">{job.salary}</span>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => toggleSave(job.id)}
                        className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">💼</span>
              <h3 className="text-xl font-bold text-foreground mb-2">No saved jobs yet</h3>
              <p className="text-muted-foreground mb-6">Browse jobs and click the bookmark icon to save them here</p>
              <Link to="/jobs" className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default SavedJobs;
