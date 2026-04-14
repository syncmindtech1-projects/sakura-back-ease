import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import catTech from "@/assets/cat-technology.jpg";
import catHealth from "@/assets/cat-healthcare.jpg";
import catConstruction from "@/assets/cat-construction.jpg";
import catFinance from "@/assets/cat-finance.jpg";
import catEducation from "@/assets/cat-education.jpg";
import catManufacturing from "@/assets/cat-manufacturing.jpg";
import catMarketing from "@/assets/cat-marketing.jpg";
import catHospitality from "@/assets/cat-hospitality.jpg";

const categories = [
  { name: "Technology", count: "2.4K+", href: "/categories/technology", image: catTech, color: "#6366f1" },
  { name: "Healthcare", count: "1.8K+", href: "/categories/healthcare", image: catHealth, color: "#10B981" },
  { name: "Construction", count: "950+", href: "/categories/construction", image: catConstruction, color: "#F59E0B" },
  { name: "Finance", count: "1.2K+", href: "/categories/finance", image: catFinance, color: "#8B5CF6" },
  { name: "Education", count: "780+", href: "/categories/education", image: catEducation, color: "#EC4899" },
  { name: "Manufacturing", count: "620+", href: "/categories/manufacturing", image: catManufacturing, color: "#3B82F6" },
  { name: "Marketing", count: "540+", href: "/categories/marketing", image: catMarketing, color: "#F97316" },
  { name: "Hospitality", count: "430+", href: "/categories/hospitality", image: catHospitality, color: "#14B8A6" },
];

interface Props { onClose: () => void; }

const MegaMenuCategories = ({ onClose }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[780px]"
  >
    <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Browse by Category</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Explore jobs across every industry</p>
        </div>
        <Link to="/categories" onClick={onClose} className="text-xs font-semibold text-primary hover:underline">
          View All →
        </Link>
      </div>

      <div className="p-4 grid grid-cols-4 gap-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={cat.href}
              onClick={onClose}
              className="group block rounded-xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-250 hover:-translate-y-1"
            >
              <div className="relative h-24 overflow-hidden">
                <img src={cat.image} alt={cat.name} loading="lazy" width={640} height={512}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-primary-foreground"
                  style={{ backgroundColor: cat.color }}>{cat.count}</span>
              </div>
              <div className="p-2.5">
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h4>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default MegaMenuCategories;
