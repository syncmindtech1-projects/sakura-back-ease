import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { topCompanies } from "@/lib/jobData";
import { ArrowRight } from "lucide-react";

const Companies = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Top Companies
        </motion.h1>
        <p className="text-muted-foreground mb-10">Discover verified employers hiring now</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCompanies.map((c, i) => (
            <motion.div key={c.name} className="group bg-card rounded-2xl border border-border p-6 hover:shadow-elevated transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl">{c.logo}</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.industry}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-accent">{c.jobs} open positions</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Companies;
