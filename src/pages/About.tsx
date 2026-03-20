import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Users, Globe, Shield, Zap, Target, Heart, Award, TrendingUp } from "lucide-react";

const team = [
  { name: "Alexandra Rivera", role: "CEO & Co-founder", avatar: "AR", desc: "Former VP of Product at Indeed with 15 years in HR tech." },
  { name: "Daniel Okoye", role: "CTO", avatar: "DO", desc: "Ex-Google engineer who built large-scale search systems." },
  { name: "Mei-Lin Wu", role: "Head of Design", avatar: "MW", desc: "Design leader who shaped user experiences at Airbnb and Figma." },
  { name: "Carlos Mendez", role: "VP of Operations", avatar: "CM", desc: "Operations expert with background in logistics and workforce management." },
];

const milestones = [
  { year: "2021", event: "JobSphere founded with a mission to unite white and blue collar job markets" },
  { year: "2022", event: "Reached 500K registered users and 5,000 employer partnerships" },
  { year: "2023", event: "Launched AI-powered job matching and salary insights" },
  { year: "2024", event: "Expanded to 15 countries with multilingual support" },
  { year: "2025", event: "Hit 3.2M users and 24,500+ daily active job listings" },
];

const About = () => (
  <PageLayout>
    <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(200,35%,97%)] py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            About JobSphere
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            We believe everyone deserves access to quality job opportunities — whether you're coding software or wiring buildings. JobSphere is the all-in-one platform that curates jobs from thousands of sources across every industry.
          </motion.p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-8">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Globe, title: "Inclusive Access", desc: "Jobs for every worker — white collar, blue collar, and everything in between." },
            { icon: Zap, title: "Real-time Curation", desc: "Thousands of sources scraped and verified every hour." },
            { icon: Shield, title: "Trust & Safety", desc: "Verified employers. No scams. Data privacy first." },
            { icon: Heart, title: "Community First", desc: "Built by job seekers, for job seekers. Your feedback shapes our product." },
          ].map((item, i) => (
            <motion.div key={item.title} className="bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
              <item.icon size={28} className="text-primary mb-3" />
              <h3 className="text-lg font-semibold font-display text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-8">Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((person, i) => (
            <motion.div key={person.name} className="bg-background rounded-2xl border border-border p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-lg font-bold mx-auto mb-4">
                {person.avatar}
              </div>
              <h3 className="text-base font-semibold text-foreground">{person.name}</h3>
              <p className="text-xs text-primary font-semibold mt-0.5">{person.role}</p>
              <p className="text-sm text-muted-foreground mt-2">{person.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-8">Our Journey</h2>
        <div className="max-w-2xl mx-auto space-y-0">
          {milestones.map((m, i) => (
            <motion.div key={m.year} className="flex gap-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">{m.year}</div>
                {i < milestones.length - 1 && <div className="w-0.5 h-full bg-border my-1" />}
              </div>
              <div className="pb-8">
                <p className="text-sm text-foreground font-medium">{m.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <div className="pb-8">
      <AdsBanner variant="banner" adIndex={1} />
    </div>
  </PageLayout>
);

export default About;
