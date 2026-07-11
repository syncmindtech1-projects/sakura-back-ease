import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Users, Zap, Eye, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const pricingPlans = [
  { name: "Basic", price: "Free", desc: "Standard listing, 30-day visibility", features: ["1 job post", "30-day visibility", "Live to all users instantly", "Email notifications sent"] },
  { name: "Standard", price: "Free", desc: "Featured on the homepage feed", features: ["1 featured post", "60-day visibility", "Highlighted in search", "Instant alerts to job seekers"], popular: true },
  { name: "Premium", price: "Free", desc: "Maximum exposure for critical hires", features: ["3 posts", "90-day visibility", "Homepage placement", "Social media boost"] },
];

const PostJob = () => {
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: "", company: "", contact_email: "", location: "", salary: "", apply_url: "", type: "Full-time", category: "Technology", description: "" });
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handlePost = async () => {
    if (!user) {
      toast({ title: "Please sign in first", description: "Create an account or log in to post a job." });
      navigate("/auth?mode=register");
      return;
    }
    if (!formData.title || !formData.company || !formData.contact_email || !formData.description) {
      toast({ title: "Missing fields", description: "Please fill in title, company, contact email, and description.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      // Jobs are submitted for admin approval (SyncMind Tech team) before going live.
      const { error } = await supabase.from("job_submissions").insert({
        title: formData.title,
        company: formData.company,
        contact_email: formData.contact_email,
        location: formData.location || null,
        salary: formData.salary || null,
        apply_url: formData.apply_url || null,
        job_type: formData.type,
        category: formData.category,
        description: formData.description,
        plan: selectedPlan,
        status: "pending",
      });
      if (error) throw error;

      // Notify the SyncMind Tech team by email
      supabase.functions.invoke("submit-job", {
        body: { ...formData, job_type: formData.type, plan: selectedPlan },
      }).catch(() => {});

      toast({
        title: "Submitted for review ✅",
        description: `"${formData.title}" has been sent to the SyncMind Tech team. It will go live once approved (usually within a few hours).`,
      });
      setFormData({ title: "", company: "", contact_email: "", location: "", salary: "", apply_url: "", type: "Full-time", category: "Technology", description: "" });
    } catch (e: any) {
      toast({ title: "Publish failed", description: e?.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <section className="bg-primary text-primary-foreground py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Post a Job
          </motion.h1>
          <p className="text-lg text-primary-foreground/80">Reach thousands of qualified candidates across East Africa — instantly.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Users, label: "Live to job seekers instantly" },
              { icon: Zap, label: "In-app + email alerts sent" },
              { icon: Eye, label: "Maximum exposure" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                <item.icon size={16} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          {!user && (
            <div className="max-w-3xl mx-auto mb-8 bg-primary/5 border border-primary/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-start gap-3">
                <Lock size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Sign in to publish your job instantly</p>
                  <p className="text-xs text-muted-foreground">Registered employers can post in seconds. It's free.</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link to="/auth" className="text-sm font-semibold px-4 py-2 rounded-lg border border-border hover:bg-secondary">Login</Link>
                <Link to="/auth?mode=register" className="text-sm font-semibold px-4 py-2 rounded-lg gradient-primary text-primary-foreground">Create account</Link>
              </div>
            </div>
          )}

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

          <motion.div className="max-w-3xl mx-auto bg-card rounded-3xl border border-border p-8 md:p-12 shadow-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-bold font-display text-foreground mb-6">Job Details</h2>
            {user && <p className="text-xs text-muted-foreground mb-4">Posting as <strong>{profile?.full_name ?? user.email}</strong></p>}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Job Title *</label>
                  <input type="text" placeholder="e.g. Senior React Developer" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name *</label>
                  <input type="text" placeholder="Your company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                  <input type="text" placeholder="City, country, or Remote" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Salary Range</label>
                  <input type="text" placeholder="e.g. UGX 3M – 5M / month" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Job Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary">
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary">
                    {["Technology", "Healthcare", "Finance", "Construction", "Education", "Marketing", "Manufacturing", "Transportation", "Hospitality", "Retail", "Engineering", "Legal"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Contact Email *</label>
                  <input type="email" placeholder="hiring@yourcompany.com" value={formData.contact_email} onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Apply URL (optional)</label>
                  <input type="url" placeholder="https://…" value={formData.apply_url} onChange={(e) => setFormData({ ...formData, apply_url: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Job Description *</label>
                <textarea placeholder="Describe the role, responsibilities, requirements..." rows={6} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary resize-none transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground">A copy of every posting is also delivered to our team at <strong>syncmindtech1@gmail.com</strong> for quality assurance.</p>
              <button onClick={handlePost} disabled={submitting} className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity w-full inline-flex items-center gap-2 justify-center active:scale-[0.97] disabled:opacity-60">
                <Briefcase size={18} /> {submitting ? "Publishing…" : user ? "Publish Job Now" : "Sign in to Publish"}
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
