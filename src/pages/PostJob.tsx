import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Users, Zap, Eye, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const pricingPlans = [
  { name: "Basic", price: "$49", desc: "Single job post, 30-day listing", features: ["1 job post", "30-day visibility", "Basic analytics", "Email support"] },
  { name: "Standard", price: "$99", desc: "Featured listing with priority placement", features: ["1 featured job post", "60-day visibility", "Advanced analytics", "Priority support", "Highlighted in search"], popular: true },
  { name: "Premium", price: "$249", desc: "Maximum exposure for critical hires", features: ["3 featured job posts", "90-day visibility", "Full analytics suite", "Dedicated manager", "Homepage placement", "Social media boost"] },
];

const PostJob = () => {
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [formData, setFormData] = useState({ title: "", company: "", location: "", salary: "", type: "Full-time", category: "Technology", description: "" });
  const { toast } = useToast();

  const handlePost = () => {
    if (!formData.title || !formData.company || !formData.description) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    toast({ title: "Job posted! 🎉", description: `${formData.title} at ${formData.company} is now live.` });
    setFormData({ title: "", company: "", location: "", salary: "", type: "Full-time", collar: "white", description: "" });
  };

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(200,35%,97%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Post a Job
          </motion.h1>
          <p className="text-lg text-muted-foreground">Reach 3.2M+ qualified candidates across every industry</p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Users, label: "3.2M+ job seekers" },
              { icon: Zap, label: "Go live in minutes" },
              { icon: Eye, label: "Maximum exposure" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon size={16} className="text-primary" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Pricing */}
          <h2 className="text-2xl font-bold font-display text-foreground mb-6">Choose a Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`relative bg-card rounded-2xl border-2 p-6 cursor-pointer transition-all ${selectedPlan === plan.name ? 'border-primary shadow-elevated' : 'border-border hover:border-primary/30'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full gradient-primary text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold font-display text-foreground">{plan.name}</h3>
                <div className="text-3xl font-bold font-display text-foreground mt-2">{plan.price}</div>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{plan.desc}</p>
                <div className="space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-accent shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div className="max-w-3xl mx-auto bg-card rounded-3xl border border-border p-8 md:p-12 shadow-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-bold font-display text-foreground mb-6">Job Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Job Title *</label>
                  <input type="text" placeholder="e.g. Senior React Developer" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name *</label>
                  <input type="text" placeholder="Your company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                  <input type="text" placeholder="City, state, or Remote" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Salary Range</label>
                  <input type="text" placeholder="e.g. $80k – $120k" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Job Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground outline-none focus:border-primary">
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Collar Type</label>
                  <select value={formData.collar} onChange={(e) => setFormData({ ...formData, collar: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground outline-none focus:border-primary">
                    <option value="white">White Collar</option>
                    <option value="blue">Blue Collar</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Job Description *</label>
                <textarea placeholder="Describe the role, responsibilities, requirements..." rows={6} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none transition-colors" />
              </div>
              <button onClick={handlePost} className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity w-full inline-flex items-center gap-2 justify-center active:scale-[0.97]">
                <Briefcase size={18} /> Post Job — {pricingPlans.find((p) => p.name === selectedPlan)?.price}
              </button>
            </div>
          </motion.div>

          <div className="mt-12">
            <AdsBanner variant="banner" adIndex={0} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PostJob;
