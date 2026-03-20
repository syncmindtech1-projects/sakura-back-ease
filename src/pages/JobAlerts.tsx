import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Mail, Briefcase, MapPin, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const alertExamples = [
  { title: "React Developer", location: "Remote", frequency: "Daily" },
  { title: "Electrician", location: "Houston, TX", frequency: "Weekly" },
  { title: "Product Manager", location: "New York, NY", frequency: "Daily" },
];

const JobAlerts = () => {
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!email) {
      toast({ title: "Email required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    toast({ title: "Alert created! ✅", description: `We'll send ${frequency} job alerts to ${email}` });
    setEmail("");
    setJobTitle("");
    setLocation("");
  };

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(160,30%,95%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4">🔔 Job Alerts</h1>
            <p className="text-lg text-muted-foreground">Never miss an opportunity — get personalized job alerts delivered to your inbox.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Setup form */}
            <motion.div className="bg-card rounded-3xl border border-border p-8 shadow-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold font-display text-foreground mb-6">Create Your Alert</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-border">
                    <Mail size={16} className="text-muted-foreground" />
                    <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Job Title or Keywords</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-border">
                    <Briefcase size={16} className="text-muted-foreground" />
                    <input type="text" placeholder="e.g. Software Engineer, Plumber" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-border">
                    <MapPin size={16} className="text-muted-foreground" />
                    <input type="text" placeholder="City, state, or remote" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Frequency</label>
                  <div className="flex gap-2">
                    {["daily", "weekly", "instant"].map((f) => (
                      <button key={f} onClick={() => setFrequency(f)} className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors capitalize ${frequency === f ? 'gradient-primary text-primary-foreground' : 'bg-secondary border border-border text-muted-foreground hover:text-foreground'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handleSubscribe} className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.97]">
                  Create Job Alert
                </button>
              </div>
            </motion.div>

            {/* Info side */}
            <div className="space-y-6">
              <motion.div className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="text-lg font-semibold font-display text-foreground mb-4">Why Set Up Alerts?</h3>
                <div className="space-y-3">
                  {[
                    "Be the first to apply to new postings",
                    "Customizable by title, location, and type",
                    "Daily or weekly digest — your choice",
                    "Unsubscribe anytime with one click",
                    "Covers both white and blue collar jobs",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={16} className="text-accent shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="bg-card rounded-2xl border border-border p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-lg font-semibold font-display text-foreground mb-4">Popular Alerts</h3>
                <div className="space-y-3">
                  {alertExamples.map((a) => (
                    <div key={a.title} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                      <div>
                        <div className="text-sm font-semibold text-foreground">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.location}</div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-lg bg-primary/10 text-primary">{a.frequency}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <AdsBanner variant="sidebar" adIndex={0} />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default JobAlerts;
