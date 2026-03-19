import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { FileText, CheckCircle } from "lucide-react";

const ResumeBuilder = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            📝 Resume Builder
          </motion.h1>
          <p className="text-muted-foreground mb-10">Create a professional resume in minutes</p>
          <motion.div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-elevated" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <FileText size={36} className="text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">Build Your Resume</h2>
            <div className="flex flex-col gap-3 max-w-sm mx-auto mb-8 text-left">
              {["ATS-friendly templates", "Auto-format your experience", "Download as PDF", "Share via link"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={16} className="text-accent shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <button className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity">
              Start Building — It's Free
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default ResumeBuilder;
