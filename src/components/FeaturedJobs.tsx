import { motion } from "framer-motion";
import { MapPin, Clock, Bookmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredJobs } from "@/lib/jobData";

const FeaturedJobs = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span
              className="text-sm font-semibold text-primary uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Latest Openings
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Jobs
            </motion.h2>
          </div>
          <Link
            to="/jobs"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View all jobs <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredJobs.slice(0, 9).map((job, i) => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="block">
              <motion.div
                className="group bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 cursor-pointer relative h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {job.featured && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md gradient-primary text-primary-foreground">
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md gradient-warm text-highlight-foreground">
                      Urgent
                    </span>
                  )}
                  {job.remote && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/10 text-accent">
                      Remote
                    </span>
                  )}
                </div>

                {/* Company & Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0">
                    {job.logo}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{job.posted}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm font-bold text-foreground">{job.salary}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Bookmark size={16} />
                    </button>
                    <span className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg">
                      {job.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View all jobs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
