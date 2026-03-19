import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Users, Globe, Shield, Zap } from "lucide-react";

const About = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            About JobSphere
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground mb-10 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            JobSphere is the all-in-one job platform that curates opportunities from thousands of sources. Whether you're a software engineer or a skilled tradesperson, we believe everyone deserves access to quality job listings.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Globe, title: "All Industries", desc: "White collar, blue collar, freelance — every job type in one place" },
              { icon: Zap, title: "Real-time Curation", desc: "Jobs scraped and curated from thousands of sources hourly" },
              { icon: Shield, title: "Verified Employers", desc: "Every company is verified to protect you from scams" },
              { icon: Users, title: "3.2M+ Community", desc: "Join millions of job seekers who trust our platform" },
            ].map((item, i) => (
              <motion.div key={item.title} className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <item.icon size={28} className="text-primary mb-3" />
                <h3 className="text-lg font-semibold font-display text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default About;
