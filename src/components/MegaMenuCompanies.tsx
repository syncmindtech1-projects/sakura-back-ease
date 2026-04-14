import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import compFeatured from "@/assets/comp-featured.jpg";
import compStartups from "@/assets/comp-startups.jpg";

const featured = [
  { name: "MTN Uganda", industry: "Telecom", openings: 24, rating: 4.5, href: "/companies?q=mtn" },
  { name: "Stanbic Bank", industry: "Banking", openings: 18, rating: 4.3, href: "/companies?q=stanbic" },
  { name: "SafeBoda", industry: "Technology", openings: 12, rating: 4.1, href: "/companies?q=safeboda" },
  { name: "Jumia Uganda", industry: "E-commerce", openings: 15, rating: 4.0, href: "/companies?q=jumia" },
];

const quickLinks = [
  { label: "Top Employers", desc: "Leading companies hiring now", href: "/companies", image: compFeatured },
  { label: "Startups", desc: "Fast-growing opportunities", href: "/companies?type=startup", image: compStartups },
];

interface Props { onClose: () => void; }

const MegaMenuCompanies = ({ onClose }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[700px]"
  >
    <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
      <div className="flex">
        {/* Left: Featured companies */}
        <div className="flex-1 p-5 border-r border-border">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Featured Companies</h3>
          <div className="space-y-1">
            {featured.map((company, i) => (
              <motion.div key={company.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={company.href} onClick={onClose}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/80 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {company.name.charAt(0)}
                  </div>
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

        {/* Right: Image cards */}
        <div className="w-[260px] p-4 bg-secondary/20 space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Explore</h3>
          {quickLinks.map((link, i) => (
            <motion.div key={link.label} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={link.href} onClick={onClose}
                className="group block rounded-xl overflow-hidden border border-border hover:shadow-elevated transition-all hover:-translate-y-0.5">
                <div className="relative h-20 overflow-hidden">
                  <img src={link.image} alt={link.label} loading="lazy" width={640} height={512}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-2.5">
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{link.label}</div>
                  <div className="text-[10px] text-muted-foreground">{link.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
          <Link to="/reviews" onClick={onClose}
            className="block text-center text-xs font-semibold text-primary hover:underline py-2">
            Company Reviews →
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

export default MegaMenuCompanies;
