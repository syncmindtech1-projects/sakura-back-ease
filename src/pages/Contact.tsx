import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent! ✅", description: "We'll get back to you within 24 hours." });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(200,35%,97%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Contact Us
          </motion.h1>
          <p className="text-muted-foreground">Get in touch — we'd love to hear from you</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@jobsphere.com", desc: "We respond within 24 hours" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", desc: "Mon–Fri 9am–6pm EST" },
                { icon: MapPin, label: "Office", value: "123 Career St, San Francisco, CA", desc: "Open for in-person meetings" },
                { icon: Clock, label: "Hours", value: "Monday – Friday", desc: "9:00 AM – 6:00 PM EST" },
              ].map((c) => (
                <motion.div key={c.label} className="bg-card rounded-2xl border border-border p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><c.icon size={20} className="text-primary" /></div>
                    <div>
                      <div className="text-xs text-muted-foreground">{c.label}</div>
                      <div className="text-sm font-semibold text-foreground">{c.value}</div>
                      <div className="text-xs text-muted-foreground">{c.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <AdsBanner variant="sidebar" adIndex={2} />
            </div>

            {/* Form */}
            <motion.div className="lg:col-span-2 bg-card rounded-3xl border border-border p-8 shadow-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <MessageSquare size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-foreground">Send Us a Message</h2>
                  <p className="text-sm text-muted-foreground">We'll respond within one business day</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                    <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                    <input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                  <input type="text" placeholder="What's this about?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                  <textarea placeholder="Tell us how we can help..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none transition-colors" />
                </div>
                <button onClick={handleSubmit} className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto inline-flex items-center gap-2 justify-center active:scale-[0.97]">
                  <Send size={16} /> Send Message
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
