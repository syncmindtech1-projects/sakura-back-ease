import { motion } from "framer-motion";
import { Globe, Shield, Zap, BarChart3, Users, Clock } from "lucide-react";

const features = [
  { icon: Globe, title: "All Industries", desc: "White collar, blue collar, freelance — every job type in one place" },
  { icon: Zap, title: "Real-time Updates", desc: "Jobs scraped and curated from thousands of sources, updated hourly" },
  { icon: Shield, title: "Verified Employers", desc: "Every company is verified to protect you from scams" },
  { icon: BarChart3, title: "Salary Insights", desc: "Compare salaries across roles, locations, and experience levels" },
  { icon: Users, title: "Community Driven", desc: "Read real reviews and insights from employees" },
  { icon: Clock, title: "One-Click Apply", desc: "Save your profile once and apply to jobs instantly" },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="text-sm font-semibold text-primary uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built for Every Job Seeker
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="group p-6 rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feat.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
