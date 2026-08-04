import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const subscribe = async () => {
    if (!email) {
      toast({ title: "Email required", description: "Enter your email to subscribe.", variant: "destructive" });
      return;
    }
    setSending(true);
    const { data, error } = await supabase.functions.invoke("submit-contact", {
      body: { form_type: "newsletter", email, subject: "Newsletter subscription", message: "New newsletter subscriber from the homepage." },
    });
    setSending(false);
    if (error || (data as any)?.error) {
      toast({ title: "Could not subscribe", description: (data as any)?.error || error?.message, variant: "destructive" });
      return;
    }
    toast({ title: "You're subscribed", description: "Job matches are on the way." });
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="gradient-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Mail size={28} className="text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-foreground mb-3">
              Get Job Alerts Delivered
            </h2>
            <p className="text-primary-foreground/70 mb-8">
              Subscribe and receive curated job matches straight to your inbox every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none focus:border-white/40"
              />
              <button onClick={subscribe} disabled={sending} className="px-6 py-3.5 rounded-xl bg-card text-foreground font-semibold text-sm hover:bg-card/90 transition-colors flex items-center gap-2 justify-center disabled:opacity-60">
                {sending ? "Subscribing…" : "Subscribe"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
