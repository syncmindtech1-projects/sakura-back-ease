import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useState } from "react";

interface Ad {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  cta: string;
  link: string;
  icon: string;
  bgClass: string;
}

const ads: Ad[] = [
  {
    id: "1",
    title: "Level Up Your Career with Coursera",
    description: "Get certified in Data Science, AI, or Cloud Computing — courses from top universities.",
    sponsor: "Coursera",
    cta: "Start Learning Free",
    link: "#",
    icon: "🎓",
    bgClass: "from-[hsl(210,50%,96%)] to-[hsl(210,40%,92%)]",
  },
  {
    id: "2",
    title: "Get Your Resume Reviewed by Experts",
    description: "Professional resume writers help you stand out. 95% of users get more interviews.",
    sponsor: "TopResume",
    cta: "Get Free Review",
    link: "#",
    icon: "📝",
    bgClass: "from-[hsl(160,40%,95%)] to-[hsl(160,35%,90%)]",
  },
  {
    id: "3",
    title: "Hire Faster with LinkedIn Talent Solutions",
    description: "Reach 900M+ professionals worldwide. Post jobs and find candidates effortlessly.",
    sponsor: "LinkedIn",
    cta: "Post a Job",
    link: "#",
    icon: "💼",
    bgClass: "from-[hsl(45,40%,95%)] to-[hsl(45,35%,90%)]",
  },
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
            className={`relative rounded-2xl bg-gradient-to-r ${ad.bgClass} border border-border p-6 md:p-8 overflow-hidden`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-3 right-3 p-1 rounded-lg hover:bg-foreground/5 text-muted-foreground transition-colors"
              aria-label="Dismiss ad"
            >
              <X size={14} />
            </button>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-5xl">{ad.icon}</span>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sponsored</span>
                <h3 className="text-lg font-bold font-display text-foreground mt-1">{ad.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{ad.description}</p>
              </div>
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 gradient-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2 active:scale-[0.97]"
              >
                {ad.cta} <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (variant === "sidebar") {
    return (
      <motion.div
        className={`relative rounded-2xl bg-gradient-to-b ${ad.bgClass} border border-border p-5 overflow-hidden`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-1 rounded-lg hover:bg-foreground/5 text-muted-foreground transition-colors"
          aria-label="Dismiss ad"
        >
          <X size={12} />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sponsored</span>
        <span className="text-3xl block mt-2">{ad.icon}</span>
        <h4 className="text-sm font-bold font-display text-foreground mt-3">{ad.title}</h4>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ad.description}</p>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center gradient-primary text-primary-foreground font-semibold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          {ad.cta}
        </a>
      </motion.div>
    );
  }

  // inline
  return (
    <motion.div
      className={`relative rounded-2xl bg-gradient-to-r ${ad.bgClass} border border-border p-5 overflow-hidden`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 p-1 rounded-lg hover:bg-foreground/5 text-muted-foreground transition-colors"
        aria-label="Dismiss ad"
      >
        <X size={14} />
      </button>
      <div className="flex items-center gap-4">
        <span className="text-3xl">{ad.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sponsored · {ad.sponsor}</span>
          <h4 className="text-sm font-bold text-foreground mt-0.5 truncate">{ad.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{ad.description}</p>
        </div>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
        >
          {ad.cta} <ExternalLink size={10} />
        </a>
      </div>
    </motion.div>
  );
};

export default AdsBanner;
