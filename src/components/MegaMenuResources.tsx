import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText, DollarSign, Target, Sparkles, GraduationCap } from "lucide-react";

const tools = [
  { label: "Career Advice", icon: BookOpen, desc: "Expert tips & industry insights to boost your career", href: "/career-advice", color: "hsl(var(--primary))", tag: "Popular" },
  { label: "Resume Builder", icon: FileText, desc: "Create a standout resume in minutes with our AI builder", href: "/resume-builder", color: "hsl(var(--accent))", tag: "New" },
  { label: "Salary Guide", icon: DollarSign, desc: "Know your worth — real salary data across industries", href: "/salary-guide", color: "hsl(var(--highlight))" },
  { label: "Interview Prep", icon: Target, desc: "Ace your next interview with practice questions & tips", href: "/interview-prep", color: "hsl(280, 70%, 55%)" },
  { label: "Skills Assessment", icon: Sparkles, desc: "Test your skills and get personalized recommendations", href: "/career-advice", color: "hsl(340, 75%, 55%)" },
  { label: "Learning Paths", icon: GraduationCap, desc: "Curated courses to upskill for in-demand careers", href: "/career-advice", color: "hsl(200, 70%, 50%)" },
];

interface Props {
  onClose: () => void;
}

const MegaMenuResources = ({ onClose }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[640px]"
  >
    <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
      {/* Header with gradient */}
      <div className="px-6 py-4 bg-gradient-to-r from-primary/5 via-accent/5 to-[hsl(var(--highlight))]/5 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">Career Resources & Tools</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Everything you need to land your dream job</p>
      </div>

      <div className="p-4 grid grid-cols-2 gap-2">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={tool.href}
              onClick={onClose}
              className="group flex items-start gap-3 p-4 rounded-xl hover:bg-secondary/80 transition-all duration-200 hover:shadow-soft border border-transparent hover:border-border"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
              >
                <tool.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tool.label}</span>
                  {tool.tag && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full gradient-primary text-primary-foreground">{tool.tag}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{tool.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-3 bg-secondary/30 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Need personalized guidance?</span>
        <Link to="/contact" onClick={onClose} className="text-xs font-semibold text-primary hover:underline">Talk to a Career Coach →</Link>
      </div>
    </div>
  </motion.div>
);

export default MegaMenuResources;
