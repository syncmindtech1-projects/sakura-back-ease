import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, BarChart3, MapPin } from "lucide-react";

const salaryData = [
  { role: "Software Engineer", range: "$90k – $180k", avg: "$130k", growth: "+12%" },
  { role: "Electrician", range: "$45k – $85k", avg: "$62k", growth: "+8%" },
  { role: "Product Manager", range: "$100k – $170k", avg: "$135k", growth: "+15%" },
  { role: "Registered Nurse", range: "$60k – $95k", avg: "$78k", growth: "+10%" },
  { role: "Data Scientist", range: "$110k – $200k", avg: "$155k", growth: "+18%" },
  { role: "HVAC Technician", range: "$40k – $72k", avg: "$55k", growth: "+6%" },
  { role: "Plumber", range: "$42k – $75k", avg: "$58k", growth: "+7%" },
  { role: "Financial Analyst", range: "$70k – $120k", avg: "$92k", growth: "+9%" },
];

const SalaryGuide = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          💵 Salary Guide
        </motion.h1>
        <p className="text-muted-foreground mb-10">Know your worth — explore salary ranges across industries</p>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-secondary text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Role</span><span>Range</span><span>Average</span><span>YoY Growth</span>
          </div>
          {salaryData.map((s, i) => (
            <motion.div key={s.role} className="grid grid-cols-4 gap-4 p-4 border-t border-border hover:bg-secondary/50 transition-colors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <span className="text-sm font-semibold text-foreground">{s.role}</span>
              <span className="text-sm text-muted-foreground">{s.range}</span>
              <span className="text-sm font-semibold text-foreground">{s.avg}</span>
              <span className="text-sm font-semibold text-accent">{s.growth}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default SalaryGuide;
