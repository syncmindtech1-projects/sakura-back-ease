import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { jobCategories } from "@/lib/jobData";

const Categories = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Job Categories
        </motion.h1>
        <p className="text-muted-foreground mb-10">Explore jobs across 12+ industries</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {jobCategories.map((cat, i) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/categories/${cat.name.toLowerCase()}`} className="group flex flex-col items-center text-center p-8 rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/20 transition-all">
                <span className="text-5xl mb-4">{cat.icon}</span>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.count.toLocaleString()} jobs</p>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary mt-3 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Categories;
