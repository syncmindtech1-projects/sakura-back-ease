import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { topCompanies } from "@/lib/jobData";
import compFeatured from "@/assets/comp-featured.jpg";
import compStartups from "@/assets/comp-startups.jpg";

const companyImages: Record<string, string> = {
  "Andela Uganda": compFeatured,
  "Mulago Hospital": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=56&h=56&fit=crop",
  "Umeme Limited": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=56&h=56&fit=crop",
  "Safaricom PLC": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=56&h=56&fit=crop",
  "Stanbic Bank": "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=56&h=56&fit=crop",
  "DHL East Africa": compStartups,
};

const TopCompanies = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span
              className="text-sm font-semibold text-highlight uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Trusted Employers
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Top Companies Hiring
            </motion.h2>
          </div>
          <Link to="/companies" className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topCompanies.map((company, i) => (
            <motion.div
              key={company.name}
              className="group bg-card rounded-2xl border border-border p-6 hover:shadow-elevated hover:border-primary/20 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={companyImages[company.name] || compFeatured}
                  alt={company.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{company.name}</h3>
                  <p className="text-xs text-muted-foreground">{company.industry}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-accent">{company.jobs} open positions</span>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
