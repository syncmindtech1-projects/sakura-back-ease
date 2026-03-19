import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { jobCategories } from "@/lib/jobData";

const JobCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="text-sm font-semibold text-accent uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Browse by Industry
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Popular Job Categories
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {jobCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/categories/${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
              >
                <span className="text-4xl mb-3">{cat.icon}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.count.toLocaleString()} jobs</p>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary mt-2 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
