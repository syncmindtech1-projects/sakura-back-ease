import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import resCareer from "@/assets/res-career.jpg";
import resResume from "@/assets/res-resume.jpg";
import resSalary from "@/assets/res-salary.jpg";
import resInterview from "@/assets/res-interview.jpg";
import resSkills from "@/assets/res-skills.jpg";
import resLearning from "@/assets/res-learning.jpg";

const tools = [
  { label: "Career Advice", desc: "Expert tips & industry insights", href: "/career-advice", image: resCareer, tag: "Popular" },
  { label: "Resume Builder", desc: "Create a standout resume in minutes", href: "/resume-builder", image: resResume, tag: "New" },
  { label: "Salary Guide", desc: "Know your worth — real salary data", href: "/salary-guide", image: resSalary },
  { label: "Interview Prep", desc: "Ace your next interview", href: "/interview-prep", image: resInterview },
  { label: "Skills Assessment", desc: "Test your skills & get recommendations", href: "/career-advice", image: resSkills },
  { label: "Learning Paths", desc: "Curated courses for in-demand careers", href: "/career-advice", image: resLearning },
];

interface Props { onClose: () => void; }

const MegaMenuResources = ({ onClose }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[700px]"
  >
    <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-primary/5 via-accent/5 to-[hsl(var(--highlight))]/5 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">Career Resources & Tools</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Everything you need to land your dream job</p>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3">
        {tools.map((tool, i) => (
          <motion.div key={tool.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link to={tool.href} onClick={onClose}
              className="group block rounded-xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-250 hover:-translate-y-1">
              <div className="relative h-24 overflow-hidden">
                <img src={tool.image} alt={tool.label} loading="lazy" width={640} height={512}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {tool.tag && (
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full gradient-primary text-primary-foreground">{tool.tag}</span>
                )}
              </div>
              <div className="p-2.5">
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{tool.label}</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{tool.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="px-6 py-3 bg-secondary/30 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Need personalized guidance?</span>
        <Link to="/contact" onClick={onClose} className="text-xs font-semibold text-primary hover:underline">Talk to a Career Coach →</Link>
      </div>
    </div>
  </motion.div>
);

export default MegaMenuResources;
