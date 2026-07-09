import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Search, Bell, Heart, Globe, LogOut, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSavedJobs } from "@/contexts/SavedJobsContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import MegaMenuJobs from "@/components/MegaMenuJobs";
import MegaMenuCategories from "@/components/MegaMenuCategories";
import MegaMenuCompanies from "@/components/MegaMenuCompanies";
import MegaMenuResources from "@/components/MegaMenuResources";
import { getJobStats } from "@/lib/jobData";

interface NavItem {
  label: string;
  href: string;
  megaType?: string;
  children?: { label: string; href: string; icon: string; desc: string }[];
}

const { totalJobs } = getJobStats();

const navItems: NavItem[] = [
  { label: "Find Jobs", href: "/jobs", megaType: "jobs" },
  { label: "Categories", href: "/categories", megaType: "categories" },
  { label: "Resources", href: "/career-advice", megaType: "resources" },
  { label: "Job Alerts", href: "/job-alerts" },
  { label: "About Us", href: "/about" },
];

const mobileSubMenus: Record<string, { label: string; href: string; icon: string }[]> = {
  "Find Jobs": [
    { label: "Browse All Jobs", href: "/jobs", icon: "🔍" },
    { label: "Remote Jobs", href: "/remote-jobs", icon: "🌍" },
    { label: "Part-time", href: "/jobs?type=part-time", icon: "⏰" },
    { label: "Full-time", href: "/jobs?type=full-time", icon: "💼" },
    { label: "Internships", href: "/jobs?type=internship", icon: "🎓" },
    { label: "Contract", href: "/jobs?type=contract", icon: "📄" },
  ],
  Categories: [
    { label: "Technology", href: "/categories/technology", icon: "💻" },
    { label: "Healthcare", href: "/categories/healthcare", icon: "🏥" },
    { label: "Construction", href: "/categories/construction", icon: "🏗️" },
    { label: "Finance", href: "/categories/finance", icon: "💰" },
    { label: "Education", href: "/categories/education", icon: "📚" },
    { label: "All Categories", href: "/categories", icon: "📂" },
  ],
  Resources: [
    { label: "Career Advice", href: "/career-advice", icon: "📖" },
    { label: "Resume Builder", href: "/resume-builder", icon: "📝" },
    { label: "Interview Prep", href: "/interview-prep", icon: "🎯" },
    { label: "Skills Assessment", href: "/skills-assessment", icon: "🧠" },
    { label: "Learning Paths", href: "/learning-paths", icon: "🎓" },
  ],
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const { savedCount } = useSavedJobs();

  const newJobsCount = Math.min(totalJobs, 24);

  const handleMegaEnter = (label: string) => { clearTimeout(megaTimeout.current); setActiveMega(label); };
  const handleMegaLeave = () => { megaTimeout.current = setTimeout(() => setActiveMega(null), 200); };

  const handleHeaderSearch = () => {
    if (headerSearch.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(headerSearch.trim())}`);
      setSearchOpen(false);
      setHeaderSearch("");
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => () => clearTimeout(megaTimeout.current), []);

  const renderMegaMenu = (label: string) => {
    if (activeMega !== label) return null;
    const close = () => setActiveMega(null);
    switch (label) {
      case "Find Jobs": return <MegaMenuJobs onClose={close} />;
      case "Categories": return <MegaMenuCategories onClose={close} />;
      case "Companies": return <MegaMenuCompanies onClose={close} />;
      case "Resources": return <MegaMenuResources onClose={close} />;
      default: return null;
    }
  };

  return (
    <>
      {/* Top bar — Premium animated banner */}
      <div className="relative overflow-hidden text-white" style={{ background: "linear-gradient(90deg, #F97316 0%, #FB923C 50%, #F59E0B 100%)" }}>
        {/* Animated background particles */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Sliding shine effect */}
        <motion.div
          className="absolute inset-0 w-[200%]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%, transparent 100%)`,
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
        />

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-3 md:py-4">
          {/* Marquee row */}
          <div className="overflow-hidden mb-1">
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(4)].map((_, j) => (
                <span key={j} className="text-primary-foreground/20 text-lg md:text-2xl font-black font-display uppercase tracking-[0.3em] select-none">
                  JOBSPHERE • HIRE • CAREERS • APPLY • DREAM JOB • JOBSPHERE • HIRE • CAREERS •&nbsp;
                </span>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="hidden sm:inline font-semibold text-sm">
                🌍 <strong className="text-accent">100% FREE</strong> job browsing — <motion.strong
                  className="text-accent"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >{newJobsCount} new jobs</motion.strong> posted today!
              </span>
              <span className="sm:hidden text-xs font-semibold">🌍 {newJobsCount} new jobs today!</span>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              <Link to="/jobs" className="hover:underline font-bold hidden md:inline text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">Register</Link>
              <Link to="/jobs" className="hover:underline font-bold hidden md:inline text-sm">Login</Link>
              <div className="flex items-center gap-1 text-primary-foreground/70 text-sm"><Globe size={13} /><span>EN</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg font-display">J</div>
            <span className="text-xl font-bold font-display text-foreground">Job<span className="text-gradient">Sphere</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.megaType && handleMegaEnter(item.label)}
                onMouseLeave={handleMegaLeave}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {item.label}
                  {item.megaType && (
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeMega === item.label ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                <AnimatePresence>
                  {renderMegaMenu(item.label) && (
                    <div onMouseEnter={() => handleMegaEnter(item.label)} onMouseLeave={handleMegaLeave}>
                      {renderMegaMenu(item.label)}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-1">
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <Search size={20} />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, width: 0 }} animate={{ opacity: 1, y: 0, width: 300 }} exit={{ opacity: 0, y: 8, width: 0 }} className="absolute right-0 top-full mt-2 z-50">
                    <div className="bg-card rounded-xl shadow-elevated border border-border p-2 flex gap-2">
                      <input type="text" placeholder="Search jobs..." value={headerSearch} onChange={(e) => setHeaderSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleHeaderSearch()} autoFocus className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                      <button onClick={handleHeaderSearch} className="gradient-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium">Go</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/saved-jobs" className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative" title="Saved Jobs">
              <Heart size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full gradient-primary text-primary-foreground text-[10px] font-bold px-1">{savedCount}</span>
              )}
            </Link>

            <Link to="/saved-jobs" className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full gradient-warm text-primary-foreground text-[10px] font-bold px-1">{savedCount}</span>
              )}
            </Link>

            <Link to="/post-job" className="gradient-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity ml-1">Post a Job</Link>
          </div>

          {/* Mobile actions */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/saved-jobs" className="p-2 rounded-xl hover:bg-secondary text-muted-foreground relative">
              <Heart size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full gradient-primary text-primary-foreground text-[9px] font-bold px-0.5">{savedCount}</span>
              )}
            </Link>
            <Link to="/saved-jobs" className="p-2 rounded-xl hover:bg-secondary text-muted-foreground relative">
              <Bell size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full gradient-warm text-primary-foreground text-[9px] font-bold px-0.5">{savedCount}</span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-foreground" aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg font-display">J</div>
                <span className="text-xl font-bold font-display text-foreground">Job<span className="text-gradient">Sphere</span></span>
              </Link>
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl hover:bg-secondary">
                <X size={24} />
              </button>
            </div>

            {/* Mobile search */}
            <div className="px-4 pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleHeaderSearch(); }}
                  className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary/50 transition-colors"
                />
                <button onClick={handleHeaderSearch} className="gradient-primary text-primary-foreground px-4 py-3 rounded-xl">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Mobile nav items */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navItems.map((item, idx) => {
                const subs = mobileSubMenus[item.label];
                const isExpanded = mobileExpanded === item.label;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {subs ? (
                      <>
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors"
                        >
                          <span className="text-base font-semibold text-foreground">{item.label}</span>
                          <ChevronRight size={18} className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-1 space-y-0.5">
                                {subs.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    to={sub.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/80 transition-colors"
                                  >
                                    <span className="text-lg">{sub.icon}</span>
                                    <span className="text-sm font-medium text-muted-foreground">{sub.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block p-3 rounded-xl text-base font-semibold text-foreground hover:bg-secondary transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile bottom actions */}
            <div className="px-4 pb-6 pt-2 border-t border-border space-y-3">
              <div className="flex gap-2">
                <Link to="/saved-jobs" onClick={() => setMenuOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-foreground font-medium text-sm">
                  <Heart size={16} /> Saved ({savedCount})
                </Link>
                <Link to="/saved-jobs" onClick={() => setMenuOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-foreground font-medium text-sm">
                  <Bell size={16} /> Alerts ({savedCount})
                </Link>
              </div>
              <Link to="/post-job" onClick={() => setMenuOpen(false)} className="block text-center gradient-primary text-primary-foreground font-semibold text-sm py-3.5 rounded-xl">
                Post a Job — It's Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
