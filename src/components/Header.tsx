import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search, Bell, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MegaMenuItem {
  label: string;
  href: string;
  desc: string;
  icon: string;
}

interface NavItem {
  label: string;
  href: string;
  mega?: MegaMenuItem[];
}

const navItems: NavItem[] = [
  {
    label: "Find Jobs",
    href: "/jobs",
    mega: [
      { label: "Browse All Jobs", href: "/jobs", desc: "Explore thousands of openings", icon: "🔍" },
      { label: "White Collar Jobs", href: "/jobs?collar=white", desc: "Professional & office roles", icon: "👔" },
      { label: "Blue Collar Jobs", href: "/jobs?collar=blue", desc: "Skilled trades & labor", icon: "🔧" },
      { label: "Remote Jobs", href: "/remote-jobs", desc: "Work from anywhere", icon: "🏠" },
      { label: "Part-time Jobs", href: "/jobs?type=part-time", desc: "Flexible hours", icon: "⏰" },
      { label: "Internships", href: "/jobs?type=internship", desc: "Start your career", icon: "🎓" },
    ],
  },
  {
    label: "Categories",
    href: "/categories",
    mega: [
      { label: "Technology", href: "/categories/technology", desc: "Software, IT & digital", icon: "💻" },
      { label: "Healthcare", href: "/categories/healthcare", desc: "Medical & nursing", icon: "🏥" },
      { label: "Construction", href: "/categories/construction", desc: "Building & trades", icon: "🏗️" },
      { label: "Finance", href: "/categories/finance", desc: "Banking & accounting", icon: "💰" },
      { label: "Manufacturing", href: "/categories/manufacturing", desc: "Production & assembly", icon: "🏭" },
      { label: "View All Categories", href: "/categories", desc: "12+ industries", icon: "📂" },
    ],
  },
  {
    label: "Companies",
    href: "/companies",
    mega: [
      { label: "Top Companies", href: "/companies", desc: "Leading employers", icon: "🏢" },
      { label: "Startups", href: "/companies?type=startup", desc: "Fast-growing companies", icon: "🚀" },
      { label: "Enterprise", href: "/companies?type=enterprise", desc: "Fortune 500 & more", icon: "🌐" },
      { label: "Company Reviews", href: "/reviews", desc: "Real employee insights", icon: "⭐" },
    ],
  },
  {
    label: "Resources",
    href: "/career-advice",
    mega: [
      { label: "Career Advice", href: "/career-advice", desc: "Tips from industry experts", icon: "📖" },
      { label: "Resume Builder", href: "/resume-builder", desc: "Create a standout resume", icon: "📝" },
      { label: "Salary Guide", href: "/salary-guide", desc: "Know your worth", icon: "💵" },
      { label: "Interview Prep", href: "/interview-prep", desc: "Ace your next interview", icon: "🎯" },
    ],
  },
  { label: "Job Alerts", href: "/job-alerts" },
  { label: "About Us", href: "/about" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleMegaEnter = (label: string) => {
    clearTimeout(megaTimeout.current);
    setActiveMega(label);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 200);
  };

  useEffect(() => () => clearTimeout(megaTimeout.current), []);

  return (
    <>
      {/* Top banner */}
      <div className="gradient-primary text-primary-foreground text-center text-sm py-2.5 font-medium tracking-wide">
        🌍 <strong>100% FREE</strong> job browsing — 24,500+ jobs across Uganda, Africa, UAE, Europe & Americas!
      </div>

      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg font-display">
              J
            </div>
            <span className="text-xl font-bold font-display text-foreground">
              Job<span className="text-gradient">Sphere</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && handleMegaEnter(item.label)}
                onMouseLeave={handleMegaLeave}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {item.label}
                  {item.mega && <ChevronDown size={14} className={`transition-transform ${activeMega === item.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {item.mega && activeMega === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                      onMouseEnter={() => handleMegaEnter(item.label)}
                      onMouseLeave={handleMegaLeave}
                    >
                      <div className="bg-card rounded-2xl shadow-elevated border border-border p-4 min-w-[420px] grid grid-cols-2 gap-1">
                        {item.mega.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group"
                            onClick={() => setActiveMega(null)}
                          >
                            <span className="text-2xl mt-0.5">{sub.icon}</span>
                            <div>
                              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{sub.label}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{sub.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent"></span>
            </button>
            <Link
              to="/post-job"
              className="gradient-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Post a Job
            </Link>
            <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <User size={20} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-card border-t border-border"
            >
              <nav className="flex flex-col gap-1 px-4 py-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-xl hover:bg-secondary"
                    >
                      {item.label}
                      {item.mega && <ChevronDown size={14} />}
                    </Link>
                  </div>
                ))}
                <div className="border-t border-border mt-2 pt-3">
                  <Link
                    to="/post-job"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center gradient-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl"
                  >
                    Post a Job
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
