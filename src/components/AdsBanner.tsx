import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useState } from "react";

interface Ad {
  id: string;
  title: string;
  sponsor: string;
  cta: string;
  link: string;
  gradient: string;
  accentFrom: string;
  accentTo: string;
}

const ads: Ad[] = [
  { id: "1", title: "Level Up Your Career with Coursera — Get Certified in Data Science, AI & Cloud", sponsor: "Coursera", cta: "Start Learning Free", link: "#", gradient: "from-[#667eea] to-[#764ba2]", accentFrom: "#667eea", accentTo: "#764ba2" },
  { id: "2", title: "Get Your Resume Reviewed by Experts — 95% Get More Interviews in 30 Days", sponsor: "TopResume", cta: "Free Review", link: "#", gradient: "from-[#11998e] to-[#38ef7d]", accentFrom: "#11998e", accentTo: "#38ef7d" },
  { id: "3", title: "Hire Faster with LinkedIn Talent Solutions — Reach 900M+ Professionals Worldwide", sponsor: "LinkedIn", cta: "Post a Job", link: "#", gradient: "from-[#F2994A] to-[#F2C94C]", accentFrom: "#F2994A", accentTo: "#F2C94C" },
  { id: "4", title: "Remote Jobs Across Africa & Beyond — Join 50,000+ Professionals Working Remotely", sponsor: "RemoteAfrica", cta: "Explore Remote", link: "#", gradient: "from-[#a855f7] to-[#6366f1]", accentFrom: "#a855f7", accentTo: "#6366f1" },
  { id: "5", title: "Master Interview Skills with AI Coach — Practice & Get Instant Feedback", sponsor: "InterviewPro", cta: "Try Free", link: "#", gradient: "from-[#f43f5e] to-[#ec4899]", accentFrom: "#f43f5e", accentTo: "#ec4899" },
  { id: "6", title: "Professional Certifications That Pay Off — Boost Your Salary by Up to 35%", sponsor: "CertifyNow", cta: "Browse Certs", link: "#", gradient: "from-[#0ea5e9] to-[#06b6d4]", accentFrom: "#0ea5e9", accentTo: "#06b6d4" },
  { id: "7", title: "Free Coding Bootcamps for African Talent — Learn Python, JS & Data Engineering", sponsor: "AfricanDevs", cta: "Join Free", link: "#", gradient: "from-[#f97316] to-[#ef4444]", accentFrom: "#f97316", accentTo: "#ef4444" },
  { id: "8", title: "Health Insurance for Freelancers — Affordable Coverage from $15/Month Across East Africa", sponsor: "CoverAfrica", cta: "Get a Quote", link: "#", gradient: "from-[#14b8a6] to-[#22c55e]", accentFrom: "#14b8a6", accentTo: "#22c55e" },
];

interface AdsBannerProps {
  variant?: "inline" | "sidebar" | "banner";
  adIndex?: number;
}

const AdsBanner = ({ variant = "inline", adIndex = 0 }: AdsBannerProps) => {
  const [dismissed, setDismissed] = useState(false);
  const ad = ads[adIndex % ads.length];

  if (dismissed) return null;

  if (variant === "banner") {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-elevated"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ minHeight: "200px" }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />

            {/* Animated mesh pattern */}
            <div className="absolute inset-0 opacity-[0.08]">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 40px)`,
                }}
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Multiple glowing orbs */}
            <motion.div
              className="absolute -top-16 -left-16 w-56 h-56 rounded-full"
              style={{ background: `radial-gradient(circle, rgba(255,255,255,0.3), transparent)` }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15], x: [0, 30, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full"
              style={{ background: `radial-gradient(circle, rgba(255,255,255,0.25), transparent)` }}
              animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.1, 0.25, 0.1], y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full"
              style={{ background: `radial-gradient(circle, rgba(255,255,255,0.2), transparent)` }}
              animate={{ scale: [0.8, 1.2, 0.8], x: [0, 50, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            />

            <button
              onClick={() => setDismissed(true)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-20"
              aria-label="Dismiss ad"
            >
              <X size={16} />
            </button>

            {/* Large marquee text */}
            <div className="relative z-[1] py-8 md:py-10">
              <div className="overflow-hidden mb-4">
                <motion.div
                  className="flex gap-16 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(6)].map((_, j) => (
                    <span key={j} className="text-white/10 text-6xl md:text-8xl font-black font-display uppercase tracking-wider select-none">
                      {ad.sponsor} • PREMIUM • {ad.sponsor} • SPONSORED •&nbsp;
                    </span>
                  ))}
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 px-8 md:px-12 relative">
                <div className="flex-1 text-center md:text-left">
                  <motion.span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 bg-white/15 px-4 py-1.5 rounded-full border border-white/25 backdrop-blur-sm"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✦ Sponsored · {ad.sponsor}
                  </motion.span>
                  <motion.h3
                    className="text-xl md:text-3xl font-bold font-display text-white mt-4 leading-tight drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {ad.title}
                  </motion.h3>
                </div>
                <motion.a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-white text-foreground font-bold text-base px-10 py-4 rounded-2xl hover:scale-105 transition-all inline-flex items-center gap-2 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {ad.cta} <ExternalLink size={16} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (variant === "sidebar") {
    return (
      <motion.div
        className={`relative rounded-2xl overflow-hidden shadow-md`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${ad.gradient}`} />
        <div className="relative z-[1] p-5">
          <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors" aria-label="Dismiss ad">
            <X size={12} />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-full">Sponsored</span>
          <h4 className="text-sm font-bold font-display text-white mt-3">{ad.title.split('—')[0]}</h4>
          <p className="text-xs text-white/70 mt-1 leading-relaxed">{ad.title.split('—')[1] || ''}</p>
          <a href={ad.link} target="_blank" rel="noopener noreferrer"
            className="mt-4 block text-center bg-white text-foreground font-semibold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-md">
            {ad.cta}
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />
      <div className="relative z-[1] p-5 flex items-center gap-4">
        <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors" aria-label="Dismiss ad">
          <X size={14} />
        </button>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-full">Sponsored · {ad.sponsor}</span>
          <h4 className="text-sm font-bold text-white mt-1 truncate">{ad.title.split('—')[0]}</h4>
        </div>
        <a href={ad.link} target="_blank" rel="noopener noreferrer"
          className="shrink-0 text-xs font-bold bg-white text-foreground px-4 py-2 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-1 shadow-sm">
          {ad.cta} <ExternalLink size={10} />
        </a>
      </div>
    </motion.div>
  );
};

export default AdsBanner;
