import PageLayout from "@/components/PageLayout";
import { useParams, Link } from "react-router-dom";
import { featuredJobs } from "@/lib/jobData";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Bookmark, ExternalLink, ArrowLeft, Share2, Building2, DollarSign, Tag } from "lucide-react";
import AdsBanner from "@/components/AdsBanner";
import { useSavedJobs } from "@/contexts/SavedJobsContext";
import { useToast } from "@/hooks/use-toast";

const JobDetail = () => {
  const { id } = useParams();
  const job = featuredJobs.find((j) => j.id === id);
  const { toggleSave, isSaved } = useSavedJobs();
  const { toast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: job?.title, text: `Check out this job: ${job?.title} at ${job?.company}`, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Job link copied to clipboard" });
    }
  };

  const handleSave = () => {
    if (!job) return;
    toggleSave(job.id);
    toast({
      title: isSaved(job.id) ? "Job removed" : "Job saved!",
      description: isSaved(job.id) ? "Removed from your saved jobs" : "Added to your saved jobs",
    });
  };

  if (!job) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <span className="text-6xl block mb-4">😕</span>
          <h1 className="text-2xl font-bold text-foreground mb-2">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">This job listing may have been removed or expired.</p>
          <Link to="/jobs" className="text-sm font-semibold text-primary hover:underline">← Back to all jobs</Link>
        </div>
      </PageLayout>
    );
  }

  const similarJobs = featuredJobs
    .filter((j) => j.id !== job.id && j.category === job.category)
    .slice(0, 4);

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(var(--primary)/0.05)] via-background to-[hsl(var(--accent)/0.05)] py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to jobs
          </Link>
          <motion.div className="flex flex-col md:flex-row md:items-start gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl shrink-0">{job.logo}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {job.remote && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent">Remote</span>}
                {job.urgent && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md gradient-warm text-highlight-foreground">Urgent</span>}
                {job.featured && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md gradient-primary text-primary-foreground">Featured</span>}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold font-display text-foreground mb-1">{job.title}</h1>
              <p className="text-lg text-muted-foreground">{job.company}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
                <span className="flex items-center gap-1.5"><MapPin size={16} />{job.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={16} />{job.type}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} />{job.posted}</span>
                <span className="flex items-center gap-1.5"><DollarSign size={16} />{job.salary}</span>
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-3 shrink-0">
              <button onClick={handleSave} className={`inline-flex items-center gap-2 font-medium text-sm px-4 py-3 rounded-xl transition-colors ${isSaved(job.id) ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                <Bookmark size={16} className={isSaved(job.id) ? 'fill-primary' : ''} /> {isSaved(job.id) ? 'Saved' : 'Save Job'}
              </button>
              <button onClick={handleShare} className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-medium text-sm px-4 py-3 rounded-xl hover:bg-secondary/80 transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <motion.div className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-lg font-semibold text-foreground mb-4">Job Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </motion.div>

              {job.requirements && job.requirements.length > 0 && (
                <motion.div className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <h2 className="text-lg font-semibold text-foreground mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{req}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <motion.div className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-lg font-semibold text-foreground mb-4">Benefits</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-2 rounded-lg">
                        <span className="text-accent">✓</span>{benefit}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Tag size={18} /> Skills & Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground font-medium">{tag}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.1)] rounded-2xl border border-primary/20 p-8 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-xl font-bold text-foreground mb-2">Interested in this position?</h3>
                <p className="text-sm text-muted-foreground mb-4">Save this job to your shortlist or browse more openings</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button onClick={handleSave} className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors ${isSaved(job.id) ? 'bg-primary/10 text-primary' : 'gradient-primary text-primary-foreground hover:opacity-90'}`}>
                    <Bookmark size={16} className={isSaved(job.id) ? 'fill-primary' : ''} /> {isSaved(job.id) ? 'Saved' : 'Save Job'}
                  </button>
                  <Link to="/jobs" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-secondary/80 transition-colors">
                    Browse More Jobs
                  </Link>
                </div>
              </motion.div>
            </div>

            <aside className="lg:w-72 shrink-0 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Building2 size={16} /> About {job.company}</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Industry</span><span className="font-medium text-foreground">{job.category}</span></div>
                  <div className="flex justify-between"><span>Location</span><span className="font-medium text-foreground">{job.location}</span></div>
                  <div className="flex justify-between"><span>Job Type</span><span className="font-medium text-foreground">{job.type}</span></div>
                </div>
              </div>
              <AdsBanner variant="sidebar" adIndex={2} />
              {similarJobs.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Similar Jobs</h3>
                  <div className="space-y-3">
                    {similarJobs.map((sj) => (
                      <Link key={sj.id} to={`/jobs/${sj.id}`} className="block p-3 rounded-xl hover:bg-secondary transition-colors group">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{sj.logo}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{sj.title}</p>
                            <p className="text-xs text-muted-foreground">{sj.company}</p>
                            <p className="text-xs font-semibold text-foreground mt-1">{sj.salary}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <AdsBanner variant="sidebar" adIndex={5} />
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default JobDetail;
