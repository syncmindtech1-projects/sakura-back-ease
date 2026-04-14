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
      <section className="py-4">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-elevated"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />
            
            {/* Animated diagonal stripes */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`,
              }} />
            </div>

            {/* Glowing orbs */}
            <motion.div
              className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, white, transparent)` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-15"
              style={{ background: `radial-gradient(circle, white, transparent)` }}
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <button
              onClick={() => setDismissed(true)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
              aria-label="Dismiss ad"
            >
              <X size={14} />
            </button>

            {/* Content with marquee text */}
            <div className="relative z-[1] py-5 md:py-6">
              {/* Marquee scrolling text */}
              <div className="overflow-hidden mb-3">
                <motion.div
                  className="flex gap-12 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(4)].map((_, j) => (
                    <span key={j} className="text-white/20 text-5xl md:text-7xl font-bold font-display uppercase tracking-wider">
                      {ad.sponsor} • PREMIUM AD • {ad.sponsor} • SPONSORED •&nbsp;
                    </span>
                  ))}
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-5 px-6 md:px-10 relative">
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    Sponsored · {ad.sponsor}
                  </span>
                  <motion.h3
                    className="text-lg md:text-2xl font-bold font-display text-white mt-3 leading-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {ad.title}
                  </motion.h3>
                </div>
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-white text-foreground font-bold text-sm px-8 py-4 rounded-xl hover:scale-105 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  {ad.cta} <ExternalLink size={14} />
                </a>
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
