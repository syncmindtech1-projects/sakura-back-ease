import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdvertiseModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
  requireVideoUrl?: boolean;
  title?: string;
  subtitle?: string;
}

const AdvertiseModal = ({ open, onClose, source = "popup", requireVideoUrl = false, title, subtitle }: AdvertiseModalProps) => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    advertiser_name: "",
    contact_email: "",
    company: "",
    phone: "",
    ad_type: requireVideoUrl ? "Video ad" : "Banner ad",
    budget: "",
    video_url: "",
    target_url: "",
    message: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.advertiser_name || !form.contact_email || !form.message) {
      toast({ title: "Please fill in your name, email and message", variant: "destructive" });
      return;
    }
    if (requireVideoUrl && !form.video_url) {
      toast({ title: "Please add a video URL", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await supabase.functions.invoke("submit-ad", { body: { ...form, source } });
      setSent(true);
      toast({ title: "Request sent", description: "Our team will reach out via email shortly." });
    } catch (e: any) {
      toast({ title: "Could not send", description: e?.message ?? "Try again", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-2xl border border-border shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-secondary text-muted-foreground z-10" aria-label="Close">
              <X size={18} />
            </button>

            {sent ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="mx-auto text-primary" size={48} />
                <h3 className="text-xl font-bold text-foreground mt-4">You're all set</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Your advertising request has been sent to our team at <strong>syncmindtech1@gmail.com</strong>. We'll be in touch within 24 hours.
                </p>
                <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold">Done</button>
              </div>
            ) : (
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-display text-foreground">
                      {title ?? "Advertise on JobSphere"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {subtitle ?? "Reach thousands of job seekers across East Africa"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  <input placeholder="Your name *" value={form.advertiser_name} onChange={(e) => set("advertiser_name", e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  <input placeholder="Email *" type="email" value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  <input placeholder="Company" value={form.company} onChange={(e) => set("company", e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  <input placeholder="Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  <select value={form.ad_type} onChange={(e) => set("ad_type", e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary">
                    {["Banner ad", "Video ad", "Sponsored listing", "Newsletter", "Other"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <input placeholder="Budget (e.g. $500)" value={form.budget} onChange={(e) => set("budget", e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  <input placeholder={requireVideoUrl ? "Video URL (YouTube/MP4) *" : "Video URL (optional)"} value={form.video_url} onChange={(e) => set("video_url", e.target.value)} className="sm:col-span-2 px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  <input placeholder="Landing URL (your website)" value={form.target_url} onChange={(e) => set("target_url", e.target.value)} className="sm:col-span-2 px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  <textarea placeholder="Tell us about your campaign *" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} className="sm:col-span-2 px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary resize-none" />
                </div>

                <p className="text-[11px] text-muted-foreground mt-3">Your submission goes straight to <strong>syncmindtech1@gmail.com</strong>.</p>

                <button onClick={submit} disabled={sending} className="mt-4 w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 disabled:opacity-60">
                  {sending ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Send request"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvertiseModal;
