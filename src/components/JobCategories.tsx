import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getJobCategoriesWithCounts } from "@/lib/jobData";
import catTech from "@/assets/cat-technology.jpg";
import catHealth from "@/assets/cat-healthcare.jpg";
import catFinance from "@/assets/cat-finance.jpg";
import catConstruction from "@/assets/cat-construction.jpg";
import catEducation from "@/assets/cat-education.jpg";
import catMarketing from "@/assets/cat-marketing.jpg";
import catManufacturing from "@/assets/cat-manufacturing.jpg";
import catHospitality from "@/assets/cat-hospitality.jpg";

const categoryImages: Record<string, string> = {
  Technology: catTech,
  Healthcare: catHealth,
  Finance: catFinance,
  Construction: catConstruction,
  Education: catEducation,
  Marketing: catMarketing,
  Manufacturing: catManufacturing,
  Hospitality: catHospitality,
};

const jobCategories = getJobCategoriesWithCounts();

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="group flex flex-col rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="w-full h-28 overflow-hidden relative">
                  <img
                    src={categoryImages[cat.name] || catTech}
                    alt={cat.name}
                    loading="lazy"
                    width={400}
                    height={112}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-card/90 text-primary backdrop-blur">
                    {cat.count.toLocaleString()} jobs
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{(cat as any).description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {((cat as any).roles || []).slice(0, 3).map((r: string) => (
                      <span key={r} className="text-[10px] px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{r}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-[11px] font-semibold text-primary">Browse jobs</span>
                    <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
