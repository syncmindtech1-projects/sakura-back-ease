import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone, Sparkles } from "lucide-react";
import AdvertiseModal from "./AdvertiseModal";

const STORAGE_KEY = "jobsphere_ad_popup_v1";

const AdvertisePopup = () => {
  const [visible, setVisible] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };
  const openForm = () => { setFormOpen(true); setVisible(false); sessionStorage.setItem(STORAGE_KEY, "1"); };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={dismiss}
          >
            <motion.div
              className="bg-card rounded-2xl border border-border shadow-elevated w-full max-w-md relative overflow-hidden"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={dismiss} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary text-muted-foreground z-10" aria-label="Close">
                <X size={16} />
              </button>
              <div className="p-7 text-center">
                <div className="mx-auto w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground shadow-elevated">
                  <Megaphone size={26} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-foreground mt-4 flex items-center justify-center gap-2">
                  Advertise on JobSphere <Sparkles size={16} className="text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Reach thousands of job seekers and employers across East Africa. Banners, sponsored posts, video ads — flexible packages for any budget.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  <button onClick={openForm} className="flex-1 gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
                    Advertise now
                  </button>
                  <button onClick={dismiss} className="flex-1 bg-secondary text-secondary-foreground font-semibold py-3 rounded-xl hover:bg-secondary/80 transition-colors">
                    Maybe later
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3">Takes 30 seconds. Our team replies within 24 hours.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdvertiseModal open={formOpen} onClose={() => setFormOpen(false)} source="homepage-popup" />
    </>
  );
};

export default AdvertisePopup;
