import { MapPin, Clock, Bookmark, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedJobs } from "@/contexts/SavedJobsContext";
import { useLiveJobs } from "@/hooks/useLiveJobs";
import CompanyLogo from "@/components/CompanyLogo";

const FeaturedJobs = () => {
  const { toggleSave, isSaved } = useSavedJobs();
  const { jobs, loading } = useLiveJobs();
  const featured = jobs.slice(0, 9);

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <header className="flex items-end justify-between mb-10 pb-6 border-b border-border">
          <div>
            <span className="eyebrow">Currently Hiring</span>
            <h2 className="serif text-3xl md:text-5xl mt-3 text-foreground">Featured openings</h2>
          </div>
          <Link to="/jobs" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors">
            View all jobs <ArrowUpRight size={14} />
          </Link>
        </header>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 border border-border bg-card animate-pulse" />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">New openings coming up shortly.</p>
        ) : (
        <ul className="divide-y divide-border border-b border-border">
          {featured.map((job) => (
            <li key={job.id}>
              <Link
                to={`/jobs/${job.id}`}
                className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 md:gap-6 py-5 hover:bg-secondary/40 transition-colors -mx-4 md:-mx-6 px-4 md:px-6"
              >
                <CompanyLogo name={job.company} size="md" className="w-11 h-11 rounded-none" />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="serif text-lg md:text-xl text-foreground group-hover:text-primary transition-colors truncate">{job.title}</h3>
                    {job.featured && <span className="eyebrow text-primary">Featured</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>{job.company}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                    <span className="inline-flex items-center gap-1"><Clock size={12} />{job.posted}</span>
                    {job.remote && <span>Remote</span>}
                  </div>
                </div>

                <div className="hidden md:block text-sm text-muted-foreground min-w-[110px]">{job.type}</div>
                <div className="hidden md:block text-sm font-medium text-foreground num min-w-[140px] text-right">{job.salary}</div>

                <div className="flex items-center gap-3 justify-self-end">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(job.id); }}
                    className={`p-1.5 transition-colors ${isSaved(job.id) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    aria-label={isSaved(job.id) ? 'Unsave' : 'Save'}
                  >
                    <Bookmark size={16} className={isSaved(job.id) ? 'fill-primary' : ''} />
                  </button>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground pb-0.5">
            View all jobs <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
