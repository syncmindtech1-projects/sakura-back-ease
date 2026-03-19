import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { featuredJobs } from "@/lib/jobData";
import { MapPin, Clock } from "lucide-react";

const RemoteJobs = () => {
  const remoteJobs = featuredJobs.filter((j) => j.remote);
  return (
    <PageLayout>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            🏠 Remote Jobs
          </motion.h1>
          <p className="text-muted-foreground mb-10">Work from anywhere in the world</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remoteJobs.map((job, i) => (
              <motion.div key={job.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-elevated transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg">{job.logo}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{job.title}</h3>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{job.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm font-bold text-foreground">{job.salary}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent">Remote</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default RemoteJobs;
