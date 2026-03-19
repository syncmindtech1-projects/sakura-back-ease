import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle } from "lucide-react";

const PostJob = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Post a Job
          </motion.h1>
          <p className="text-muted-foreground mb-10">Reach 3.2M+ qualified candidates</p>
          <motion.div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-elevated text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Job Title" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                <input type="text" placeholder="Company Name" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Location" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                <input type="text" placeholder="Salary Range" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
              </div>
              <textarea placeholder="Job Description" rows={5} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none" />
              <button type="button" className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity w-full">
                Post Job — $99
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default PostJob;
