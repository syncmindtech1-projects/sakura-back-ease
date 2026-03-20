import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, Search, Building2 } from "lucide-react";
import { useState } from "react";

const reviews = [
  { company: "TechVault Inc.", rating: 4.5, pros: "Great culture, remote-friendly, competitive pay, unlimited PTO, strong engineering team", cons: "Fast-paced, long hours during launches, some teams siloed", author: "Software Engineer", date: "Mar 2026", recommend: true },
  { company: "PowerGrid Solutions", rating: 4.0, pros: "Stable work, good benefits, overtime pay, strong safety culture", cons: "Physically demanding, travel required, limited advancement", author: "Licensed Electrician", date: "Feb 2026", recommend: true },
  { company: "DataPulse Analytics", rating: 4.7, pros: "Innovative team, flexible hours, great perks, cutting-edge tech stack", cons: "High expectations, steep learning curve for new hires", author: "Data Analyst", date: "Feb 2026", recommend: true },
  { company: "Metro Health Center", rating: 4.2, pros: "Meaningful work, great colleagues, comprehensive health benefits", cons: "Long shifts, emotionally demanding, bureaucratic processes", author: "Registered Nurse", date: "Jan 2026", recommend: true },
  { company: "Goldman & Pierce", rating: 3.8, pros: "Prestigious brand, excellent compensation, career growth potential", cons: "Work-life balance challenges, high pressure during deadlines", author: "Financial Analyst", date: "Jan 2026", recommend: false },
  { company: "LogiFlow Corp", rating: 4.1, pros: "Good pay for the industry, team-oriented culture, modern facilities", cons: "Repetitive tasks, shift work, limited remote options", author: "Warehouse Supervisor", date: "Dec 2025", recommend: true },
];

const Reviews = () => {
  const [search, setSearch] = useState("");
  const filtered = reviews.filter((r) =>
    r.company.toLowerCase().includes(search.toLowerCase()) || r.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(45,30%,96%)] to-[hsl(210,40%,96%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            ⭐ Company Reviews
          </motion.h1>
          <p className="text-muted-foreground mb-6">Real insights from real employees — know before you apply</p>
          <div className="max-w-md">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
              <Search size={18} className="text-muted-foreground" />
              <input type="text" placeholder="Search companies or roles..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-4">
            {filtered.map((r, i) => (
              <motion.div key={`${r.company}-${r.author}`} className="bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <Building2 size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{r.company}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Reviewed by {r.author}</span>
                        <span className="text-xs text-muted-foreground">· {r.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className={j < Math.floor(r.rating) ? "fill-highlight text-highlight" : "text-border"} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-foreground">{r.rating}</span>
                    {r.recommend && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-accent/10 text-accent">Recommended</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-3 rounded-xl bg-accent/5">
                    <ThumbsUp size={16} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-accent block mb-1">Pros</span>
                      <p className="text-sm text-muted-foreground">{r.pros}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-xl bg-destructive/5">
                    <ThumbsDown size={16} className="text-destructive shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-destructive block mb-1">Cons</span>
                      <p className="text-sm text-muted-foreground">{r.cons}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <AdsBanner variant="banner" adIndex={0} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Reviews;
