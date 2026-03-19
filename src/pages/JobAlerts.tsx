import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Bell, CheckCircle } from "lucide-react";
import { useState } from "react";

const JobAlerts = () => {
  const [email, setEmail] = useState("");
  return (
    <PageLayout>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              🔔 Job Alerts
            </motion.h1>
            <p className="text-muted-foreground mb-10">Never miss a job — get daily alerts tailored to your preferences</p>
            <motion.div className="bg-card rounded-3xl border border-border p-8 shadow-elevated" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6">
                <Bell size={28} className="text-accent-foreground" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                <button className="gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">Subscribe</button>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {["Daily digest", "Customizable filters", "Unsubscribe anytime"].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle size={12} className="text-accent" />{f}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default JobAlerts;
