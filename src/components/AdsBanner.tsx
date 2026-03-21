import { motion } from "framer-motion";
import { ExternalLink, X, Sparkles, GraduationCap, FileText, Briefcase, Globe, Award, Zap, Heart } from "lucide-react";
import { useState } from "react";

interface Ad {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  cta: string;
  link: string;
  icon: React.ReactNode;
  bgClass: string;
  accentColor: string;
  borderColor: string;
}

const ads: Ad[] = [
  {
    id: "1",
    title: "Level Up Your Career with Coursera",
    description: "Get certified in Data Science, AI, or Cloud Computing — courses from top universities worldwide.",
    sponsor: "Coursera",
    cta: "Start Learning Free",
    link: "#",
    icon: <GraduationCap size={28} />,
    bgClass: "from-blue-500/10 via-cyan-500/5 to-blue-600/10",
    accentColor: "text-blue-600",
    borderColor: "border-blue-200 hover:border-blue-400",
  },
  {
    id: "2",
    title: "Get Your Resume Reviewed by Experts",
    description: "Professional resume writers help you stand out. 95% of users get more interviews within 30 days.",
    sponsor: "TopResume",
    cta: "Get Free Review",
    link: "#",
    icon: <FileText size={28} />,
    bgClass: "from-emerald-500/10 via-teal-500/5 to-green-600/10",
    accentColor: "text-emerald-600",
    borderColor: "border-emerald-200 hover:border-emerald-400",
  },
  {
    id: "3",
    title: "Hire Faster with LinkedIn Talent Solutions",
    description: "Reach 900M+ professionals worldwide. Post jobs and find top candidates effortlessly.",
    sponsor: "LinkedIn",
    cta: "Post a Job Now",
    link: "#",
    icon: <Briefcase size={28} />,
    bgClass: "from-amber-500/10 via-orange-500/5 to-yellow-600/10",
    accentColor: "text-amber-600",
    borderColor: "border-amber-200 hover:border-amber-400",
  },
  {
    id: "4",
    title: "Remote Jobs Across Africa & Beyond",
    description: "Join 50,000+ professionals working remotely for top international companies from anywhere.",
    sponsor: "RemoteAfrica",
    cta: "Explore Remote Jobs",
    link: "#",
    icon: <Globe size={28} />,
    bgClass: "from-violet-500/10 via-purple-500/5 to-indigo-600/10",
    accentColor: "text-violet-600",
    borderColor: "border-violet-200 hover:border-violet-400",
  },
  {
    id: "5",
    title: "Master Interview Skills with AI Coach",
    description: "Practice with AI-powered mock interviews tailored to your industry. Get instant feedback.",
    sponsor: "InterviewPro",
    cta: "Try Free Session",
    link: "#",
    icon: <Sparkles size={28} />,
    bgClass: "from-rose-500/10 via-pink-500/5 to-red-600/10",
    accentColor: "text-rose-600",
    borderColor: "border-rose-200 hover:border-rose-400",
  },
  {
    id: "6",
    title: "Professional Certifications That Pay Off",
    description: "PMP, AWS, Google Cloud, Cisco — boost your salary by up to 35% with recognized certifications.",
    sponsor: "CertifyNow",
    cta: "Browse Certifications",
    link: "#",
    icon: <Award size={28} />,
    bgClass: "from-sky-500/10 via-blue-400/5 to-cyan-600/10",
    accentColor: "text-sky-600",
    borderColor: "border-sky-200 hover:border-sky-400",
  },
  {
    id: "7",
    title: "Upskill in Tech — Free Coding Bootcamps",
    description: "Learn Python, JavaScript, or Data Engineering with free bootcamps designed for African talent.",
    sponsor: "AfricanDevs",
    cta: "Join Free Bootcamp",
    link: "#",
    icon: <Zap size={28} />,
    bgClass: "from-orange-500/10 via-red-500/5 to-amber-600/10",
    accentColor: "text-orange-600",
    borderColor: "border-orange-200 hover:border-orange-400",
  },
  {
    id: "8",
    title: "Health Insurance for Freelancers",
    description: "Affordable health coverage for remote workers and freelancers across East Africa. Plans from $15/mo.",
    sponsor: "CoverAfrica",
    cta: "Get a Quote",
    link: "#",
    icon: <Heart size={28} />,
    bgClass: "from-teal-500/10 via-emerald-500/5 to-cyan-600/10",
    accentColor: "text-teal-600",
    borderColor: "border-teal-200 hover:border-teal-400",
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
            className={`relative rounded-3xl bg-gradient-to-r ${ad.bgClass} border-2 ${ad.borderColor} p-6 md:p-8 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full" />
            
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/50 hover:bg-white/80 text-muted-foreground transition-colors z-10"
              aria-label="Dismiss ad"
            >
              <X size={14} />
            </button>
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-[1]">
              <div className={`w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center ${ad.accentColor} shadow-md`}>
                {ad.icon}
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-white/60 px-2 py-0.5 rounded-full">Sponsored</span>
                <h3 className="text-lg md:text-xl font-bold font-display text-foreground mt-2">{ad.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-lg">{ad.description}</p>
              </div>
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 bg-foreground text-background font-semibold text-sm px-7 py-3.5 rounded-2xl hover:opacity-90 transition-all inline-flex items-center gap-2 active:scale-[0.97] shadow-lg hover:shadow-xl`}
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
        className={`relative rounded-2xl bg-gradient-to-b ${ad.bgClass} border-2 ${ad.borderColor} p-5 overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/50 hover:bg-white/80 text-muted-foreground transition-colors"
          aria-label="Dismiss ad"
        >
          <X size={12} />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-white/60 px-2 py-0.5 rounded-full">Sponsored</span>
        <div className={`w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center ${ad.accentColor} shadow-sm mt-3`}>
          {ad.icon}
        </div>
        <h4 className="text-sm font-bold font-display text-foreground mt-3">{ad.title}</h4>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ad.description}</p>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center bg-foreground text-background font-semibold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-md"
        >
          {ad.cta}
        </a>
      </motion.div>
    );
  }

  // inline
  return (
    <motion.div
      className={`relative rounded-2xl bg-gradient-to-r ${ad.bgClass} border-2 ${ad.borderColor} p-5 overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 hover:bg-white/80 text-muted-foreground transition-colors"
        aria-label="Dismiss ad"
      >
        <X size={14} />
      </button>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center ${ad.accentColor} shadow-sm shrink-0`}>
          {ad.icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-white/60 px-2 py-0.5 rounded-full">Sponsored · {ad.sponsor}</span>
          <h4 className="text-sm font-bold text-foreground mt-1 truncate">{ad.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{ad.description}</p>
        </div>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-bold bg-foreground text-background px-4 py-2 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-1 shadow-sm"
        >
          {ad.cta} <ExternalLink size={10} />
        </a>
      </div>
    </motion.div>
  );
};

export default AdsBanner;
