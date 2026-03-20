import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { featuredJobs } from "@/lib/jobData";
import { MapPin, Clock, Briefcase, Bookmark, Globe, Wifi } from "lucide-react";
import { useState } from "react";

const RemoteJobs = () => {
  const remoteJobs = featuredJobs.filter((j) => j.remote);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(160,30%,95%)] to-[hsl(200,35%,97%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Globe size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-display text-foreground">Remote Jobs</h1>
              <p className="text-muted-foreground">Work from anywhere in the world</p>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Wifi, label: "100% Remote", desc: "No office required" },
              { icon: Globe, label: "Global Teams", desc: "Work across time zones" },
              { icon: Briefcase, label: `${remoteJobs.length} Open Roles`, desc: "Updated hourly" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 bg-card rounded-xl border border-border px-4 py-2.5">
                <item.icon size={16} className="text-accent" />
                <div>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-3">
            {remoteJobs.map((job, i) => (
              <motion.div key={job.id} className="group bg-card rounded-2xl border border-border p-5 hover:shadow-elevated hover:border-accent/20 transition-all" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0">{job.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent">Remote</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${job.collar === 'white' ? 'bg-primary/10 text-primary' : 'bg-highlight/10 text-highlight'}`}>
                        {job.collar === 'white' ? '👔 White' : '🔧 Blue'}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{job.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><Clock size={12} />{job.posted}</span>
                      <span className="flex items-center gap-1"><Briefcase size={12} />{job.type}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-sm font-bold text-foreground">{job.salary}</span>
                    <button onClick={() => toggleSave(job.id)} className={`p-2 rounded-lg transition-colors ${savedJobs.has(job.id) ? 'bg-accent/10 text-accent' : 'hover:bg-secondary text-muted-foreground'}`}>
                      <Bookmark size={16} className={savedJobs.has(job.id) ? 'fill-accent' : ''} />
                    </button>
                    <button className="text-xs font-semibold gradient-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity active:scale-95">Apply</button>
                  </div>
                </div>
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

export default RemoteJobs;
