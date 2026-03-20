import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";

const salaryData = [
  { role: "Software Engineer", range: "$90k – $180k", avg: "$130k", growth: "+12%", collar: "white", category: "Technology" },
  { role: "Electrician", range: "$45k – $85k", avg: "$62k", growth: "+8%", collar: "blue", category: "Construction" },
  { role: "Product Manager", range: "$100k – $170k", avg: "$135k", growth: "+15%", collar: "white", category: "Technology" },
  { role: "Registered Nurse", range: "$60k – $95k", avg: "$78k", growth: "+10%", collar: "white", category: "Healthcare" },
  { role: "Data Scientist", range: "$110k – $200k", avg: "$155k", growth: "+18%", collar: "white", category: "Technology" },
  { role: "HVAC Technician", range: "$40k – $72k", avg: "$55k", growth: "+6%", collar: "blue", category: "Construction" },
  { role: "Plumber", range: "$42k – $75k", avg: "$58k", growth: "+7%", collar: "blue", category: "Construction" },
  { role: "Financial Analyst", range: "$70k – $120k", avg: "$92k", growth: "+9%", collar: "white", category: "Finance" },
  { role: "Welder", range: "$38k – $65k", avg: "$50k", growth: "+5%", collar: "blue", category: "Manufacturing" },
  { role: "UX Designer", range: "$85k – $140k", avg: "$110k", growth: "+14%", collar: "white", category: "Technology" },
  { role: "CDL Truck Driver", range: "$55k – $90k", avg: "$72k", growth: "+11%", collar: "blue", category: "Transportation" },
  { role: "Marketing Manager", range: "$75k – $130k", avg: "$95k", growth: "+8%", collar: "white", category: "Marketing" },
];

const SalaryGuide = () => {
  const [search, setSearch] = useState("");
  const [collarFilter, setCollarFilter] = useState("All");

  const filtered = salaryData.filter((s) => {
    if (collarFilter === "White Collar" && s.collar !== "white") return false;
    if (collarFilter === "Blue Collar" && s.collar !== "blue") return false;
    if (search && !s.role.toLowerCase().includes(search.toLowerCase()) && !s.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(45,30%,96%)] to-[hsl(210,40%,96%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            💵 Salary Guide
          </motion.h1>
          <p className="text-muted-foreground mb-6">Know your worth — explore salary ranges across industries</p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
              <Search size={18} className="text-muted-foreground" />
              <input type="text" placeholder="Search by role or industry..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
            <div className="flex gap-2">
              {["All", "White Collar", "Blue Collar"].map((f) => (
                <button key={f} onClick={() => setCollarFilter(f)} className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors ${collarFilter === f ? 'gradient-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"><DollarSign size={20} className="text-accent" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Avg. White Collar</div>
                  <div className="text-xl font-bold font-display text-foreground">$107k</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-highlight/10 flex items-center justify-center"><DollarSign size={20} className="text-highlight" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Avg. Blue Collar</div>
                  <div className="text-xl font-bold font-display text-foreground">$59k</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><TrendingUp size={20} className="text-primary" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Avg. YoY Growth</div>
                  <div className="text-xl font-bold font-display text-foreground">+10.3%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-5 gap-4 p-4 bg-secondary text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Role</span><span>Category</span><span>Range</span><span>Average</span><span>YoY Growth</span>
            </div>
            {filtered.map((s, i) => (
              <motion.div key={s.role} className="grid grid-cols-5 gap-4 p-4 border-t border-border hover:bg-secondary/50 transition-colors items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                <div>
                  <span className="text-sm font-semibold text-foreground">{s.role}</span>
                  <span className={`ml-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${s.collar === 'white' ? 'bg-primary/10 text-primary' : 'bg-highlight/10 text-highlight'}`}>
                    {s.collar === 'white' ? '👔' : '🔧'}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{s.category}</span>
                <span className="text-sm text-muted-foreground">{s.range}</span>
                <span className="text-sm font-semibold text-foreground">{s.avg}</span>
                <span className="text-sm font-semibold text-accent flex items-center gap-1">
                  <ArrowUpRight size={14} /> {s.growth}
                </span>
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

export default SalaryGuide;
