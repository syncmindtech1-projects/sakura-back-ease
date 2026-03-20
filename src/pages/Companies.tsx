import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { topCompanies } from "@/lib/jobData";
import { ArrowRight, Search, MapPin, Users, Star } from "lucide-react";
import { useState } from "react";

const companyDetails = [
  { ...topCompanies[0], rating: 4.6, employees: "2,500+", location: "San Francisco, CA", description: "Leading tech company specializing in cloud infrastructure and enterprise solutions." },
  { ...topCompanies[1], rating: 4.4, employees: "5,000+", location: "Boston, MA", description: "Major healthcare provider with hospitals and clinics across the Northeast." },
  { ...topCompanies[2], rating: 4.2, employees: "1,200+", location: "Houston, TX", description: "Full-service electrical and construction contractor for commercial projects." },
  { ...topCompanies[3], rating: 4.8, employees: "800+", location: "Seattle, WA", description: "Data analytics firm helping businesses make smarter decisions through AI." },
  { ...topCompanies[4], rating: 4.3, employees: "10,000+", location: "New York, NY", description: "Investment banking and financial advisory firm with global reach." },
  { ...topCompanies[5], rating: 4.1, employees: "3,500+", location: "Chicago, IL", description: "Supply chain and logistics company powering e-commerce fulfillment." },
];

const Companies = () => {
  const [search, setSearch] = useState("");
  const filtered = companyDetails.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(200,35%,97%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Top Companies
          </motion.h1>
          <p className="text-muted-foreground mb-6">Discover verified employers hiring now</p>
          <div className="max-w-md">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
              <Search size={18} className="text-muted-foreground" />
              <input type="text" placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <motion.div key={c.name} className="group bg-card rounded-2xl border border-border p-6 hover:shadow-elevated hover:border-primary/20 transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl">{c.logo}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.industry}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><MapPin size={12} />{c.location}</span>
                  <span className="flex items-center gap-1"><Users size={12} />{c.employees}</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-highlight" />{c.rating}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-accent">{c.jobs} open positions</span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <AdsBanner variant="banner" adIndex={1} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Companies;
