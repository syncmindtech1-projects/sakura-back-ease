import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Star, Building2, ThumbsUp, ThumbsDown } from "lucide-react";
import { topCompanies } from "@/lib/jobData";

const reviews = [
  { company: "TechVault Inc.", rating: 4.5, pros: "Great culture, remote-friendly, competitive pay", cons: "Fast-paced, long hours during launches", author: "Software Engineer" },
  { company: "PowerGrid Solutions", rating: 4.0, pros: "Stable work, good benefits, overtime pay", cons: "Physically demanding, travel required", author: "Electrician" },
  { company: "DataPulse Analytics", rating: 4.7, pros: "Innovative team, flexible hours, great perks", cons: "High expectations, steep learning curve", author: "Data Analyst" },
];

const Reviews = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          ⭐ Company Reviews
        </motion.h1>
        <p className="text-muted-foreground mb-10">Real insights from real employees</p>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <motion.div key={r.company} className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{r.company}</h3>
                  <span className="text-xs text-muted-foreground">Reviewed by {r.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-highlight text-highlight" />
                  <span className="text-sm font-bold text-foreground">{r.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-2"><ThumbsUp size={16} className="text-accent shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground">{r.pros}</p></div>
                <div className="flex gap-2"><ThumbsDown size={16} className="text-destructive shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground">{r.cons}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Reviews;
