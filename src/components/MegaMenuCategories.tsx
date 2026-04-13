import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const categories = [
  { name: "Technology", icon: "💻", desc: "Software, IT & digital roles", count: "2.4K+", href: "/categories/technology", color: "hsl(var(--primary))", trending: true },
  { name: "Healthcare", icon: "🏥", desc: "Medical, nursing & pharma", count: "1.8K+", href: "/categories/healthcare", color: "hsl(160, 70%, 42%)", trending: true },
  { name: "Construction", icon: "🏗️", desc: "Building, trades & engineering", count: "950+", href: "/categories/construction", color: "hsl(35, 95%, 55%)" },
  { name: "Finance", icon: "💰", desc: "Banking, accounting & insurance", count: "1.2K+", href: "/categories/finance", color: "hsl(250, 80%, 60%)" },
  { name: "Education", icon: "📚", desc: "Teaching, training & research", count: "780+", href: "/categories/education", color: "hsl(280, 70%, 55%)" },
  { name: "Manufacturing", icon: "🏭", desc: "Production & assembly", count: "620+", href: "/categories/manufacturing", color: "hsl(200, 70%, 50%)" },
  { name: "Marketing", icon: "📢", desc: "Digital, content & branding", count: "540+", href: "/categories/marketing", color: "hsl(340, 75%, 55%)" },
  { name: "Hospitality", icon: "🍽️", desc: "Hotels, restaurants & tourism", count: "430+", href: "/categories/hospitality", color: "hsl(25, 90%, 50%)" },
];

interface Props {
  onClose: () => void;
}

const MegaMenuCategories = ({ onClose }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[720px]"
  >
    <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Browse by Category</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Explore jobs across every industry</p>
          </div>
          <Link to="/categories" onClick={onClose} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            View All <span>→</span>
          </Link>
        </div>
      </div>
      
      {/* Grid */}
      <div className="p-4 grid grid-cols-2 gap-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={cat.href}
              onClick={onClose}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/80 transition-all duration-200 hover:shadow-soft"
            >
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                  {cat.trending && (
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-accent-foreground bg-accent/15 px-1.5 py-0.5 rounded-full" style={{ color: 'hsl(var(--accent))' }}>
                      <TrendingUp size={10} /> Hot
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{cat.desc}</p>
              </div>
              <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-lg shrink-0">{cat.count}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default MegaMenuCategories;
