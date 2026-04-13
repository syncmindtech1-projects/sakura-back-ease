import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Users, Building2, Rocket } from "lucide-react";

const featured = [
  { name: "MTN Uganda", logo: "📱", industry: "Telecom", openings: 24, rating: 4.5, href: "/companies?q=mtn" },
  { name: "Stanbic Bank", logo: "🏦", industry: "Banking", openings: 18, rating: 4.3, href: "/companies?q=stanbic" },
  { name: "SafeBoda", logo: "🏍️", industry: "Technology", openings: 12, rating: 4.1, href: "/companies?q=safeboda" },
  { name: "Jumia Uganda", logo: "📦", industry: "E-commerce", openings: 15, rating: 4.0, href: "/companies?q=jumia" },
];

const quickLinks = [
  { label: "Top Employers", icon: Building2, href: "/companies", desc: "Leading companies hiring now" },
  { label: "Startups", icon: Rocket, href: "/companies?type=startup", desc: "Fast-growing opportunities" },
  { label: "Company Reviews", icon: Star, href: "/reviews", desc: "Real employee insights" },
  { label: "Who's Hiring", icon: Users, href: "/companies?hiring=true", desc: "Companies with open roles" },
];

interface Props {
  onClose: () => void;
}

const MegaMenuCompanies = ({ onClose }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[680px]"
  >
    <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
      <div className="flex">
        {/* Left: Featured companies */}
        <div className="flex-1 p-5 border-r border-border">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Featured Companies</h3>
          <div className="space-y-1">
            {featured.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={company.href}
                  onClick={onClose}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/80 transition-all"
                >
                  <span className="text-2xl w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">{company.logo}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{company.name}</div>
                    <div className="text-xs text-muted-foreground">{company.industry}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-xs text-[hsl(var(--highlight))]">
                      <Star size={10} fill="currentColor" /> {company.rating}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{company.openings} jobs</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Quick links */}
        <div className="w-[240px] p-5 bg-secondary/20">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Explore</h3>
          <div className="space-y-1">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-card transition-all"
                >
                  <link.icon size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</div>
                    <div className="text-[11px] text-muted-foreground">{link.desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default MegaMenuCompanies;
